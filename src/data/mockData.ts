// Données de démonstration pour l'application

import { Employee, Task, TaskCategory, TaskPriority, TaskStatus } from '@/types';

export const mockEmployees: Employee[] = [
  {
    id: '1',
    firstName: 'Marie',
    lastName: 'Dupont',
    position: 'Développeuse Frontend',
    color: '#3B82F6',
    email: 'marie.dupont@entreprise.fr',
    isAvailable: true
  },
  {
    id: '2', 
    firstName: 'Pierre',
    lastName: 'Martin',
    position: 'Chef de Projet',
    color: '#10B981',
    email: 'pierre.martin@entreprise.fr',
    isAvailable: true
  },
  {
    id: '3',
    firstName: 'Sophie',
    lastName: 'Bernard',
    position: 'Designer UX/UI',
    color: '#F59E0B',
    email: 'sophie.bernard@entreprise.fr',
    isAvailable: false
  },
  {
    id: '4',
    firstName: 'Thomas',
    lastName: 'Leroy',
    position: 'Développeur Backend', 
    color: '#8B5CF6',
    email: 'thomas.leroy@entreprise.fr',
    isAvailable: true
  },
  {
    id: '5',
    firstName: 'Emma',
    lastName: 'Moreau',
    position: 'Support Client',
    color: '#EF4444',
    email: 'emma.moreau@entreprise.fr',
    isAvailable: true
  }
];

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Réunion équipe hebdomadaire',
    description: 'Point sur les projets en cours et planning de la semaine',
    startDate: new Date(2024, 11, 23, 9, 0),
    endDate: new Date(2024, 11, 23, 10, 0),
    employeeId: '2',
    category: TaskCategory.MEETING,
    priority: TaskPriority.MEDIUM,
    status: TaskStatus.PENDING,
    color: '#3B82F6'
  },
  {
    id: '2',
    title: 'Développement interface utilisateur',
    description: 'Création des composants React pour le dashboard',
    startDate: new Date(2024, 11, 23, 10, 30),
    endDate: new Date(2024, 11, 23, 12, 30),
    employeeId: '1',
    category: TaskCategory.DEVELOPMENT,
    priority: TaskPriority.HIGH,
    status: TaskStatus.IN_PROGRESS,
    color: '#10B981'
  },
  {
    id: '3',
    title: 'Conception maquettes mobile',
    description: 'Design responsive pour application mobile',
    startDate: new Date(2024, 11, 23, 14, 0),
    endDate: new Date(2024, 11, 23, 17, 0),
    employeeId: '3',
    category: TaskCategory.DEVELOPMENT,
    priority: TaskPriority.HIGH,
    status: TaskStatus.PENDING,
    color: '#F59E0B'
  },
  {
    id: '4',
    title: 'Support client urgent',
    description: 'Résolution bug critique en production',
    startDate: new Date(2024, 11, 23, 8, 0),
    endDate: new Date(2024, 11, 23, 10, 0),
    employeeId: '5',
    category: TaskCategory.SUPPORT,
    priority: TaskPriority.URGENT,
    status: TaskStatus.IN_PROGRESS,
    color: '#EF4444'
  },
  {
    id: '5',
    title: 'Développement API',
    description: 'Implémentation endpoints REST',
    startDate: new Date(2024, 11, 23, 13, 0),
    endDate: new Date(2024, 11, 23, 16, 0),
    employeeId: '4',
    category: TaskCategory.DEVELOPMENT,
    priority: TaskPriority.MEDIUM,
    status: TaskStatus.PENDING,
    color: '#8B5CF6'
  },
  {
    id: '6',
    title: 'Formation nouveau logiciel',
    description: 'Session de formation sur les nouveaux outils',
    startDate: new Date(2024, 11, 24, 9, 0),
    endDate: new Date(2024, 11, 24, 11, 0),
    employeeId: '1',
    category: TaskCategory.TRAINING,
    priority: TaskPriority.LOW,
    status: TaskStatus.PENDING,
    color: '#6B7280'
  }
];

// Utilitaires pour convertir les données
export const getTaskCategoryLabel = (category: TaskCategory): string => {
  const labels = {
    [TaskCategory.MEETING]: 'Réunion',
    [TaskCategory.DEVELOPMENT]: 'Développement',
    [TaskCategory.SUPPORT]: 'Support',
    [TaskCategory.TRAINING]: 'Formation',
    [TaskCategory.ADMIN]: 'Administration'
  };
  return labels[category];
};

export const getTaskPriorityLabel = (priority: TaskPriority): string => {
  const labels = {
    [TaskPriority.LOW]: 'Faible',
    [TaskPriority.MEDIUM]: 'Moyenne',
    [TaskPriority.HIGH]: 'Haute',
    [TaskPriority.URGENT]: 'Urgent'
  };
  return labels[priority];
};

export const getTaskStatusLabel = (status: TaskStatus): string => {
  const labels = {
    [TaskStatus.PENDING]: 'En attente',
    [TaskStatus.IN_PROGRESS]: 'En cours',
    [TaskStatus.COMPLETED]: 'Terminé',
    [TaskStatus.CANCELLED]: 'Annulé'
  };
  return labels[status];
};