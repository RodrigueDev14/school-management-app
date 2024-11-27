'use client';

import { useState } from 'react';
import { signOut } from 'next-auth/react';

interface SchoolStats {
  totalStudents: number;
  totalTeachers: number;
  totalClasses: number;
  averageGrade: number;
  attendanceRate: number;
  revenueThisMonth: number;
  pendingPayments: number;
  upcomingEvents: {
    date: string;
    title: string;
    type: string;
  }[];
  recentAlerts: {
    date: string;
    message: string;
    type: 'info' | 'warning' | 'success';
  }[];
  performanceMetrics: {
    subject: string;
    averageGrade: number;
    trend: 'up' | 'down' | 'stable';
  }[];
}

export default function DirectorDashboard() {
  const [period, setPeriod] = useState('this-month');

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  // Données de test
  const stats: SchoolStats = {
    totalStudents: 450,
    totalTeachers: 32,
    totalClasses: 18,
    averageGrade: 14.5,
    attendanceRate: 95,
    revenueThisMonth: 45000,
    pendingPayments: 15000,
    upcomingEvents: [
      { date: '2024-02-01', title: 'Conseil de classe 6ème A', type: 'meeting' },
      { date: '2024-02-05', title: 'Réunion parents-professeurs', type: 'event' },
      { date: '2024-02-10', title: 'Formation des enseignants', type: 'training' },
    ],
    recentAlerts: [
      { date: '2024-01-28', message: 'Nouveau protocole sanitaire en place', type: 'info' },
      { date: '2024-01-27', message: 'Retards fréquents en classe de 5ème B', type: 'warning' },
      { date: '2024-01-26', message: 'Objectifs du trimestre atteints', type: 'success' },
    ],
    performanceMetrics: [
      { subject: 'Mathématiques', averageGrade: 13.5, trend: 'up' },
      { subject: 'Français', averageGrade: 14.2, trend: 'stable' },
      { subject: 'Histoire-Géo', averageGrade: 15.1, trend: 'down' },
      { subject: 'Sciences', averageGrade: 14.8, trend: 'up' },
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

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'bg-yellow-50 text-yellow-800 border-yellow-100';
      case 'success':
        return 'bg-green-50 text-green-800 border-green-100';
      default:
        return 'bg-blue-50 text-blue-800 border-blue-100';
    }
  };

  return (
    <div className="p-6">  

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Vue d'ensemble de l'établissement</h1>
        </div>
        <div className="space-x-3">
          <select
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          >
            <option value="today">Aujourd'hui</option>
            <option value="this-week">Cette semaine</option>
            <option value="this-month">Ce mois</option>
            <option value="this-year">Cette année</option>
          </select>
        </div>
      </div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Élèves</h3>
              <p className="text-2xl font-bold">{stats.totalStudents}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Classes</h3>
              <p className="text-2xl font-bold">{stats.totalClasses}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Moyenne générale</h3>
              <p className="text-2xl font-bold">{stats.averageGrade}/20</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Taux de présence</h3>
              <p className="text-2xl font-bold">{stats.attendanceRate}%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Performance par matière */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold">Performance par matière</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {stats.performanceMetrics.map((metric, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    {getTrendIcon(metric.trend)}
                    <span className="ml-2 text-sm text-gray-600">{metric.subject}</span>
                  </div>
                  <span className="font-medium">{metric.averageGrade}/20</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Événements à venir */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold">Événements à venir</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {stats.upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-12 text-center">
                      <div className="text-sm font-medium text-gray-600">
                        {new Date(event.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                      </div>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium">{event.title}</p>
                    <p className="text-sm text-gray-500">{event.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Alertes récentes */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold">Alertes récentes</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {stats.recentAlerts.map((alert, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${getAlertColor(alert.type)}`}
                >
                  <div className="flex justify-between items-start">
                    <p className="text-sm">{alert.message}</p>
                  </div>
                  <p className="text-xs mt-1 text-gray-500">
                    {new Date(alert.date).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                    })}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
