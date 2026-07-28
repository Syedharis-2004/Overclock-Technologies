import { useState, useEffect } from 'react';
import { Code, PenTool, BrainCircuit, LineChart, Database, Smartphone, Shield, Cloud, ChevronRight, Layers } from 'lucide-react';
import { motion } from 'framer-motion';
import { api } from '../services/api';

const defaultServices = [
  {
    _id: 'def-srv-1',
    icon: 'Code',
    title: "Web & Software Development",
    description: "Custom scalable web applications, enterprise software solutions, and robust APIs tailored to your business needs."
  },
  {
    _id: 'def-srv-2',
    icon: 'PenTool',
    title: "Graphic Design",
    description: "Stunning visual identities, UI/UX design, branding, and marketing materials that captivate your audience."
  },
  {
    _id: 'def-srv-3',
    icon: 'BrainCircuit',
    title: "AI & Data Solutions",
    description: "Intelligent automation, machine learning models, and data-driven insights to accelerate your growth."
  },
  {
    _id: 'def-srv-4',
    icon: 'LineChart',
    title: "Consultation & Strategy",
    description: "Expert guidance to navigate digital transformation, optimize workflows, and scale your tech infrastructure."
  },
  {
    _id: 'def-srv-5',
    icon: 'Smartphone',
    title: "Mobile App Development",
    description: "High-performance iOS and Android applications built with modern frameworks for seamless user experiences."
  },
  {
    _id: 'def-srv-6',
    icon: 'Cloud',
    title: "Cloud & DevOps",
    description: "Scalable cloud architecture, CI/CD pipelines, and infrastructure management on AWS, Azure, and Google Cloud."
  },
  {
    _id: 'def-srv-7',
    icon: 'Shield',
    title: "Cybersecurity",
    description: "Comprehensive security audits, vulnerability assessments, and robust protection for your digital assets."
  },
  {
    _id: 'def-srv-8',
    icon: 'Database',
    title: "Database Management",
    description: "Optimized database design, migration, and maintenance ensuring data integrity and high availability."
  }
];

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

  useEffect(() => {
    const fetchServicesData = async () => {
      try {
        const data = await api.getServices();
        if (data && data.length > 0) {
          setServices(data);
        } else {
          setServices(defaultServices);
        }
      } catch (err) {
        console.warn('Backend API connection failed, using default services data:', err);
        setServices(defaultServices);
      } finally {
        setLoading(false);
      }
    };
    fetchServicesData();
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

        {/* Services Grid */}
        {loading ? (
          <div className="text-center py-20 text-slate-400 font-medium animate-pulse">
            Loading services...
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
