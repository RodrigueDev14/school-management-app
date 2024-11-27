export type UserRole = 
  | 'DIRECTOR'
  | 'ACCOUNTANT'
  | 'TEACHER'
  | 'EDUCATOR'
  | 'ADMIN_STAFF'
  | 'LIBRARIAN'
  | 'NURSE';

export interface Permission {
  id: string;
  name: string;
  description: string;
  module: string;
}

export interface Role {
  id: string;
  name: UserRole;
  permissions: string[]; // Permission IDs
  description: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  phoneNumber?: string;
  address?: string;
  avatar?: string;
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  createdAt: Date;
  updatedAt: Date;
}

export const DEFAULT_PERMISSIONS: { [key in UserRole]: Permission[] } = {
  DIRECTOR: [
    { id: 'all', name: 'Full Access', description: 'Access to all features', module: 'all' }
  ],
  ACCOUNTANT: [
    { id: 'finance_read', name: 'View Finance', description: 'View financial records', module: 'finance' },
    { id: 'finance_write', name: 'Manage Finance', description: 'Manage financial records', module: 'finance' },
    { id: 'payments_read', name: 'View Payments', description: 'View payment records', module: 'payments' },
    { id: 'payments_write', name: 'Manage Payments', description: 'Process payments', module: 'payments' }
  ],
  TEACHER: [
    { id: 'grades_read', name: 'View Grades', description: 'View student grades', module: 'grades' },
    { id: 'grades_write', name: 'Manage Grades', description: 'Manage student grades', module: 'grades' },
    { id: 'attendance_read', name: 'View Attendance', description: 'View attendance records', module: 'attendance' },
    { id: 'attendance_write', name: 'Manage Attendance', description: 'Manage attendance records', module: 'attendance' },
    { id: 'courses_read', name: 'View Courses', description: 'View course information', module: 'courses' }
  ],
  EDUCATOR: [
    { id: 'students_read', name: 'View Students', description: 'View student information', module: 'students' },
    { id: 'discipline_read', name: 'View Discipline', description: 'View discipline records', module: 'discipline' },
    { id: 'discipline_write', name: 'Manage Discipline', description: 'Manage discipline records', module: 'discipline' },
    { id: 'attendance_read', name: 'View Attendance', description: 'View attendance records', module: 'attendance' },
    { id: 'attendance_write', name: 'Manage Attendance', description: 'Manage attendance records', module: 'attendance' }
  ],
  ADMIN_STAFF: [
    { id: 'students_read', name: 'View Students', description: 'View student information', module: 'students' },
    { id: 'students_write', name: 'Manage Students', description: 'Manage student records', module: 'students' },
    { id: 'staff_read', name: 'View Staff', description: 'View staff information', module: 'staff' }
  ],
  LIBRARIAN: [
    { id: 'library_read', name: 'View Library', description: 'View library records', module: 'library' },
    { id: 'library_write', name: 'Manage Library', description: 'Manage library records', module: 'library' }
  ],
  NURSE: [
    { id: 'health_read', name: 'View Health Records', description: 'View health records', module: 'health' },
    { id: 'health_write', name: 'Manage Health Records', description: 'Manage health records', module: 'health' }
  ]
};
