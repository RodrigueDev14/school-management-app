'use client';

import { useState } from 'react';

interface PaymentReport {
  period: string;
  totalRevenue: number;
  paymentsByType: {
    type: string;
    amount: number;
    count: number;
  }[];
  paymentsByMethod: {
    method: string;
    amount: number;
    count: number;
  }[];
  outstandingPayments: {
    type: string;
    amount: number;
    count: number;
  }[];
}

export default function ReportsPage() {
  const [period, setPeriod] = useState('2023-2024');

  // Données de test
  const report: PaymentReport = {
    period: '2023-2024',
    totalRevenue: 125000,
    paymentsByType: [
      { type: 'Frais de scolarité', amount: 100000, count: 80 },
      { type: "Droits d'inscription", amount: 20000, count: 40 },
      { type: 'Autres', amount: 5000, count: 10 },
    ],
    paymentsByMethod: [
      { method: 'Carte bancaire', amount: 60000, count: 50 },
      { method: 'Virement', amount: 40000, count: 30 },
      { method: 'Chèque', amount: 20000, count: 40 },
      { method: 'Espèces', amount: 5000, count: 10 },
    ],
    outstandingPayments: [
      { type: 'Frais de scolarité', amount: 15000, count: 10 },
      { type: "Droits d'inscription", amount: 5000, count: 5 },
    ],
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Rapports Financiers</h1>
          <p className="text-gray-600 mt-1">Vue d'ensemble des paiements et revenus</p>
        </div>
        <div className="space-x-3">
          <select
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          >
            <option value="2023-2024">Année 2023-2024</option>
            <option value="2024-2025">Année 2024-2025</option>
          </select>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            Exporter
          </button>
        </div>
      </div>

      {/* Vue d'ensemble */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Revenus totaux</h3>
          <p className="text-3xl font-bold">{report.totalRevenue.toLocaleString('fr-FR')} €</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Paiements en attente</h3>
          <p className="text-3xl font-bold text-yellow-600">
            {report.outstandingPayments.reduce((acc, curr) => acc + curr.amount, 0).toLocaleString('fr-FR')} €
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Taux de recouvrement</h3>
          <p className="text-3xl font-bold text-green-600">
            {Math.round((report.totalRevenue / (report.totalRevenue + report.outstandingPayments.reduce((acc, curr) => acc + curr.amount, 0))) * 100)}%
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Répartition par type */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold">Répartition par type</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {report.paymentsByType.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{item.type}</span>
                    <span className="font-medium">{item.amount.toLocaleString('fr-FR')} €</span>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: `${(item.amount / report.totalRevenue) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="ml-2 text-sm text-gray-500">
                      {item.count} paiements
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Répartition par méthode */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold">Répartition par méthode</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {report.paymentsByMethod.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{item.method}</span>
                    <span className="font-medium">{item.amount.toLocaleString('fr-FR')} €</span>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{
                          width: `${(item.amount / report.totalRevenue) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="ml-2 text-sm text-gray-500">
                      {item.count} paiements
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Paiements en attente */}
        <div className="bg-white rounded-lg shadow overflow-hidden md:col-span-2">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold">Paiements en attente</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {report.outstandingPayments.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{item.type}</span>
                    <span className="font-medium text-yellow-600">
                      {item.amount.toLocaleString('fr-FR')} €
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-600 h-2 rounded-full"
                        style={{
                          width: `${(item.amount / (report.outstandingPayments.reduce((acc, curr) => acc + curr.amount, 0))) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="ml-2 text-sm text-gray-500">
                      {item.count} paiements en attente
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
