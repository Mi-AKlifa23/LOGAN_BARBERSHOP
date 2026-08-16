import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  X,
  Check,
  Calendar as CalendarIcon,
  Clock,
  User,
  Scissors,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Phone,
  Mail,
  FileText,
  CheckCircle2,
  Share2,
  CalendarPlus,
  MessageCircle,
  QrCode
} from 'lucide-react';
import { Service, Barber, Appointment } from '../types';
import { SERVICES, BARBERS, TIME_SLOTS } from '../data/barbershopData';
import { LoganLogo } from './LoganLogo';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: Service | null;
  initialBarber?: Barber | null;
  onAppointmentCreated: (appointment: Appointment) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialService,
  initialBarber,
  onAppointmentCreated,
}) => {
  const [step, setStep] = useState<number>(1);
  const [selectedService, setSelectedService] = useState<Service | null>(initialService || SERVICES[0]);
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(initialBarber || BARBERS[0]);
  const [anyBarber, setAnyBarber] = useState<boolean>(false);
  
  // Date selection: default to tomorrow or today
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  
  const [selectedTime, setSelectedTime] = useState<string>(TIME_SLOTS[2]); // 11:30 AM
  
  // Client Info
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientNotes, setClientNotes] = useState('');
  
  // Confirmation state
  const [confirmedAppointment, setConfirmedAppointment] = useState<Appointment | null>(null);

  // Sync initial props if changed
  useEffect(() => {
    if (initialService) setSelectedService(initialService);
    if (initialBarber) setSelectedBarber(initialBarber);
  }, [initialService, initialBarber]);

  // Generate next 14 selectable dates
  const nextDates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const dayName = d.toLocaleDateString('es-ES', { weekday: 'short' });
    const dayNum = d.getDate();
    const monthName = d.toLocaleDateString('es-ES', { month: 'short' });
    const iso = d.toISOString().split('T')[0];
    const isSunday = d.getDay() === 0;
    const isMonday = d.getDay() === 1; // Closed Mondays
    return {
      iso,
      dayName: dayName.toUpperCase(),
      dayNum,
      monthName: monthName.toUpperCase(),
      isClosed: isMonday,
      isSpecial: isSunday,
    };
  });

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService || (!selectedBarber && !anyBarber)) return;

    const assignedBarber = anyBarber ? BARBERS[Math.floor(Math.random() * BARBERS.length)] : selectedBarber!;

    const newAppointment: Appointment = {
      id: `LGN-${Math.floor(100000 + Math.random() * 900000)}`,
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      price: selectedService.price,
      durationMinutes: selectedService.durationMinutes,
      barberId: assignedBarber.id,
      barberName: assignedBarber.name,
      barberAvatar: assignedBarber.avatar,
      date: selectedDate,
      time: selectedTime,
      clientName: clientName.trim(),
      clientPhone: clientPhone.trim(),
      clientEmail: clientEmail.trim(),
      notes: clientNotes.trim() || undefined,
      status: 'confirmada',
      createdAt: new Date().toISOString(),
    };

    onAppointmentCreated(newAppointment);
    setConfirmedAppointment(newAppointment);
    setStep(5);

    // Launch confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#E5B84B', '#D4AF37', '#FFFFFF', '#AA820A'],
      });
    } catch {
      // safe fallback
    }
  };

  const handleReset = () => {
    setStep(1);
    setConfirmedAppointment(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-2xl bg-[#0F1219] border border-[#2B3346] rounded-xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="px-6 py-4 bg-[#141822] border-b border-[#222836] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <LoganLogo size="sm" showText={false} />
            <div>
              <h2 className="font-serif-luxury text-lg font-bold text-white leading-none">
                Reserva de Cita Online
              </h2>
              <p className="text-[11px] text-[#8E95A5] mt-1">Logan Barbershop · Experiencia Exclusiva</p>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg bg-[#1B202D] hover:bg-[#252C3D] text-[#8E95A5] hover:text-white transition-colors cursor-pointer"
            aria-label="Cerrar modal de reserva"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar (Hidden on step 5 confirmation) */}
        {step < 5 && (
          <div className="px-6 py-3 bg-[#0B0E14] border-b border-[#1A1F2B] flex items-center justify-between text-xs flex-shrink-0">
            <div className="flex items-center gap-2">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
                step >= 1 ? 'bg-[#E5B84B] text-[#0B0D11]' : 'bg-[#1D2230] text-[#768092]'
              }`}>
                1
              </span>
              <span className={`font-semibold hidden sm:inline ${step === 1 ? 'text-white' : 'text-[#768092]'}`}>
                Servicio
              </span>
            </div>
            <div className="w-6 sm:w-12 h-px bg-[#262E3E]" />

            <div className="flex items-center gap-2">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
                step >= 2 ? 'bg-[#E5B84B] text-[#0B0D11]' : 'bg-[#1D2230] text-[#768092]'
              }`}>
                2
              </span>
              <span className={`font-semibold hidden sm:inline ${step === 2 ? 'text-white' : 'text-[#768092]'}`}>
                Barbero
              </span>
            </div>
            <div className="w-6 sm:w-12 h-px bg-[#262E3E]" />

            <div className="flex items-center gap-2">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
                step >= 3 ? 'bg-[#E5B84B] text-[#0B0D11]' : 'bg-[#1D2230] text-[#768092]'
              }`}>
                3
              </span>
              <span className={`font-semibold hidden sm:inline ${step === 3 ? 'text-white' : 'text-[#768092]'}`}>
                Fecha & Hora
              </span>
            </div>
            <div className="w-6 sm:w-12 h-px bg-[#262E3E]" />

            <div className="flex items-center gap-2">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
                step >= 4 ? 'bg-[#E5B84B] text-[#0B0D11]' : 'bg-[#1D2230] text-[#768092]'
              }`}>
                4
              </span>
              <span className={`font-semibold hidden sm:inline ${step === 4 ? 'text-white' : 'text-[#768092]'}`}>
                Tus Datos
              </span>
            </div>
          </div>
        )}

        {/* Modal Scrollable Content Area */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* STEP 1: Select Service */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div>
                <h3 className="font-serif-luxury text-xl font-bold text-white">
                  1. Selecciona el servicio deseado
                </h3>
                <p className="text-xs text-[#8E95A5] mt-0.5">
                  Elige la experiencia de corte o afeitado que deseas recibir.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SERVICES.map((service) => {
                  const isSelected = selectedService?.id === service.id;
                  return (
                    <div
                      key={service.id}
                      onClick={() => setSelectedService(service)}
                      className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#181D29] border-[#E5B84B] shadow-[0_0_15px_rgba(229,184,75,0.2)]'
                          : 'bg-[#12151D] border-[#222735] hover:border-[#384154]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h4 className="font-serif-luxury text-base font-bold text-white">
                            {service.name}
                          </h4>
                          <span className="text-[11px] text-[#E5B84B] font-semibold flex items-center gap-1 mt-0.5">
                            <Clock className="w-3 h-3" />
                            {service.durationMinutes} min
                          </span>
                        </div>
                        <span className="text-lg font-bold text-white">${service.price}</span>
                      </div>

                      <p className="text-xs text-[#8E95A5] line-clamp-2 leading-relaxed">
                        {service.description}
                      </p>

                      <div className="mt-3 pt-2 border-t border-[#1C212E] flex items-center justify-between">
                        <span className="text-[10px] text-[#636C7D] uppercase font-bold tracking-wider">
                          {service.category}
                        </span>
                        {isSelected && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#E5B84B]">
                            <Check className="w-3.5 h-3.5" /> Seleccionado
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Select Barber */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div>
                <h3 className="font-serif-luxury text-xl font-bold text-white">
                  2. Selecciona a tu barbero de confianza
                </h3>
                <p className="text-xs text-[#8E95A5] mt-0.5">
                  Puedes elegir un barbero específico o dejar que el sistema asigne el primer turno disponible.
                </p>
              </div>

              {/* Any Barber Card */}
              <div
                onClick={() => {
                  setAnyBarber(true);
                  setSelectedBarber(null);
                }}
                className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between ${
                  anyBarber
                    ? 'bg-[#181D29] border-[#E5B84B] shadow-[0_0_15px_rgba(229,184,75,0.2)]'
                    : 'bg-[#12151D] border-[#222735] hover:border-[#384154]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#1A2130] border border-[#2D384D] flex items-center justify-center text-[#E5B84B]">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-serif-luxury text-base font-bold text-white">
                      Cualquier Barbero Disponible
                    </h4>
                    <p className="text-xs text-[#8E95A5]">Mayor disponibilidad de horarios inmediatos</p>
                  </div>
                </div>
                {anyBarber && <Check className="w-5 h-5 text-[#E5B84B]" />}
              </div>

              {/* Specific Barbers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {BARBERS.map((barber) => {
                  const isSelected = !anyBarber && selectedBarber?.id === barber.id;
                  return (
                    <div
                      key={barber.id}
                      onClick={() => {
                        setAnyBarber(false);
                        setSelectedBarber(barber);
                      }}
                      className={`p-3.5 rounded-xl border transition-all duration-200 cursor-pointer flex items-center gap-3.5 ${
                        isSelected
                          ? 'bg-[#181D29] border-[#E5B84B] shadow-[0_0_15px_rgba(229,184,75,0.2)]'
                          : 'bg-[#12151D] border-[#222735] hover:border-[#384154]'
                      }`}
                    >
                      <img
                        src={barber.avatar}
                        alt={barber.name}
                        className="w-12 h-12 rounded-full object-cover border border-[#D4AF37]/30 flex-shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-serif-luxury text-sm font-bold text-white truncate">
                            {barber.name}
                          </h4>
                          {isSelected && <Check className="w-4 h-4 text-[#E5B84B]" />}
                        </div>
                        <p className="text-[11px] text-[#8E95A5] truncate">{barber.role}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] text-[#E5B84B] font-bold">★ {barber.rating}</span>
                          <span className="text-[10px] text-[#656E7F]">{barber.experienceYears} años exp</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: Date & Time Picker */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h3 className="font-serif-luxury text-xl font-bold text-white">
                  3. Selecciona la fecha y hora
                </h3>
                <p className="text-xs text-[#8E95A5] mt-0.5">
                  {anyBarber ? 'Horarios globales disponibles' : `Disponibilidad de ${selectedBarber?.name}`}
                </p>
              </div>

              {/* Horizontal Date Picker */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#8E95A5] mb-2">
                  Fecha de la Cita
                </label>
                <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
                  {nextDates.map((item) => {
                    const isSelected = selectedDate === item.iso;
                    if (item.isClosed) {
                      return (
                        <div
                          key={item.iso}
                          className="flex-shrink-0 w-16 py-3 rounded-xl bg-[#10131A] border border-[#1C202B] text-center opacity-40 cursor-not-allowed"
                        >
                          <span className="text-[10px] font-bold text-[#677080] block">{item.dayName}</span>
                          <span className="text-lg font-bold text-[#677080] block my-0.5">{item.dayNum}</span>
                          <span className="text-[9px] text-red-400 uppercase font-bold block">Cerrado</span>
                        </div>
                      );
                    }

                    return (
                      <button
                        key={item.iso}
                        type="button"
                        onClick={() => setSelectedDate(item.iso)}
                        className={`flex-shrink-0 w-16 py-3 rounded-xl border text-center transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? 'bg-[#E5B84B] text-[#0B0D11] border-[#E5B84B] font-bold shadow-lg scale-105'
                            : 'bg-[#141822] text-[#B0B7C5] border-[#242A38] hover:border-[#3E475C]'
                        }`}
                      >
                        <span className={`text-[10px] font-bold block ${isSelected ? 'text-[#0B0D11]' : 'text-[#7D8697]'}`}>
                          {item.dayName}
                        </span>
                        <span className="text-lg font-bold block my-0.5">{item.dayNum}</span>
                        <span className={`text-[9px] uppercase font-semibold block ${isSelected ? 'text-[#0B0D11]' : 'text-[#8E95A5]'}`}>
                          {item.monthName}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots Grid */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#8E95A5] mb-2">
                  Horarios Disponibles ({selectedTime || 'Selecciona uno'})
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                  {TIME_SLOTS.map((slot) => {
                    const isSelected = selectedTime === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTime(slot)}
                        className={`py-2.5 px-3 rounded-lg text-xs font-bold tracking-wider transition-all duration-200 cursor-pointer border ${
                          isSelected
                            ? 'bg-[#E5B84B] text-[#0B0D11] border-[#E5B84B] shadow-md'
                            : 'bg-[#131720] text-[#D0D6E2] border-[#232938] hover:border-[#384154]'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Client Info Form */}
          {step === 4 && (
            <form onSubmit={handleConfirmBooking} className="space-y-4 animate-in fade-in duration-200">
              <div>
                <h3 className="font-serif-luxury text-xl font-bold text-white">
                  4. Información de Contacto
                </h3>
                <p className="text-xs text-[#8E95A5] mt-0.5">
                  Enviaremos la confirmación y recordatorio a tu número y correo.
                </p>
              </div>

              {/* Booking Summary Card */}
              <div className="p-4 rounded-xl bg-[#141822] border border-[#262E3E] space-y-2 text-xs">
                <div className="flex justify-between text-[#8E95A5]">
                  <span>Servicio:</span>
                  <span className="font-bold text-white">{selectedService?.name} (${selectedService?.price})</span>
                </div>
                <div className="flex justify-between text-[#8E95A5]">
                  <span>Barbero:</span>
                  <span className="font-bold text-white">
                    {anyBarber ? 'Cualquier Barbero' : selectedBarber?.name}
                  </span>
                </div>
                <div className="flex justify-between text-[#8E95A5]">
                  <span>Fecha y Hora:</span>
                  <span className="font-bold text-[#E5B84B]">{selectedDate} a las {selectedTime}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#8E95A5] mb-1.5">
                    Nombre Completo *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Ej: Carlos Ramírez"
                      className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-[#141822] border border-[#262E3E] focus:border-[#E5B84B] text-sm text-white focus:outline-none"
                    />
                    <User className="w-4 h-4 text-[#6A7486] absolute left-3 top-3" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#8E95A5] mb-1.5">
                    Teléfono / WhatsApp *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="+51 918 821 458"
                      className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-[#141822] border border-[#262E3E] focus:border-[#E5B84B] text-sm text-white focus:outline-none"
                    />
                    <Phone className="w-4 h-4 text-[#6A7486] absolute left-3 top-3" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#8E95A5] mb-1.5">
                  Correo Electrónico *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="carlos@ejemplo.com"
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-[#141822] border border-[#262E3E] focus:border-[#E5B84B] text-sm text-white focus:outline-none"
                  />
                  <Mail className="w-4 h-4 text-[#6A7486] absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#8E95A5] mb-1.5">
                  Notas Especiales o Preferencias (Opcional)
                </label>
                <textarea
                  rows={2}
                  value={clientNotes}
                  onChange={(e) => setClientNotes(e.target.value)}
                  placeholder="Ej: Tengo piel sensible para el afeitado, o prefiero degradado medio."
                  className="w-full px-3 py-2 rounded-lg bg-[#141822] border border-[#262E3E] focus:border-[#E5B84B] text-xs text-white focus:outline-none resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-sm bg-[#E5B84B] hover:bg-[#D4A738] text-[#0B0D11] text-xs font-bold uppercase tracking-widest transition-all duration-200 shadow-xl cursor-pointer"
                >
                  Confirmar y Reservar Cita (${selectedService?.price})
                </button>
              </div>
            </form>
          )}

          {/* STEP 5: Success Digital Ticket Screen */}
          {step === 5 && confirmedAppointment && (
            <div className="space-y-6 text-center animate-in zoom-in-95 duration-300 py-2">
              <div className="inline-flex p-3 rounded-full bg-[#182017] border border-emerald-500/40 text-emerald-400 mb-1">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white">
                  ¡Cita Confirmada con Éxito!
                </h3>
                <p className="text-xs text-[#8E95A5] mt-1">
                  Te hemos enviado los detalles a tu WhatsApp y correo electrónico.
                </p>
              </div>

              {/* Digital Luxury Ticket */}
              <div className="max-w-md mx-auto p-6 rounded-xl bg-gradient-to-b from-[#161B26] to-[#0F121A] border border-[#D4AF37]/50 shadow-2xl text-left relative overflow-hidden">
                {/* Gold watermark */}
                <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 opacity-10 pointer-events-none">
                  <LoganLogo size="xl" showText={false} />
                </div>

                <div className="flex items-center justify-between border-b border-[#262E3E] pb-3 mb-4">
                  <LoganLogo size="sm" />
                  <div className="text-right">
                    <span className="text-[10px] text-[#8E95A5] uppercase tracking-wider block">Ticket #</span>
                    <span className="text-xs font-mono font-bold text-[#E5B84B]">{confirmedAppointment.id}</span>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#8E95A5]">Cliente:</span>
                    <span className="font-bold text-white">{confirmedAppointment.clientName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8E95A5]">Servicio:</span>
                    <span className="font-bold text-white">{confirmedAppointment.serviceName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8E95A5]">Barbero Asignado:</span>
                    <span className="font-bold text-white">{confirmedAppointment.barberName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8E95A5]">Fecha:</span>
                    <span className="font-bold text-[#E5B84B]">{confirmedAppointment.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8E95A5]">Horario:</span>
                    <span className="font-bold text-[#E5B84B]">{confirmedAppointment.time} ({confirmedAppointment.durationMinutes} min)</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-[#262E3E]">
                    <span className="text-[#8E95A5]">Total a pagar en local:</span>
                    <span className="text-base font-bold text-[#E5B84B]">${confirmedAppointment.price}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <a
                  href={`https://wa.me/51918821458?text=Hola,%20acabo%20de%20reservar%20la%20cita%20${confirmedAppointment.id}%20para%20${encodeURIComponent(confirmedAppointment.serviceName)}%20el%20${confirmedAppointment.date}%20a%20las%20${confirmedAppointment.time}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-lg bg-[#162B1D] hover:bg-[#1E3A27] border border-[#25D366]/40 text-xs font-semibold text-[#25D366] flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enviar a WhatsApp</span>
                </a>

                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-sm bg-[#E5B84B] hover:bg-[#D4A738] text-[#0B0D11] text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
                >
                  Listo · Ver en la web
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Step Controls (Steps 1 to 3) */}
        {step < 4 && (
          <div className="px-6 py-4 bg-[#141822] border-t border-[#222836] flex items-center justify-between flex-shrink-0">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 rounded bg-[#1A1F2C] hover:bg-[#252C3D] text-xs font-semibold text-[#B3BAC6] uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Atrás</span>
              </button>
            ) : (
              <div />
            )}

            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="px-6 py-2.5 rounded-sm bg-[#E5B84B] hover:bg-[#D4A738] text-[#0B0D11] text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-lg cursor-pointer"
            >
              <span>Continuar</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
