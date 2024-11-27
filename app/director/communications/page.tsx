'use client';

import { useState } from 'react';

interface Message {
  id: number;
  sender: string;
  role: string;
  subject: string;
  content: string;
  date: string;
  status: 'unread' | 'read' | 'archived';
  priority: 'high' | 'medium' | 'low';
}

interface Announcement {
  id: number;
  title: string;
  content: string;
  date: string;
  author: string;
  target: string[];
  status: 'draft' | 'published' | 'scheduled';
}

export default function CommunicationsPage() {
  const [activeTab, setActiveTab] = useState('messages');
  const [messageFilter, setMessageFilter] = useState('all');
  const [announcementFilter, setAnnouncementFilter] = useState('all');

  // Données de test
  const messages: Message[] = [
    {
      id: 1,
      sender: 'Marie Dubois',
      role: 'Professeur',
      subject: 'Réunion pédagogique',
      content: 'Bonjour, je souhaiterais organiser une réunion pédagogique pour discuter des résultats du trimestre...',
      date: '2024-02-15T10:30:00',
      status: 'unread',
      priority: 'high',
    },
    {
      id: 2,
      sender: 'Parent d\'élève',
      role: 'Parent',
      subject: 'Demande de rendez-vous',
      content: 'Je souhaiterais vous rencontrer pour discuter des progrès de mon fils...',
      date: '2024-02-14T15:45:00',
      status: 'read',
      priority: 'medium',
    },
    {
      id: 3,
      sender: 'Administration',
      role: 'Administration',
      subject: 'Mise à jour du protocole sanitaire',
      content: 'Suite aux nouvelles directives, voici les modifications du protocole sanitaire...',
      date: '2024-02-13T09:15:00',
      status: 'archived',
      priority: 'high',
    },
  ];

  const announcements: Announcement[] = [
    {
      id: 1,
      title: 'Journée portes ouvertes',
      content: 'Notre établissement organise sa journée portes ouvertes annuelle le samedi 15 mars...',
      date: '2024-03-15T09:00:00',
      author: 'Direction',
      target: ['Parents', 'Professeurs', 'Élèves'],
      status: 'published',
    },
    {
      id: 2,
      title: 'Conseil de classe - 3ème trimestre',
      content: 'Les conseils de classe du 3ème trimestre se tiendront du 15 au 19 juin...',
      date: '2024-06-15T00:00:00',
      author: 'Direction',
      target: ['Professeurs'],
      status: 'scheduled',
    },
    {
      id: 3,
      title: 'Projet d\'établissement 2024-2025',
      content: 'Présentation du nouveau projet d\'établissement...',
      date: '2024-02-20T14:30:00',
      author: 'Direction',
      target: ['Professeurs', 'Administration'],
      status: 'draft',
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Communications</h1>
          <p className="text-gray-600 mt-1">Gestion des messages et annonces</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Nouvelle communication
        </button>
      </div>

      {/* Onglets */}
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'messages'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => setActiveTab('messages')}
        >
          Messages
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'announcements'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => setActiveTab('announcements')}
        >
          Annonces
        </button>
      </div>

      {activeTab === 'messages' ? (
        <>
          {/* Filtres des messages */}
          <div className="flex justify-between items-center mb-6">
            <select
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={messageFilter}
              onChange={(e) => setMessageFilter(e.target.value)}
            >
              <option value="all">Tous les messages</option>
              <option value="unread">Non lus</option>
              <option value="high">Priorité haute</option>
              <option value="archived">Archivés</option>
            </select>
          </div>

          {/* Liste des messages */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="divide-y divide-gray-200">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`p-6 hover:bg-gray-50 transition-colors ${
                    message.status === 'unread' ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h3 className="text-lg font-medium">{message.subject}</h3>
                        <span
                          className={`ml-3 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(
                            message.priority
                          )}`}
                        >
                          {message.priority === 'high' ? 'Urgent' : message.priority === 'medium' ? 'Normal' : 'Faible'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{message.content}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="font-medium">{message.sender}</span>
                        <span className="mx-2">•</span>
                        <span>{message.role}</span>
                        <span className="mx-2">•</span>
                        <span>{new Date(message.date).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <button className="text-gray-400 hover:text-gray-500">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Filtres des annonces */}
          <div className="flex justify-between items-center mb-6">
            <select
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={announcementFilter}
              onChange={(e) => setAnnouncementFilter(e.target.value)}
            >
              <option value="all">Toutes les annonces</option>
              <option value="published">Publiées</option>
              <option value="scheduled">Programmées</option>
              <option value="draft">Brouillons</option>
            </select>
          </div>

          {/* Liste des annonces */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-medium">{announcement.title}</h3>
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        announcement.status
                      )}`}
                    >
                      {announcement.status === 'published'
                        ? 'Publié'
                        : announcement.status === 'scheduled'
                        ? 'Programmé'
                        : 'Brouillon'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{announcement.content}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {announcement.target.map((target, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full"
                      >
                        {target}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>{announcement.author}</span>
                    <span className="mx-2">•</span>
                    <span>{new Date(announcement.date).toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>
                <div className="px-6 py-3 bg-gray-50 border-t flex justify-end space-x-3">
                  <button className="text-sm text-gray-600 hover:text-gray-900">Modifier</button>
                  <button className="text-sm text-blue-600 hover:text-blue-900">
                    {announcement.status === 'published' ? 'Archiver' : 'Publier'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
