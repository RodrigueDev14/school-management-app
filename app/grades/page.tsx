'use client';

import { useState } from 'react';

interface Grade {
  id: number;
  studentName: string;
  courseName: string;
  grade: number;
  coefficient: number;
  date: string;
  teacher: string;
  comment?: string;
}

export default function GradesPage() {
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Données de test
  const grades: Grade[] = [
    {
      id: 1,
      studentName: 'Alice Martin',
      courseName: 'Mathématiques',
      grade: 16,
      coefficient: 4,
      date: '2024-01-15',
      teacher: 'M. Dubois',
      comment: 'Excellent travail'
    },
    {
      id: 2,
      studentName: 'Thomas Bernard',
      courseName: 'Physique',
      grade: 14,
      coefficient: 3,
      date: '2024-01-16',
      teacher: 'Mme. Laurent'
    },
    {
      id: 3,
      studentName: 'Emma Petit',
      courseName: 'Français',
      grade: 18,
      coefficient: 3,
      date: '2024-01-17',
      teacher: 'M. Moreau',
      comment: 'Très bonne analyse'
    },
  ];

  const filteredGrades = grades.filter(grade => {
    const matchesSearch = 
      grade.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grade.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grade.teacher.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  const getGradeColor = (grade: number) => {
    if (grade >= 16) return 'text-green-600';
    if (grade >= 14) return 'text-blue-600';
    if (grade >= 12) return 'text-yellow-600';
    if (grade >= 10) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des Notes</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Ajouter une note
        </button>
      </div>

      {/* Filtres */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <select
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="all">Toutes les classes</option>
          <option value="6A">6ème A</option>
          <option value="6B">6ème B</option>
          <option value="5A">5ème A</option>
        </select>

        <select
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
          <option value="all">Toutes les matières</option>
          <option value="math">Mathématiques</option>
          <option value="physics">Physique</option>
          <option value="french">Français</option>
        </select>

        <select
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
        >
          <option value="all">Toutes les périodes</option>
          <option value="t1">Trimestre 1</option>
          <option value="t2">Trimestre 2</option>
          <option value="t3">Trimestre 3</option>
        </select>

        <input
          type="text"
          placeholder="Rechercher..."
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Tableau des notes */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Élève
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Matière
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Note
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Coef.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Professeur
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Commentaire
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredGrades.map((grade) => (
                <tr key={grade.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {grade.studentName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {grade.courseName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`font-medium ${getGradeColor(grade.grade)}`}>
                      {grade.grade}/20
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {grade.coefficient}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(grade.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {grade.teacher}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-500">
                      {grade.comment || '-'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      Modifier
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
