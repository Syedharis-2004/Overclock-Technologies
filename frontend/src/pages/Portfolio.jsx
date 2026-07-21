import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const projects = [
  {
    title: "NexGen ERP System",
    category: "Enterprise Software",
    desc: "A comprehensive cloud-based ERP solution for a manufacturing giant, increasing operational efficiency by 40%."
  },
  {
    title: "FinTech Mobile Wallet",
    category: "Mobile App",
    desc: "A highly secure and intuitive mobile wallet application supporting crypto and fiat currencies for over 1M users."
  },
  {
    title: "AI Predictive Analytics Dashboard",
    category: "Data & AI",
    desc: "Custom dashboard utilizing machine learning models to forecast retail sales trends with 95% accuracy."
  },
  {
    title: "Global E-Commerce Platform",
    category: "Web Development",
    desc: "Scalable e-commerce architecture built on microservices, handling 10k+ concurrent transactions during peak sales."
  },
  {
    title: "Smart Logistics Tracker",
    category: "IoT & Cloud",
    desc: "Real-time supply chain tracking system integrating IoT sensors with a robust cloud backend."
  },
  {
    title: "Brand Identity Redesign",
    category: "Graphic Design",
    desc: "Complete visual overhaul for a tech startup, resulting in a 200% increase in brand recognition and user trust."
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
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } }
};

const Portfolio = () => {
  return (
    <div className="bg-[#0b1a20] min-h-screen pt-12 pb-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-1/4 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-20 pt-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1 border border-primary text-primary text-sm font-bold tracking-widest uppercase mb-6 bg-primary/10 shadow-[0_0_15px_rgba(0,157,177,0.2)]"
          >
            Our Work
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6 uppercase tracking-wider"
          >
            Featured Projects
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-3xl mx-auto text-lg leading-relaxed"
          >
            Explore a selection of our most impactful digital solutions delivered for clients worldwide.
          </motion.p>
        </div>

        {/* Portfolio Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
            >
              <div className="aspect-video bg-[#0b2f3f] mb-6 overflow-hidden border-2 border-transparent group-hover:border-primary transition-all duration-300 relative shadow-lg group-hover:shadow-[0_0_30px_rgba(0,157,177,0.4)]">
                {/* Placeholder Image */}
                <div className="absolute inset-0 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-700">
                   <span className="text-slate-600 font-bold text-3xl group-hover:text-primary transition-colors">PROJECT IMG</span>
                </div>
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1a20]/90 to-[#0b1a20]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <motion.div 
                    initial={{ scale: 0 }} 
                    whileInView={{ scale: 1 }} 
                    className="p-4 rounded-full bg-primary text-[#0b1a20] shadow-[0_0_20px_rgba(0,157,177,0.8)]"
                  >
                    <ExternalLink size={28} />
                  </motion.div>
                </div>
              </div>
              <div className="text-primary text-xs font-bold tracking-widest uppercase mb-3 flex items-center gap-2">
                <span className="w-6 h-px bg-primary"></span>
                {project.category}
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 uppercase tracking-wider group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {project.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  );
};

export default Portfolio;
