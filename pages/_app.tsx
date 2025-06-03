import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { ThemeProvider } from '../store/ThemeContext';
import ErrorBoundary from '../components/ErrorBoundary';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(
          (registration) => {
            console.log('ServiceWorker registration successful');
          },
          (err) => {
            console.log('ServiceWorker registration failed: ', err);
          }
        );
      });
    }
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AnimatePresence mode="wait">
          <motion.div
            key={router.route}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default MyApp; 