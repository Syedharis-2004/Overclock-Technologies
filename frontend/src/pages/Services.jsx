import { Code, PenTool, BrainCircuit, LineChart, Database, Smartphone, Shield, Cloud, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const allServices = [
  {
    icon: <Code size={40} className="text-primary group-hover:scale-110 transition-transform duration-300" />,
    title: "Web & Software Development",
    desc: "Custom scalable web applications, enterprise software solutions, and robust APIs tailored to your business needs."
  },
  {
    icon: <PenTool size={40} className="text-primary group-hover:scale-110 transition-transform duration-300" />,
    title: "Graphic Design",
    desc: "Stunning visual identities, UI/UX design, branding, and marketing materials that captivate your audience."
  },
  {
    icon: <BrainCircuit size={40} className="text-primary group-hover:scale-110 transition-transform duration-300" />,
    title: "AI & Data Solutions",
    desc: "Intelligent automation, machine learning models, and data-driven insights to accelerate your growth."
  },
  {
    icon: <LineChart size={40} className="text-primary group-hover:scale-110 transition-transform duration-300" />,
    title: "Consultation & Strategy",
    desc: "Expert guidance to navigate digital transformation, optimize workflows, and scale your tech infrastructure."
  },
  {
    icon: <Smartphone size={40} className="text-primary group-hover:scale-110 transition-transform duration-300" />,
    title: "Mobile App Development",
    desc: "High-performance iOS and Android applications built with modern frameworks for seamless user experiences."
  },
  {
    icon: <Cloud size={40} className="text-primary group-hover:scale-110 transition-transform duration-300" />,
    title: "Cloud & DevOps",
    desc: "Scalable cloud architecture, CI/CD pipelines, and infrastructure management on AWS, Azure, and Google Cloud."
  },
  {
    icon: <Shield size={40} className="text-primary group-hover:scale-110 transition-transform duration-300" />,
    title: "Cybersecurity",
    desc: "Comprehensive security audits, vulnerability assessments, and robust protection for your digital assets."
  },
  {
    icon: <Database size={40} className="text-primary group-hover:scale-110 transition-transform duration-300" />,
    title: "Database Management",
    desc: "Optimized database design, migration, and maintenance ensuring data integrity and high availability."
  }
];

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
  return (
    <div className="bg-[#0b1a20] min-h-screen pt-12 pb-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20 pt-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1 border border-primary text-primary text-sm font-bold tracking-widest uppercase mb-6 bg-primary/10 shadow-[0_0_15px_rgba(0,157,177,0.2)]"
          >
            What We Do
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6 uppercase tracking-wider"
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
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {allServices.map((service, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -10, 
                boxShadow: "0 15px 30px -10px rgba(0, 157, 177, 0.4)",
                borderColor: "var(--color-primary)"
              }}
              className="bg-[#0b2f3f] p-8 border-t-2 border-transparent transition-all duration-300 group cursor-pointer relative overflow-hidden"
            >
              {/* Subtle hover gradient inside card */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="mb-6 p-4 bg-[#0b1a20] inline-block rounded-none border border-[#0b2f3f] group-hover:border-primary transition-colors relative z-10">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-primary transition-colors uppercase tracking-wider relative z-10">{service.title}</h3>
              <p className="text-slate-400 leading-relaxed relative z-10 mb-6">{service.desc}</p>
              
              <div className="flex items-center text-primary text-sm font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 relative z-10">
                Learn More <ChevronRight size={16} className="ml-1" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Services;
