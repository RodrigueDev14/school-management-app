'use client';

import { useState } from 'react';

interface ClassStats {
  className: string;
  averageGrade: number;
  studentCount: number;
  subjectAverages: {
    subject: string;
    average: number;
    distribution: number[];
  }[];
  topStudents: {
    name: string;
    average: number;
  }[];
}

export default function StatsPage() {
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('t1');

  // Données de test
  const stats: ClassStats[] = [
    {
      className: '6ème A',
      averageGrade: 14.5,
      studentCount: 28,
      subjectAverages: [
        {
          subject: 'Mathématiques',
          average: 13.8,
          distribution: [2, 5, 8, 10, 3] // Distribution par tranches de notes
        },
        {
          subject: 'Français',
          average: 14.2,
          distribution: [1, 4, 12, 8, 3]
        },
        {
          subject: 'Histoire-Géo',
          average: 15.1,
          distribution: [0, 3, 10, 12, 3]
        }
      ],
      topStudents: [
        { name: 'Alice Martin', average: 17.2 },
        { name: 'Thomas Bernard', average: 16.8 },
        { name: 'Emma Petit', average: 16.5 }
      ]
    }
  ];

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
        <h1 className="text-2xl font-bold">Statistiques</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Exporter les statistiques
        </button>
      </div>

      {/* Filtres */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
      </div>

      {/* Statistiques par classe */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {stats.map((classStat, index) => (
          <div key={index} className="space-y-6">
            {/* Vue d'ensemble de la classe */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">{classStat.className}</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Moyenne générale</p>
                  <p className={`text-2xl font-bold ${getGradeColor(classStat.averageGrade)}`}>
                    {classStat.averageGrade.toFixed(1)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Élèves</p>
                  <p className="text-2xl font-bold text-gray-800">{classStat.studentCount}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Matières</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {classStat.subjectAverages.length}
                  </p>
                </div>
              </div>
            </div>

            {/* Moyennes par matière */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold mb-4">Moyennes par matière</h3>
              <div className="space-y-4">
                {classStat.subjectAverages.map((subject, subIndex) => (
                  <div key={subIndex}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">{subject.subject}</span>
                      <span className={`font-medium ${getGradeColor(subject.average)}`}>
                        {subject.average.toFixed(1)}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600"
                        style={{ width: `${(subject.average / 20) * 100}%` }}
                      />
                    </div>
                    {/* Distribution des notes */}
                    <div className="flex justify-between mt-2">
                      {subject.distribution.map((count, i) => (
                        <div key={i} className="text-xs text-center">
                          <div className="text-gray-600">{count}</div>
                          <div className="text-gray-500">
                            {i * 5}-{(i + 1) * 5}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Meilleurs élèves */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold mb-4">Meilleurs élèves</h3>
              <div className="space-y-3">
                {classStat.topStudents.map((student, studentIndex) => (
                  <div
                    key={studentIndex}
                    className="flex justify-between items-center p-2 bg-gray-50 rounded"
                  >
                    <span className="font-medium">{student.name}</span>
                    <span className={`font-medium ${getGradeColor(student.average)}`}>
                      {student.average.toFixed(1)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
