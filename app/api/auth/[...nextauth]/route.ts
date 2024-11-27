import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email et mot de passe requis");
        }

        // Connexion initiale sans spécifier de base de données
        const connection = await mysql.createConnection({
          host: 'localhost',
          user: 'root',
          password: ''
        });

        try {
          // S'assurer que la base de données existe
          await connection.query('CREATE DATABASE IF NOT EXISTS `scholl-app`');
          await connection.query('USE `scholl-app`');

          // S'assurer que la table users existe
          await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
              id INT AUTO_INCREMENT PRIMARY KEY,
              name VARCHAR(255) NOT NULL,
              email VARCHAR(255) NOT NULL UNIQUE,
              password VARCHAR(255) NOT NULL,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
          `);

          const [rows]: any = await connection.query(
            'SELECT * FROM users WHERE email = ?',
            [credentials.email]
          );

          if (!Array.isArray(rows) || rows.length === 0) {
            throw new Error("Email ou mot de passe incorrect");
          }

          const user = rows[0];
          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

          if (!isPasswordValid) {
            throw new Error("Email ou mot de passe incorrect");
          }

          return {
            id: user.id.toString(),
            email: user.email,
            name: user.name,
          };
        } catch (error) {
          console.error('Erreur d\'authentification:', error);
          throw error;
        } finally {
          await connection.end();
        }
      }
    })
  ],
  pages: {
    signIn: '/auth/login',
    signUp: '/auth/register',
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 jours
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user.id;
        token.role = user.role || 'USER'; // Ajout du rôle par défaut
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role; // Ajout du rôle à la session
      }
      return session;
    },
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      // Si l'URL est la page de connexion ou d'inscription et que l'utilisateur est déjà connecté
      if (url.startsWith('/auth/') && url.includes('callback')) {
        return '/director/dashboard';
      }
      // Si l'URL est relative, on la combine avec l'URL de base
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`;
      }
      // Sinon on retourne l'URL telle quelle
      return url;
    }
  },
  secret: process.env.NEXTAUTH_SECRET || 'your-secret-key',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
