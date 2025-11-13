'use client';

/**
 * Navigation Component
 *
 * Sticky navigation bar with scroll effect and mobile menu
 */

import { useState, useEffect } from 'react';
import DarkModeToggle from './DarkModeToggle';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#courses', label: 'Courses' },
    { href: '#how-it-works', label: 'How It Works' },
    { href: '#results', label: 'Results' },
    { href: '#pricing', label: 'Pricing' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-sm shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="#" className="flex items-center gap-2">
              <span className={`text-2xl font-bold ${isScrolled ? 'text-navy' : 'text-white'}`}>
                CodeBridge <span className="text-sky-blue">Labs</span>
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`font-medium transition-colors ${
                  isScrolled
                    ? 'text-navy hover:text-sky-blue'
                    : 'text-white hover:text-sky-blue'
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://calendly.com/codebridge-labs"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-sky-blue text-white font-semibold rounded-lg hover:bg-[#2563eb] transition-colors"
            >
              Book a Call
            </a>
            <DarkModeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <DarkModeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 ${isScrolled ? 'text-navy' : 'text-white'}`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 text-navy hover:bg-soft-gray transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://calendly.com/codebridge-labs"
              target="_blank"
              rel="noopener noreferrer"
              className="block mx-4 mt-2 px-6 py-2 bg-sky-blue text-white font-semibold rounded-lg text-center hover:bg-[#2563eb] transition-colors"
            >
              Book a Call
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
