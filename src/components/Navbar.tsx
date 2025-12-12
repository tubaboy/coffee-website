import React, { useState } from 'react';
import { Menu as MenuIcon, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      // Offset for the sticky header
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const navLinks = [
    { label: 'MENU', id: 'menu' },
    { label: 'BEANS', id: 'beans' },
    { label: 'NEWS', id: 'news' },
    { label: 'SHOP', id: 'shop' },
    { label: 'CONTACT', id: 'contact' },
  ];

  const logoSrc = "images/logo.png";

  return (
    <nav className="sticky top-0 left-0 w-full z-50 bg-white border-b border-gray-100 py-6 md:py-8">
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo Image */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="cursor-pointer"
        >
          <img 
            src={logoSrc} 
            alt="Kaffa Forest Coffee - 自家屋珈琲焙煎所" 
            className="w-auto object-contain h-12 md:h-16"
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-12">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="text-xs font-medium tracking-[0.2em] text-gray-800 hover:text-gray-400 transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden z-50">
          <button onClick={() => setIsOpen(!isOpen)} className="text-black">
            {isOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>

        {/* Mobile Fullscreen Menu */}
        <div 
          className={`fixed inset-0 bg-white z-40 flex flex-col items-center justify-center space-y-8 transition-transform duration-500 ease-in-out ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="text-2xl font-light tracking-widest text-black hover:text-gray-500 transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};