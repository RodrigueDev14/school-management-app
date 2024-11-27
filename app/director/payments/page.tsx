'use client';

import { useState } from 'react';

interface Payment {
  id: number;
  studentName: string;
  studentClass: string;
  paymentType: 'inscription' | 'scolarite' | 'autre';
  amount: number;
  status: 'paid' | 'pending' | 'late';
  dueDate: string;
  paidDate?: string;
  paymentMethod?: 'cash' | 'bank_transfer' | 'check' | 'mobile_money';
  reference?: string;
}

interface PaymentSummary {
  totalDue: number;
  totalReceived: number;
  totalPending: number;
  totalLate: number;
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([
    {
      id: 1,
      studentName: 'Jean Dupont',
      studentClass: '6ème A',
      paymentType: 'inscription',
      amount: 150000,
      status: 'paid',
      dueDate: '2024-01-15',
      paidDate: '2024-01-10',
      paymentMethod: 'bank_transfer',
      reference: 'INS-2024-001'
    },
    {
      id: 2,
      studentName: 'Marie Martin',
      studentClass: '5ème B',
      paymentType: 'scolarite',
      amount: 75000,
      status: 'pending',
      dueDate: '2024-02-01'
    },
    // Ajoutez plus de paiements ici
  ]);

  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  // Calcul des statistiques de paiement
  const paymentSummary: PaymentSummary = payments.reduce(
    (acc, payment) => ({
      totalDue: acc.totalDue + payment.amount,
      totalReceived: acc.totalReceived + (payment.status === 'paid' ? payment.amount : 0),
      totalPending: acc.totalPending + (payment.status === 'pending' ? payment.amount : 0),
      totalLate: acc.totalLate + (payment.status === 'late' ? payment.amount : 0)
    }),
    { totalDue: 0, totalReceived: 0, totalPending: 0, totalLate: 0 }
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gestion des Paiements</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          + Nouveau Paiement
        </button>
      </div>

      {/* Résumé des paiements */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Attendu</h3>
          <p className="text-2xl font-bold text-gray-900">
            {paymentSummary.totalDue.toLocaleString('fr-FR')} FCFA
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Reçu</h3>
          <p className="text-2xl font-bold text-green-600">
            {paymentSummary.totalReceived.toLocaleString('fr-FR')} FCFA
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">En Attente</h3>
          <p className="text-2xl font-bold text-yellow-600">
            {paymentSummary.totalPending.toLocaleString('fr-FR')} FCFA
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">En Retard</h3>
          <p className="text-2xl font-bold text-red-600">
            {paymentSummary.totalLate.toLocaleString('fr-FR')} FCFA
          </p>
        </div>
      </div>

      {/* Filtres */}
      <div className="mb-6 flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">Type de Paiement</label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="all">Tous les types</option>
            <option value="inscription">Inscription</option>
            <option value="scolarite">Scolarité</option>
            <option value="autre">Autre</option>
          </select>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="all">Tous les statuts</option>
            <option value="paid">Payé</option>
            <option value="pending">En attente</option>
            <option value="late">En retard</option>
          </select>
        </div>
      </div>

      {/* Tableau des paiements */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Élève
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Classe
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Montant
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date Limite
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{payment.studentName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{payment.studentClass}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {payment.paymentType === 'inscription'
                      ? 'Inscription'
                      : payment.paymentType === 'scolarite'
                      ? 'Scolarité'
                      : 'Autre'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {payment.amount.toLocaleString('fr-FR')} FCFA
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      payment.status === 'paid'
                        ? 'bg-green-100 text-green-800'
                        : payment.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {payment.status === 'paid'
                      ? 'Payé'
                      : payment.status === 'pending'
                      ? 'En attente'
                      : 'En retard'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{payment.dueDate}</div>
                  {payment.paidDate && (
                    <div className="text-xs text-gray-500">Payé le: {payment.paidDate}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-4">Détails</button>
                  <button className="text-green-600 hover:text-green-900 mr-4">
                    Marquer comme payé
                  </button>
                  <button className="text-red-600 hover:text-red-900">Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Boutons d'action */}
      <div className="mt-6 flex gap-4">
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Exporter les Rapports
        </button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Statistiques Détaillées
        </button>
      </div>
    </div>
  );
}
