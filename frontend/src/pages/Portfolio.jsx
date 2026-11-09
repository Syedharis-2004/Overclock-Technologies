import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Code2, AlertCircle } from 'lucide-react';
import { api } from '../services/api';

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
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchPortfolioData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await api.getPortfolio();
        if (isMounted) {
          setProjects(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load portfolio projects at this time.');
          setProjects([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    fetchPortfolioData();
    return () => { isMounted = false; };
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

        {/* Portfolio Grid / States */}
        {loading ? (
          <div className="text-center py-20 text-slate-400 font-medium animate-pulse flex items-center justify-center gap-3">
            <span className="w-3 h-3 bg-primary rounded-full animate-ping"></span>
            Loading portfolio...
          </div>
        ) : error ? (
          <div className="max-w-md mx-auto text-center py-12 px-6 bg-[#0e3a4b] border border-red-500/30 text-rose-300">
            <AlertCircle size={36} className="mx-auto mb-3 text-rose-400" />
            <p className="font-semibold">{error}</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 text-slate-400 font-medium bg-[#0e3a4b]/50 border border-slate-700/50 p-8 max-w-lg mx-auto">
            No portfolio projects to display currently. Check back soon.
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
                      {project.liveDemoUrl && project.liveDemoUrl !== '#' && (
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
                      {project.githubUrl && project.githubUrl !== '#' && (
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
