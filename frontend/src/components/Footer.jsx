import { Link } from 'react-router-dom';
import logoIcon from '../assets/icon_wbg.png';

const Footer = () => {
  return (
    <footer className="bg-[#022b3a] border-t border-[#0e3a4b] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
        <div className="col-span-1 sm:col-span-2 md:col-span-1">
          <Link to="/" className="flex items-center gap-3 mb-6 group">
            <img
              src={logoIcon}
              alt="Overclock Logo"
              className="h-12 w-auto object-contain rounded-xl transition-transform duration-300 group-hover:scale-105 shadow-sm"
            />
            <div className="flex flex-col">
              <span className="text-xl text-white tracking-widest leading-none group-hover:text-cyan-200 transition-colors" style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 500 }}>OVERCLOCK</span>
              <span className="text-[9px] text-cyan-300 tracking-[0.3em] uppercase leading-tight mt-1 font-medium" style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 400 }}>TECHNOLOGIES</span>
            </div>
          </Link>
          <p className="text-slate-400 text-sm leading-relaxed">
            Fast, modern, and scalable digital solutions. We build technology that accelerates your business.
          </p>
        </div>
        
        <div>
          <h4 className="text-white font-bold tracking-wider uppercase mb-6 text-sm">Quick Links</h4>
          <ul className="space-y-3 text-slate-400 text-sm">
            <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            <li><Link to="/services" className="hover:text-primary transition-colors">Services</Link></li>
            <li><Link to="/portfolio" className="hover:text-primary transition-colors">Portfolio</Link></li>
            <li><Link to="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
            <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-bold tracking-wider uppercase mb-6 text-sm">Services</h4>
          <ul className="space-y-3 text-slate-400 text-sm">
            <li className="hover:text-primary cursor-pointer transition-colors">Web Development</li>
            <li className="hover:text-primary cursor-pointer transition-colors">Graphic Design</li>
            <li className="hover:text-primary cursor-pointer transition-colors">AI & Data Solutions</li>
            <li className="hover:text-primary cursor-pointer transition-colors">Consultation & Strategy</li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-bold tracking-wider uppercase mb-6 text-sm">Contact Us</h4>
          <ul className="space-y-3 text-slate-400 text-sm">
            <li>
              <a href="mailto:overclocktechnologies0@gmail.com" className="hover:text-primary transition-colors">
                overclocktechnologies0@gmail.com
              </a>
            </li>
            <li>
              <a href="tel:+923283381841" className="hover:text-primary transition-colors">
                +92 3283381841
              </a>
            </li>
            <li>
              <a 
                href="https://wa.me/923283381841" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#25D366] hover:underline font-semibold flex items-center gap-1.5 transition-colors"
              >
                WhatsApp Chat
              </a>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-[#0e3a4b] flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
        <p>&copy; {new Date().getFullYear()} Overclock Technologies. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0 items-center">
          <span className="hover:text-primary cursor-pointer transition-colors">Privacy Policy</span>
          <span className="hover:text-primary cursor-pointer transition-colors">Terms of Service</span>
          <Link to="/admin" className="text-primary/70 hover:text-primary font-semibold transition-colors flex items-center gap-1">
            Admin Panel
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
