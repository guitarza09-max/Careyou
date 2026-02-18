
export interface Review {
  user: string;
  comment: string;
  rating: number;
  date: string;
}

export interface Caregiver {
  id: string;
  name: string;
  age: number;
  specialty: string;
  rating: number;
  reviews: number;
  hourlyRate: number;
  experience: string;
  image: string;
  bio: string;
  available: boolean;
  certifications: string[];
  certImages: string[];
  reviewComments: Review[];
  isFavorite?: boolean;
}

export interface HealthRecord {
  id: string;
  date: string;
  bloodPressure: string;
  sugarLevel: string;
  weight: string;
  heartRate: string;
  notes: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  relation: string;
  phone: string;
}

export interface Booking {
  id: string;
  caregiverId: string;
  caregiverName: string;
  date: string;
  time: string;
  status: 'completed' | 'pending' | 'cancelled';
  total: number;
  serviceType: string;
}

export interface Hospital {
  name: string;
  location: string;
  image: string;
  specialties: string[];
}

export enum AppSection {
  LANDING = 'LANDING',
  LOGIN = 'LOGIN',
  DASHBOARD = 'DASHBOARD',
  PROFILE = 'PROFILE',
  CARE_SERVICE_MENU = 'CARE_SERVICE_MENU',
  CALL_NOW_FLOW = 'CALL_NOW_FLOW',
  ADVANCE_BOOKING = 'ADVANCE_BOOKING',
  MY_BOOKINGS = 'MY_BOOKINGS',
  MEMBERSHIP = 'MEMBERSHIP',
  HEALTH_RECORDS = 'HEALTH_RECORDS',
  EMERGENCY_CONTACTS = 'EMERGENCY_CONTACTS',
  PARTNER_HOSPITALS = 'PARTNER_HOSPITALS',
  RELAXATION = 'RELAXATION',
  CAREGIVER_DETAIL = 'CAREGIVER_DETAIL'
}

export type ServiceType = 'HOSPITAL' | 'TRAVEL' | 'ERRANDS';
