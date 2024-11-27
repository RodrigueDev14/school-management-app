'use client';

import { useState } from 'react';

interface FeeStructure {
  id: number;
  level: string;
  tuitionFee: number;
  registrationFee: number;
  academicYear: string;
  paymentSchedule: {
    term: string;
    dueDate: string;
    amount: number;
  }[];
}

export default function FeesPage() {
  const [academicYear, setAcademicYear] = useState('2023-2024');

  // Données de test
  const feeStructures: FeeStructure[] = [
    {
      id: 1,
      level: '6ème',
      tuitionFee: 4500,
      registrationFee: 500,
      academicYear: '2023-2024',
      paymentSchedule: [
        { term: 'Trimestre 1', dueDate: '2023-09-15', amount: 1500 },
        { term: 'Trimestre 2', dueDate: '2024-01-15', amount: 1500 },
        { term: 'Trimestre 3', dueDate: '2024-04-15', amount: 1500 },
      ]
    },
    {
      id: 2,
      level: '5ème',
      tuitionFee: 4500,
      registrationFee: 500,
      academicYear: '2023-2024',
      paymentSchedule: [
        { term: 'Trimestre 1', dueDate: '2023-09-15', amount: 1500 },
        { term: 'Trimestre 2', dueDate: '2024-01-15', amount: 1500 },
        { term: 'Trimestre 3', dueDate: '2024-04-15', amount: 1500 },
      ]
    },
    {
      id: 3,
      level: '4ème',
      tuitionFee: 4500,
      registrationFee: 500,
      academicYear: '2023-2024',
      paymentSchedule: [
        { term: 'Trimestre 1', dueDate: '2023-09-15', amount: 1500 },
        { term: 'Trimestre 2', dueDate: '2024-01-15', amount: 1500 },
        { term: 'Trimestre 3', dueDate: '2024-04-15', amount: 1500 },
      ]
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Frais de Scolarité</h1>
        <div className="space-x-3">
          <select
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={academicYear}
            onChange={(e) => setAcademicYear(e.target.value)}
          >
            <option value="2023-2024">2023-2024</option>
            <option value="2024-2025">2024-2025</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Modifier les frais
          </button>
        </div>
      </div>

      {/* Grille des frais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {feeStructures.map((structure) => (
          <div key={structure.id} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b">
              <h3 className="text-lg font-semibold">{structure.level}</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Frais de scolarité annuels</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {structure.tuitionFee.toLocaleString('fr-FR')} €
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Droits d'inscription</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {structure.registrationFee.toLocaleString('fr-FR')} €
                  </p>
                </div>
                <div className="pt-4 border-t">
                  <p className="text-sm font-medium text-gray-900 mb-3">Échéancier de paiement</p>
                  <div className="space-y-2">
                    {structure.paymentSchedule.map((schedule, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <div>
                          <span className="text-gray-600">{schedule.term}</span>
                          <span className="text-gray-400 ml-2">
                            (avant le {new Date(schedule.dueDate).toLocaleDateString()})
                          </span>
                        </div>
                        <span className="font-medium">{schedule.amount.toLocaleString('fr-FR')} €</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total annuel</span>
                <span className="text-lg font-bold text-gray-900">
                  {(structure.tuitionFee + structure.registrationFee).toLocaleString('fr-FR')} €
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Notes et conditions */}
      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Notes et conditions</h3>
        <div className="space-y-3 text-sm text-gray-600">
          <p>• Les frais de scolarité peuvent être réglés en une fois ou selon l'échéancier proposé.</p>
          <p>• Les droits d'inscription doivent être réglés en totalité avant la rentrée scolaire.</p>
          <p>• Tout trimestre commencé est dû dans son intégralité.</p>
          <p>• Des frais de retard peuvent être appliqués pour tout paiement effectué après la date d'échéance.</p>
          <p>• Les modalités de paiement acceptées sont : virement bancaire, carte bancaire, ou chèque.</p>
        </div>
      </div>
    </div>
  );
}
