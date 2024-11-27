import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    // Validation basique
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    // Connexion initiale sans spécifier de base de données
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: ''
    });

    try {
      // Créer la base de données si elle n'existe pas
      await connection.query('CREATE DATABASE IF NOT EXISTS `scholl-app`');
      
      // Se connecter à la base de données
      await connection.query('USE `scholl-app`');

      // Créer la table users si elle n'existe pas
      await connection.query(`
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Vérifier si l'email existe déjà
      const [existingUsers]: any = await connection.query(
        'SELECT * FROM users WHERE email = ?',
        [email]
      );

      if (existingUsers.length > 0) {
        return NextResponse.json(
          { message: 'Cet email est déjà utilisé' },
          { status: 400 }
        );
      }

      // Hasher le mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insérer le nouvel utilisateur
      const [result]: any = await connection.query(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [name, email, hashedPassword]
      );

      return NextResponse.json(
        { 
          message: 'Inscription réussie',
          user: {
            id: result.insertId,
            name,
            email
          }
        },
        { status: 201 }
      );
    } catch (error: any) {
      console.error('Erreur SQL:', error);
      return NextResponse.json(
        { message: `Erreur lors de l'inscription: ${error.message}` },
        { status: 500 }
      );
    } finally {
      await connection.end();
    }
  } catch (error: any) {
    console.error('Erreur lors de l\'inscription:', error);
    return NextResponse.json(
      { message: `Une erreur est survenue lors de l'inscription: ${error.message}` },
      { status: 500 }
    );
  }
}
