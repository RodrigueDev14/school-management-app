'use client';

import { useState } from 'react';

interface PerformanceData {
  academicMetrics: {
    category: string;
    metrics: {
      name: string;
      value: number;
      target: number;
      trend: 'up' | 'down' | 'stable';
    }[];
  }[];
  classPerformance: {
    class: string;
    averageGrade: number;
    attendanceRate: number;
    successRate: number;
  }[];
  teacherPerformance: {
    name: string;
    department: string;
    metrics: {
      studentSuccess: number;
      attendanceRate: number;
      parentSatisfaction: number;
    };
  }[];
}

export default function PerformancePage() {
  const [period, setPeriod] = useState('trimester-2');

  // Données de test
  const performanceData: PerformanceData = {
    academicMetrics: [
      {
        category: 'Réussite académique',
        metrics: [
          { name: 'Taux de réussite global', value: 85, target: 80, trend: 'up' },
          { name: 'Moyenne générale', value: 14.5, target: 14, trend: 'up' },
          { name: 'Taux d\'assiduité', value: 92, target: 95, trend: 'down' },
        ],
      },
      {
        category: 'Engagement',
        metrics: [
          { name: 'Participation en classe', value: 78, target: 75, trend: 'up' },
          { name: 'Devoirs rendus', value: 88, target: 90, trend: 'down' },
          { name: 'Activités extra-scolaires', value: 45, target: 50, trend: 'stable' },
        ],
      },
    ],
    classPerformance: [
      { class: '6ème A', averageGrade: 14.8, attendanceRate: 94, successRate: 88 },
      { class: '6ème B', averageGrade: 13.9, attendanceRate: 91, successRate: 82 },
      { class: '5ème A', averageGrade: 14.2, attendanceRate: 93, successRate: 85 },
      { class: '5ème B', averageGrade: 14.5, attendanceRate: 92, successRate: 86 },
    ],
    teacherPerformance: [
      {
        name: 'Marie Dubois',
        department: 'Mathématiques',
        metrics: { studentSuccess: 87, attendanceRate: 95, parentSatisfaction: 92 },
      },
      {
        name: 'Pierre Martin',
        department: 'Français',
        metrics: { studentSuccess: 84, attendanceRate: 93, parentSatisfaction: 88 },
      },
      {
        name: 'Lucas Petit',
        department: 'Sciences',
        metrics: { studentSuccess: 82, attendanceRate: 91, parentSatisfaction: 85 },
      },
    ],
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return (
          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        );
      case 'down':
        return (
          <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14" />
          </svg>
        );
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Performance</h1>
          <p className="text-gray-600 mt-1">Analyse des performances de l'établissement</p>
        </div>
        <div className="space-x-3">
          <select
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          >
            <option value="trimester-1">1er Trimestre</option>
            <option value="trimester-2">2ème Trimestre</option>
            <option value="trimester-3">3ème Trimestre</option>
            <option value="year">Année complète</option>
          </select>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            Exporter
          </button>
        </div>
      </div>

      {/* Métriques académiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {performanceData.academicMetrics.map((category, index) => (
          <div key={index} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b">
              <h2 className="text-lg font-semibold">{category.category}</h2>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {category.metrics.map((metric, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">{metric.name}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">
                          {metric.value}%
                        </span>
                        {getTrendIcon(metric.trend)}
                      </div>
                    </div>
                    <div className="relative pt-1">
                      <div className="flex mb-2 items-center justify-between">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                            Progression
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-semibold inline-block text-blue-600">
                            {Math.round((metric.value / metric.target) * 100)}%
                          </span>
                        </div>
                      </div>
                      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                        <div
                          style={{ width: `${(metric.value / metric.target) * 100}%` }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Performance par classe */}
      <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Performance par classe</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {performanceData.classPerformance.map((classData, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-medium mb-3">{classData.class}</h3>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Moyenne</span>
                      <span className="font-medium">{classData.averageGrade}/20</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-blue-500 rounded-full"
                        style={{ width: `${(classData.averageGrade / 20) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Assiduité</span>
                      <span className="font-medium">{classData.attendanceRate}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-green-500 rounded-full"
                        style={{ width: `${classData.attendanceRate}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Réussite</span>
                      <span className="font-medium">{classData.successRate}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-purple-500 rounded-full"
                        style={{ width: `${classData.successRate}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance des enseignants */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Performance des enseignants</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {performanceData.teacherPerformance.map((teacher, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-600 font-medium">
                      {teacher.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium">{teacher.name}</h3>
                    <p className="text-xs text-gray-500">{teacher.department}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Réussite des élèves</span>
                      <span className="font-medium">{teacher.metrics.studentSuccess}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-blue-500 rounded-full"
                        style={{ width: `${teacher.metrics.studentSuccess}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Taux de présence</span>
                      <span className="font-medium">{teacher.metrics.attendanceRate}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-green-500 rounded-full"
                        style={{ width: `${teacher.metrics.attendanceRate}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Satisfaction parents</span>
                      <span className="font-medium">{teacher.metrics.parentSatisfaction}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-purple-500 rounded-full"
                        style={{ width: `${teacher.metrics.parentSatisfaction}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
