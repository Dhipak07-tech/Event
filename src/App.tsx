/**
* @license
* SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import {
  Award,
  Users,
  Globe,
  MessageSquare,
  Mail,
  ChevronRight,
  Play,
  ExternalLink,
  Menu,
  X,
  ArrowRight,
  Star,
  Shield,
  Zap,
  ChevronLeft,
  Trophy,
  Sparkles,
  Heart,
  Target,
  TrendingUp,
  Handshake,
  Package,
  UserCheck,
  Lightbulb,
  MapPin,
  Phone,
  Download
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Constants ---
const API_URL = 'http://localhost:5000/api';

// --- Types ---

interface Video {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
}

interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  videos: Video[];
}

// --- Data ---
const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'cyber',
    name: 'Cyber Security',
    description: 'Ensuring robust protection for your digital assets with advanced threat intelligence and real-time monitoring.',
    icon: <Shield className="w-6 h-6" />,
    videos: [
      { id: 'c2', title: 'Pratham', url: '/Cybersecurity/Pratham.mp4', thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800' }
    ]
  },
  {
    id: 'it',
    name: 'IT Support',
    description: 'Empowering your business with seamless IT operations, rapid troubleshooting, and proactive maintenance.',
    icon: <Zap className="w-6 h-6" />,
    videos: [
      { id: 'i2', title: 'Aadil Sharma', url: '/IT support/AadilSharma.mp4', thumbnail: 'https://images.unsplash.com/photo-1454165833744-9684f027ef83?auto=format&fit=crop&q=80&w=800' }
    ]
  },
  {
    id: 'marketing',
    name: 'Digital Marketing',
    description: 'Driving growth and brand visibility through data-driven strategies, SEO, and engaging social campaigns.',
    icon: <TrendingUp className="w-6 h-6" />,
    videos: [
      { id: 'm2', title: 'Harsh Sharma', url: '/Digitalmarketing/HarshSharma.mp4', thumbnail: 'https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&q=80&w=800' },
      { id: 'm3', title: 'Sangeetha Balan', url: '/Digitalmarketing/SangeethaBalan.mp4', thumbnail: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800' }
    ]
  },
  {
    id: 'web',
    name: 'Web Development',
    description: 'Building high-performance, scalable web applications that deliver exceptional user experiences.',
    icon: <Globe className="w-6 h-6" />,
    videos: [
      { id: 'w_geetha', title: 'Geetha', url: '/Webdevelopment/Geetha.mp4', thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800' },
      { id: 'w_gul', title: 'Gul Muhamed', url: '/Webdevelopment/GulMuhamed.mp4', thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800' },
      { id: 'w_gurpreet', title: 'Gurpreet Khur', url: '/Webdevelopment/Gurpreetkhur.mp4', thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800' },
      { id: 'w_sabari', title: 'Sabari', url: '/Webdevelopment/Sabari.mp4', thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800' },
      { id: 'w_selva', title: 'Selvaganapathy', url: '/Webdevelopment/Selvaganapathy.mp4', thumbnail: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=800' }
    ]
  },
  {
    id: 'cloud',
    name: 'Cloud & Automation',
    description: 'Optimizing infrastructure and workflows through intelligent cloud migration and automated business processes.',
    icon: <Sparkles className="w-6 h-6" />,
    videos: [
      { id: 'l2', title: 'Chetan', url: '/Cloud/chetan.mp4', thumbnail: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800' }
    ]
  }
];

interface AwardImage {
  filename: string;
  person: string;
  category: string;
  url?: string;
}

interface AwardCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  color: string;
}

interface Client {
  id: string;
  name: string;
  logo: string;
  description: string;
}

interface Sector {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

interface Testimonial {
  id: string;
  clientName: string;
  role: string;
  videoThumbnail: string;
  quote: string;
}

// --- Award Data ---

const LOCAL_AWARD_CATEGORIES: AwardCategory[] = [
  {
    id: 'innovative-tech-startup',
    name: 'Most Innovative Tech Startup Award',
    icon: <Trophy className="w-6 h-6 text-[#d4af37]" />,
    description: 'Our founder Arun G was honored with the Most Innovative Tech Startup Award by the Global Achievers Council in recognition of outstanding innovation, leadership, and contribution to the technology sector.',
    color: 'from-[#0f1b3d] to-[#1b2c5b]',
  },
  {
    id: 'employee-of-the-year',
    name: 'Employee Of the Year',
    icon: <Trophy className="w-6 h-6" />,
    description: 'Recognizing the most outstanding team member who exemplifies excellence in every dimension.',
    color: 'from-[#0A192F] via-[#1E3A8A] to-[#0A192F]',
  },
  {
    id: 'pillar-of-excellence',
    name: 'Pillar of Excellence Award',
    icon: <Shield className="w-6 h-6" />,
    description: 'Honoring those who form the backbone of our organization with unwavering dedication.',
    color: 'from-[#1B263B] via-[#415A77] to-[#1B263B]',
  },
  {
    id: 'impact-catalyst',
    name: 'Impact Catalyst Award',
    icon: <Zap className="w-6 h-6" />,
    description: 'Celebrating individuals who spark transformational change and drive meaningful impact.',
    color: 'from-[#0D1B2A] via-[#1B263B] to-[#0D1B2A]',
  },
  {
    id: 'professional-excellence',
    name: 'Professional Excellence Award',
    icon: <Sparkles className="w-6 h-6" />,
    description: 'Recognizing those who bring exceptional skill and professionalism to their craft.',
    color: 'from-[#1A202C] via-[#2D3748] to-[#1A202C]',
  },
  {
    id: 'best-performer',
    name: 'Best Performer Award',
    icon: <Star className="w-6 h-6" />,
    description: 'Awarded to individuals who consistently deliver peak performance and exceed expectations.',
    color: 'from-[#0F172A] via-[#1E293B] to-[#0F172A]',
  },
  {
    id: 'outstanding-contributor',
    name: 'Outstanding Contributor Award',
    icon: <Heart className="w-6 h-6" />,
    description: 'Honoring those whose contributions significantly elevate the team and organization.',
    color: 'from-[#172554] via-[#1E3A8A] to-[#172554]',
  },
  {
    id: 'operational-excellence',
    name: 'Operational Excellence Award',
    icon: <Target className="w-6 h-6" />,
    description: 'Celebrating mastery in processes, efficiency, and operational leadership.',
    color: 'from-[#1E1B4B] via-[#312E81] to-[#1E1B4B]',
  },
  {
    id: 'collaborative-excellence',
    name: 'Collaborative Excellence Award',
    icon: <Handshake className="w-6 h-6" />,
    description: 'Recognizing those who champion teamwork and build bridges across the organization.',
    color: 'from-[#0F172A] via-[#334155] to-[#0F172A]',
  },
  {
    id: 'delivery-excellence',
    name: 'Delivery Excellence Award',
    icon: <Package className="w-6 h-6" />,
    description: 'Honoring those who deliver results with precision, reliability, and quality.',
    color: 'from-[#1E3A8A] via-[#3B82F6] to-[#1E3A8A]',
  },
  {
    id: 'client-excellence',
    name: 'Client Excellence Award',
    icon: <UserCheck className="w-6 h-6" />,
    description: 'Awarded to individuals who go above and beyond to delight our clients.',
    color: 'from-[#0F172A] via-[#1E3A8A] to-[#0F172A]',
  },
  {
    id: 'promising-performer',
    name: 'Promising Performer Award',
    icon: <TrendingUp className="w-6 h-6" />,
    description: 'Celebrating rising stars who demonstrate exceptional potential and growth.',
    color: 'from-[#111827] via-[#1F2937] to-[#111827]',
  },
  {
    id: 'emerging-professional',
    name: 'Emerging Professional Award',
    icon: <Lightbulb className="w-6 h-6" />,
    description: 'Recognizing early-career professionals who show outstanding promise and initiative.',
    color: 'from-[#1e293b] via-[#334155] to-[#1e293b]',
  },
];

// Map filename keywords to category IDs
const LOCAL_AWARD_IMAGES: AwardImage[] = [
  // Innovative Tech Startup Award
  { filename: 'Award_1.jpeg', person: 'Technosprint Info Solutions', category: 'innovative-tech-startup' },
  { filename: 'Award_2.jpeg', person: 'Technosprint Info Solutions', category: 'innovative-tech-startup' },
  { filename: 'Award_3.jpeg', person: 'Technosprint Info Solutions', category: 'innovative-tech-startup' },
  { filename: 'Award_4.jpeg', person: 'Technosprint Info Solutions', category: 'innovative-tech-startup' },
  { filename: 'Award_5.jpeg', person: 'Technosprint Info Solutions', category: 'innovative-tech-startup' },
  { filename: 'Award_6.jpeg', person: 'Technosprint Info Solutions', category: 'innovative-tech-startup' },
  // Employee Of the Year
  { filename: 'EashwaraPrasadh_EmployeeOfTheYear.JPG', person: 'Eashwara Prasadh', category: 'employee-of-the-year' },
  // Pillar of Excellence Award
  { filename: 'YusufFayas_PillarOfExcellenceAward.JPG', person: 'Yusuf Fayas', category: 'pillar-of-excellence' },
  // Impact Catalyst Award
  { filename: 'VysakhiSreekandh_ImpactCatalystAward.JPG', person: 'Vysakhi Sreekandh', category: 'impact-catalyst' },
  // Professional Excellence Award
  { filename: 'Dhipak_ProfessionalExcellenceAward.JPG', person: 'Dhipak', category: 'professional-excellence' },
  { filename: 'Hariharan_ProfessionalExcellenceAward.JPG', person: 'Hariharan', category: 'professional-excellence' },
  // Best Performer Award
  { filename: 'ShriMathi_BestPerformerAward.JPG', person: 'Shri Mathi', category: 'best-performer' },
  // Outstanding Contributor Award
  { filename: 'Ashwika_OutstandingContributorAward.jpg', person: 'Ashwika', category: 'outstanding-contributor' },
  { filename: 'Diya_OutstandingContributorAward.jpg', person: 'Diya', category: 'outstanding-contributor' },
  { filename: 'RakshanaDevi_OutstandingContributorAward.jpg', person: 'Rakshana Devi', category: 'outstanding-contributor' },
  { filename: 'Shivani_OutstandingContributorAward.jpg', person: 'Shivani', category: 'outstanding-contributor' },
  { filename: 'Subiksha_OutstandingContributorAward.jpg', person: 'Subiksha', category: 'outstanding-contributor' },
  // Operational Excellence Award
  { filename: 'Dommeti\u200bPraveenSatyaPrakash_OperationalExcellenceAward.jpg', person: 'Dommeti Praveen Satya Prakash', category: 'operational-excellence' },
  { filename: 'KollatiGowthamVenkataBhaskar_OperationalExcellenceAward\u200b.jpg', person: 'Kollati Gowtham Venkata Bhaskar', category: 'operational-excellence' },
  { filename: 'SriRam_OperationalExcellenceAward.JPG', person: 'Sri Ram', category: 'operational-excellence' },
  // Collaborative Excellence Award
  { filename: 'JaseemaYasmin_CollaborativeExcellenceAward.jpg', person: 'Jaseema Yasmin', category: 'collaborative-excellence' },
  { filename: 'Jayasuriya_CollaborativeExcellenceAward.jpg', person: 'Jayasuriya', category: 'collaborative-excellence' },
  { filename: 'Pravinkumar_CollaborativeExcellenceAward.jpg', person: 'Pravinkumar', category: 'collaborative-excellence' },
  { filename: 'Vishveshwar_CollaborativeExcellenceAward.jpg', person: 'Vishveshwar', category: 'collaborative-excellence' },
  // Delivery Excellence Award
  { filename: 'Maheshwaran_DeliveryExcellenceAward.jpg', person: 'Maheshwaran', category: 'delivery-excellence' },
  { filename: 'PrasannaVenkatesh_DeliveryExcellenceAward.JPG', person: 'Prasanna Venkatesh', category: 'delivery-excellence' },
  { filename: 'Purushoth_DeliveryExcellenceAward.JPG', person: 'Purushoth', category: 'delivery-excellence' },
  // Client Excellence Award
  { filename: 'Kiyshor_ClientExcellenceAward.JPG', person: 'Kiyshor', category: 'client-excellence' },
  { filename: 'Nitesh_ClientExcellenceAward.JPG', person: 'Nitesh', category: 'client-excellence' },
  { filename: 'Yuvaraj_ClientExcellenceAward.JPG', person: 'Yuvaraj', category: 'client-excellence' },
  // Promising Performer Award
  { filename: 'Haritha_PromisingPerformerAward.JPG', person: 'Haritha', category: 'promising-performer' },
  { filename: 'SwedhaSri_PromisingPerformerAward.JPG', person: 'Swedha Sri', category: 'promising-performer' },
  { filename: 'Varshini_PromisingPerformerAward.JPG', person: 'Varshini', category: 'promising-performer' },
  // Emerging Professional Award
  { filename: 'Arjun_EmergingProfessionalAward.JPG', person: 'Arjun', category: 'emerging-professional' },
  { filename: 'ArulJothiarasu_EmergingProfessionalAward.JPG', person: 'Arul Jothiarasu', category: 'emerging-professional' },
  { filename: 'Devasri_EmergingProfessionalAward.JPG', person: 'Devasri', category: 'emerging-professional' },
  { filename: 'HariniSr_EmergingProfessionalAward.JPG', person: 'Harini Sr', category: 'emerging-professional' },
  { filename: 'Madhesh_EmergingProfessionalAward.JPG', person: 'Madhesh', category: 'emerging-professional' },
  { filename: 'Manikandan_EmergingProfessionalAward.JPG', person: 'Manikandan', category: 'emerging-professional' },
  { filename: 'Monikka_EmergingProfessionalAward.JPG', person: 'Monikka', category: 'emerging-professional' },
  { filename: 'Nithish_EmergingProfessionalAward.JPG', person: 'Nithish', category: 'emerging-professional' },
  { filename: 'Shalini_EmergingProfessionalAward.JPG', person: 'Shalini', category: 'emerging-professional' },
];

const CLIENTS: Client[] = [
  { id: 'c1', name: 'Lumina Tech', logo: 'https://picsum.photos/seed/logo1/200/200', description: 'A global leader in sustainable energy solutions and smart grid technology.' },
  { id: 'c2', name: 'Aether Luxury', logo: 'https://picsum.photos/seed/logo2/200/200', description: 'Defining the pinnacle of high-end fashion and lifestyle experiences.' },
  { id: 'c3', name: 'Nova Dynamics', logo: 'https://picsum.photos/seed/logo3/200/200', description: 'Pioneering aerospace engineering and deep-space exploration systems.' },
  { id: 'c4', name: 'Vertex Finance', logo: 'https://picsum.photos/seed/logo4/200/200', description: 'Next-generation digital banking and wealth management for the elite.' },
];

const SECTORS: Sector[] = [
  { id: 's1', name: 'Middle East', description: 'Luxury events and corporate summits across Dubai, Abu Dhabi, and Riyadh.', icon: <Globe className="w-8 h-8" /> },
  { id: 's2', name: 'Europe', description: 'High-end fashion weeks and tech conferences in Paris, London, and Berlin.', icon: <Shield className="w-8 h-8" /> },
  { id: 's3', name: 'North America', description: 'Innovation hubs and entertainment awards in New York, LA, and Toronto.', icon: <Zap className="w-8 h-8" /> },
  { id: 's4', name: 'Asia Pacific', description: 'Emerging market leadership and tech expos in Singapore, Tokyo, and Sydney.', icon: <Star className="w-8 h-8" /> },
];

const PREMIUM_CLIENT_LOGOS = [
  { id: 1, logo: '/Award_Images/Client_1 copy.png', name: 'Premium Clients Group 1' },
  { id: 2, logo: '/Award_Images/Client_2 copy.png', name: 'Premium Clients Group 2' },
  { id: 3, logo: '/Award_Images/Client_3 copy.png', name: 'Premium Clients Group 3' },
  { id: 4, logo: '/Award_Images/Client_4 copy.png', name: 'Premium Clients Group 4' },
];

const CLIENT_PORTFOLIO = [
  { id: 'p1', name: 'Black & Brown Academy', description: 'Delivered a modern academic portfolio platform with integrated appointment booking, enabling seamless interactions and strengthening their digital presence.', initials: 'BB', logo: '/Clients/Black&BrownAccademy.jpeg' },
  { id: 'p2', name: 'Furn World', description: 'Designed and developed a visually rich website showcasing furniture collections, helping customers explore products effortlessly.', initials: 'FW', logo: null },
  { id: 'p3', name: 'Seker Textiles', description: 'Built an advanced clothing platform featuring detailed dress displays and floor-level selection, enhancing customer navigation and in-store experience online.', initials: 'ST', logo: null },
  { id: 'p4', name: 'Guarantee Clinical Lab', description: 'Delivered dependable website support, enabling efficient access to clinic information and services.', initials: 'GC', logo: '/Clients/GuarateeLab.png' },
  { id: 'p5', name: 'Sun Construction', description: 'Provided reliable website support to ensure consistent performance and a strong online presence.', initials: 'SC', logo: null },
  { id: 'p6', name: 'Eton Kids', description: 'Managed admission information and delivered ongoing website support, simplifying communication with parents and improving accessibility.', initials: 'EK', logo: '/Clients/EtonKids.jpeg' },
  { id: 'p7', name: 'Dlite', description: 'Developed a product showcase website with continuous support, enabling effective product presentation and smooth operations.', initials: 'DL', logo: '/Clients/Dlite.jpeg' },
  { id: 'p8', name: 'GL Hospital', description: 'Designed and launched a comprehensive multi-specialty hospital website, improving patient access to services and information with ongoing technical support.', initials: 'GL', logo: '/Clients/GLHospital.jpeg' },
  { id: 'p9', name: 'Tony & Guy', description: 'Delivered website support and implemented appointment booking solutions to streamline customer scheduling.', initials: 'TG', logo: '/Clients/Toni&Guy.png' },
  { id: 'p10', name: 'Idly Junction', description: 'Provided website support to maintain a stable digital presence and improve customer reach.', initials: 'IJ', logo: '/Clients/IdlyJunction.jpeg' },
  { id: 'p11', name: 'Black Fitness Studio', description: 'Ensured seamless website performance and support to enhance member engagement and service updates.', initials: 'BF', logo: null }
];

// --- Lightbox Component ---

interface LightboxProps {
  images: AwardImage[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  categoryName: string;
}

const Lightbox: React.FC<LightboxProps> = ({ images, currentIndex, onClose, onPrev, onNext, categoryName }) => {
  const current = images[currentIndex];

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, onPrev, onNext]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-[#0a1432]/95 backdrop-blur-md flex items-center justify-center px-4 py-8"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-[1.5rem] sm:rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.4)] w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] flex flex-col overflow-hidden border border-white/20"
        >
          {/* Modal Header */}
          <div className={cn(
            "relative p-6 sm:p-10 flex flex-col md:flex-row items-center md:items-end justify-between gap-6 sm:gap-8 overflow-hidden",
            "bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#0f172a]"
          )}>
            {/* Background Glows */}
            <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-blue-400/20 rounded-full blur-[80px]" />
            <div className="absolute bottom-[-20%] left-[-10%] w-48 h-48 bg-cyan-400/10 rounded-full blur-[60px]" />

            <div className="flex flex-col md:flex-row items-center md:items-center gap-4 sm:gap-6 relative z-10 max-w-full md:max-w-[75%]">
              <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-[1.25rem] sm:rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white shadow-[0_0_30px_rgba(255,255,255,0.15)] group">
                <div className="absolute inset-0 bg-white/5 rounded-[1.25rem] sm:rounded-3xl group-hover:bg-white/10 transition-colors" />
                <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
              </div>
              <div className="text-center md:text-left flex flex-col justify-center">
                <p className="text-blue-200/50 text-[10px] md:text-xs font-bold tracking-[0.3em] sm:tracking-[0.4em] uppercase mb-1 sm:mb-2">Award Image Viewer</p>
                <h2 className="text-white font-black text-xl sm:text-2xl md:text-[28px] tracking-[0.5px] leading-[1.2] font-outfit uppercase break-words whitespace-normal px-4 md:px-0">
                  {categoryName.split(' ').map((word, i) => i === categoryName.split(' ').length - 1 ? <span key={i} className="text-[#8bb6ff] drop-shadow-md">{word}</span> : word + ' ')}
                </h2>
              </div>
            </div>

            <button
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-8 sm:right-8 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-lg border border-white/10 flex items-center justify-center text-white transition-all duration-300 hover:rotate-90 z-20 group"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110" />
            </button>
          </div>

          {/* Image Viewer Section */}
          <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-10 bg-gradient-to-b from-slate-50 to-slate-100 relative">
            {/* Navigation Arrows */}
            <button
              onClick={(e) => { e.stopPropagation(); onPrev(); }}
              className="absolute left-4 sm:left-10 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-all"
              style={{ color: '#ffffff' }}
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onNext(); }}
              className="absolute right-4 sm:right-10 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-all"
              style={{ color: '#ffffff' }}
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Image Container */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex flex-col items-center justify-center"
              style={{ transition: 'transform 0.3s ease, opacity 0.3s ease' }}
            >
              <img
                src={`/Award_Images/${current.filename}`}
                alt={current.person}
                className="w-[90%] sm:w-[70%] max-h-[70vh] object-contain rounded-xl shadow-2xl mx-auto block"
              />

              {/* Image Title */}
              <h3
                className="font-semibold text-center mt-3"
                style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: 'white',
                  marginTop: '12px'
                }}
              >
                {current.person}
              </h3>

              {/* Image Counter */}
              <div
                className="text-center"
                style={{
                  fontSize: '14px',
                  color: '#c6d4ff',
                  marginTop: '6px'
                }}
              >
                {currentIndex + 1} / {images.length}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// --- Logo Lightbox Component ---

interface LogoLightboxProps {
  logo: string;
  name: string;
  onClose: () => void;
}

const LogoLightbox: React.FC<LogoLightboxProps> = ({ logo, name, onClose }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-6"
      style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}
      onClick={onClose}
    >
      <motion.button
        className="absolute top-6 right-6 sm:top-8 sm:right-8 text-white/50 hover:text-white transition-colors z-[210]"
        onClick={(e) => { e.stopPropagation(); onClose(); }}
      >
        <X className="w-6 h-6 sm:w-8 sm:h-8" />
      </motion.button>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative max-w-[90%] max-h-[85vh] w-full flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={logo}
          alt={name}
          style={{
            maxWidth: '100%',
            maxHeight: '85vh',
            borderRadius: '12px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.6)'
          }}
          className="object-contain"
        />
      </motion.div>
    </motion.div>
  );
};

// --- Gallery Modal Component ---

interface GalleryModalProps {
  category: AwardCategory;
  images: AwardImage[];
  onClose: () => void;
  onDownload: (url: string) => void;
}

const GalleryModal: React.FC<GalleryModalProps> = ({ category, images, onClose, onDownload }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (idx: number) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! - 1 + images.length) % images.length);
  }, [lightboxIndex, images.length]);
  const nextImage = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! + 1) % images.length);
  }, [lightboxIndex, images.length]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxIndex !== null) closeLightbox();
        else onClose();
      }
      if (e.key === 'ArrowLeft' && lightboxIndex !== null) prevImage();
      if (e.key === 'ArrowRight' && lightboxIndex !== null) nextImage();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, lightboxIndex, closeLightbox, prevImage, nextImage]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-[#0a1432]/95 backdrop-blur-md flex items-center justify-center px-4 py-8"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-[1.5rem] sm:rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.4)] w-full max-w-6xl max-h-[95vh] sm:max-h-[90vh] flex flex-col overflow-hidden border border-white/20"
        >
          {/* Modal Header */}
          <div className={cn(
            "relative p-6 sm:p-10 flex flex-col md:flex-row items-center md:items-end justify-between gap-6 sm:gap-8 overflow-hidden",
            "bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#0f172a]"
          )}>
            {/* Background Glows */}
            <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-blue-400/20 rounded-full blur-[80px]" />
            <div className="absolute bottom-[-20%] left-[-10%] w-48 h-48 bg-cyan-400/10 rounded-full blur-[60px]" />

            <div className="flex flex-col md:flex-row items-center md:items-center gap-4 sm:gap-6 relative z-10 max-w-full md:max-w-[75%]">
              <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-[1.25rem] sm:rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white shadow-[0_0_30px_rgba(255,255,255,0.15)] group">
                <div className="absolute inset-0 bg-white/5 rounded-[1.25rem] sm:rounded-3xl group-hover:bg-white/10 transition-colors" />
                {React.cloneElement(category.icon as React.ReactElement, { className: "w-8 h-8 sm:w-10 sm:h-10 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" })}
              </div>
              <div className="text-center md:text-left flex flex-col justify-center">
                <p className="text-blue-200/50 text-[10px] md:text-xs font-bold tracking-[0.3em] sm:tracking-[0.4em] uppercase mb-1 sm:mb-2">Award Category Exhibition</p>
                <h2 className="text-white font-black text-xl sm:text-2xl md:text-[28px] tracking-[0.5px] leading-[1.2] font-outfit uppercase break-words whitespace-normal px-4 md:px-0">
                  {category.name.split(' ').map((word, i) => i === category.name.split(' ').length - 1 ? <span key={i} className="text-[#8bb6ff] drop-shadow-md">{word}</span> : word + ' ')}
                </h2>
              </div>
            </div>

            <button
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-8 sm:right-8 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-lg border border-white/10 flex items-center justify-center text-white transition-all duration-300 hover:rotate-90 z-20 group"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110" />
            </button>
          </div>

          {/* Description & Metrics Overlay — hidden while viewing an image */}
          {lightboxIndex === null && (
            <div className="px-6 py-6 sm:px-10 sm:py-8 bg-slate-50/50 border-b border-slate-200/60 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="max-w-2xl border-l-[3px] sm:border-l-[4px] border-[#4f7cff] pl-4 sm:pl-6 py-1">
                <p className="text-slate-600 font-light leading-relaxed text-sm md:text-base font-inter">
                  {category.description}
                </p>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <div className="px-4 py-2 bg-[#4f7cff]/10 border border-[#4f7cff]/20 rounded-full flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-[#4f7cff]" />
                  <span className="text-[10px] font-bold text-[#4f7cff] uppercase tracking-wider">
                    {images.length} Recognized Professional{images.length !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Image Grid OR Inline Viewer */}
          <div className={cn(
            "flex-1 overflow-y-auto custom-scrollbar scroll-smooth",
            lightboxIndex !== null
              ? "bg-gradient-to-b from-[#0a1228] to-[#0f172a] flex flex-col items-center justify-center p-4 sm:p-6"
              : "p-6 sm:p-10"
          )}>
            {lightboxIndex !== null ? (
              /* ── Inline Image Viewer ── */
              <div className="relative w-full flex flex-col items-center justify-center min-h-[400px]">

                {/* Back to Gallery */}
                <button
                  onClick={closeLightbox}
                  className="absolute top-0 left-0 flex items-center gap-1.5 text-white/50 hover:text-white text-xs font-semibold tracking-wide transition-colors duration-200"
                >
                  <ChevronLeft className="w-4 h-4" /> Back to Gallery
                </button>

                {/* Left Arrow */}
                <button
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
                  style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#ffffff' }}
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Right Arrow */}
                <button
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
                  style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#ffffff' }}
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Image + Title + Counter */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={lightboxIndex}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="flex flex-col items-center justify-center pt-8 w-full"
                  >
                    <img
                      src={images[lightboxIndex].url || `/Award_Images/${images[lightboxIndex].filename}`}
                      alt={images[lightboxIndex].person}
                      className="w-[90%] sm:w-[80%] md:w-[70%] max-h-[50vh] sm:max-h-[60vh] object-contain rounded-xl shadow-2xl mx-auto block"
                    />
                    <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'white', marginTop: '16px', textAlign: 'center' }}>
                      {images[lightboxIndex].person}
                    </h3>
                    <div style={{ fontSize: '14px', color: '#c6d4ff', marginTop: '6px', textAlign: 'center' }}>
                      {lightboxIndex + 1} / {images.length}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            ) : (
              /* ── Image Grid ── */
              images.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-slate-300">
                  <Trophy className="w-20 h-20 mb-6 opacity-10 animate-pulse" />
                  <p className="font-light tracking-widest uppercase text-xs">No entries curated in this category yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                  {images.map((img, idx) => (
                    <motion.div
                      key={img.filename}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1, duration: 0.5 }}
                      className="group relative flex flex-col"
                    >
                      {/* Premium Award Card */}
                      <div
                        className="relative aspect-[3/4] overflow-hidden rounded-[2rem] bg-slate-100 shadow-[0_15px_40px_rgba(0,0,0,0.1)] transition-all duration-500 group-hover:shadow-[0_25px_60px_rgba(0,0,0,0.2)] group-hover:-translate-y-3 group-hover:scale-[1.02] cursor-pointer"
                        onClick={() => openLightbox(idx)}
                      >
                        <img
                          src={img.url || `/Award_Images/${img.filename}`}
                          alt={img.person}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        {/* Glass Overlay Top (Actions) */}
                        <div
                          className="absolute top-4 left-4 right-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-[-10px] group-hover:translate-y-0"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="px-3 py-1.5 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-[8px] font-extrabold text-white uppercase tracking-widest flex items-center gap-1.5 shadow-lg">
                            <Zap className="w-2.5 h-2.5 text-amber-400 fill-amber-400" /> Professional
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                openLightbox(idx);
                              }}
                              className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white hover:bg-white hover:text-blue-900 transition-all duration-300 shadow-xl"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onDownload(img.url || `${window.location.origin}/Award_Images/${img.filename}`);
                              }}
                              className="w-9 h-9 rounded-xl bg-blue-600/60 backdrop-blur-md border border-white/40 flex items-center justify-center text-white hover:bg-blue-600 transition-all duration-300 shadow-xl"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Info Gradient Bottom */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-80" />
                        <div className="absolute bottom-0 left-0 right-0 p-8 pt-20">
                          <motion.div className="transform transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                            <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-2 drop-shadow-sm">{category.name}</p>
                            <h4 className="text-white font-black text-xl md:text-2xl tracking-tight leading-tight [text-shadow:0_2px_10px_rgba(0,0,0,0.5)]">{img.person}</h4>
                            <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-cyan-400 mt-4 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )
            )}
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Awards', href: '#awards' },
    { name: 'Sectors', href: '#clients-partners' },
    { name: 'Our Premium Clients', href: '#feedback' },
    { name: 'Clients feedback', href: '#client-feedback' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 py-4",
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-lg py-3" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center"
        >
          <a href="#home">
            <img
              src="/Award_Images/Logo.png"
              alt="Technosprint Info Solutions"
              className="h-10 sm:h-14 md:h-18 lg:h-20 w-auto object-contain select-none transition-all"
              draggable={false}
            />
          </a>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, idx) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={cn(
                "text-sm font-medium tracking-wide hover:text-blue-600 transition-colors uppercase",
                isScrolled ? "text-slate-600" : "text-blue-900"
              )}
            >
              {link.name}
            </motion.a>
          ))}
          <a href="#contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-900 text-white px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase shadow-lg shadow-blue-900/20"
            >
              Inquiry
            </motion.button>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-blue-900"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-t border-slate-100 shadow-xl overflow-hidden"
          >
            <div className="flex flex-col p-8 gap-6">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={(e) => {
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-xl font-bold text-blue-950 hover:text-blue-600 transition-colors uppercase tracking-widest font-outfit"
                >
                  {link.name}
                </motion.a>
              ))}
              <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="w-full">
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="w-full bg-blue-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-blue-900/20"
                >
                  Inquiry Now
                </motion.button>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white pt-24 pb-16">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[55%] h-[55%] bg-blue-50 rounded-full blur-[130px] opacity-70" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-50 rounded-full blur-[120px] opacity-50" />
        <div className="absolute top-[30%] left-[20%] w-[30%] h-[30%] bg-blue-100 rounded-full blur-[100px] opacity-30" />
      </div>

      <motion.div
        style={{ y: y1, opacity }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center"
      >


        {/* ── COMPANY NAME ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18, ease: 'easeOut' }}
          className="mb-2 w-full max-w-[100vw] px-4 mx-auto overflow-visible"
        >
          <h2
            className="text-[clamp(18px,7vw,64px)] font-black uppercase tracking-[0.05em] sm:tracking-[0.4em] bg-gradient-to-r from-[#0F172A] via-[#1E3A8A] to-[#0F172A] bg-clip-text text-transparent font-outfit drop-shadow-sm whitespace-nowrap text-center leading-[1.2] py-2"
            style={{
              textShadow: '0 0 30px rgba(30,58,138,0.15)',
            }}
          >
            TECHNOSPRINT INFO SOLUTIONS
          </h2>
        </motion.div>

        {/* ── AWARD 2026 ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.28, ease: 'easeOut' }}
          className="mb-4"
        >
          <span
            className="text-xl md:text-3xl font-black uppercase tracking-[0.35em] bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-600 bg-clip-text text-transparent font-outfit drop-shadow-sm"
            style={{ textShadow: '0 0 20px rgba(217,119,6,0.2)' }}
          >
            ACHIEVEMENTS 2026
          </span>
        </motion.div>

        {/* ── BRAND SUBTITLE ── */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.32, ease: 'easeOut' }}
          className="text-[10px] sm:text-xs md:text-sm font-medium sm:font-light tracking-[0.15em] sm:tracking-[0.22em] uppercase text-slate-400 mb-8 sm:mb-10 px-4"
        >
          Award Event Excellence &amp; Corporate Recognition Platform
        </motion.p>

        {/* ── DIVIDER ── */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.44 }}
          className="w-24 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent mb-10"
        />

        {/* ── BADGE / TAGLINE ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.52 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold tracking-[0.2em] uppercase mb-8"
        >
          <Zap className="w-3 h-3" />
          Technology-Driven Recognition Solutions
        </motion.div>

        {/* ── HERO HEADLINE ── */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.62 }}
          className="text-3xl sm:text-4xl md:text-7xl font-bold text-blue-950 tracking-tight leading-[1.05] mb-8 font-outfit"
        >
          Where Technology Meets{' '}
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-blue-600 to-amber-700">
            Prestige &amp; Recognition
          </span>
        </motion.h1>

        {/* ── DESCRIPTION ── */}
        <motion.p
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.72 }}
          className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto mb-12 font-light leading-relaxed"
        >
          At Technosprint Info Solutions, we design and manage intelligent award events
          and recognition programs, leveraging modern technology to honor excellence
          across industries.
        </motion.p>

        {/* ── CTA BUTTONS ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.82 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <a href="#awards">
            <button className="group relative bg-blue-900 text-white px-10 py-5 rounded-full text-sm font-bold tracking-widest uppercase overflow-hidden transition-all hover:shadow-2xl hover:shadow-blue-900/40">
              <span className="relative z-10 flex items-center gap-2">
                Explore Awards <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </a>

          <button className="flex items-center gap-3 text-blue-900 font-bold tracking-widest uppercase text-sm hover:gap-5 transition-all">
            <div className="w-12 h-12 rounded-full border border-blue-200 flex items-center justify-center">
              <Play className="w-4 h-4 fill-blue-900" />
            </div>
            Watch Showreel
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-blue-900 to-transparent" />
        <span className="text-[10px] font-bold tracking-widest uppercase text-blue-900/40">Scroll</span>
      </motion.div>
    </section>
  );
};

const AwardsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<AwardCategory | null>(null);
  const [awards, setAwards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAwards = async () => {
      try {
        const response = await fetch(`${API_URL}/awards`);
        if (!response.ok) throw new Error('Failed to fetch awards');
        const data = await response.json();
        setAwards(data);
      } catch (err) {
        console.error(err);
        setError('Connection to secure backend failed. Using offline mode.');
      } finally {
        setLoading(false);
      }
    };
    fetchAwards();
  }, []);

  const handleSecureDownload = async (imageUrl: string) => {
    const token = localStorage.getItem('clientToken') || 'dummy-token';
    try {
      const response = await fetch(`${API_URL}/download?imageUrl=${encodeURIComponent(imageUrl)}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'award_image.jpg';
        document.body.appendChild(a);
        a.click();
        a.remove();
      } else {
        alert('Download failed. Secure access required.');
      }
    } catch (err) {
      alert('Secure backend is offline. Direct download blocked.');
    }
  };

  const getImagesForCategory = (categoryId: string) => {
    // Merge backend images with local data for seamless experience
    const backendAward = awards.find(a => a.awardCategory === categoryId);
    const localImages = LOCAL_AWARD_IMAGES.filter(img => img.category === categoryId);

    if (backendAward) {
      const backendImages = backendAward.images.map((url: string, i: number) => ({
        filename: `backend-${i}`,
        person: 'Secure Achievement',
        category: categoryId,
        url: url
      }));
      return [...backendImages, ...localImages];
    }
    return localImages;
  };

  return (
    <>
      <section id="awards" className="py-10 md:py-16 lg:py-20 px-4 sm:px-6 bg-[#F8FAFC] relative overflow-hidden">
        {/* Decorative background blur circles */}
        <div className="absolute top-1/4 left-0 w-48 sm:w-64 h-48 sm:h-64 bg-blue-100/40 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-slate-200/40 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-blue-100 text-blue-900 text-[10px] font-bold tracking-[0.25em] uppercase mb-4 sm:mb-6 shadow-sm"
            >
              <Trophy className="w-3 h-3 text-amber-500" />
              Achievements 2026
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F172A] tracking-tight mb-4 sm:mb-6 font-outfit"
            >
              PRESTIGIOUS <span className="font-light italic text-blue-900">PORTFOLIO</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-500 font-light max-w-xl mx-auto leading-relaxed font-inter text-sm sm:text-base px-2"
            >
              Click on an award category to explore the remarkable individuals and milestone achievements honored this year.
            </motion.p>
          </div>

          {/* Award Category Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {loading ? (
              // Loading Skeleton
              Array(8).fill(0).map((_, i) => (
                <div key={i} className="h-64 rounded-2xl bg-white shadow-sm animate-pulse flex flex-col">
                  <div className="h-32 bg-slate-100 rounded-t-2xl" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-slate-100 rounded w-3/4" />
                    <div className="h-4 bg-slate-100 rounded w-1/2" />
                  </div>
                </div>
              ))
            ) : (
              LOCAL_AWARD_CATEGORIES.map((category, idx) => {
                const images = getImagesForCategory(category.id);
                const isSpecial = category.id === 'innovative-tech-startup';

                return (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.05 }}
                    whileHover={{ y: -8 }}
                    onClick={() => setSelectedCategory(category)}
                    className={cn(
                      "group cursor-pointer rounded-2xl overflow-hidden transition-all duration-500 relative flex flex-col h-full",
                      isSpecial
                        ? "bg-gradient-to-br from-[#0f1b3d] to-[#1b2c5b] border border-[#d4af37]/30 shadow-[0_12px_35px_rgba(0,0,0,0.25)]"
                        : "bg-white border border-slate-100/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(15,23,42,0.1)]"
                    )}
                  >
                    {/* Card Image / Icon Area */}
                    <div className={cn(
                      "relative overflow-hidden transition-all duration-500",
                      isSpecial ? "p-4 h-56" : "h-36 bg-gradient-to-br " + category.color
                    )}>
                      {isSpecial ? (
                        <div className="relative h-full w-full rounded-xl overflow-hidden shadow-inner border border-white/10 p-2 bg-white/5 backdrop-blur-sm">
                          <img
                            src={images[0]?.url || `/Award_Images/${images[0]?.filename}`}
                            alt={category.name}
                            className="w-full h-full object-cover rounded-lg shadow-md transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0f1b3d]/40 to-transparent" />
                          <div className="absolute top-4 right-4 bg-[#d4af37] p-2 rounded-lg shadow-lg shadow-[#d4af37]/20 border border-white/20">
                            <Trophy className="w-5 h-5 text-white" />
                          </div>
                          {/* Glow highlights */}
                          <div className="absolute -top-10 -left-10 w-24 h-24 bg-[#d4af37]/20 rounded-full blur-2xl group-hover:opacity-100 opacity-50 transition-opacity" />
                        </div>
                      ) : (
                        <div className="p-6 h-full flex flex-col justify-end">
                          <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/5 blur-xl" />
                          <div className="absolute top-4 right-4 text-amber-400/30">
                            <Star className="w-8 h-8 fill-current" />
                          </div>
                          <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white relative z-10 mb-2 group-hover:scale-110 group-hover:bg-white/20 group-hover:text-amber-400 transition-all duration-500">
                            {category.icon}
                          </div>
                          <div className="relative z-10">
                            <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-white/50">
                              {images.length} Professional{images.length !== 1 ? 's' : ''}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Card Body */}
                    <div className={cn(
                      "p-6 flex flex-col flex-grow",
                      isSpecial ? "bg-transparent text-white" : "bg-white/80 backdrop-blur-sm"
                    )}>
                      <h3 className={cn(
                        "font-bold text-lg leading-snug mb-3 transition-colors font-outfit",
                        isSpecial ? "text-white group-hover:text-[#d4af37]" : "text-[#0F172A] group-hover:text-blue-900"
                      )}>
                        {category.name}
                      </h3>
                      <p className={cn(
                        "text-xs font-light leading-relaxed line-clamp-3 mb-6 opacity-80 group-hover:opacity-100 transition-opacity font-inter",
                        isSpecial ? "text-blue-100" : "text-slate-500"
                      )}>
                        {category.description}
                      </p>

                      <div className="mt-auto flex items-center justify-between">
                        {!isSpecial && images.length > 0 && (
                          <div className="flex -space-x-2">
                            {images.slice(0, 3).map((img, i) => (
                              <div
                                key={img.filename}
                                className="w-7 h-7 rounded-full border-2 border-white overflow-hidden bg-slate-100 shadow-sm relative"
                                style={{ zIndex: 10 - i }}
                              >
                                <img
                                  src={img.url || `/Award_Images/${img.filename}`}
                                  alt={img.person}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ))}
                            {images.length > 3 && (
                              <div className="w-7 h-7 rounded-full border-2 border-white bg-[#1E3A8A] flex items-center justify-center text-white text-[8px] font-bold shadow-sm relative z-0">
                                +{images.length - 3}
                              </div>
                            )}
                          </div>
                        )}

                        <button className={cn(
                          "flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase transition-all group-hover:gap-2",
                          isSpecial ? "text-[#d4af37]" : "text-blue-900 group-hover:text-amber-600"
                        )}>
                          {isSpecial ? 'View Details' : 'View Gallery'} <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>

                    {/* Subtle accent line */}
                    <div className={cn(
                      "absolute bottom-0 left-0 w-full h-0.5 transition-all duration-700",
                      isSpecial ? "bg-gradient-to-r from-transparent via-[#d4af37] to-transparent shadow-[0_0_10px_#d4af37]" : "bg-gradient-to-r from-transparent via-amber-400/0 to-transparent group-hover:via-amber-400/50"
                    )} />
                  </motion.div>
                );
              }))}
          </div>
        </div>
      </section>

      {/* Gallery Modal */}
      <AnimatePresence>
        {selectedCategory && (
          <GalleryModal
            category={selectedCategory}
            images={getImagesForCategory(selectedCategory.id)}
            onClose={() => setSelectedCategory(null)}
            onDownload={handleSecureDownload}
          />
        )}
      </AnimatePresence>
    </>
  );
};

const INDUSTRIES_DATA = [
  {
    id: 's1',
    number: '01',
    name: 'Hospital Sectors',
    icon: <Users className="w-6 h-6" />,
    clients: ['Apollo Hospitals', 'Max Healthcare', 'Fortis Healthcare', 'Medanta'],
    accent: 'bg-teal-500/10',
    color: 'text-teal-600',
  },
  {
    id: 's2',
    number: '02',
    name: 'Public Sector',
    icon: <Globe className="w-6 h-6" />,
    clients: ['Ministry of Finance', 'Department of Energy', 'Public Works', 'Transport Authority'],
    accent: 'bg-blue-600/10',
    color: 'text-blue-600',
  },
  {
    id: 's3',
    number: '03',
    name: 'Entertainment',
    icon: <Play className="w-6 h-6" />,
    clients: ['Warner Bros.', 'Netflix', 'Sony Music', 'Disney'],
    accent: 'bg-purple-500/10',
    color: 'text-purple-600',
  },
  {
    id: 's4',
    number: '04',
    name: 'Construction & Architecture',
    icon: <Shield className="w-6 h-6" />,
    clients: ['L&T Construction', 'DLF Limited', 'Tata Projects', 'AFCONS'],
    accent: 'bg-[#4682B4]/10',
    color: 'text-[#4682B4]',
  },
  {
    id: 's5',
    number: '05',
    name: 'Education & Others',
    icon: <Lightbulb className="w-6 h-6" />,
    clients: ['Cambridge University', 'Pearson', 'Coursera', 'Khan Academy'],
    accent: 'bg-indigo-500/10',
    color: 'text-indigo-600',
  },
];

const PARTNERS_DATA = [
  { id: 'p1', name: 'Microsoft', logo: '/Award_Images/MS_logo.png', description: 'Empowering enterprise solutions and cloud integration.' },
  { id: 'p2', name: 'AWS', logo: '/Award_Images/AWSlogo.jpg', description: 'Driving scalable infrastructure for global award platforms.' },
  { id: 'p3', name: 'GoDaddy', logo: '/Award_Images/Godaddy-logo.png', description: 'Ensuring seamless domain registry and brand protection.' },
  { id: 'p4', name: 'cPanel', logo: '/Award_Images/CPanel_logo.svg.png', description: 'Reliable and secure server management architecture.' },
  { id: 'p5', name: 'Hostinger', logo: '/Award_Images/Hostinger_logo.png', description: 'High-performance and blazing-fast web hosting.' },
];

const ClientsAndPartnershipsSection = () => {
  const [activeSector, setActiveSector] = useState<string | null>(null);
  const [activePartner, setActivePartner] = useState<string | null>(null);

  const handleSectorClick = (id: string) => {
    setActiveSector(activeSector === id ? null : id);
    setActivePartner(null); // Ensure logic rule: only one sector OR partner expands
  };

  const handlePartnerClick = (id: string) => {
    setActivePartner(activePartner === id ? null : id);
    setActiveSector(null);
  };

  return (
    <section id="clients-partners" className="py-10 md:py-16 lg:py-20 px-4 sm:px-6 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* === SECTION 1: INDUSTRIES WE SERVE === */}
        <div className="mb-16 sm:mb-20 md:mb-24">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[10px] font-bold tracking-[0.3em] uppercase text-blue-600 mb-3 sm:mb-4"
            >
              Global Expertise
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-blue-950 tracking-tight mb-6 sm:mb-8 uppercase font-outfit"
            >
              Sectors We <span className="font-light italic text-blue-600">Serve</span>
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              className="w-20 sm:w-24 h-1 bg-blue-900 mx-auto rounded-full opacity-20"
            />
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:flex lg:flex-row gap-4 sm:gap-6 lg:h-[480px] items-stretch">
            {INDUSTRIES_DATA.map((sector, idx) => {
              const isActive = activeSector === sector.id;
              return (
                <motion.div
                  key={sector.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  onClick={() => handleSectorClick(sector.id)}
                  className={cn(
                    "cursor-pointer rounded-[1.5rem] overflow-hidden relative shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-500 flex flex-col justify-end p-5 sm:p-8 border border-white/60 group",
                    isActive
                      ? "lg:flex-[3] bg-gradient-to-br from-[#0f1b3d] to-[#1e3a8a] shadow-blue-900/20"
                      : "lg:flex-[1] bg-gradient-to-br from-white to-[#f4f7fb] hover:bg-white hover:shadow-xl hover:-translate-y-2 min-h-[160px] md:min-h-[200px] lg:min-h-0"
                  )}
                >
                  {/* Accent Highlight Glow */}
                  <div className={cn(
                    "absolute -bottom-20 -right-20 w-48 h-48 rounded-full blur-[80px] transition-opacity duration-700",
                    isActive ? "opacity-30 bg-cyan-400" : "opacity-0 group-hover:opacity-40 " + sector.accent
                  )} />

                  <AnimatePresence mode="wait">
                    {isActive ? (
                      <motion.div
                        key="active"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 p-8 flex flex-col bg-[#0F172A]"
                      >
                        <div className="flex justify-between items-start mb-6">
                          <div className="bg-white/10 backdrop-blur-md border border-white/20 w-12 h-12 rounded-xl flex items-center justify-center text-white">
                            {sector.icon}
                          </div>
                          <div className="text-white/20 font-black text-6xl tracking-tighter leading-none select-none drop-shadow-sm blur-[0.5px]">{sector.number}</div>
                        </div>

                        <h3 className="text-2xl lg:text-3xl font-bold text-white mb-8 pr-12 font-outfit uppercase tracking-wider">{sector.name}</h3>

                        <div className="mt-auto">
                          <p className="text-blue-300 text-[10px] font-bold tracking-[0.3em] uppercase mb-4 opacity-70">Strategic Clients</p>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                            {sector.clients.map((client, idx) => (
                              <motion.li
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 + (idx * 0.05) }}
                                key={client}
                                className="flex items-center gap-3 text-white/90 text-sm font-light font-inter hover:text-white transition-colors"
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                {client}
                              </motion.li>
                            ))}
                          </ul>
                        </div>

                        <div className="absolute top-8 right-8 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors">
                          <X className="w-4 h-4" />
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="collapsed"
                        layout
                        className="flex flex-col items-center justify-center h-full relative p-4 text-center group-hover:scale-105 transition-transform duration-500"
                      >
                        {/* Luxury Watermark Number */}
                        <div className="absolute top-4 left-4 lg:top-0 lg:left-0 text-[#1f2f56] font-black text-4xl lg:text-6xl opacity-[0.15] group-hover:opacity-[0.25] transition-all duration-500 select-none font-outfit blur-[0.5px]">
                          {sector.number}
                        </div>

                        <div className="lg:mb-auto flex items-center justify-center w-full lg:w-auto mt-12 lg:mt-0 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                          <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110", sector.accent, sector.color, "group-hover:bg-white group-hover:shadow-blue-500/20")}>
                            {sector.icon}
                          </div>
                        </div>

                        <div className="flex flex-col items-center justify-center w-full relative">
                          <h3 className={cn(
                            "font-black uppercase tracking-[0.2em] transition-all duration-500 py-4 font-outfit text-center",
                            "lg:[writing-mode:vertical-rl] lg:rotate-180 text-xl lg:text-3xl",
                            "text-[#1f2f56] group-hover:text-blue-600",
                            isActive ? "opacity-0" : "opacity-100"
                          )}>
                            {sector.name}
                          </h3>
                        </div>

                        <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/[0.02] transition-all rounded-3xl" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* === SECTION 2: OUR PARTNERS === */}
        <div>
          <div className="text-center mb-16">
            <h2 className="text-2xl min-[375px]:text-3xl sm:text-4xl md:text-5xl font-bold text-blue-950 tracking-tight mb-4 uppercase font-outfit">
              Our <span className="font-light italic text-blue-600">Partners</span>
            </h2>
            <div className="w-24 h-1 bg-blue-900 mx-auto rounded-full opacity-20" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {PARTNERS_DATA.map((partner) => {
              const isActive = activePartner === partner.id;
              return (
                <div
                  key={partner.id}
                  onClick={() => handlePartnerClick(partner.id)}
                  className={cn(
                    "cursor-pointer group flex flex-col items-center p-8 rounded-[2rem] border transition-all duration-400 bg-white shadow-sm font-inter",
                    isActive
                      ? "border-blue-500 shadow-xl shadow-blue-500/20 scale-105"
                      : "border-slate-100 hover:border-blue-200 hover:shadow-lg hover:-translate-y-2"
                  )}
                >
                  <div className={cn(
                    "w-24 h-24 rounded-[2rem] flex items-center justify-center mb-8 transition-all duration-700 shadow-2xl relative overflow-hidden group-hover:rotate-[10deg]",
                    isActive ? "bg-white ring-[12px] ring-blue-50 scale-110 shadow-blue-500/40" : "bg-white group-hover:bg-gradient-to-br group-hover:from-blue-50 group-hover:to-white ring-4 ring-slate-50 group-hover:ring-blue-100 shadow-blue-900/5"
                  )}>
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className={cn(
                        partner.id === 'p1' ? "w-16 h-16" : "w-12 h-12",
                        "object-contain transition-all duration-500",
                        isActive ? "scale-110" : "group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100"
                      )}
                    />
                  </div>
                  <h4 className="text-lg font-bold text-blue-950 text-center mb-1">{partner.name}</h4>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        layout
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden text-center mt-3"
                      >
                        <p className="text-xs text-slate-500 leading-relaxed font-light">
                          {partner.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {!isActive && (
                    <div className="mt-4 text-[10px] font-bold tracking-widest uppercase text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      View Impact
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

const FeedbackSection = () => {
  const [selectedLogo, setSelectedLogo] = useState<{ logo: string, name: string } | null>(null);
  const [activePortfolioClient, setActivePortfolioClient] = useState(CLIENT_PORTFOLIO[0]);

  return (
    <section id="feedback" className="relative overflow-hidden">
      {/* --- Logo Showcase Section with Deep Gradient --- */}
      <div className="bg-gradient-to-b from-[#0b132b] to-[#1c2541] py-10 md:py-16 lg:py-20 px-4 sm:px-6 relative">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ repeat: Infinity, duration: 10 }}
            className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px]"
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase font-outfit mb-6">
              Some Of Our <span className="text-blue-400">Premium Clients</span>
            </h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full opacity-40 mb-8" />
            <p className="text-slate-400 font-light max-w-2xl mx-auto leading-relaxed">
              We architecturalize luxury recognition stages for industry giants worldwide.
              Our commitment to excellence is reflected in the brands that trust us.
            </p>
          </motion.div>

          {/* Interactive Client Portfolio Details */}
          <div className="mb-20">
            {/* Client Navigation Pills */}
            <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12">
              {CLIENT_PORTFOLIO.map(client => (
                <button
                  key={client.id}
                  onClick={() => setActivePortfolioClient(client)}
                  className={cn(
                    "px-5 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300",
                    activePortfolioClient.id === client.id
                      ? "bg-[#4f7cff] text-white shadow-[0_10px_30px_rgba(79,124,255,0.4)] border-2 border-transparent scale-105"
                      : "bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10 hover:text-white hover:scale-105"
                  )}
                >
                  {client.name}
                </button>
              ))}
            </div>

            {/* Client Details Display */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activePortfolioClient.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className={cn(
                  "max-w-4xl mx-auto rounded-3xl p-8 md:p-12 transition-all",
                  "bg-white/5 backdrop-blur-xl border border-white/10"
                )}
              >
                <div className={cn(
                  "flex items-center gap-10 md:gap-16",
                  activePortfolioClient.logo
                    ? "flex-col md:flex-row"
                    : "flex-col"
                )}>
                  {/* Description */}
                  <div className={cn(
                    "flex flex-col justify-center",
                    activePortfolioClient.logo
                      ? "flex-1 text-center md:text-left order-2 md:order-1"
                      : "w-full text-center"
                  )}>
                    <h3 className="text-2xl md:text-4xl font-black text-white mb-4 font-outfit tracking-tight uppercase">
                      {activePortfolioClient.name}
                    </h3>
                    <div className={cn(
                      "w-12 h-1 bg-blue-500 rounded-full opacity-60 mb-6",
                      activePortfolioClient.logo ? "mx-auto md:mx-0" : "mx-auto"
                    )} />
                    <p className="text-slate-300 leading-relaxed font-light text-sm md:text-base">
                      {activePortfolioClient.description}
                    </p>
                  </div>

                  {/* Right Side: Logo only (no initials fallback) */}
                  {activePortfolioClient.logo && (
                    <div className="order-1 md:order-2 shrink-0">
                      <div className="w-36 h-36 md:w-52 md:h-52 rounded-3xl bg-white flex items-center justify-center border border-white/20 shadow-[0_10px_40px_rgba(79,124,255,0.3)] relative group cursor-pointer overflow-hidden transition-transform duration-500 hover:scale-105">
                        <div className="absolute inset-0 bg-[#4f7cff]/10 rounded-3xl blur-xl group-hover:bg-[#4f7cff]/20 transition-all duration-500" />
                        <img
                          src={activePortfolioClient.logo}
                          alt={`${activePortfolioClient.name} logo`}
                          className="w-full h-full object-contain p-4 relative z-10 drop-shadow-md"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Clean Logo Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
            {PREMIUM_CLIENT_LOGOS.map((client, idx) => (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group cursor-pointer relative flex items-center justify-center"
                onClick={() => setSelectedLogo(client)}
              >
                <div className="relative z-10 p-4 transition-all duration-350 transform group-hover:scale-[1.04] flex items-center justify-center w-full">
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="max-h-48 md:max-h-[300px] w-full object-contain filter drop-shadow-[0_6px_18px_rgba(0,0,0,0.4)] transition-all group-hover:drop-shadow-[0_10px_25px_rgba(79,124,255,0.4)]"
                  />
                </div>
                {/* Glow Highlight */}
                <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/[0.08] rounded-3xl blur-2xl transition-all duration-350 opacity-0 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-blue-400/0 to-transparent group-hover:via-blue-400/40 transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox for Logos */}
      <AnimatePresence>
        {selectedLogo && (
          <LogoLightbox
            logo={selectedLogo.logo}
            name={selectedLogo.name}
            onClose={() => setSelectedLogo(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

const ContactSection = () => {
  return (
    <section id="contact" className="py-10 md:py-16 lg:py-20 px-4 sm:px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-950 tracking-tight mb-5 sm:mb-8 leading-[1.1] text-balance">
              LET'S CREATE <br />
              <span className="text-blue-600">HISTORY</span> TOGETHER
            </h2>
            <p className="text-slate-500 text-base sm:text-lg font-light mb-8 sm:mb-12 max-w-md">
              Ready to elevate your corporate recognition to the next level?
              Our team of luxury event designers is standing by.
            </p>

            <div className="mt-12">
              <h3 className="text-blue-900 text-[10px] font-bold tracking-[0.3em] uppercase mb-8 font-outfit border-l-4 border-blue-600 pl-4">
                FOR MORE QUERIES CONTACT
              </h3>

              <div className="space-y-8">
                {/* Website & Email */}
                <div className="flex gap-6 items-start">
                  <div className="w-14 h-14 shrink-0 rounded-2xl bg-white shadow-lg flex items-center justify-center text-blue-900">
                    <Globe className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-1">Website & Email</p>
                    <p className="text-base font-bold text-blue-950">www.technosprint.net</p>
                    <p className="text-sm text-slate-500 font-light">info@technosprint.net</p>
                  </div>
                </div>

                {/* Global Phone Numbers */}
                <div className="flex gap-6 items-start">
                  <div className="w-14 h-14 shrink-0 rounded-2xl bg-white shadow-lg flex items-center justify-center text-blue-900">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-3">Global Phone Numbers</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                      <div>
                        <p className="text-[10px] font-extrabold text-blue-600 uppercase tracking-wider mb-1">India</p>
                        <p className="text-sm font-bold text-blue-950">+91 90433 10908</p>
                        <p className="text-sm font-bold text-blue-950">+91 91503 43483</p>
                        <p className="text-sm font-bold text-blue-950">+91 91503 43483</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-extrabold text-blue-600 uppercase tracking-wider mb-1">Northern America – Canada</p>
                        <p className="text-sm font-bold text-blue-950">+1 (647) 269-2509</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-extrabold text-blue-600 uppercase tracking-wider mb-1">Europe – Germany</p>
                        <p className="text-sm font-bold text-blue-950">+91 79826 33090</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-extrabold text-blue-600 uppercase tracking-wider mb-1">Central Africa</p>
                        <p className="text-sm font-bold text-blue-950">+237 6 95 47 01 23</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Service Regions */}
                <div className="flex gap-6 items-start">
                  <div className="w-14 h-14 shrink-0 rounded-2xl bg-white shadow-lg flex items-center justify-center text-blue-900">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-1">Service Regions</p>
                    <p className="text-sm text-blue-950 font-bold">India • Northern America • Europe • Central Africa</p>
                  </div>
                </div>
              </div>

              <div className="mt-16 pt-8 border-t border-slate-200/60">
                <p className="text-slate-400 font-bold text-[10px] tracking-[0.4em] uppercase font-outfit">
                  Technosprint Info Solutions
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-10 md:p-16 rounded-[40px] shadow-2xl shadow-blue-900/5 border border-slate-100">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest uppercase text-slate-400">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-slate-900 placeholder:text-slate-300 focus:ring-2 focus:ring-blue-900 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest uppercase text-slate-400">Email Address</label>
                  <input
                    type="email"
                    placeholder="name@company.com"
                    className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-slate-900 placeholder:text-slate-300 focus:ring-2 focus:ring-blue-900 transition-all"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest uppercase text-slate-400">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+91 00000 00000"
                    className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-slate-900 placeholder:text-slate-300 focus:ring-2 focus:ring-blue-900 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest uppercase text-slate-400">Subject</label>
                  <input
                    type="text"
                    placeholder="Event Registration"
                    className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-slate-900 placeholder:text-slate-300 focus:ring-2 focus:ring-blue-900 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-widest uppercase text-slate-400">Message</label>
                <textarea
                  rows={4}
                  placeholder="How can we help you?"
                  className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-slate-900 placeholder:text-slate-300 focus:ring-2 focus:ring-blue-900 transition-all resize-none"
                />
              </div>
              <button className="w-full bg-blue-900 text-white py-6 rounded-2xl font-bold tracking-[0.2em] uppercase shadow-xl shadow-blue-900/20 hover:shadow-blue-900/40 transition-all">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Video Player Modal ---

interface VideoPlayerModalProps {
  video: Video;
  onClose: () => void;
}

const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({ video, onClose }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-10"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all z-[210] group"
      >
        <X className="w-6 h-6 group-hover:scale-110" />
      </button>

      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="w-full max-w-5xl aspect-video rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(79,124,255,0.3)] bg-black relative border border-white/10"
        onClick={e => e.stopPropagation()}
      >
        <video
          src={video.url}
          controls
          autoPlay
          className="w-full h-full object-contain"
          poster={video.thumbnail}
        />
      </motion.div>
    </motion.div>
  );
};

// --- Client Feedback Section ---

const ClientFeedbackSection = () => {
  const [activeCategory, setActiveCategory] = useState(SERVICE_CATEGORIES[0]);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  // Reset activeVideoIndex when category changes
  useEffect(() => {
    setActiveVideoIndex(0);
  }, [activeCategory]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section id="client-feedback" className="py-10 md:py-16 lg:py-20 px-4 sm:px-6 bg-[#020617] relative overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase font-outfit text-balance">
              Client <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4f7cff] to-[#7b61ff]">Feedback</span>
            </h2>
            <div className="w-20 sm:w-24 h-1.5 bg-gradient-to-r from-[#4f7cff] to-[#7b61ff] mx-auto rounded-full mb-6 sm:mb-8 relative">
              <div className="absolute inset-0 bg-blue-400 blur-md opacity-50" />
            </div>
            <p className="text-slate-400 font-light max-w-2xl mx-auto text-base sm:text-lg leading-relaxed px-4">
              Hear directly from our clients about their experience working with Technosprint Info Solutions.
            </p>
          </motion.div>
        </div>

        {/* --- Category Tabs (Cards) --- */}
        <div className="flex flex-nowrap md:grid md:grid-cols-5 gap-4 mb-16 overflow-x-auto pb-4 custom-scrollbar">
          {SERVICE_CATEGORIES.map((category) => {
            const isActive = activeCategory.id === category.id;
            return (
              <motion.button
                key={category.id}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "flex flex-col items-center justify-center p-6 rounded-2xl transition-all duration-300 min-w-[160px] md:min-w-0 border backdrop-blur-md relative overflow-hidden group",
                  isActive
                    ? "bg-white/10 border-blue-500/50 shadow-[0_0_30px_rgba(79,124,255,0.2)]"
                    : "bg-white/5 border-white/10 hover:bg-white/10"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabGlow"
                    className="absolute inset-0 bg-blue-500/10"
                  />
                )}
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300",
                  isActive ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30" : "bg-white/5 text-slate-400 group-hover:text-blue-400"
                )}>
                  {category.icon}
                </div>
                <span className={cn(
                  "text-[10px] font-bold tracking-widest uppercase text-center",
                  isActive ? "text-white" : "text-slate-500 group-hover:text-slate-300"
                )}>
                  {category.name}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="activeTabUnder"
                    className="absolute bottom-0 inset-x-0 h-1 bg-blue-500"
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* --- Active Category Feature Card --- */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center bg-white/5 border border-white/10 p-6 sm:p-8 md:p-12 rounded-[2rem] sm:rounded-[2.5rem] backdrop-blur-xl mb-12 sm:mb-16 group hover:bg-white/[0.07] transition-colors"
          >
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-400 text-[10px] font-black uppercase tracking-widest shadow-inner shadow-blue-500/10">
                <Star className="w-3 h-3 fill-blue-400" /> Premium Service Feedback
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-5xl font-black text-white tracking-tight uppercase font-outfit">
                {activeCategory.name}
              </h3>
              <p className="text-slate-400 font-light text-base sm:text-lg leading-relaxed border-l-2 border-blue-500/30 pl-6 py-1 italic">
                {activeCategory.description}
              </p>
            </div>
            <div className="flex flex-col gap-8">
              <div
                className="relative aspect-video rounded-3xl overflow-hidden group/thumb cursor-pointer shadow-2xl"
                onClick={() => setSelectedVideo(activeCategory.videos[activeVideoIndex])}
                style={{
                  backgroundImage: activeCategory.id === 'it'
                    ? 'url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800)'
                    : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeCategory.videos[activeVideoIndex].id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    src={activeCategory.videos[activeVideoIndex].thumbnail}
                    alt={activeCategory.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/thumb:scale-110"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-blue-950/40 group-hover/thumb:bg-blue-950/60 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-blue-600/90 backdrop-blur-md flex items-center justify-center text-white shadow-[0_0_40px_rgba(79,124,255,0.4)] transform hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 fill-white ml-2" />
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-between opacity-0 translate-y-4 group-hover/thumb:opacity-100 group-hover/thumb:translate-y-0 transition-all duration-300">
                  <span className="text-white text-xs font-bold uppercase tracking-widest">Watch {activeCategory.videos[activeVideoIndex].title} FeedBack</span>
                  <span className="text-blue-400 text-[10px] font-black">{activeVideoIndex % 2 === 0 ? '2:45' : '3:15'} MIN</span>
                </div>
              </div>

              {/* Client Names Pill Navigation */}
              <div className="flex flex-wrap gap-3">
                {activeCategory.videos.map((video, idx) => (
                  <button
                    key={video.id}
                    onClick={() => setActiveVideoIndex(idx)}
                    className={cn(
                      "px-5 py-2.5 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all duration-300",
                      activeVideoIndex === idx
                        ? "bg-[#4f7cff] text-white shadow-lg shadow-blue-500/40"
                        : "bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10 hover:text-slate-200"
                    )}
                  >
                    {video.title}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* --- Video Grid --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {activeCategory.videos.map((video) => (
            <motion.div
              key={video.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group relative flex flex-col bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:bg-white/[0.07] transition-all hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
            >
              <div
                className="relative aspect-video overflow-hidden cursor-pointer"
                onClick={() => setSelectedVideo(video)}
                style={{
                  backgroundImage: activeCategory.id === 'it'
                    ? 'url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800)'
                    : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-blue-900 shadow-xl">
                    <Play className="w-6 h-6 fill-blue-900 ml-1" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">{activeCategory.name}</span>
                </div>
                <h4 className="text-white font-bold text-lg group-hover:text-blue-300 transition-colors mb-2 line-clamp-1">{video.title}</h4>
                <div className="flex items-center gap-4 text-slate-500 text-[10px] font-bold tracking-widest uppercase mt-4">
                  <span className="flex items-center gap-1.5"><Users className="w-3 h-3" /> Professional Review</span>
                  <span className="flex items-center gap-1.5"><Globe className="w-3 h-3" /> Global Impact</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox Video Player */}
      <AnimatePresence>
        {selectedVideo && (
          <VideoPlayerModal
            video={selectedVideo}
            onClose={() => setSelectedVideo(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-blue-950 py-12 sm:py-16 md:py-20 px-4 sm:px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 sm:gap-12 mb-12 md:mb-20">
          <div className="flex items-center">
            <img
              src="/Award_Images/Logo.png"
              alt="Technosprint Info Solutions"
              className="h-10 w-auto object-contain brightness-0 invert select-none"
              draggable={false}
            />
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Global Offices'].map(link => (
              <a key={link} href="#" className="text-xs font-bold tracking-widest uppercase text-blue-200/40 hover:text-white transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/5 gap-6">
          <p className="text-blue-200/20 text-[10px] font-bold tracking-widest uppercase">
            © 2026 TECHNOSPRINT INFO SOLUTIONS. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-6">
            {['LinkedIn', 'Instagram', 'X', 'Vimeo'].map(social => (
              <a key={social} href="#" className="text-blue-200/20 hover:text-white transition-colors text-[10px] font-bold tracking-widest uppercase">
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-900 selection:text-white overflow-x-hidden scroll-smooth">
      <Navbar />
      <main>
        <Hero />
        <AwardsSection />
        <ClientsAndPartnershipsSection />
        <FeedbackSection />
        <ClientFeedbackSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
