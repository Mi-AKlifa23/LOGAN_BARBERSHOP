import React from 'react';
import { motion } from 'motion/react';
import { X, Calendar, Clock, User, Scissors, Trash2, CheckCircle2, MessageCircle, AlertCircle } from 'lucide-react';
import { Appointment } from '../types';
import { LoganLogo } from './LoganLogo';

interface MyAppointmentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointments: Appointment[];
  onCancelAppointment: (id: string) => void;
  onNewBooking: () => void;
}

export const MyAppointmentsModal: React.FC<MyAppointmentsModalProps> = ({
  isOpen,
  onClose,
  appointments,
  onCancelAppointment,
  onNewBooking,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-2xl bg-[#10141C] border border-[#2B3346] rounded-xl shadow-2xl overflow-hidden my-auto max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-[#141924] border-b border-[#222838] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <LoganLogo size="sm" showText={false} />
            <div>
              <h2 className="font-serif-luxury text-lg font-bold text-white">
                Mis Citas Agendadas
              </h2>
              <p className="text-[11px] text-[#8E95A5]">Gestiona o cancela tus citas activas</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#1B202D] hover:bg-[#252C3D] text-[#8E95A5] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List of Appointments */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {appointments.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <Calendar className="w-12 h-12 text-[#465063] mx-auto" />
              <div>
                <h3 className="font-serif-luxury text-lg font-bold text-white">
                  No tienes citas agendadas todavía
                </h3>
                <p className="text-xs text-[#8E95A5] mt-1 max-w-sm mx-auto">
                  Reserva tu turno con nuestros barberos maestros para asegurar tu espacio sin esperas.
                </p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onNewBooking();
                }}
                className="px-6 py-2.5 rounded-sm bg-[#E5B84B] hover:bg-[#D4A738] text-[#0B0D11] text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
              >
                Agendar Mi Primera Cita
              </button>
            </div>
          ) : (
            appointments.map((appt) => (
              <div
                key={appt.id}
                className="p-5 rounded-xl bg-[#151923] border border-[#262E3F] hover:border-[#D4AF37]/50 transition-colors space-y-4 shadow-lg"
              >
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#222938] pb-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#E5B84B] bg-[#1E2533] px-2 py-0.5 rounded">
                      Cita #{appt.id}
                    </span>
                    <h3 className="font-serif-luxury text-lg font-bold text-white mt-1.5">
                      {appt.serviceName}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-[#E5B84B]">${appt.price}</span>
                    <span className="block text-[10px] text-emerald-400 font-semibold uppercase">
                      ● Confirmada
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="flex items-center gap-2 text-[#C4CBD8]">
                    <User className="w-4 h-4 text-[#E5B84B] flex-shrink-0" />
                    <span>Barbero: <strong className="text-white">{appt.barberName}</strong></span>
                  </div>

                  <div className="flex items-center gap-2 text-[#C4CBD8]">
                    <Calendar className="w-4 h-4 text-[#E5B84B] flex-shrink-0" />
                    <span>{appt.date}</span>
                  </div>

                  <div className="flex items-center gap-2 text-[#C4CBD8]">
                    <Clock className="w-4 h-4 text-[#E5B84B] flex-shrink-0" />
                    <span>{appt.time} ({appt.durationMinutes} min)</span>
                  </div>
                </div>

                {appt.notes && (
                  <p className="text-xs text-[#8E95A5] italic bg-[#11141D] p-2.5 rounded border border-[#1E2432]">
                    Nota: "{appt.notes}"
                  </p>
                )}

                <div className="pt-2 flex items-center justify-between gap-3 border-t border-[#202735]">
                  <a
                    href={`https://wa.me/1234567890?text=Hola,%20quisiera%20consultar%20sobre%20mi%20cita%20${appt.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#25D366] hover:underline flex items-center gap-1.5 font-medium"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    Consultar por WhatsApp
                  </a>

                  <button
                    onClick={() => {
                      if (confirm('¿Estás seguro de que deseas cancelar esta cita?')) {
                        onCancelAppointment(appt.id);
                      }
                    }}
                    className="px-3 py-1.5 rounded bg-[#20181A] hover:bg-red-900/40 text-red-400 text-xs font-semibold flex items-center gap-1.5 border border-red-500/20 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Cancelar Cita
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#141924] border-t border-[#222838] flex items-center justify-between flex-shrink-0">
          <span className="text-xs text-[#8E95A5]">
            Total de citas activas: <strong className="text-white">{appointments.length}</strong>
          </span>
          <button
            onClick={() => {
              onClose();
              onNewBooking();
            }}
            className="px-4 py-2 rounded-sm bg-[#E5B84B] hover:bg-[#D4A738] text-[#0B0D11] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            + Nueva Cita
          </button>
        </div>
      </motion.div>
    </div>
  );
};
