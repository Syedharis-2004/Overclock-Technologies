import { useState, useEffect } from 'react';
import { Code, PenTool, BrainCircuit, LineChart, Database, Smartphone, Shield, Cloud, ChevronRight, Layers, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { api } from '../services/api';

const renderIcon = (iconName) => {
  const iconProps = { size: 40, className: "text-primary group-hover:scale-110 transition-transform duration-300" };
  switch (iconName) {
    case 'Code': return <Code {...iconProps} />;
    case 'PenTool': return <PenTool {...iconProps} />;
    case 'BrainCircuit': return <BrainCircuit {...iconProps} />;
    case 'LineChart': return <LineChart {...iconProps} />;
    case 'Smartphone': return <Smartphone {...iconProps} />;
    case 'Cloud': return <Cloud {...iconProps} />;
    case 'Shield': return <Shield {...iconProps} />;
    case 'Database': return <Database {...iconProps} />;
    default: return <Layers {...iconProps} />;
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchServicesData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await api.getServices();
        if (isMounted) {
          setServices(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load services at this time.');
          setServices([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    fetchServicesData();
    return () => { isMounted = false; };
  }, []);

  return (
    <div className="bg-[#022b3a] min-h-screen pt-12 pb-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20 pt-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1 border border-primary text-primary text-sm font-bold tracking-widest uppercase mb-6 bg-primary/10 shadow-[0_0_15px_rgba(31,122,140,0.3)]"
          >
            What We Do
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 uppercase tracking-wider"
          >
            Our Services
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-3xl mx-auto text-lg leading-relaxed"
          >
            We provide end-to-end technology solutions to help your business achieve maximum efficiency and growth.
          </motion.p>
        </div>

        {/* Services Grid / States */}
        {loading ? (
          <div className="text-center py-20 text-slate-400 font-medium animate-pulse flex items-center justify-center gap-3">
            <span className="w-3 h-3 bg-primary rounded-full animate-ping"></span>
            Loading services...
          </div>
        ) : error ? (
          <div className="max-w-md mx-auto text-center py-12 px-6 bg-[#0e3a4b] border border-red-500/30 text-rose-300">
            <AlertCircle size={36} className="mx-auto mb-3 text-rose-400" />
            <p className="font-semibold">{error}</p>
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-20 text-slate-400 font-medium bg-[#0e3a4b]/50 border border-slate-700/50 p-8 max-w-lg mx-auto">
            No services listed at the moment. Please check back soon.
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {services.map((service, index) => (
              <motion.div 
                key={service._id || index}
                variants={itemVariants}
                whileHover={{ 
                  y: -10, 
                  boxShadow: "0 15px 30px -10px rgba(31, 122, 140, 0.4)",
                  borderColor: "var(--color-primary)"
                }}
                className="bg-[#0e3a4b] p-8 border-t-2 border-transparent transition-all duration-300 group cursor-pointer relative overflow-hidden flex flex-col justify-between"
              >
                {/* Subtle hover gradient inside card */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div>
                  <div className="mb-6 p-4 bg-[#022b3a] inline-block rounded-none border border-[#0e3a4b] group-hover:border-primary transition-colors relative z-10">
                    {renderIcon(service.icon)}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-primary transition-colors uppercase tracking-wider relative z-10">{service.title}</h3>
                  <p className="text-slate-400 leading-relaxed relative z-10 mb-6">{service.description || service.desc}</p>
                </div>
                
                <div className="flex items-center text-primary text-sm font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 relative z-10">
                  Learn More <ChevronRight size={16} className="ml-1" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Services;
