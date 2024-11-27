'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';

interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin?: string;
}

interface NotificationSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  newStudentAlert: boolean;
  paymentAlert: boolean;
  gradeAlert: boolean;
  attendanceAlert: boolean;
}

interface AppearanceSettings {
  theme: 'light' | 'dark' | 'system';
  language: 'fr' | 'en';
  fontSize: 'small' | 'medium' | 'large';
}

interface SecuritySettings {
  twoFactorAuth: boolean;
  sessionTimeout: number;
}

export default function SettingsPage() {
  const { data: session } = useSession();
  
  // État pour les paramètres existants
  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    smsNotifications: false,
    newStudentAlert: true,
    paymentAlert: true,
    gradeAlert: true,
    attendanceAlert: false
  });

  const [appearance, setAppearance] = useState<AppearanceSettings>({
    theme: 'light',
    language: 'fr',
    fontSize: 'medium'
  });

  const [security, setSecurity] = useState<SecuritySettings>({
    twoFactorAuth: false,
    sessionTimeout: 30
  });

  // État pour la gestion des comptes
  const [teacherAccounts, setTeacherAccounts] = useState<UserAccount[]>([
    {
      id: '1',
      name: 'Marie Dubois',
      email: 'marie.dubois@ecole.fr',
      role: 'Professeur',
      status: 'active',
      lastLogin: '2024-01-15'
    },
    {
      id: '2',
      name: 'Pierre Martin',
      email: 'pierre.martin@ecole.fr',
      role: 'Professeur',
      status: 'active',
      lastLogin: '2024-01-14'
    }
  ]);

  const [staffAccounts, setStaffAccounts] = useState<UserAccount[]>([
    {
      id: '1',
      name: 'Sophie Bernard',
      email: 'sophie.bernard@ecole.fr',
      role: 'Secrétaire',
      status: 'active',
      lastLogin: '2024-01-15'
    },
    {
      id: '2',
      name: 'Lucas Petit',
      email: 'lucas.petit@ecole.fr',
      role: 'Comptable',
      status: 'inactive',
      lastLogin: '2024-01-10'
    }
  ]);

  // État pour le modal d'ajout/modification
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'teacher' | 'staff' | null>(null);
  const [editingAccount, setEditingAccount] = useState<UserAccount | null>(null);

  // Gestionnaires d'événements pour les paramètres existants
  const handleNotificationChange = (setting: keyof NotificationSettings) => {
    setNotifications(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleAppearanceChange = (setting: keyof AppearanceSettings, value: string) => {
    setAppearance(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleSecurityChange = (setting: keyof SecuritySettings, value: boolean | number) => {
    setSecurity(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  // Gestionnaires d'événements pour les comptes
  const handleAddAccount = (type: 'teacher' | 'staff') => {
    setModalType(type);
    setEditingAccount(null);
    setShowModal(true);
  };

  const handleEditAccount = (account: UserAccount, type: 'teacher' | 'staff') => {
    setModalType(type);
    setEditingAccount(account);
    setShowModal(true);
  };

  const handleToggleStatus = (id: string, type: 'teacher' | 'staff') => {
    if (type === 'teacher') {
      setTeacherAccounts(accounts =>
        accounts.map(account =>
          account.id === id
            ? { ...account, status: account.status === 'active' ? 'inactive' : 'active' }
            : account
        )
      );
    } else {
      setStaffAccounts(accounts =>
        accounts.map(account =>
          account.id === id
            ? { ...account, status: account.status === 'active' ? 'inactive' : 'active' }
            : account
        )
      );
    }
  };

  const handleDeleteAccount = (id: string, type: 'teacher' | 'staff') => {
    if (type === 'teacher') {
      setTeacherAccounts(accounts => accounts.filter(account => account.id !== id));
    } else {
      setStaffAccounts(accounts => accounts.filter(account => account.id !== id));
    }
  };

  // Fonction de rendu pour la table des comptes
  const renderAccountsTable = (accounts: UserAccount[], type: 'teacher' | 'staff') => (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rôle</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dernière connexion</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {accounts.map((account) => (
            <tr key={account.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{account.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{account.email}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{account.role}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  account.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {account.status === 'active' ? 'Actif' : 'Inactif'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">
                  {account.lastLogin ? new Date(account.lastLogin).toLocaleDateString('fr-FR') : 'Jamais'}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                <button
                  onClick={() => handleEditAccount(account, type)}
                  className="text-blue-600 hover:text-blue-900"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleToggleStatus(account.id, type)}
                  className={`${
                    account.status === 'active' ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'
                  }`}
                >
                  {account.status === 'active' ? 'Désactiver' : 'Activer'}
                </button>
                <button
                  onClick={() => handleDeleteAccount(account.id, type)}
                  className="text-red-600 hover:text-red-900"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Paramètres</h1>

      {/* Section Comptes Professeurs */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Comptes Professeurs</h2>
            <button
              onClick={() => handleAddAccount('teacher')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Ajouter un professeur
            </button>
          </div>
          {renderAccountsTable(teacherAccounts, 'teacher')}
        </div>
      </div>

      {/* Section Comptes Administration */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Comptes Administration</h2>
            <button
              onClick={() => handleAddAccount('staff')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Ajouter un membre
            </button>
          </div>
          {renderAccountsTable(staffAccounts, 'staff')}
        </div>
      </div>

      {/* Sections existantes */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Notifications</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium text-gray-700">Notifications par email</label>
                <p className="text-sm text-gray-500">Recevoir les notifications par email</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={notifications.emailNotifications}
                  onChange={() => handleNotificationChange('emailNotifications')}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium text-gray-700">Notifications SMS</label>
                <p className="text-sm text-gray-500">Recevoir les notifications par SMS</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={notifications.smsNotifications}
                  onChange={() => handleNotificationChange('smsNotifications')}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium text-gray-700">Nouveaux élèves</label>
                <p className="text-sm text-gray-500">Alertes lors de nouvelles inscriptions</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={notifications.newStudentAlert}
                  onChange={() => handleNotificationChange('newStudentAlert')}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium text-gray-700">Paiements</label>
                <p className="text-sm text-gray-500">Alertes de paiements</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={notifications.paymentAlert}
                  onChange={() => handleNotificationChange('paymentAlert')}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Apparence</h2>
          <div className="space-y-4">
            <div>
              <label className="block font-medium text-gray-700 mb-2">Thème</label>
              <select
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={appearance.theme}
                onChange={(e) => handleAppearanceChange('theme', e.target.value as 'light' | 'dark' | 'system')}
              >
                <option value="light">Clair</option>
                <option value="dark">Sombre</option>
                <option value="system">Système</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-2">Langue</label>
              <select
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={appearance.language}
                onChange={(e) => handleAppearanceChange('language', e.target.value as 'fr' | 'en')}
              >
                <option value="fr">Français</option>
                <option value="en">English</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-2">Taille du texte</label>
              <select
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={appearance.fontSize}
                onChange={(e) => handleAppearanceChange('fontSize', e.target.value as 'small' | 'medium' | 'large')}
              >
                <option value="small">Petit</option>
                <option value="medium">Moyen</option>
                <option value="large">Grand</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Sécurité</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium text-gray-700">Authentification à deux facteurs</label>
                <p className="text-sm text-gray-500">Ajouter une couche de sécurité supplémentaire</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={security.twoFactorAuth}
                  onChange={() => handleSecurityChange('twoFactorAuth', !security.twoFactorAuth)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-2">Délai d'expiration de session</label>
              <select
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={security.sessionTimeout}
                onChange={(e) => handleSecurityChange('sessionTimeout', parseInt(e.target.value))}
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 heure</option>
                <option value="120">2 heures</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Modal d'ajout/modification de compte */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {editingAccount ? 'Modifier le compte' : 'Ajouter un compte'}
              </h3>
              <form className="mt-2 text-left">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Nom</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Nom complet"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="email@ecole.fr"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Rôle</label>
                  <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                    {modalType === 'teacher' ? (
                      <>
                        <option value="professor">Professeur</option>
                        <option value="headTeacher">Professeur principal</option>
                      </>
                    ) : (
                      <>
                        <option value="secretary">Secrétaire</option>
                        <option value="accountant">Comptable</option>
                        <option value="admin">Administrateur</option>
                      </>
                    )}
                  </select>
                </div>
                <div className="mt-4 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {editingAccount ? 'Enregistrer' : 'Ajouter'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
