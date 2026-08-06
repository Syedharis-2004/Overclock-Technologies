import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Loader2, MessageCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    service: 'Web & Software Development',
    message: ''
  });
  const [status, setStatus] = useState({ submitting: false, success: false, error: null });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: null });

    try {
      const response = await fetch('https://formspree.io/f/mdenkorl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus({ submitting: false, success: true, error: null });
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          service: 'Web & Software Development',
          message: ''
        });
      } else {
        const data = await response.json();
        throw new Error(data.error || 'Failed to submit form');
      }
    } catch (error) {
      setStatus({ submitting: false, success: false, error: error.message || 'Something went wrong. Please try again.' });
    }
  };

  return (
    <div className="bg-[#022b3a] min-h-screen pt-12 pb-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-20 pt-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1 border border-primary text-primary text-sm font-bold tracking-widest uppercase mb-6 bg-primary/10 shadow-[0_0_15px_rgba(31,122,140,0.3)]"
          >
            Get In Touch
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 uppercase tracking-wider"
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          
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
              <motion.div whileHover={{ x: 10 }} className="flex items-start gap-6 group cursor-pointer transition-transform duration-300">
                <a href="mailto:overclocktechnologies0@gmail.com" className="flex items-start gap-6 w-full">
                  <div className="p-4 bg-[#0e3a4b] border border-primary/20 text-primary group-hover:bg-primary group-hover:text-[#022b3a] transition-colors duration-300 shadow-lg group-hover:shadow-[0_0_20px_rgba(31,122,140,0.4)]">
                    <Mail size={28} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold tracking-wider uppercase mb-2 group-hover:text-primary transition-colors">Email</h4>
                    <p className="text-slate-400 hover:text-white transition-colors">overclocktechnologies0@gmail.com</p>
                  </div>
                </a>
              </motion.div>
              
              <motion.div whileHover={{ x: 10 }} className="flex items-start gap-6 group cursor-pointer transition-transform duration-300">
                <a href="tel:+923283381841" className="flex items-start gap-6 w-full">
                  <div className="p-4 bg-[#0e3a4b] border border-primary/20 text-primary group-hover:bg-primary group-hover:text-[#022b3a] transition-colors duration-300 shadow-lg group-hover:shadow-[0_0_20px_rgba(31,122,140,0.4)]">
                    <Phone size={28} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold tracking-wider uppercase mb-2 group-hover:text-primary transition-colors">Phone / Mobile</h4>
                    <p className="text-slate-400 hover:text-white transition-colors">+92 3283381841</p>
                  </div>
                </a>
              </motion.div>

              <motion.div whileHover={{ x: 10 }} className="flex items-start gap-6 group cursor-pointer transition-transform duration-300">
                <a href="https://wa.me/923283381841" target="_blank" rel="noopener noreferrer" className="flex items-start gap-6 w-full">
                  <div className="p-4 bg-[#25D366]/10 border border-[#25D366]/40 text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-colors duration-300 shadow-lg group-hover:shadow-[0_0_20px_rgba(37,211,102,0.4)]">
                    <MessageCircle size={28} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold tracking-wider uppercase mb-2 group-hover:text-[#25D366] transition-colors">WhatsApp Direct</h4>
                    <p className="text-slate-400 hover:text-white transition-colors">+92 3283381841 (Click to Chat)</p>
                  </div>
                </a>
              </motion.div>
              
              <motion.div whileHover={{ x: 10 }} className="flex items-start gap-6 group cursor-default transition-transform duration-300">
                <div className="p-4 bg-[#0e3a4b] border border-primary/20 text-primary group-hover:bg-primary group-hover:text-[#022b3a] transition-colors duration-300 shadow-lg group-hover:shadow-[0_0_20px_rgba(31,122,140,0.4)]">
                  <MapPin size={28} />
                </div>
                <div>
                  <h4 className="text-white font-bold tracking-wider uppercase mb-2 group-hover:text-primary transition-colors">Office</h4>
                  <p className="text-slate-400">Innovation Park</p>
                  <p className="text-slate-400">Pakistan</p>
                </div>
              </motion.div>
            </div>
            
            {/* Map Placeholder */}
            <div className="mt-16 w-full h-48 bg-[#0e3a4b] border-2 border-transparent hover:border-primary transition-all duration-300 flex items-center justify-center group cursor-pointer relative overflow-hidden shadow-lg hover:shadow-[0_0_30px_rgba(31,122,140,0.3)]">
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
            className="bg-[#0e3a4b] p-6 sm:p-8 md:p-12 relative border border-primary/20 shadow-2xl"
          >
            {/* Decorative corner accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary -translate-x-2 -translate-y-2"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary translate-x-2 -translate-y-2"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary -translate-x-2 translate-y-2"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary translate-x-2 translate-y-2"></div>

            <h3 className="text-2xl font-bold text-white mb-8 uppercase tracking-wider">Send a message</h3>
            
            {status.success && (
              <div className="mb-6 p-4 bg-emerald-500/20 border border-emerald-500 text-emerald-300 flex items-center gap-3">
                <CheckCircle size={20} className="flex-shrink-0" />
                <p className="text-sm">Thank you! Your message has been sent successfully.</p>
              </div>
            )}

            {status.error && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500 text-red-300 flex items-center gap-3">
                <AlertCircle size={20} className="flex-shrink-0" />
                <p className="text-sm">{status.error}</p>
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-slate-400 text-xs font-bold mb-2 uppercase tracking-widest group-focus-within:text-primary transition-colors">First Name</label>
                  <input 
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full bg-[#022b3a] border-b-2 border-transparent focus:border-primary text-white px-4 py-4 outline-none transition-all duration-300 focus:shadow-[0_10px_20px_-10px_rgba(31,122,140,0.4)] placeholder:text-slate-600"
                    placeholder="John"
                  />
                </div>
                <div className="group">
                  <label className="block text-slate-400 text-xs font-bold mb-2 uppercase tracking-widest group-focus-within:text-primary transition-colors">Last Name</label>
                  <input 
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full bg-[#022b3a] border-b-2 border-transparent focus:border-primary text-white px-4 py-4 outline-none transition-all duration-300 focus:shadow-[0_10px_20px_-10px_rgba(31,122,140,0.4)] placeholder:text-slate-600"
                    placeholder="Doe"
                  />
                </div>
              </div>
              
              <div className="group">
                <label className="block text-slate-400 text-xs font-bold mb-2 uppercase tracking-widest group-focus-within:text-primary transition-colors">Email Address</label>
                <input 
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-[#022b3a] border-b-2 border-transparent focus:border-primary text-white px-4 py-4 outline-none transition-all duration-300 focus:shadow-[0_10px_20px_-10px_rgba(31,122,140,0.4)] placeholder:text-slate-600"
                  placeholder="john@example.com"
                />
              </div>
              
              <div className="group relative">
                <label className="block text-slate-400 text-xs font-bold mb-2 uppercase tracking-widest group-focus-within:text-primary transition-colors">Service Required</label>
                <select 
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full bg-[#022b3a] border-b-2 border-transparent focus:border-primary text-white px-4 py-4 outline-none transition-all duration-300 focus:shadow-[0_10px_20px_-10px_rgba(31,122,140,0.4)] appearance-none cursor-pointer"
                >
                  <option value="Web & Software Development">Web & Software Development</option>
                  <option value="Graphic Design">Graphic Design</option>
                  <option value="AI & Data Solutions">AI & Data Solutions</option>
                  <option value="Consultation">Consultation</option>
                  <option value="Other">Other</option>
                </select>
                <div className="absolute right-4 top-10 text-primary pointer-events-none">▼</div>
              </div>
              
              <div className="group">
                <label className="block text-slate-400 text-xs font-bold mb-2 uppercase tracking-widest group-focus-within:text-primary transition-colors">Message</label>
                <textarea 
                  name="message"
                  required
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-[#022b3a] border-b-2 border-transparent focus:border-primary text-white px-4 py-4 outline-none transition-all duration-300 focus:shadow-[0_10px_20px_-10px_rgba(31,122,140,0.4)] resize-none placeholder:text-slate-600"
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>
              
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={status.submitting}
                className="w-full bg-primary hover:bg-white text-[#022b3a] font-bold py-5 uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(31,122,140,0.4)] hover:shadow-[0_0_30px_rgba(255,255,255,0.6)] mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status.submitting ? (
                  <>Sending... <Loader2 size={20} className="animate-spin" /></>
                ) : (
                  <>Send Message <Send size={20} /></>
                )}
              </motion.button>
            </form>
          </motion.div>
          
        </div>
      </div>
    </div>
  );
};

export default Contact;
