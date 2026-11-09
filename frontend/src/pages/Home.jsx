import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Code, PenTool, BrainCircuit, LineChart, ChevronRight, 
  Smartphone, Cloud, Shield, Database, Layers 
} from 'lucide-react';
import coverImg from '../assets/cover.jpg';
import { api } from '../services/api';

const renderIcon = (iconName) => {
  const iconProps = { size: 32, className: "text-primary group-hover:scale-110 transition-transform duration-300" };
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
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const Home = () => {
  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchServices = async () => {
      try {
        setLoadingServices(true);
        const data = await api.getServices();
        if (isMounted) {
          setServices(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.warn('Failed to load services for home preview:', err);
      } finally {
        if (isMounted) {
          setLoadingServices(false);
        }
      }
    };
    fetchServices();
    return () => { isMounted = false; };
  }, []);

  // Display top 4 services
  const displayedServices = services.slice(0, 4);

  return (
    <div className="min-h-screen bg-[#022b3a]">
      {/* Hero Section */}
      <section
        className="relative w-full min-h-[75vh] md:min-h-[85vh] lg:min-h-[88vh] xl:min-h-screen pt-20 sm:pt-28 md:pt-36 lg:pt-40 xl:pt-48 pb-12 md:pb-20 lg:pb-28 overflow-hidden border-b border-[#0e3a4b] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${coverImg})` }}
      >
        {/* Gradient Overlay — seamless dark blue blend on left, smooth transition for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#022b3a]/85 via-[#022b3a]/65 to-[#022b3a]/80 lg:bg-gradient-to-r lg:from-[#022b3a]/95 lg:via-[#022b3a]/70 lg:to-transparent z-0"></div>

        <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl md:max-w-2xl lg:max-w-3xl"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl 2xl:text-8xl text-white mb-4 tracking-tight leading-none flex flex-col">
              <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 500 }}>OVERCLOCK</span>
              <span
                className="text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl text-slate-300 tracking-widest uppercase mt-1 sm:mt-2"
                style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 400 }}
              >TECHNOLOGIES</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-200 mb-8 sm:mb-10 max-w-xl lg:max-w-2xl leading-relaxed drop-shadow-lg font-medium">
              Accelerate your business with cutting-edge technology. We provide high-performance digital solutions designed for the future.
            </p>
            <div className="flex flex-row flex-wrap gap-3 sm:gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/services" className="bg-primary hover:bg-white text-white hover:text-[#022b3a] px-5 py-3 sm:px-8 sm:py-4 font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 shadow-[0_0_20px_rgba(31,122,140,0.4)] hover:shadow-[0_0_30px_rgba(255,255,255,0.6)] text-xs sm:text-sm" style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 500 }}>
                  Explore Services <ChevronRight size={16} className="sm:hidden" /><ChevronRight size={20} className="hidden sm:block" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/contact" className="border-2 border-[#0e3a4b] hover:border-primary text-white bg-[#022b3a]/50 px-5 py-3 sm:px-8 sm:py-4 font-bold uppercase tracking-wider transition-all duration-300 hover:shadow-[0_0_20px_rgba(31,122,140,0.2)] inline-block backdrop-blur-sm text-xs sm:text-sm" style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 500 }}>
                  Contact Us
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="py-24 bg-[#022b3a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 500 }}>Our Expertise</h2>
            <div className="w-16 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Comprehensive tech solutions tailored to optimize and scale your operations.
            </p>
          </div>

          {loadingServices ? (
            <div className="text-center py-12 text-slate-400 font-medium animate-pulse flex items-center justify-center gap-2">
              <span className="w-2.5 h-2.5 bg-primary rounded-full animate-ping"></span>
              Loading services...
            </div>
          ) : displayedServices.length === 0 ? (
            <div className="text-center py-12 text-slate-400 font-medium">
              Services will appear here once configured in the Admin Panel.
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {displayedServices.map((service, index) => (
                <motion.div
                  key={service._id || index}
                  variants={itemVariants}
                  whileHover={{
                    y: -10,
                    boxShadow: "0 10px 30px -10px rgba(31, 122, 140, 0.4)",
                    borderColor: "var(--color-primary)"
                  }}
                  className="bg-[#0e3a4b] p-8 border-t-2 border-transparent transition-all duration-300 group cursor-pointer"
                >
                  <div className="mb-6">{renderIcon(service.icon)}</div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300" style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 500 }}>{service.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{service.description || service.desc}</p>

                  <Link to="/services" className="mt-6 flex items-center text-primary text-sm font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Learn More <ChevronRight size={16} className="ml-1" />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-[#1f7a8c] to-[#022b3a] text-white relative overflow-hidden">
        {/* Subtle animated background pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent mix-blend-overlay"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {[
              { num: "150+", label: "Projects Delivered" },
              { num: "50+", label: "Tech Experts" },
              { num: "99%", label: "Client Satisfaction" },
              { num: "24/7", label: "Fast Service", spacing: "0.15em" }
            ].map((stat, i) => (
              <motion.div key={i} variants={itemVariants} whileHover={{ scale: 1.1 }} className="cursor-default">
                <div className="text-4xl md:text-5xl font-bold mb-2 drop-shadow-md" style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 500, letterSpacing: stat.spacing }}>{stat.num}</div>
                <div className="font-bold uppercase tracking-wider text-sm opacity-90" style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 500 }}>{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
