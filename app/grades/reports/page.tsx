'use client';

import { useState } from 'react';

interface Student {
  id: number;
  name: string;
  class: string;
  average: number;
  rank: number;
  subjects: {
    name: string;
    grades: number[];
    average: number;
    coefficient: number;
    teacher: string;
    appreciation: string;
  }[];
}

export default function ReportsPage() {
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('t1');
  const [searchTerm, setSearchTerm] = useState('');

  // Données de test
  const students: Student[] = [
    {
      id: 1,
      name: 'Alice Martin',
      class: '6ème A',
      average: 15.8,
      rank: 1,
      subjects: [
        {
          name: 'Mathématiques',
          grades: [16, 15, 17],
          average: 16,
          coefficient: 4,
          teacher: 'M. Dubois',
          appreciation: 'Excellent travail, continue ainsi !'
        },
        {
          name: 'Français',
          grades: [18, 16, 15],
          average: 16.3,
          coefficient: 4,
          teacher: 'Mme. Bernard',
          appreciation: 'Très bonne participation en classe'
        },
      ]
    },
    // Ajoutez d'autres étudiants ici
  ];

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <h1 className="text-2xl font-bold">Bulletins Scolaires</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Générer les bulletins
        </button>
      </div>

      {/* Filtres */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
        >
          <option value="t1">Trimestre 1</option>
          <option value="t2">Trimestre 2</option>
          <option value="t3">Trimestre 3</option>
          <option value="year">Année complète</option>
        </select>

        <input
          type="text"
          placeholder="Rechercher un élève..."
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Liste des bulletins */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((student) => (
          <div key={student.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-1">{student.name}</h3>
                  <p className="text-gray-600">{student.class}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Moyenne générale</p>
                  <p className={`text-lg font-bold ${getGradeColor(student.average)}`}>
                    {student.average.toFixed(1)}/20
                  </p>
                  <p className="text-sm text-gray-600">Rang: {student.rank}</p>
                </div>
              </div>

              {/* Matières */}
              <div className="space-y-4">
                {student.subjects.map((subject, index) => (
                  <div key={index} className="border-t pt-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">{subject.name}</h4>
                        <p className="text-sm text-gray-600">{subject.teacher}</p>
                      </div>
                      <div className="text-right">
                        <p className={`font-medium ${getGradeColor(subject.average)}`}>
                          {subject.average.toFixed(1)}/20
                        </p>
                        <p className="text-sm text-gray-600">Coef. {subject.coefficient}</p>
                      </div>
                    </div>
                    
                    {/* Notes */}
                    <div className="flex flex-wrap gap-2 mb-2">
                      {subject.grades.map((grade, gradeIndex) => (
                        <span
                          key={gradeIndex}
                          className={`px-2 py-1 rounded-md text-sm ${getGradeColor(grade)} bg-opacity-10`}
                        >
                          {grade}/20
                        </span>
                      ))}
                    </div>
                    
                    {/* Appréciation */}
                    <p className="text-sm text-gray-600 italic">
                      "{subject.appreciation}"
                    </p>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="mt-6 flex space-x-3">
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Voir le bulletin
                </button>
                <button className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Télécharger PDF
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
