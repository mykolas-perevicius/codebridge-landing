'use client';

/**
 * Dark Mode Toggle Component
 *
 * Client-side component for toggling between light and dark themes
 * Uses localStorage to persist user preference
 */

import { useEffect, useState } from 'react';

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Only run on client side after mounting
  useEffect(() => {
    setMounted(true);
    // Check localStorage and system preference
    const isDark = localStorage.getItem('darkMode') === 'true' ||
      (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', String(newDarkMode));

    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Avoid hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <button className="p-2 rounded-lg bg-soft-gray text-navy w-10 h-10" aria-label="Loading theme toggle">
        <span className="opacity-0">🌙</span>
      </button>
    );
  }

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-lg bg-soft-gray hover:bg-gray-300 text-navy transition-colors duration-300"
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {darkMode ? (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  );
}
