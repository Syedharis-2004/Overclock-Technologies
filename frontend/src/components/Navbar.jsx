import { Link } from 'react-router-dom';
import { Menu, X, Code } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="bg-[#0b1a20] border-b border-[#0b2f3f] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3 group">
              <img src="/logo.jpg" alt="Overclock Logo" className="h-12 w-auto object-contain rounded shadow-lg group-hover:opacity-80 transition-opacity" />
              <div className="flex flex-col hidden sm:flex">
                <span className="text-xl font-bold text-white tracking-widest leading-none">OVERCLOCK</span>
              </div>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-slate-300 hover:text-primary font-medium transition-colors text-sm uppercase tracking-wider relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
            <Link to="/contact" className="bg-primary text-[#0b1a20] px-6 py-2 rounded font-bold hover:bg-white hover:scale-105 transition-all duration-300 text-sm uppercase tracking-wider shadow-[0_0_10px_rgba(0,157,177,0.3)] hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] active:scale-95">
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-300 hover:text-primary focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0b2f3f] border-t border-primary/20">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-3 rounded-md text-base font-medium text-slate-200 hover:text-primary hover:bg-[#0b1a20] uppercase tracking-wider"
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
