export type UserRole = 'student' | 'parent' | 'warden' | 'staff' | 'admin';

export interface Student {
  id: string;
  name: string;
  email: string;
  room: string;
  course: string;
  year: number;
  avatar: string;
}

export interface Parent {
  id: string;
  name: string;
  childId: string;
  childName: string;
  childRoom: string;
  avatar: string;
}

export interface Warden {
  id: string;
  name: string;
  wing: string;
}

export interface Staff {
  id: string;
  name: string;
  title: string;
  avatar: string;
}

export interface LeaveRequest {
  id: string;
  studentId: string;
  studentName: string;
  room: string;
  dateRange: string;
  type: 'Weekend' | 'Local' | 'Holiday';
  purpose: string;
  status: 'APPROVED' | 'COMPLETED' | 'PENDING' | 'REJECTED';
  submittedAt: string;
}

export interface Complaint {
  id: string;
  ticketId: string;
  studentId: string;
  studentName: string;
  room: string;
  title: string;
  description: string;
  category: 'Critical' | 'Maintenance' | 'Security';
  submittedAt: string;
  resolvedAt?: string;
  assignedTo?: string;
  status: 'In Progress' | 'Resolved' | 'PENDING' | 'Completed';
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  category: 'mess' | 'power' | 'sports' | 'general';
  timestamp: string;
  icon: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  status: 'Good' | 'Low' | 'Reorder';
  icon: string;
}

export interface SystemLog {
  id: string;
  user: string;
  role: string;
  action: string;
  entity: string;
  status: 'Success' | 'Failed';
  timestamp: string;
}
