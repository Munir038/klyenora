/**
 * Global TypeScript types — navigation routes.
 */

// ─── Root Navigator ──────────────────────────────────────────────
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

// ─── Auth Stack ──────────────────────────────────────────────────
export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  OtpVerification: { phone?: string; email?: string };
  ForgotPassword: undefined;
};

// ─── Main Bottom Tabs ────────────────────────────────────────────
export type MainTabParamList = {
  HomeTab: undefined;
  LeadsTab: undefined;
  CalendarTab: undefined;
  ClientsTab: undefined;
  SettingsTab: undefined;
};

// ─── Dashboard ───────────────────────────────────────────────────
export type DashboardStackParamList = {
  Dashboard: undefined;
};

// ─── Leads ───────────────────────────────────────────────────────
export type LeadsStackParamList = {
  LeadPipeline: undefined;
  LeadDetails: { leadId: string };
  AddLead: undefined;
  EditLead: { leadId: string };
  FollowUps: { leadId?: string };
};

// ─── Clients ─────────────────────────────────────────────────────
export type ClientsStackParamList = {
  ClientList: undefined;
  ClientDetails: { clientId: string };
  ClientHistory: { clientId: string };
  AddClient: undefined;
};

// ─── Bookings ────────────────────────────────────────────────────
export type BookingsStackParamList = {
  BookingsList: undefined;
  BookingDetails: { bookingId: string };
  Packages: undefined;
  Events: undefined;
  BookingTimeline: { bookingId: string };
  AddBooking: undefined;
};

// ─── Payments ────────────────────────────────────────────────────
export type PaymentsStackParamList = {
  PaymentOverview: undefined;
  AddPayment: { bookingId?: string };
  PendingPayments: undefined;
  PaymentHistory: undefined;
  PaymentDetails: { paymentId: string };
};

// ─── Tasks ───────────────────────────────────────────────────────
export type TasksStackParamList = {
  TasksList: undefined;
  TaskDetails: { taskId: string };
  AddTask: undefined;
};

// ─── Calendar ────────────────────────────────────────────────────
export type CalendarStackParamList = {
  CalendarView: undefined;
};

// ─── Reports ─────────────────────────────────────────────────────
export type ReportsStackParamList = {
  ReportsOverview: undefined;
  ReportDetails: { reportType: string };
};

// ─── WhatsApp ────────────────────────────────────────────────────
export type WhatsAppStackParamList = {
  WhatsAppActions: undefined;
};

// ─── Settings ────────────────────────────────────────────────────
export type SettingsStackParamList = {
  SettingsMain: undefined;
  Profile: undefined;
  Appearance: undefined;
  Notifications: undefined;
  About: undefined;
};
