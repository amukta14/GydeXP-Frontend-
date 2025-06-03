import { FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

const glassEffect = "bg-gradient-to-br from-gray-900/90 to-gray-800/70 backdrop-blur-lg border border-white/10 shadow-lg";

export default function Footer() {
  return (
    <footer className={`w-full ${glassEffect} py-6 px-6 mt-16 text-center text-gray-300 text-sm flex flex-col items-center gap-2`}>
      <div className="flex gap-4 justify-center mb-2">
        <a href="#" className="text-blue-400 hover:text-blue-300 text-xl transition-colors"><FaInstagram /></a>
        <a href="#" className="text-blue-400 hover:text-blue-300 text-xl transition-colors"><FaTwitter /></a>
        <a href="#" className="text-blue-400 hover:text-blue-300 text-xl transition-colors"><FaLinkedin /></a>
      </div>
      <p>&copy; {new Date().getFullYear()} Hotel Explorer. All rights reserved.</p>
    </footer>
  );
} 