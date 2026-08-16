export interface Service {
  id: string;
  name: string;
  price: number;
  durationMinutes: number;
  category: 'cortes' | 'barba' | 'tratamientos' | 'combos';
  description: string;
  image: string;
  popular?: boolean;
  includes: string[];
}

export interface Barber {
  id: string;
  name: string;
  role: string;
  experienceYears: number;
  rating: number;
  reviewsCount: number;
  avatar: string;
  bio: string;
  specialties: string[];
}

export interface Appointment {
  id: string;
  serviceId: string;
  serviceName: string;
  price: number;
  durationMinutes: number;
  barberId: string;
  barberName: string;
  barberAvatar: string;
  date: string; // YYYY-MM-DD
  time: string; // e.g. "11:30 AM"
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  notes?: string;
  status: 'confirmada' | 'completada' | 'cancelada';
  createdAt: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  service: string;
  barber: string;
  verified: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'fades' | 'barba' | 'clasicos' | 'ambiente';
  image: string;
  tag: string;
  barber: string;
}
