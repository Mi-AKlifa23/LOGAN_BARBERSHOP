import React, { useState, useEffect } from 'react';
import { LoganLogo } from './LoganLogo';
import { Calendar, Clock, Menu, X, Phone, CalendarCheck } from 'lucide-react';
import { Appointment } from '../types';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenMyAppointments: () => void;
  activeSection: string;
  appointments: Appointment[];
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenMyAppointments,
  activeSection,
  appointments,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'inicio', label: 'INICIO' },
    { id: 'servicios', label: 'SERVICIOS' },
    { id: 'barberos', label: 'BARBEROS' },
    { id: 'galeria', label: 'GALERÍA' },
    { id: 'resenas', label: 'RESEÑAS' },
    { id: 'ubicacion', label: 'UBICACIÓN' },
  ];

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const confirmedAppointmentsCount = appointments.filter(a => a.status === 'confirmada').length;

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B0D11]/95 backdrop-blur-md border-b border-[#222733] py-3.5 shadow-2xl'
          : 'bg-gradient-to-b from-[#0B0D11]/90 via-[#0B0D11]/50 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo matching Image 2 */}
        <a
          href="#inicio"
          onClick={(e) => {
            e.preventDefault();
            scrollTo('inicio');
          }}
          className="flex items-center group transition-transform duration-200 hover:scale-[1.02]"
          id="nav-logo"
        >
          <LoganLogo size="md" />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-[13px] tracking-[0.18em] font-semibold text-[#B3B9C5]">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                id={`nav-link-${link.id}`}
                onClick={() => scrollTo(link.id)}
                className={`relative py-1.5 transition-colors duration-200 hover:text-white uppercase ${
                  isActive ? 'text-[#E5B84B]' : ''
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#E5B84B] rounded-full shadow-[0_0_8px_rgba(229,184,75,0.6)]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-3">
          {/* My Appointments Button */}
          {confirmedAppointmentsCount > 0 && (
            <button
              id="nav-my-appointments-btn"
              onClick={onOpenMyAppointments}
              className="relative hidden sm:flex items-center gap-2 px-3.5 py-2 rounded border border-[#303746] bg-[#141720] text-xs font-medium text-[#D1D5DB] hover:text-white hover:border-[#E5B84B]/50 transition-all duration-200"
              title="Ver mis citas agendadas"
            >
              <CalendarCheck className="w-4 h-4 text-[#E5B84B]" />
              <span>Mis Citas</span>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#E5B84B] text-[11px] font-bold text-[#0B0D11]">
                {confirmedAppointmentsCount}
              </span>
            </button>
          )}

          {/* Primary CTA: RESERVAR CITA (Exact match to Image 2) */}
          <button
            id="nav-book-appointment-btn"
            onClick={onOpenBooking}
            className="hidden sm:inline-flex items-center justify-center px-6 py-2.5 rounded-sm bg-[#E5B84B] hover:bg-[#D4A738] active:scale-[0.98] text-[#0B0D11] font-bold text-xs tracking-[0.18em] uppercase transition-all duration-200 shadow-[0_2px_12px_rgba(229,184,75,0.25)] hover:shadow-[0_4px_20px_rgba(229,184,75,0.4)] cursor-pointer"
          >
            RESERVAR CITA
          </button>

          {/* Mobile Menu Toggle */}
          <button
            id="nav-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-md bg-[#161A24] border border-[#2B3242] text-[#B3B9C5] hover:text-white"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div 
          id="mobile-drawer"
          className="lg:hidden bg-[#0D1017] border-b border-[#242A38] px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200 shadow-2xl"
        >
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`text-left py-2 text-sm tracking-[0.18em] font-semibold transition-colors uppercase ${
                  activeSection === link.id ? 'text-[#E5B84B]' : 'text-[#A0A6B5] hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-[#1F2432] flex flex-col gap-3">
            {confirmedAppointmentsCount > 0 && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenMyAppointments();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded bg-[#161B26] border border-[#303746] text-xs font-semibold text-white uppercase tracking-wider"
              >
                <CalendarCheck className="w-4 h-4 text-[#E5B84B]" />
                Ver Mis Citas ({confirmedAppointmentsCount})
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3.5 rounded-sm bg-[#E5B84B] text-[#0B0D11] font-bold text-xs tracking-[0.2em] uppercase text-center shadow-lg"
            >
              RESERVAR CITA
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
