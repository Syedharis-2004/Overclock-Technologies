import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import logoIcon from '../assets/icon_wbg.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="bg-gradient-to-r from-[#1f7a8c] via-[#0e3a4b] to-[#022b3a] border-b border-[#1f7a8c]/30 sticky top-0 z-50 shadow-lg backdrop-blur-md">
      <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-center gap-3 mr-4 lg:mr-8 xl:mr-12">
            <Link to="/" className="flex items-center gap-3 group">
              <img 
                src={logoIcon} 
                alt="Overclock Logo" 
                className="h-10 sm:h-12 lg:h-13 xl:h-14 w-auto object-contain rounded-xl overflow-hidden transition-transform duration-300 group-hover:scale-105 shadow-sm" 
              />
              <div className="flex flex-col hidden sm:flex">
                <span className="text-lg md:text-xl lg:text-2xl text-white tracking-widest leading-none group-hover:text-cyan-200 transition-colors" style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 500 }}>OVERCLOCK</span>
                <span className="text-[8px] md:text-[9px] lg:text-[10px] text-cyan-300 tracking-[0.3em] uppercase leading-tight mt-1 font-medium" style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 400 }}>TECHNOLOGIES</span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-4 xl:space-x-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-slate-300 hover:text-primary font-medium transition-colors text-xs xl:text-sm uppercase tracking-wider relative group whitespace-nowrap"
                style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 500 }}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
            <Link to="/contact" className="bg-primary text-white hover:text-[#022b3a] px-4 py-2 xl:px-6 xl:py-2.5 rounded font-bold hover:bg-white hover:scale-105 transition-all duration-300 text-xs xl:text-sm uppercase tracking-wider shadow-[0_0_10px_rgba(31,122,140,0.4)] hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] active:scale-95 whitespace-nowrap" style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 500 }}>
              Get Started
            </Link>
          </div>

          {/* Mobile/Tablet Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-300 hover:text-primary focus:outline-none p-2"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-[#022b3a] border-t border-[#1f7a8c]/30">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-3 rounded-md text-base font-medium text-slate-200 hover:text-primary hover:bg-[#0e3a4b] uppercase tracking-wider"
                style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 500 }}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
