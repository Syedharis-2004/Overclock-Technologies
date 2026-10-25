import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Code2 } from 'lucide-react';
import { api } from '../services/api';

const defaultProjects = [
  {
    _id: 'def-port-1',
    title: "NexGen ERP System",
    category: "Enterprise Software",
    description: "A comprehensive cloud-based ERP solution for a manufacturing giant, increasing operational efficiency by 40%.",
    technologies: ["React", "Node.js", "PostgreSQL", "Docker"],
    imageUrl: "",
    liveDemoUrl: "#",
    githubUrl: "#"
  },
  {
    _id: 'def-port-2',
    title: "FinTech Mobile Wallet",
    category: "Mobile App",
    description: "A highly secure and intuitive mobile wallet application supporting crypto and fiat currencies for over 1M users.",
    technologies: ["React Native", "TypeScript", "Node.js", "MongoDB"],
    imageUrl: "",
    liveDemoUrl: "#",
    githubUrl: "#"
  },
  {
    _id: 'def-port-3',
    title: "AI Predictive Analytics Dashboard",
    category: "Data & AI",
    description: "Custom dashboard utilizing machine learning models to forecast retail sales trends with 95% accuracy.",
    technologies: ["Python", "PyTorch", "React", "FastAPI"],
    imageUrl: "",
    liveDemoUrl: "#",
    githubUrl: "#"
  },
  {
    _id: 'def-port-4',
    title: "Global E-Commerce Platform",
    category: "Web Development",
    description: "Scalable e-commerce architecture built on microservices, handling 10k+ concurrent transactions during peak sales.",
    technologies: ["Next.js", "GraphQL", "Redis", "AWS"],
    imageUrl: "",
    liveDemoUrl: "#",
    githubUrl: "#"
  },
  {
    _id: 'def-port-5',
    title: "Smart Logistics Tracker",
    category: "IoT & Cloud",
    description: "Real-time supply chain tracking system integrating IoT sensors with a robust cloud backend.",
    technologies: ["Go", "MQTT", "React", "GCP"],
    imageUrl: "",
    liveDemoUrl: "#",
    githubUrl: "#"
  },
  {
    _id: 'def-port-6',
    title: "Brand Identity Redesign",
    category: "Graphic Design",
    description: "Complete visual overhaul for a tech startup, resulting in a 200% increase in brand recognition and user trust.",
    technologies: ["Figma", "UI/UX", "3D Rendering"],
    imageUrl: "",
    liveDemoUrl: "#",
    githubUrl: "#"
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
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const data = await api.getPortfolio();
        const deletedIds = new Set(
          JSON.parse(localStorage.getItem('overclock_deleted_portfolio_ids') || '[]')
        );
        if (Array.isArray(data)) {
          setProjects(data.filter(p => !deletedIds.has(p._id)));
        } else {
          setProjects([]);
        }
      } catch (err) {
        console.warn('Backend API connection failed, using local/empty portfolio data:', err);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolioData();
  }, []);

  return (
    <div className="bg-[#022b3a] min-h-screen pt-12 pb-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-1/4 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-20 pt-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1 border border-primary text-primary text-sm font-bold tracking-widest uppercase mb-6 bg-primary/10 shadow-[0_0_15px_rgba(31,122,140,0.3)]"
          >
            Our Work
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 uppercase tracking-wider"
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
        {loading ? (
          <div className="text-center py-20 text-slate-400 font-medium animate-pulse">
            Loading portfolio...
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-10"
          >
            {projects.map((project, index) => (
              <motion.div 
                key={project._id || index}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-video bg-[#0e3a4b] mb-6 overflow-hidden border-2 border-transparent group-hover:border-primary transition-all duration-300 relative shadow-lg group-hover:shadow-[0_0_30px_rgba(31,122,140,0.4)]">
                    {project.imageUrl ? (
                      <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-700 bg-gradient-to-br from-[#0e3a4b] to-[#022b3a]">
                        <span className="text-slate-600 font-bold text-2xl group-hover:text-primary transition-colors uppercase tracking-widest px-4 text-center">
                          {project.title}
                        </span>
                      </div>
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#022b3a]/90 to-[#022b3a]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                      {project.liveDemoUrl && (
                        <a 
                          href={project.liveDemoUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="p-3 rounded-full bg-primary text-[#022b3a] hover:bg-white shadow-[0_0_20px_rgba(31,122,140,0.8)] transition-all"
                          title="Live Demo"
                        >
                          <ExternalLink size={24} />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a 
                          href={project.githubUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="p-3 rounded-full bg-[#0e3a4b] text-white hover:text-primary border border-primary/40 shadow-lg transition-all"
                          title="View Code"
                        >
                          <Code2 size={24} />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="text-primary text-xs font-bold tracking-widest uppercase mb-3 flex items-center gap-2">
                    <span className="w-6 h-px bg-primary"></span>
                    {project.category}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 uppercase tracking-wider group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    {project.description || project.desc}
                  </p>
                </div>

                {/* Tech Pills */}
                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-3 border-t border-[#0e3a4b]">
                    {project.technologies.map((tech, tIdx) => (
                      <span key={tIdx} className="text-[10px] font-bold uppercase tracking-wider text-slate-300 bg-[#022b3a] px-2.5 py-1 border border-slate-700/60">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default Portfolio;
