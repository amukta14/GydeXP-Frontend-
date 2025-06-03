import { useEffect, useState } from 'react';
import useExperienceStore from '../store/useExperienceStore';
import HotelMap3D from '../components/HotelMap3D';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaInstagram, FaTwitter, FaLinkedin, FaMoon, FaSun, FaUserCircle, FaGoogle, FaFacebook, FaHeart, FaRegHeart, FaQuestionCircle, FaChevronDown } from 'react-icons/fa';
import { useTheme } from '../store/ThemeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import Link from 'next/link';

interface Experience {
  id: number;
  title?: string;
  name?: string;
  description?: string;
  distance?: string;
  rating?: number;
  image?: string;
}

// Update the glass effect styles with better contrast and gradients
const glassEffect = "bg-gradient-to-br from-white/90 to-white/70 dark:from-gray-800/90 dark:to-gray-700/70 backdrop-blur-lg border border-white/20 dark:border-gray-700/20 shadow-lg hover:shadow-xl transition-all duration-300";
const neumorphicEffect = "bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-700 dark:to-gray-800 shadow-[inset_-12px_-12px_24px_rgba(255,255,255,0.6),inset_12px_12px_24px_rgba(0,0,0,0.15)] dark:shadow-[inset_-12px_-12px_24px_rgba(255,255,255,0.05),inset_12px_12px_24px_rgba(0,0,0,0.3)] hover:shadow-[inset_-8px_-8px_16px_rgba(255,255,255,0.7),inset_8px_8px_16px_rgba(0,0,0,0.2)] dark:hover:shadow-[inset_-8px_-8px_16px_rgba(255,255,255,0.1),inset_8px_8px_16px_rgba(0,0,0,0.4)] transition-all duration-300";

function Navbar({ onAuth }: { onAuth: () => void }) {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  const themes = [
    { name: 'Light', value: 'light', icon: <FaSun /> },
    { name: 'Dark', value: 'dark', icon: <FaMoon /> },
  ];

  return (
    <nav className={`w-full sticky top-0 z-30 ${glassEffect} py-4 px-6 flex items-center justify-between mb-8`}>
      <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 hover:opacity-80 transition-opacity">
        <Image src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=40&q=80" width={40} height={40} alt="Logo" className="rounded-full" />
        Hotel Explorer
      </Link>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className={`flex items-center gap-2 px-3 py-1 rounded-lg ${neumorphicEffect} text-gray-700 dark:text-gray-200`}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <FaMoon /> : <FaSun />}
          </Button>
        </div>
        <Button variant="ghost" size="icon" onClick={onAuth} className={neumorphicEffect}>
          <FaUserCircle className="text-2xl text-gray-700 dark:text-gray-200" />
        </Button>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="w-full bg-white/90 dark:bg-gray-900/90 shadow-inner py-6 px-6 mt-16 text-center text-gray-600 dark:text-gray-300 text-sm flex flex-col items-center gap-2 backdrop-blur-lg">
      <div className="flex gap-4 justify-center mb-2">
        <a href="#" className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-xl"><FaInstagram /></a>
        <a href="#" className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-xl"><FaTwitter /></a>
        <a href="#" className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-xl"><FaLinkedin /></a>
      </div>
      &copy; {new Date().getFullYear()} Hotel Explorer. All rights reserved.
    </footer>
  );
}

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  return (
    <div className="flex items-center gap-0.5">
      {Array(fullStars).fill(0).map((_, i) => (
        <span key={i} className="text-yellow-400 animate-pulse">★</span>
      ))}
      {halfStar && <span className="text-yellow-400 animate-pulse">☆</span>}
      {Array(emptyStars).fill(0).map((_, i) => (
        <span key={i} className="text-gray-300">★</span>
      ))}
    </div>
  );
}

function ExperienceModal({ exp, onClose }: { exp: Experience | null, onClose: () => void }) {
  if (!exp) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={exp.title || exp.name}>
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} className="glass max-w-md w-full p-6 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-2xl text-gray-400 hover:text-blue-600" aria-label="Close modal">×</button>
        <div className="w-full h-48 relative mb-4">
          <Image src={exp.image || 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80'} alt={exp.title || exp.name || ''} fill className="object-cover rounded-lg" />
        </div>
        <h3 className="text-2xl font-bold mb-2 text-blue-900 dark:text-blue-200">{exp.title || exp.name}</h3>
        <p className="text-gray-900 dark:text-gray-200 mb-2">{exp.description || ''}</p>
        {exp.distance && <p className="text-gray-900 dark:text-gray-200 text-sm">Distance: {exp.distance}</p>}
        {exp.rating && <StarRating rating={exp.rating} />}
        <button className="mt-4 w-full py-2 rounded-lg bg-blue-700 text-white font-semibold hover:bg-blue-800 transition" aria-label="Book now">Book Now</button>
      </motion.div>
    </div>
  );
}

function AuthModal({ open, onClose }: { open: boolean, onClose: () => void }) {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 25 }} className="glass max-w-sm w-full p-8 relative">
            <button onClick={onClose} className="absolute top-2 right-2 text-2xl text-gray-400 hover:text-blue-600">×</button>
            <h2 className="text-2xl font-bold mb-4 text-blue-900 dark:text-blue-200 text-center">{isLogin ? 'Sign In' : 'Sign Up'}</h2>
            <form className="flex flex-col gap-4">
              <Input type="email" placeholder="Email" className="rounded-lg px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400" />
              <Input type="password" placeholder="Password" className="rounded-lg px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400" />
              {!isLogin && <Input type="password" placeholder="Confirm Password" className="rounded-lg px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400" />}
              <motion.button whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.03 }} className="w-full py-2 rounded-lg bg-blue-700 text-white font-semibold hover:bg-blue-800 transition">{isLogin ? 'Sign In' : 'Sign Up'}</motion.button>
            </form>
            <div className="flex items-center my-4">
              <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700" />
              <span className="mx-2 text-gray-400">or</span>
              <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700" />
            </div>
            <div className="flex flex-col gap-2">
              <motion.button whileTap={{ scale: 0.97 }} whileHover={{ scale: 1.03 }} className="flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                <FaGoogle className="text-red-500" /> Continue with Google
              </motion.button>
              <motion.button whileTap={{ scale: 0.97 }} whileHover={{ scale: 1.03 }} className="flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                <FaFacebook className="text-blue-600" /> Continue with Facebook
              </motion.button>
              <motion.button whileTap={{ scale: 0.97 }} whileHover={{ scale: 1.03 }} className="flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                <FaTwitter className="text-sky-400" /> Continue with Twitter
              </motion.button>
            </div>
            <div className="mt-4 text-center">
              <button onClick={() => setIsLogin((v) => !v)} className="text-blue-600 hover:underline">
                {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function GuidedTourModal({ open, onClose }: { open: boolean, onClose: () => void }) {
  const steps = [
    {
      title: 'Search & Filter',
      desc: 'Use the search bar and filters to quickly find experiences that match your interests.',
    },
    {
      title: 'Favorites',
      desc: 'Click the heart icon on any experience to add it to your favorites. Favorites are saved for you.',
    },
    {
      title: '3D Hotel Map',
      desc: 'Explore the interactive 3D hotel map to visualize locations and experiences.',
    },
    {
      title: 'Dark Mode',
      desc: 'Toggle between light and dark mode for a comfortable viewing experience.',
    },
    {
      title: 'Book & Details',
      desc: 'Click any experience card to view details and book instantly.',
    },
  ];
  const [step, setStep] = useState(0);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Guided Tour">
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} className="glass max-w-md w-full p-6 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-2xl text-gray-400 hover:text-blue-600" aria-label="Close guided tour">×</button>
        <h3 className="text-2xl font-bold mb-2 text-blue-900 dark:text-blue-200">Take a Tour</h3>
        <div className="mb-4">
          <h4 className="text-lg font-semibold mb-1">{steps[step].title}</h4>
          <p className="text-gray-900 dark:text-gray-200">{steps[step].desc}</p>
        </div>
        <div className="flex justify-between items-center mt-4">
          <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0} className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold disabled:opacity-50">Back</button>
          <span className="text-sm text-gray-500">Step {step + 1} of {steps.length}</span>
          {step < steps.length - 1 ? (
            <button onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))} className="px-3 py-1 rounded bg-blue-700 text-white font-semibold hover:bg-blue-800">Next</button>
          ) : (
            <button onClick={onClose} className="px-3 py-1 rounded bg-green-600 text-white font-semibold hover:bg-green-700">Finish</button>
          )}
        </div>
      </motion.div>
    </div>
  );
}

function ExperienceCard({ exp, onFavorite, isFavorite, onClick }: { 
  exp: Experience; 
  onFavorite: () => void; 
  isFavorite: boolean;
  onClick: () => void;
}) {
  return (
    <motion.div
      className={`${glassEffect} rounded-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-200 p-4 flex flex-col items-center cursor-pointer group focus:outline-none focus:ring-2 focus:ring-blue-400 hover:bg-gradient-to-br hover:from-white/95 hover:to-white/85 dark:hover:from-gray-800/95 dark:hover:to-gray-700/85`}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, type: 'spring', stiffness: 200 }}
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${exp.title || exp.name}`}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onClick(); }}
    >
      <div className="w-full h-56 relative mb-4 group overflow-hidden rounded-lg">
        <Image 
          src={exp.image || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80'} 
          alt={exp.title || exp.name || ''} 
          fill 
          className="object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <button
          className={`absolute top-2 right-2 text-2xl text-pink-500 ${glassEffect} rounded-full p-1.5 z-10 focus:outline-none focus:ring-2 focus:ring-pink-400 transform hover:scale-110 transition-transform duration-200`}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          onClick={e => { e.stopPropagation(); onFavorite(); }}
          tabIndex={0}
        >
          {isFavorite ? <FaHeart className="animate-bounce" /> : <FaRegHeart />}
        </button>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
        {exp.title || exp.name}
      </h3>
      <p className="text-gray-700 dark:text-gray-300 text-sm text-center mb-3 line-clamp-2">
        {exp.description}
      </p>
      {exp.rating && (
        <div className="flex items-center gap-2">
          <StarRating rating={exp.rating} />
          <span className="text-sm text-gray-600 dark:text-gray-400">({exp.rating})</span>
        </div>
      )}
      {exp.distance && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          <span className="inline-flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {exp.distance}
          </span>
        </p>
      )}
    </motion.div>
  );
}

export default function Explore() {
  const [internalExperiences, setInternalExperiences] = useState<Experience[]>([]);
  const [externalExperiences, setExternalExperiences] = useState<Experience[]>([]);
  const { selectedExperience, setSelectedExperience, favorites, addFavorite, removeFavorite, ratingFilter, setRatingFilter } = useExperienceStore();
  const [dark, setDark] = useState(false);
  const [modalExp, setModalExp] = useState<Experience | null>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [tourOpen, setTourOpen] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch('/api/experiences');
      const data = await res.json();
      // Replace the unsplashImages array and assign images by experience type
      const spaImg = 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=400&q=80'; // Spa facial/beauty
      const gymImg = 'https://images.unsplash.com/photo-1554284126-aa88f22d8b74?auto=format&fit=crop&w=400&q=80'; // Gym
      const cafeImg = 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=400&q=80'; // Real cafe
      const bistroImg = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80'; // Ocean Bistro (ocean-view restaurant)

      setInternalExperiences([
        { ...data.internalExperiences[0], image: spaImg, rating: 4.8 },
        { ...data.internalExperiences[1], image: gymImg, rating: 4.6 },
      ]);
      setExternalExperiences([
        { ...data.externalExperiences[0], image: cafeImg },
        { ...data.externalExperiences[1], image: bistroImg },
      ]);
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dark]);

  // Favorite toggle handler
  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      removeFavorite(id);
    } else {
      addFavorite(id);
    }
  };

  // Filtered experiences based on search
  const filteredInternal = internalExperiences.filter(exp => {
    const text = (exp.title || '') + ' ' + (exp.description || '');
    return text.toLowerCase().includes(search.toLowerCase());
  });
  const filteredExternal = externalExperiences.filter(exp => {
    const text = (exp.name || '') + ' ' + (exp.description || '');
    return text.toLowerCase().includes(search.toLowerCase());
  });

  // Theme background classes
  const themeBg = {
    light: 'bg-white',
    dark: 'bg-gray-900',
  }[theme];
  const themeText = {
    light: 'text-gray-900',
    dark: 'text-white',
  }[theme];

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 relative overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
      <Navbar onAuth={() => setAuthOpen(true)} />
      <main className="flex-1 py-8 px-4 md:px-8 relative z-10">
        <motion.h1 
          className="text-4xl font-extrabold text-center mb-10 text-gray-900 dark:text-white tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Explore
        </motion.h1>
        <motion.div 
          className="max-w-2xl mx-auto mb-8 flex items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search experiences..."
            className={`w-full rounded-lg px-4 py-2 ${neumorphicEffect} border-0 focus:ring-2 focus:ring-blue-400 text-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
            aria-label="Search experiences"
          />
        </motion.div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Internal Experiences */}
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Internal Experiences</h2>
            <div className="grid grid-cols-1 gap-6">
              {loading ? (
                Array(2).fill(0).map((_, idx) => (
                  <div key={idx} className={`${glassEffect} rounded-xl p-4 flex flex-col items-center animate-pulse`} aria-busy="true" aria-label="Loading experience card" />
                ))
              ) : (
                filteredInternal.map((exp, idx) => (
                  <ExperienceCard
                    key={exp.id}
                    exp={exp}
                    onFavorite={() => toggleFavorite(exp.id)}
                    isFavorite={favorites.includes(exp.id)}
                    onClick={() => setModalExp(exp)}
                  />
                ))
              )}
            </div>
          </motion.section>
          {/* 3D Hotel Map */}
          <motion.section 
            className="flex flex-col items-center justify-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">3D Hotel Map</h2>
            <div className={`w-full ${glassEffect} rounded-xl p-4`}>
              {loading ? (
                <div className="w-full h-[500px] bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
              ) : (
                <HotelMap3D />
              )}
            </div>
          </motion.section>
        </div>
        {/* External Experiences */}
        <motion.section 
          className="max-w-4xl mx-auto mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">External Experiences</h2>
          <div className="mb-6 flex items-center gap-2">
            <label htmlFor="ratingFilter" className="text-gray-700 dark:text-gray-200">Filter by rating:</label>
            <Select value={ratingFilter?.toString() || ''} onValueChange={value => setRatingFilter(value ? Number(value) : null)}>
              <SelectTrigger className={`w-[120px] ${neumorphicEffect} border-0 text-gray-900 dark:text-white`}>
                <SelectValue placeholder="Filter by rating" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <SelectItem value="4" className="text-gray-900 dark:text-white">4+</SelectItem>
                <SelectItem value="4.5" className="text-gray-900 dark:text-white">4.5+</SelectItem>
                <SelectItem value="5" className="text-gray-900 dark:text-white">5</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {loading ? (
              Array(2).fill(0).map((_, idx) => (
                <div key={idx} className={`${glassEffect} rounded-xl p-4 animate-pulse`} aria-busy="true" aria-label="Loading experience card" />
              ))
            ) : (
              filteredExternal
                .filter(exp => ratingFilter == null || (exp.rating ?? 0) >= ratingFilter)
                .map((exp, idx) => (
                  <ExperienceCard
                    key={exp.id}
                    exp={exp}
                    onFavorite={() => toggleFavorite(exp.id)}
                    isFavorite={favorites.includes(exp.id)}
                    onClick={() => setModalExp(exp)}
                  />
                ))
            )}
          </div>
        </motion.section>
        {/* Google Maps section */}
        <motion.section 
          className="flex flex-col items-center justify-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Nearby on Map</h3>
          <div className={`w-full max-w-4xl ${glassEffect} rounded-xl p-2 flex justify-center overflow-hidden`}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8191673767!2d103.8571113!3d1.2831!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da19a936c551cd%3A0x7fb4e58ad9cd826e!2sMarina%20Bay%20Sands!5e0!3m2!1sen!2ssg!4v1647881234567!5m2!1sen!2ssg"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg"
            />
          </div>
        </motion.section>
      </main>
      <Footer />
      <ExperienceModal exp={modalExp} onClose={() => setModalExp(null)} />
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
      <GuidedTourModal open={tourOpen} onClose={() => setTourOpen(false)} />
      {/* Take a Tour Floating Button */}
      <motion.button
        className={`fixed bottom-6 right-6 z-40 ${glassEffect} rounded-full p-4 shadow-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center gap-2 text-lg text-gray-900 dark:text-white`}
        onClick={() => setTourOpen(true)}
        aria-label="Take a Tour"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 1.2 }}
      >
        <FaQuestionCircle className="text-2xl" />
        <span className="hidden sm:inline">Take a Tour</span>
      </motion.button>
    </div>
  );
} 