import { Service, Barber, Review, GalleryItem } from '../types';

export const SERVICES: Service[] = [
  {
    id: 'corte-clasico',
    name: 'Corte Clásico',
    price: 25,
    durationMinutes: 45,
    category: 'cortes',
    description: 'Corte tradicional o moderno a tijera y máquina con asesoría visagista personalizada.',
    image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=1000&auto=format&fit=crop',
    includes: [
      'Diagnóstico capilar personalizado',
      'Lavado con shampoo revitalizante y masaje capilar',
      'Corte milimétrico con tijera/máquina de alta gama',
      'Peinado y fijación con pomada mate o cera premium'
    ]
  },
  {
    id: 'skin-fade',
    name: 'Skin Fade',
    price: 30,
    durationMinutes: 60,
    category: 'cortes',
    popular: true,
    description: 'Degradado a cero o a navaja con transición suave, pulido con shaver y definición de contornos.',
    image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=1000&auto=format&fit=crop',
    includes: [
      'Degradado de alta precisión (Low, Mid o High Fade)',
      'Afeitado de nuca y contornos con navaja japonesa',
      'Acabado ultra suave con shaver profesional',
      'Tónico refrescante post-afeitado y peinado'
    ]
  },
  {
    id: 'corte-barba',
    name: 'Corte + Barba',
    price: 45,
    durationMinutes: 75,
    category: 'combos',
    popular: true,
    description: 'El ritual insignia de Logan: corte integral más perfilado y tratamiento de barba completo.',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1000&auto=format&fit=crop',
    includes: [
      'Corte de cabello completo a elección o fade de precisión',
      'Perfilado y recorte simétrico de barba con navaja',
      'Ritual de doble toalla caliente infusionada con eucalipto',
      'Aceite de barba artesanal, bálsamo nutritivo y peinado final'
    ]
  },
  {
    id: 'perfilado-barba',
    name: 'Perfilado de Barba',
    price: 15,
    durationMinutes: 30,
    category: 'barba',
    description: 'Diseño, recorte y delineado simétrico con navaja tradicional y productos hidratantes.',
    image: 'https://images.unsplash.com/photo-1517832606299-7ae9b720a186?q=80&w=1000&auto=format&fit=crop',
    includes: [
      'Delineado de mejillas y cuello con navaja desinfectada',
      'Recorte de volumen y simetría milimétrica',
      'Aplicación de aceite hidratante con vitaminas',
      'Bálsamo fijador para acondicionamiento duradero'
    ]
  },
  {
    id: 'hot-towel-shave',
    name: 'Hot Towel Shave',
    price: 35,
    durationMinutes: 45,
    category: 'barba',
    popular: true,
    description: 'Experiencia tradicional de afeitado clásico con toalla caliente, espuma caliente y masaje.',
    image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=1000&auto=format&fit=crop',
    includes: [
      'Preparación de piel con aceite pre-shave botánico',
      'Toallas calientes al vapor con esencia aromática',
      'Espuma artesanal batida aplicada con brocha de tejón',
      'Afeitado apurado a navaja y mascarilla fría calmante'
    ]
  },
  {
    id: 'tratamiento-capilar',
    name: 'Tratamiento Capilar VIP',
    price: 28,
    durationMinutes: 40,
    category: 'tratamientos',
    description: 'Exfoliación profunda del cuero cabelludo, nutrición anti-caída y masaje craneal desestresante.',
    image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=1000&auto=format&fit=crop',
    includes: [
      'Exfoliación dérmica para eliminar impurezas',
      'Mascarilla nutritiva con extractos de queratina',
      'Vaporizador ozonizado para apertura de folículos',
      'Masaje craneal y tónico revitalizante estimulante'
    ]
  }
];

export const BARBERS: Barber[] = [
  {
    id: 'mateo-silva',
    name: 'Mateo "Logan" Silva',
    role: 'Master Barber & Fundador',
    experienceYears: 12,
    rating: 4.98,
    reviewsCount: 384,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
    bio: 'Formado en academias de Londres y Milán. Especialista en arquitectura de cortes clásicos, fades quirúrgicos y visagismo.',
    specialties: ['Skin Fade', 'Cortes Clásicos', 'Visagismo Masculino', 'Tijera Avanzada']
  },
  {
    id: 'carlos-mendoza',
    name: 'Carlos Mendoza',
    role: 'Especialista en Barba & Hot Towel',
    experienceYears: 8,
    rating: 4.95,
    reviewsCount: 246,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
    bio: 'Maestro de la navaja tradicional de afeitar y cuidados dérmicos. Convierte cada sesión de afeitado en un ritual de relajación.',
    specialties: ['Hot Towel Shave', 'Perfilado Esculpido', 'Tratamiento de Barba', 'Corte + Barba']
  },
  {
    id: 'alexandre-ruiz',
    name: 'Alexandre Ruiz',
    role: 'Estilista de Tendencias Urbanas',
    experienceYears: 6,
    rating: 4.92,
    reviewsCount: 198,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop',
    bio: 'Pasionario de los estilos contemporáneos: French crop, Taper fade, Mullet moderno y texturizados dinámicos.',
    specialties: ['Textured Crop', 'Low Taper Fade', 'Hair Tattoo / Líneas', 'Corte Moderno']
  },
  {
    id: 'diego-morales',
    name: 'Diego Morales',
    role: 'Barbero Senior & Grooming Specialist',
    experienceYears: 9,
    rating: 4.96,
    reviewsCount: 312,
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=800&auto=format&fit=crop',
    bio: 'Especialista en cortes ejecutivos de bajo mantenimiento y tratamientos de cuero cabelludo anti-stress.',
    specialties: ['Corte Ejecutivo', 'Pompadour', 'Exfoliación Capilar', 'Arreglo Integral']
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Sebastián Valdés',
    rating: 5,
    date: 'Hace 2 días',
    comment: 'La mejor experiencia de barbería de la ciudad sin duda. El ritual de Corte + Barba con toallas calientes es de otro nivel. Mateo es un artista.',
    service: 'Corte + Barba',
    barber: 'Mateo "Logan" Silva',
    verified: true
  },
  {
    id: 'rev-2',
    author: 'Gabriel Fontana',
    rating: 5,
    date: 'Hace 5 días',
    comment: 'Puntualidad británica, ambiente premium con buen jazz de fondo y un café expresso de cortesía impecable. Mi Skin Fade quedó perfecto.',
    service: 'Skin Fade',
    barber: 'Alexandre Ruiz',
    verified: true
  },
  {
    id: 'rev-3',
    author: 'Dr. Roberto Navarro',
    rating: 5,
    date: 'Hace 1 semana',
    comment: 'Llevo 2 años atendiéndome con Carlos para el afeitado con toalla caliente. Jamás tuve irritación alguna. La atención al detalle es excepcional.',
    service: 'Hot Towel Shave',
    barber: 'Carlos Mendoza',
    verified: true
  },
  {
    id: 'rev-4',
    author: 'Martín Echeverría',
    rating: 5,
    date: 'Hace 2 semanas',
    comment: 'El sistema de reserva web funciona de maravilla y no tienes que esperar ni un minuto al llegar. La estética del local y los barberos son top.',
    service: 'Corte Clásico',
    barber: 'Diego Morales',
    verified: true
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Mid Skin Fade & Crop Texturizado',
    category: 'fades',
    image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=1000&auto=format&fit=crop',
    tag: 'Fades',
    barber: 'Mateo "Logan" Silva'
  },
  {
    id: 'gal-2',
    title: 'Corte Clásico Ejecutivo & Peinado Pomade',
    category: 'clasicos',
    image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=1000&auto=format&fit=crop',
    tag: 'Clásico',
    barber: 'Diego Morales'
  },
  {
    id: 'gal-3',
    title: 'Barba Esculpida con Navaja Tradicional',
    category: 'barba',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1000&auto=format&fit=crop',
    tag: 'Barba',
    barber: 'Carlos Mendoza'
  },
  {
    id: 'gal-4',
    title: 'Delineado y Afeitado con Navaja Japonesa',
    category: 'barba',
    image: 'https://images.unsplash.com/photo-1517832606299-7ae9b720a186?q=80&w=1000&auto=format&fit=crop',
    tag: 'Precisión',
    barber: 'Carlos Mendoza'
  },
  {
    id: 'gal-5',
    title: 'Experiencia Hot Towel & Sillones Vintage',
    category: 'ambiente',
    image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=1000&auto=format&fit=crop',
    tag: 'Salón VIP',
    barber: 'Logan Team'
  },
  {
    id: 'gal-6',
    title: 'Low Taper Fade & Textura Moderna',
    category: 'fades',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1000&auto=format&fit=crop',
    tag: 'Urbano',
    barber: 'Alexandre Ruiz'
  }
];

export const TIME_SLOTS = [
  '10:00 AM',
  '10:45 AM',
  '11:30 AM',
  '12:15 PM',
  '01:00 PM',
  '02:30 PM',
  '03:15 PM',
  '04:00 PM',
  '04:45 PM',
  '05:30 PM',
  '06:15 PM',
  '07:00 PM'
];
