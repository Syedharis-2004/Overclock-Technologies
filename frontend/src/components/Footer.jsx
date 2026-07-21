import { Link } from 'react-router-dom';
import { Code } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0b1a20] border-t border-[#0b2f3f] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 border-2 border-primary flex items-center justify-center">
              <Code size={16} className="text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white tracking-widest leading-none">OVERCLOCK</span>
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
            <li>info@overclocktech.com</li>
            <li>+1 (555) 987-6543</li>
            <li>Silicon Valley, CA</li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-[#0b2f3f] flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
        <p>&copy; {new Date().getFullYear()} Overclock Technologies. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <span className="hover:text-primary cursor-pointer transition-colors">Privacy Policy</span>
          <span className="hover:text-primary cursor-pointer transition-colors">Terms of Service</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
