'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Classroom {
  id: number;
  name: string;
  capacity: number;
  building: string;
  floor: number;
  type: string;
  equipment: string[];
  status: 'available' | 'occupied' | 'maintenance';
}

export default function ClassroomsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Données de test
  const classrooms: Classroom[] = [
    {
      id: 1,
      name: 'Salle 101',
      capacity: 30,
      building: 'Bâtiment A',
      floor: 1,
      type: 'Salle de cours',
      equipment: ['Projecteur', 'Tableau blanc', 'WiFi'],
      status: 'available'
    },
    {
      id: 2,
      name: 'Labo 201',
      capacity: 20,
      building: 'Bâtiment B',
      floor: 2,
      type: 'Laboratoire',
      equipment: ['Ordinateurs', 'Projecteur', 'Équipement spécialisé'],
      status: 'occupied'
    },
    {
      id: 3,
      name: 'Amphi A',
      capacity: 200,
      building: 'Bâtiment C',
      floor: 0,
      type: 'Amphithéâtre',
      equipment: ['Système audio', 'Projecteurs multiples', 'WiFi'],
      status: 'maintenance'
    },
  ];

  const filteredClassrooms = classrooms.filter(classroom => {
    const matchesSearch = classroom.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         classroom.building.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || classroom.type === filterType;
    return matchesSearch && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'occupied':
        return 'bg-yellow-100 text-yellow-800';
      case 'maintenance':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available':
        return 'Disponible';
      case 'occupied':
        return 'Occupée';
      case 'maintenance':
        return 'En maintenance';
      default:
        return status;
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Salles de Classes</h1>
        <Link
          href="/classrooms/add"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Ajouter une salle
        </Link>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Rechercher une salle..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">Tous les types</option>
          <option value="Salle de cours">Salles de cours</option>
          <option value="Laboratoire">Laboratoires</option>
          <option value="Amphithéâtre">Amphithéâtres</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClassrooms.map((classroom) => (
          <div key={classroom.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-1">{classroom.name}</h3>
                  <p className="text-gray-600">{classroom.building} - Étage {classroom.floor}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(classroom.status)}`}>
                  {getStatusText(classroom.status)}
                </span>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-gray-600">Type</p>
                  <p className="font-medium">{classroom.type}</p>
                </div>
                <div>
                  <p className="text-gray-600">Capacité</p>
                  <p className="font-medium">{classroom.capacity} personnes</p>
                </div>
                <div>
                  <p className="text-gray-600">Équipements</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {classroom.equipment.map((item, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-sm"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex space-x-3">
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Modifier
                </button>
                <button className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Détails
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
