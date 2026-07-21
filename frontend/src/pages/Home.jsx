import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Code, PenTool, BrainCircuit, LineChart, ChevronRight } from 'lucide-react';

const services = [
  {
    icon: <Code size={32} className="text-primary group-hover:scale-110 transition-transform duration-300" />,
    title: "Web & Software Development",
    desc: "Custom scalable web applications and enterprise software solutions.",
  },
  {
    icon: <PenTool size={32} className="text-primary group-hover:scale-110 transition-transform duration-300" />,
    title: "Graphic Design",
    desc: "Stunning visual identities, UI/UX design, and creative branding.",
  },
  {
    icon: <BrainCircuit size={32} className="text-primary group-hover:scale-110 transition-transform duration-300" />,
    title: "AI & Data Solutions",
    desc: "Intelligent automation and data-driven insights to accelerate growth.",
  },
  {
    icon: <LineChart size={32} className="text-primary group-hover:scale-110 transition-transform duration-300" />,
    title: "Consultation & Strategy",
    desc: "Expert guidance to navigate digital transformation effectively.",
  }
];

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
  return (
    <div className="min-h-screen bg-[#0b1a20]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-40 overflow-hidden border-b border-[#0b2f3f] bg-[url('/banner.jpeg')] bg-cover bg-center bg-no-repeat">
        {/* Gradient Overlay for Text Readability - Reduced opacity */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1a20]/90 via-[#0b1a20]/60 to-transparent z-0"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight leading-tight">
              OVERCLOCK <br/>
              <span className="text-3xl md:text-5xl text-slate-300 font-light tracking-widest uppercase">Technologies</span>
            </h1>
            <p className="text-xl text-slate-200 mb-10 max-w-2xl leading-relaxed drop-shadow-lg font-medium">
              Accelerate your business with cutting-edge technology. We provide high-performance digital solutions designed for the future.
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/services" className="bg-primary hover:bg-white text-[#0b1a20] px-8 py-4 font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 shadow-[0_0_20px_rgba(0,157,177,0.4)] hover:shadow-[0_0_30px_rgba(255,255,255,0.6)]">
                  Explore Services <ChevronRight size={20} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/contact" className="border-2 border-[#0b2f3f] hover:border-primary text-white bg-[#0b1a20]/50 px-8 py-4 font-bold uppercase tracking-wider transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,157,177,0.2)] block backdrop-blur-sm">
                  Contact Us
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="py-24 bg-[#0b1a20]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Expertise</h2>
            <div className="w-16 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Comprehensive tech solutions tailored to optimize and scale your operations.
            </p>
          </div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {services.map((service, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  y: -10, 
                  boxShadow: "0 10px 30px -10px rgba(0, 157, 177, 0.3)",
                  borderColor: "var(--color-primary)"
                }}
                className="bg-[#0b2f3f] p-8 border-t-2 border-transparent transition-all duration-300 group cursor-pointer"
              >
                <div className="mb-6">{service.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300">{service.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{service.desc}</p>
                
                <div className="mt-6 flex items-center text-primary text-sm font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Learn More <ChevronRight size={16} className="ml-1" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-[#009db1] to-[#237e96] text-[#0b1a20] relative overflow-hidden">
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
              { num: "24/7", label: "Fast Service" }
            ].map((stat, i) => (
              <motion.div key={i} variants={itemVariants} whileHover={{ scale: 1.1 }} className="cursor-default">
                <div className="text-4xl md:text-5xl font-bold mb-2 drop-shadow-md">{stat.num}</div>
                <div className="font-bold uppercase tracking-wider text-sm opacity-90">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
