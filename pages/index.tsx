import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaMapMarkedAlt, FaHotel, FaUtensils, FaSpa, FaArrowRight, FaStar, FaUsers, FaConciergeBell, FaPlay } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { useTheme } from '../store/ThemeContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const glassEffect = "bg-gradient-to-br from-gray-900/90 to-gray-800/70 backdrop-blur-lg border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300";
const neumorphicEffect = "bg-gradient-to-br from-gray-800 to-gray-900 shadow-[inset_-12px_-12px_24px_rgba(255,255,255,0.05),inset_12px_12px_24px_rgba(0,0,0,0.3)] hover:shadow-[inset_-8px_-8px_16px_rgba(255,255,255,0.1),inset_8px_8px_16px_rgba(0,0,0,0.4)] transition-all duration-300";

export default function Home() {
  const { theme } = useTheme();

  const features = [
    {
      icon: <FaMapMarkedAlt className="text-4xl text-blue-400" />,
      title: 'Interactive 3D Map',
      description: 'Explore our hotel facilities with an immersive 3D map experience.',
    },
    {
      icon: <FaHotel className="text-4xl text-blue-400" />,
      title: 'Luxury Accommodations',
      description: 'Discover our range of premium rooms and suites designed for your comfort.',
    },
    {
      icon: <FaUtensils className="text-4xl text-blue-400" />,
      title: 'Fine Dining',
      description: 'Experience world-class cuisine at our award-winning restaurants.',
    },
    {
      icon: <FaSpa className="text-4xl text-blue-400" />,
      title: 'Wellness & Spa',
      description: 'Rejuvenate your body and mind at our state-of-the-art spa facilities.',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Business Traveler',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
      text: 'The 3D map feature made it so easy to navigate the hotel. Absolutely loved the experience!',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Family Vacation',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
      text: 'The attention to detail in every aspect of our stay was remarkable. Will definitely return!',
      rating: 5,
    },
    {
      name: 'Emma Davis',
      role: 'Honeymoon',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80',
      text: 'The spa and dining experiences were beyond our expectations. A perfect romantic getaway.',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <Navbar />
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2000&q=80"
            alt="Luxury Hotel"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </div>
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6 text-white"
          >
            Welcome to Hotel Explorer
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto"
          >
            Discover luxury accommodations and unforgettable experiences
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/explore">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-6 text-lg">
                Start Exploring <FaArrowRight className="ml-2" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white px-8 py-6 text-lg backdrop-blur-sm">
              <FaPlay className="mr-2" /> Watch Video
            </Button>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-white/80 text-sm">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 border-2 border-white/80 rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1 h-2 bg-white/80 rounded-full mt-2"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-900/50 to-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16 text-white"
          >
            Experience Luxury
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`${glassEffect} p-6 rounded-xl text-center hover:transform hover:scale-105 transition-all duration-300`}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-800/50 to-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16 text-white"
          >
            What Our Guests Say
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`${glassEffect} p-6 rounded-xl`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-12 h-12">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-4">{testimonial.text}</p>
                <div className="flex gap-1">
                  {Array(5).fill(0).map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-900/50 to-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className={`${glassEffect} p-8 rounded-xl text-center`}
            >
              <FaUsers className="text-4xl text-blue-400 mx-auto mb-4" />
              <h3 className="text-3xl font-bold mb-2 text-white">10,000+</h3>
              <p className="text-gray-300">Happy Guests</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className={`${glassEffect} p-8 rounded-xl text-center`}
            >
              <FaConciergeBell className="text-4xl text-blue-400 mx-auto mb-4" />
              <h3 className="text-3xl font-bold mb-2 text-white">24/7</h3>
              <p className="text-gray-300">Concierge Service</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className={`${glassEffect} p-8 rounded-xl text-center`}
            >
              <FaStar className="text-4xl text-blue-400 mx-auto mb-4" />
              <h3 className="text-3xl font-bold mb-2 text-white">4.9/5</h3>
              <p className="text-gray-300">Guest Rating</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-800/50 to-gray-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-6 text-white"
          >
            Ready to Experience Luxury?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl mb-8 text-gray-300"
          >
            Start your journey with us today and discover a world of luxury and comfort.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/explore">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-6 text-lg">
                Explore Now <FaArrowRight className="ml-2" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white px-8 py-6 text-lg backdrop-blur-sm">
              Contact Us
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 