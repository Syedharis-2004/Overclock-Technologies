import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  return (
    <div className="bg-[#0b1a20] min-h-screen pt-12 pb-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-20 pt-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1 border border-primary text-primary text-sm font-bold tracking-widest uppercase mb-6 bg-primary/10 shadow-[0_0_15px_rgba(0,157,177,0.2)]"
          >
            Get In Touch
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6 uppercase tracking-wider"
          >
            Let's Build Together
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-3xl mx-auto text-lg leading-relaxed"
          >
            Ready to start your next project? Contact us today for a free consultation and let's discuss how we can accelerate your business.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          
          {/* Contact Information */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold text-white mb-10 uppercase tracking-wider flex items-center gap-4">
              <span className="w-10 h-1 bg-primary"></span>
              Contact Info
            </h3>
            
            <div className="space-y-10">
              <motion.div whileHover={{ x: 10 }} className="flex items-start gap-6 group cursor-default transition-transform duration-300">
                <div className="p-4 bg-[#0b2f3f] border border-primary/20 text-primary group-hover:bg-primary group-hover:text-[#0b1a20] transition-colors duration-300 shadow-lg group-hover:shadow-[0_0_20px_rgba(0,157,177,0.4)]">
                  <Mail size={28} />
                </div>
                <div>
                  <h4 className="text-white font-bold tracking-wider uppercase mb-2 group-hover:text-primary transition-colors">Email</h4>
                  <p className="text-slate-400">info@overclocktech.com</p>
                  <p className="text-slate-400">support@overclocktech.com</p>
                </div>
              </motion.div>
              
              <motion.div whileHover={{ x: 10 }} className="flex items-start gap-6 group cursor-default transition-transform duration-300">
                <div className="p-4 bg-[#0b2f3f] border border-primary/20 text-primary group-hover:bg-primary group-hover:text-[#0b1a20] transition-colors duration-300 shadow-lg group-hover:shadow-[0_0_20px_rgba(0,157,177,0.4)]">
                  <Phone size={28} />
                </div>
                <div>
                  <h4 className="text-white font-bold tracking-wider uppercase mb-2 group-hover:text-primary transition-colors">Phone</h4>
                  <p className="text-slate-400">+1 (555) 987-6543</p>
                  <p className="text-slate-400">+1 (555) 123-4567</p>
                </div>
              </motion.div>
              
              <motion.div whileHover={{ x: 10 }} className="flex items-start gap-6 group cursor-default transition-transform duration-300">
                <div className="p-4 bg-[#0b2f3f] border border-primary/20 text-primary group-hover:bg-primary group-hover:text-[#0b1a20] transition-colors duration-300 shadow-lg group-hover:shadow-[0_0_20px_rgba(0,157,177,0.4)]">
                  <MapPin size={28} />
                </div>
                <div>
                  <h4 className="text-white font-bold tracking-wider uppercase mb-2 group-hover:text-primary transition-colors">Office</h4>
                  <p className="text-slate-400">123 Tech Lane, Innovation Park</p>
                  <p className="text-slate-400">Silicon Valley, CA 94025</p>
                </div>
              </motion.div>
            </div>
            
            {/* Map Placeholder */}
            <div className="mt-16 w-full h-48 bg-[#0b2f3f] border-2 border-transparent hover:border-primary transition-all duration-300 flex items-center justify-center group cursor-pointer relative overflow-hidden shadow-lg hover:shadow-[0_0_30px_rgba(0,157,177,0.2)]">
               <div className="absolute inset-0 bg-[url('/banner.jpeg')] bg-cover bg-center opacity-10 group-hover:opacity-20 transition-opacity duration-500 blur-sm"></div>
               <span className="text-slate-400 font-bold tracking-widest uppercase group-hover:text-primary transition-colors relative z-10 flex items-center gap-2">
                 <MapPin size={20} /> VIEW MAP
               </span>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-[#0b2f3f] p-10 border-t-4 border-primary shadow-2xl relative"
          >
            {/* Decorative corner accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary -translate-x-2 -translate-y-2"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary translate-x-2 -translate-y-2"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary -translate-x-2 translate-y-2"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary translate-x-2 translate-y-2"></div>

            <h3 className="text-2xl font-bold text-white mb-8 uppercase tracking-wider">Send a message</h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-slate-400 text-xs font-bold mb-2 uppercase tracking-widest group-focus-within:text-primary transition-colors">First Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-[#0b1a20] border-b-2 border-transparent focus:border-primary text-white px-4 py-4 outline-none transition-all duration-300 focus:shadow-[0_10px_20px_-10px_rgba(0,157,177,0.3)] placeholder:text-slate-600"
                    placeholder="John"
                  />
                </div>
                <div className="group">
                  <label className="block text-slate-400 text-xs font-bold mb-2 uppercase tracking-widest group-focus-within:text-primary transition-colors">Last Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-[#0b1a20] border-b-2 border-transparent focus:border-primary text-white px-4 py-4 outline-none transition-all duration-300 focus:shadow-[0_10px_20px_-10px_rgba(0,157,177,0.3)] placeholder:text-slate-600"
                    placeholder="Doe"
                  />
                </div>
              </div>
              
              <div className="group">
                <label className="block text-slate-400 text-xs font-bold mb-2 uppercase tracking-widest group-focus-within:text-primary transition-colors">Email Address</label>
                <input 
                  type="email" 
                  className="w-full bg-[#0b1a20] border-b-2 border-transparent focus:border-primary text-white px-4 py-4 outline-none transition-all duration-300 focus:shadow-[0_10px_20px_-10px_rgba(0,157,177,0.3)] placeholder:text-slate-600"
                  placeholder="john@example.com"
                />
              </div>
              
              <div className="group relative">
                <label className="block text-slate-400 text-xs font-bold mb-2 uppercase tracking-widest group-focus-within:text-primary transition-colors">Service Required</label>
                <select className="w-full bg-[#0b1a20] border-b-2 border-transparent focus:border-primary text-white px-4 py-4 outline-none transition-all duration-300 focus:shadow-[0_10px_20px_-10px_rgba(0,157,177,0.3)] appearance-none cursor-pointer">
                  <option>Web & Software Development</option>
                  <option>Graphic Design</option>
                  <option>AI & Data Solutions</option>
                  <option>Consultation</option>
                  <option>Other</option>
                </select>
                <div className="absolute right-4 top-10 text-primary pointer-events-none">▼</div>
              </div>
              
              <div className="group">
                <label className="block text-slate-400 text-xs font-bold mb-2 uppercase tracking-widest group-focus-within:text-primary transition-colors">Message</label>
                <textarea 
                  rows="4"
                  className="w-full bg-[#0b1a20] border-b-2 border-transparent focus:border-primary text-white px-4 py-4 outline-none transition-all duration-300 focus:shadow-[0_10px_20px_-10px_rgba(0,157,177,0.3)] resize-none placeholder:text-slate-600"
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>
              
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-primary hover:bg-white text-[#0b1a20] font-bold py-5 uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(0,157,177,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.6)] mt-8"
              >
                Send Message <Send size={20} />
              </motion.button>
            </form>
          </motion.div>
          
        </div>
      </div>
    </div>
  );
};

export default Contact;
