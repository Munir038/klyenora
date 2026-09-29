/**
 * Domain model types
 */

// ─── User / Auth ─────────────────────────────────────────────────
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: 'admin' | 'manager' | 'staff';
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// ─── Lead ────────────────────────────────────────────────────────
export type LeadStatus =
  | 'new'
  | 'contacted'
  | 'qualified'
  | 'proposal'
  | 'negotiation'
  | 'won'
  | 'lost';

export type LeadSource =
  | 'website'
  | 'referral'
  | 'social_media'
  | 'whatsapp'
  | 'walk_in'
  | 'other';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  status: LeadStatus;
  source: LeadSource;
  budget?: number;
  eventDate?: string;
  eventType?: string;
  notes?: string;
  assignedTo?: string;
  followUps: FollowUp[];
  createdAt: string;
  updatedAt: string;
}

export interface FollowUp {
  id: string;
  leadId: string;
  type: 'call' | 'whatsapp' | 'email' | 'meeting' | 'other';
  scheduledAt: string;
  completedAt?: string;
  notes?: string;
  status: 'pending' | 'completed' | 'missed';
}

// ─── Client ──────────────────────────────────────────────────────
export interface Client {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  notes?: string;
  totalBookings: number;
  totalSpent: number;
  createdAt: string;
}

// ─── Booking ─────────────────────────────────────────────────────
export type BookingStatus =
  | 'confirmed'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export interface Booking {
  id: string;
  clientId: string;
  clientName: string;
  eventType: string;
  eventDate: string;
  venue?: string;
  packageId?: string;
  packageName?: string;
  totalAmount: number;
  paidAmount: number;
  pendingAmount: number;
  status: BookingStatus;
  notes?: string;
  timeline: TimelineEvent[];
  createdAt: string;
  updatedAt: string;
}

export interface EventPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  inclusions: string[];
  isActive: boolean;
}

export interface TimelineEvent {
  id: string;
  title: string;
  description?: string;
  date: string;
  isCompleted: boolean;
}

// ─── Payment ─────────────────────────────────────────────────────
export type PaymentMethod =
  | 'cash'
  | 'upi'
  | 'bank_transfer'
  | 'card'
  | 'cheque'
  | 'other';

export type PaymentStatus = 'received' | 'pending' | 'overdue' | 'refunded';

export interface Payment {
  id: string;
  bookingId: string;
  clientName: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  receivedDate?: string;
  dueDate?: string;
  notes?: string;
  receiptUrl?: string;
  createdAt: string;
}

// ─── Task / Reminder ─────────────────────────────────────────────
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  priority: TaskPriority;
  isCompleted: boolean;
  assignedTo?: string;
  relatedLeadId?: string;
  relatedBookingId?: string;
  createdAt: string;
}

// ─── API Response Wrapper ────────────────────────────────────────
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
