import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { BarbersSection } from './components/BarbersSection';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { MyAppointmentsModal } from './components/MyAppointmentsModal';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { Service, Barber, Appointment } from './types';
import { SERVICES, BARBERS } from './data/barbershopData';
import { Calendar, Phone, MessageSquare, Sparkles } from 'lucide-react';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isMyAppointmentsOpen, setIsMyAppointmentsOpen] = useState(false);
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<Service | null>(null);
  
  const [preselectedService, setPreselectedService] = useState<Service | null>(null);
  const [preselectedBarber, setPreselectedBarber] = useState<Barber | null>(null);

  const [activeSection, setActiveSection] = useState('inicio');

  // Appointments in local state + localStorage fallback
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    try {
      const saved = localStorage.getItem('logan_barbershop_appointments');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    // Default initial mock confirmed appointment for rich state
    return [
      {
        id: 'LGN-849201',
        serviceId: 'corte-barba',
        serviceName: 'Corte + Barba',
        price: 45,
        durationMinutes: 75,
        barberId: 'mateo-silva',
        barberName: 'Mateo "Logan" Silva',
        barberAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
        date: '2026-08-18',
        time: '11:30 AM',
        clientName: 'Cliente Logan VIP',
        clientPhone: '+1 (555) 234-5678',
        clientEmail: 'cliente@loganbarbershop.com',
        notes: 'Degradado medio y toalla caliente',
        status: 'confirmada',
        createdAt: new Date().toISOString(),
      },
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem('logan_barbershop_appointments', JSON.stringify(appointments));
    } catch {
      // ignore
    }
  }, [appointments]);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['inicio', 'servicios', 'barberos', 'galeria', 'resenas', 'ubicacion'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenBooking = (service?: Service | null, barber?: Barber | null) => {
    setPreselectedService(service || null);
    setPreselectedBarber(barber || null);
    setIsBookingOpen(true);
  };

  const handleAppointmentCreated = (newAppointment: Appointment) => {
    setAppointments((prev) => [newAppointment, ...prev]);
  };

  const handleCancelAppointment = (id: string) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#0B0D11] text-[#E4E6EB] relative selection:bg-[#E5B84B] selection:text-[#0B0D11]">
      {/* Fixed Navigation Header */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenMyAppointments={() => setIsMyAppointmentsOpen(true)}
        activeSection={activeSection}
        appointments={appointments}
      />

      {/* Hero Section */}
      <Hero
        onOpenBooking={() => handleOpenBooking()}
        onExploreServices={() => {
          const el = document.getElementById('servicios');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Servicios Exclusivos Section Matching Image 2 */}
      <ServicesSection
        onSelectServiceForBooking={(service) => handleOpenBooking(service)}
        onOpenDetailModal={(service) => setSelectedServiceForModal(service)}
      />

      {/* Master Barbers Section */}
      <BarbersSection
        onSelectBarberForBooking={(barber) => handleOpenBooking(null, barber)}
      />

      {/* Lookbook / Gallery Section */}
      <GallerySection
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Reviews & Testimonials Section */}
      <ReviewsSection />

      {/* Location & Opening Hours Section */}
      <LocationSection
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Footer Matching Image 2 */}
      <Footer />

      {/* Interactive Booking Flow Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialService={preselectedService}
        initialBarber={preselectedBarber}
        onAppointmentCreated={handleAppointmentCreated}
      />

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={selectedServiceForModal}
        onClose={() => setSelectedServiceForModal(null)}
        onBookService={(service) => {
          setSelectedServiceForModal(null);
          handleOpenBooking(service);
        }}
      />

      {/* My Appointments Manager Modal */}
      <MyAppointmentsModal
        isOpen={isMyAppointmentsOpen}
        onClose={() => setIsMyAppointmentsOpen(false)}
        appointments={appointments}
        onCancelAppointment={handleCancelAppointment}
        onNewBooking={() => {
          setIsMyAppointmentsOpen(false);
          handleOpenBooking();
        }}
      />

      {/* Mobile Floating Quick Booking Trigger Button */}
      <div className="sm:hidden fixed bottom-5 right-5 z-40">
        <button
          onClick={() => handleOpenBooking()}
          className="flex items-center gap-2 px-5 py-3.5 rounded-full bg-[#E5B84B] text-[#0B0D11] font-bold text-xs tracking-wider uppercase shadow-[0_4px_20px_rgba(229,184,75,0.6)] active:scale-95 transition-transform cursor-pointer"
        >
          <Calendar className="w-4 h-4" />
          <span>Reservar Cita</span>
        </button>
      </div>
    </div>
  );
}
