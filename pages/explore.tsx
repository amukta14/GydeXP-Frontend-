import { useEffect, useState } from 'react';
import useExperienceStore from '../store/useExperienceStore';
import HotelMap3D from '../components/HotelMap3D';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaInstagram, FaTwitter, FaLinkedin, FaMoon, FaSun, FaUserCircle, FaGoogle, FaFacebook, FaHeart, FaRegHeart, FaQuestionCircle, FaChevronDown } from 'react-icons/fa';
import { useTheme } from '../store/ThemeContext';

interface Experience {
  id: number;
  title?: string;
  name?: string;
  description?: string;
  distance?: string;
  rating?: number;
  image?: string;
}

function Navbar({ onAuth }: { onAuth: () => void }) {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  const themes = [
    { name: 'Light', value: 'light' },
    { name: 'Dark', value: 'dark' },
    { name: 'Blue', value: 'blue' },
    { name: 'Green', value: 'green' },
    { name: 'Purple', value: 'purple' },
  ];

  return (
    <nav className="w-full sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 shadow-md py-4 px-6 flex items-center justify-between mb-8 backdrop-blur-lg">
      <span className="text-xl font-bold text-blue-900 dark:text-blue-200 flex items-center gap-2">
        <Image src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=40&q=80" width={40} height={40} alt="Logo" className="rounded-full" />
        Hotel Explorer
      </span>
      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            className="flex items-center gap-2 px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700 text-blue-700 dark:text-yellow-300 font-semibold hover:scale-105 transition-transform"
            onClick={() => setOpen((v) => !v)}
            aria-haspopup="listbox"
            aria-expanded={open}
          >
            Theme <FaChevronDown className="ml-1" />
          </button>
          {open && (
            <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white dark:bg-gray-800 p-2 z-50">
              {themes.map((t) => (
                <button
                  key={t.value}
                  onClick={() => { setTheme(t.value as any); setOpen(false); }}
                  className={`w-full px-4 py-2 rounded-md transition-colors text-left ${
                    theme === t.value
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {t.name}
                </button>
              ))}
            </div>
          )}
        </div>
        <FaUserCircle onClick={onAuth} className="text-3xl text-blue-700 dark:text-blue-200 cursor-pointer hover:scale-110 transition-transform" />
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="w-full bg-white/80 dark:bg-gray-900/80 shadow-inner py-6 px-6 mt-16 text-center text-gray-500 text-sm flex flex-col items-center gap-2 backdrop-blur-lg">
      <div className="flex gap-4 justify-center mb-2">
        <a href="#" className="text-blue-500 hover:text-blue-700 text-xl"><FaInstagram /></a>
        <a href="#" className="text-blue-500 hover:text-blue-700 text-xl"><FaTwitter /></a>
        <a href="#" className="text-blue-500 hover:text-blue-700 text-xl"><FaLinkedin /></a>
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
              <input type="email" placeholder="Email" className="rounded-lg px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400" />
              <input type="password" placeholder="Password" className="rounded-lg px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400" />
              {!isLogin && <input type="password" placeholder="Confirm Password" className="rounded-lg px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400" />}
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
    blue: 'bg-blue-50',
    green: 'bg-green-50',
    purple: 'bg-purple-50',
  }[theme];
  const themeText = {
    light: 'text-gray-900',
    dark: 'text-white',
    blue: 'text-blue-900',
    green: 'text-green-900',
    purple: 'text-purple-900',
  }[theme];
  const blob1 = {
    light: 'bg-blue-300',
    dark: 'bg-blue-900',
    blue: 'bg-blue-300',
    green: 'bg-green-200',
    purple: 'bg-purple-300',
  }[theme];
  const blob2 = {
    light: 'bg-pink-200',
    dark: 'bg-pink-900',
    blue: 'bg-blue-200',
    green: 'bg-green-300',
    purple: 'bg-purple-200',
  }[theme];

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 relative overflow-hidden ${themeBg} ${themeText}`}>
      {/* Animated background blobs */}
      <motion.div
        className={`absolute -top-32 -left-32 w-96 h-96 ${blob1} rounded-full filter blur-3xl opacity-30 z-0`}
        animate={{ scale: [1, 1.2, 1], x: [0, 40, 0], y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
      />
      <motion.div
        className={`absolute -bottom-32 -right-32 w-96 h-96 ${blob2} rounded-full filter blur-3xl opacity-30 z-0`}
        animate={{ scale: [1, 1.1, 1], x: [0, -40, 0], y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut' }}
      />
      <Navbar onAuth={() => setAuthOpen(true)} />
      <main className="flex-1 py-8 px-2 md:px-8 relative z-10">
        <h1 className="text-4xl font-extrabold text-center mb-10 text-blue-900 dark:text-blue-200 tracking-tight">Explore</h1>
        <div className="max-w-2xl mx-auto mb-8 flex items-center gap-3">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search experiences..."
            className="w-full rounded-lg px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
            aria-label="Search experiences"
          />
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Internal Experiences */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-blue-800 dark:text-blue-300">Internal Experiences</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {loading ? (
                Array(2).fill(0).map((_, idx) => (
                  <div key={idx} className="glass rounded-xl shadow-lg p-4 flex flex-col items-center animate-pulse" aria-busy="true" aria-label="Loading experience card" />
                ))
              ) : (
                filteredInternal.map((exp, idx) => (
                  <motion.div
                    key={exp.id}
                    className="glass rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-1 hover:scale-105 transition-all duration-200 p-4 flex flex-col items-center cursor-pointer group focus:outline-none focus:ring-2 focus:ring-blue-400"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.07, rotateZ: 2 }}
                    whileTap={{ scale: 0.98, rotateZ: -2 }}
                    transition={{ delay: idx * 0.08, duration: 0.5, type: 'spring', stiffness: 120 }}
                    onClick={() => setModalExp(exp)}
                    tabIndex={0}
                    role="button"
                    aria-label={`View details for ${exp.title}`}
                    onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setModalExp(exp); }}
                  >
                    <div className="w-full h-40 relative mb-3 group">
                      <Image src={exp.image || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80'} alt={exp.title || ''} fill className="object-cover rounded-lg group-hover:scale-105 transition-transform duration-200" />
                      <button
                        className="absolute top-2 right-2 text-2xl text-pink-500 bg-white/80 dark:bg-gray-900/80 rounded-full p-1 z-10 focus:outline-none focus:ring-2 focus:ring-pink-400"
                        aria-label={favorites.includes(exp.id) ? 'Remove from favorites' : 'Add to favorites'}
                        onClick={e => { e.stopPropagation(); toggleFavorite(exp.id); }}
                        tabIndex={0}
                      >
                        {favorites.includes(exp.id) ? <FaHeart /> : <FaRegHeart />}
                      </button>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{exp.title}</h3>
                    <p className="text-gray-900 dark:text-gray-200 text-sm text-center mb-2">{exp.description}</p>
                    {exp.rating && <StarRating rating={exp.rating} />}
                  </motion.div>
                ))
              )}
            </div>
          </section>
          {/* 3D Hotel Map */}
          <section className="flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold mb-4 text-blue-800 dark:text-blue-300">3D Hotel Map</h2>
            <div className="w-full max-w-md glass rounded-xl shadow-lg p-4">
              {loading ? (
                <div className="w-full h-[400px] bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
              ) : (
                <HotelMap3D />
              )}
            </div>
          </section>
        </div>
        {/* External Experiences */}
        <section className="max-w-3xl mx-auto mt-12">
          <h2 className="text-2xl font-bold mb-4 text-blue-800 dark:text-blue-300">External Experiences</h2>
          <div className="mb-4 flex items-center gap-2">
            <label htmlFor="ratingFilter" className="text-gray-700 dark:text-gray-200">Filter by rating:</label>
            <select id="ratingFilter" value={ratingFilter ?? ''} onChange={e => setRatingFilter(e.target.value ? Number(e.target.value) : null)} className="rounded px-2 py-1 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
              <option value="">All</option>
              <option value="4">4+</option>
              <option value="4.5">4.5+</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {loading ? (
              Array(2).fill(0).map((_, idx) => (
                <div key={idx} className="glass rounded-xl shadow-lg p-4 animate-pulse" aria-busy="true" aria-label="Loading experience card" />
              ))
            ) : (
              filteredExternal.filter(exp => ratingFilter == null || (exp.rating ?? 0) >= ratingFilter).map((exp, idx) => (
                <motion.div
                  key={exp.id}
                  className="glass rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-1 hover:scale-105 transition-all duration-200 p-4 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-blue-400"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.07, rotateZ: 2 }}
                  whileTap={{ scale: 0.98, rotateZ: -2 }}
                  transition={{ delay: idx * 0.08, duration: 0.5 }}
                  onClick={() => setModalExp(exp)}
                  tabIndex={0}
                  role="button"
                  aria-label={`View details for ${exp.name}`}
                  onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setModalExp(exp); }}
                >
                  <div className="absolute top-2 right-2 z-10">
                    <button
                      className="text-2xl text-pink-500 bg-white/80 dark:bg-gray-900/80 rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-pink-400"
                      aria-label={favorites.includes(exp.id) ? 'Remove from favorites' : 'Add to favorites'}
                      onClick={e => { e.stopPropagation(); toggleFavorite(exp.id); }}
                      tabIndex={0}
                    >
                      {favorites.includes(exp.id) ? <FaHeart /> : <FaRegHeart />}
                    </button>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{exp.name}</h3>
                  <p className="text-gray-900 dark:text-gray-200 text-sm">Distance: {exp.distance}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-gray-600 dark:text-gray-300 text-sm">Rating:</span>
                    <StarRating rating={exp.rating || 0} />
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </section>
        {/* Google Maps static image below 3D map */}
        <section className="flex flex-col items-center justify-center mt-8">
          <h3 className="text-lg font-semibold mb-2 text-blue-800 dark:text-blue-300">Nearby on Map</h3>
          <div className="w-full max-w-md glass rounded-xl shadow-lg p-2 flex justify-center">
            <img src="https://static-maps.yandex.ru/1.x/?lang=en-US&ll=103.8603,1.2831&z=15&l=map&size=400,200&pt=103.8603,1.2831,pm2blm" alt="Nearby Map" className="rounded-lg w-full h-48 object-cover" />
          </div>
        </section>
      </main>
      <Footer />
      <ExperienceModal exp={modalExp} onClose={() => setModalExp(null)} />
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
      <GuidedTourModal open={tourOpen} onClose={() => setTourOpen(false)} />
      {/* Take a Tour Floating Button */}
      <button
        className="fixed bottom-6 right-6 z-40 bg-blue-700 text-white rounded-full p-4 shadow-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center gap-2 text-lg"
        onClick={() => setTourOpen(true)}
        aria-label="Take a Tour"
      >
        <FaQuestionCircle className="text-2xl" />
        <span className="hidden sm:inline">Take a Tour</span>
      </button>
    </div>
  );
} 