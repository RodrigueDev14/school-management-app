'use client';

import { useState } from 'react';

interface Classroom {
  id: number;
  name: string;
  capacity: number;
  teacher: string;
  schedule: string;
  status: 'available' | 'occupied' | 'maintenance';
}

export default function ClassroomsPage() {
  const [classrooms, setClassrooms] = useState<Classroom[]>([
    {
      id: 1,
      name: 'Salle 101',
      capacity: 30,
      teacher: 'Mme Martin',
      schedule: 'Lundi - Vendredi',
      status: 'available'
    },
    // Ajoutez plus de salles ici
  ]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gestion des Salles de Classe</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          + Nouvelle Salle
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classrooms.map((classroom) => (
          <div
            key={classroom.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-semibold text-gray-800">{classroom.name}</h2>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    classroom.status === 'available'
                      ? 'bg-green-100 text-green-800'
                      : classroom.status === 'occupied'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {classroom.status === 'available'
                    ? 'Disponible'
                    : classroom.status === 'occupied'
                    ? 'Occupée'
                    : 'Maintenance'}
                </span>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center text-gray-600">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span>Capacité: {classroom.capacity} élèves</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span>Professeur principal: {classroom.teacher}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>Horaires: {classroom.schedule}</span>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 transition-colors">
                  Modifier
                </button>
                <button className="px-3 py-1 text-sm text-red-600 hover:text-red-800 transition-colors">
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
