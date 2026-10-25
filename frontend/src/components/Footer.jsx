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
          <div className="flex items-center gap-2.5 mt-6">
            <a
              href="https://www.linkedin.com/in/overclock-technologies-810317420"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
              className="w-8 h-8 rounded bg-[#0e3a4b] border border-primary/30 flex items-center justify-center text-slate-300 hover:text-white hover:border-primary hover:bg-primary/20 hover:shadow-[0_0_12px_rgba(31,122,140,0.5)] transition-all"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.39 9.74v-8.37H5.07v8.37h2.78Z"/></svg>
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              title="X (Twitter)"
              className="w-8 h-8 rounded bg-[#0e3a4b] border border-primary/30 flex items-center justify-center text-slate-300 hover:text-white hover:border-primary hover:bg-primary/20 hover:shadow-[0_0_12px_rgba(31,122,140,0.5)] transition-all"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a
              href="https://github.com/Syedharis-2004/Business-web"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              title="GitHub"
              className="w-8 h-8 rounded bg-[#0e3a4b] border border-primary/30 flex items-center justify-center text-slate-300 hover:text-white hover:border-primary hover:bg-primary/20 hover:shadow-[0_0_12px_rgba(31,122,140,0.5)] transition-all"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
            <a
              href="https://www.instagram.com/overclocktechnologies0?vrfl=Z3E2eWlkeHFpMDIw"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              title="Instagram"
              className="w-8 h-8 rounded bg-[#0e3a4b] border border-primary/30 flex items-center justify-center text-slate-300 hover:text-white hover:border-primary hover:bg-primary/20 hover:shadow-[0_0_12px_rgba(31,122,140,0.5)] transition-all"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a
              href="https://www.facebook.com/share/19bDXqpBuw/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              title="Facebook"
              className="w-8 h-8 rounded bg-[#0e3a4b] border border-primary/30 flex items-center justify-center text-slate-300 hover:text-white hover:border-primary hover:bg-primary/20 hover:shadow-[0_0_12px_rgba(31,122,140,0.5)] transition-all"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
          </div>
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
