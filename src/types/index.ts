// Types pour l'application de planification

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  position: string;
  photo?: string;
  color: string;
  email: string;
  isAvailable: boolean;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  employeeId: string;
  category: TaskCategory;
  priority: TaskPriority;
  status: TaskStatus;
  color?: string;
}

export enum TaskCategory {
  MEETING = 'meeting',
  DEVELOPMENT = 'development',
  SUPPORT = 'support',
  TRAINING = 'training',
  ADMIN = 'admin'
}

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent'
}

export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

// Type pour les données du scheduler
export interface SchedulerResource {
  id: string;
  title: string;
  subtitle?: string;
  avatar?: string;
  color?: string;
}

export interface SchedulerEvent {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  color?: string;
  bgColor?: string;
  textColor?: string;
}