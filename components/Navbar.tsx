import { useTheme } from '@/store/ThemeContext';
import { FaMoon, FaSun } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

const glassEffect = "bg-gradient-to-br from-gray-900/90 to-gray-800/70 backdrop-blur-lg border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300";

export default function Navbar() {
  const { theme, setTheme } = useTheme();

  return (
    <nav className={`w-full sticky top-0 z-30 ${glassEffect} py-4 px-6 flex items-center justify-between`}>
      <Link href="/" className="text-xl font-bold text-white flex items-center gap-2 hover:opacity-80 transition-opacity">
        <Image src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=40&q=80" width={40} height={40} alt="Logo" className="rounded-full" />
        Hotel Explorer
      </Link>
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <FaMoon /> : <FaSun />}
        </Button>
        <Link href="/explore">
          <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
            Explore
          </Button>
        </Link>
      </div>
    </nav>
  );
} 