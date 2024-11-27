'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddClassroomPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    building: '',
    floor: '',
    type: 'Salle de cours',
    capacity: '',
    equipment: [] as string[],
    status: 'available' as 'available' | 'occupied' | 'maintenance'
  });

  const [equipmentInput, setEquipmentInput] = useState('');

  const handleEquipmentAdd = () => {
    if (equipmentInput.trim()) {
      setFormData(prev => ({
        ...prev,
        equipment: [...prev.equipment, equipmentInput.trim()]
      }));
      setEquipmentInput('');
    }
  };

  const handleEquipmentRemove = (index: number) => {
    setFormData(prev => ({
      ...prev,
      equipment: prev.equipment.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call to save classroom
    console.log('Form submitted:', formData);
    router.push('/classrooms');
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Ajouter une Salle de Classe</h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-lg shadow-lg p-6">
        {/* Informations de base */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom de la salle *
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Ex: Salle 101"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bâtiment *
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.building}
              onChange={(e) => setFormData(prev => ({ ...prev, building: e.target.value }))}
              placeholder="Ex: Bâtiment A"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Étage *
            </label>
            <input
              type="number"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.floor}
              onChange={(e) => setFormData(prev => ({ ...prev, floor: e.target.value }))}
              placeholder="Ex: 1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type de salle *
            </label>
            <select
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.type}
              onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
            >
              <option value="Salle de cours">Salle de cours</option>
              <option value="Laboratoire">Laboratoire</option>
              <option value="Amphithéâtre">Amphithéâtre</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Capacité *
            </label>
            <input
              type="number"
              required
              min="1"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.capacity}
              onChange={(e) => setFormData(prev => ({ ...prev, capacity: e.target.value }))}
              placeholder="Ex: 30"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Statut
            </label>
            <select
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as 'available' | 'occupied' | 'maintenance' }))}
            >
              <option value="available">Disponible</option>
              <option value="occupied">Occupée</option>
              <option value="maintenance">En maintenance</option>
            </select>
          </div>
        </div>

        {/* Équipements */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Équipements
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={equipmentInput}
              onChange={(e) => setEquipmentInput(e.target.value)}
              placeholder="Ex: Projecteur"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleEquipmentAdd())}
            />
            <button
              type="button"
              onClick={handleEquipmentAdd}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Ajouter
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.equipment.map((item, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm flex items-center"
              >
                {item}
                <button
                  type="button"
                  onClick={() => handleEquipmentRemove(index)}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Boutons d'action */}
        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={() => router.push('/classrooms')}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
}
