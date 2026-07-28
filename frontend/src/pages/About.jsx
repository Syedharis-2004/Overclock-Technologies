import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, Zap, Users, Globe, Share2 } from 'lucide-react';
import { api } from '../services/api';

const defaultTeam = [
  {
    _id: 'def-1',
    name: 'Alex Mercer',
    role: 'CEO & Founder',
    bio: 'Visionary technology leader with 15+ years experience building enterprise systems.',
    imageUrl: '',
    linkedin: '#',
    twitter: '#'
  },
  {
    _id: 'def-2',
    name: 'Sophia Chen',
    role: 'Chief Technology Officer',
    bio: 'Expert in distributed cloud architecture, AI systems, and scalable backend platforms.',
    imageUrl: '',
    linkedin: '#',
    twitter: '#'
  },
  {
    _id: 'def-3',
    name: 'David Vance',
    role: 'VP of Engineering',
    bio: 'Specialist in agile engineering practices, continuous delivery, and system security.',
    imageUrl: '',
    linkedin: '#',
    twitter: '#'
  },
  {
    _id: 'def-4',
    name: 'Elena Rostova',
    role: 'Head of Product & Design',
    bio: 'Award-winning product strategist crafting modern visual aesthetics and intuitive UX.',
    imageUrl: '',
    linkedin: '#',
    twitter: '#'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const About = () => {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const data = await api.getTeam();
        if (data && data.length > 0) {
          setTeam(data);
        } else {
          setTeam(defaultTeam);
        }
      } catch (err) {
        console.warn('Backend API connection failed, using default team data:', err);
        setTeam(defaultTeam);
      }
    };
    fetchTeamMembers();
  }, []);

  return (
    <div className="bg-[#022b3a] min-h-screen pt-12 pb-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-20 pt-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1 border border-primary text-primary text-sm font-bold tracking-widest uppercase mb-6 bg-primary/10 shadow-[0_0_15px_rgba(31,122,140,0.3)]"
          >
            About Us
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 uppercase tracking-wider"
          >
            Powering the Digital Future
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-3xl mx-auto text-lg leading-relaxed"
          >
            Overclock Technologies was founded on a simple principle: to build software that runs faster, scales better, and looks incredible. We are a team of engineers, designers, and strategists dedicated to pushing the boundaries of what's possible in the digital space.
          </motion.p>
        </div>

        {/* Values Section */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-24 md:mb-32"
        >
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -10, boxShadow: "0 15px 30px -10px rgba(31, 122, 140, 0.4)", borderColor: "var(--color-primary)" }}
            className="bg-[#0e3a4b] p-8 border-t-2 border-primary/50 hover:border-primary transition-all duration-300 group cursor-default"
          >
            <Zap size={40} className="text-primary mb-6 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wider group-hover:text-primary transition-colors">Fast Execution</h3>
            <p className="text-slate-400 leading-relaxed">
              We believe in rapid iteration and agile methodologies. We deliver high-quality solutions quickly without compromising on performance or security.
            </p>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -10, boxShadow: "0 15px 30px -10px rgba(31, 122, 140, 0.4)", borderColor: "var(--color-primary)" }}
            className="bg-[#0e3a4b] p-8 border-t-2 border-primary/50 hover:border-primary transition-all duration-300 group cursor-default"
          >
            <Target size={40} className="text-primary mb-6 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wider group-hover:text-primary transition-colors">Precision Engineering</h3>
            <p className="text-slate-400 leading-relaxed">
              Every line of code is written with purpose. We architect systems that are robust, maintainable, and built to handle scale from day one.
            </p>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -10, boxShadow: "0 15px 30px -10px rgba(31, 122, 140, 0.4)", borderColor: "var(--color-primary)" }}
            className="bg-[#0e3a4b] p-8 border-t-2 border-primary/50 hover:border-primary transition-all duration-300 group cursor-default"
          >
            <Users size={40} className="text-primary mb-6 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wider group-hover:text-primary transition-colors">Client-Centric</h3>
            <p className="text-slate-400 leading-relaxed">
              Your success is our success. We partner closely with our clients, ensuring transparency, communication, and alignment with your business goals.
            </p>
          </motion.div>
        </motion.div>

        {/* Leadership Team Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4 uppercase tracking-wider">Leadership Team</h2>
            <div className="w-20 h-1 bg-primary mx-auto shadow-[0_0_10px_rgba(0,157,177,0.8)]"></div>
          </div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"
          >
            {team.map((member, index) => (
              <motion.div 
                key={member._id || index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="group cursor-pointer"
              >
                <div className="aspect-square bg-[#0e3a4b] mb-5 overflow-hidden border-2 border-transparent group-hover:border-primary transition-all duration-300 flex items-center justify-center relative shadow-lg group-hover:shadow-[0_0_25px_rgba(31,122,140,0.4)]">
                  {member.imageUrl ? (
                    <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-[#0e3a4b] to-[#022b3a]">
                      <span className="text-slate-500 font-bold text-4xl group-hover:text-primary transition-colors duration-300">
                        {member.name ? member.name.split(' ').map(n => n[0]).join('') : `T${index + 1}`}
                      </span>
                    </div>
                  )}
                  {/* Subtle overlay on hover */}
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                    <div className="flex gap-3">
                      {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noreferrer" className="p-2 bg-[#022b3a] text-primary hover:text-white rounded-full transition-colors" title="LinkedIn">
                          <Globe size={16} />
                        </a>
                      )}
                      {member.twitter && (
                        <a href={member.twitter} target="_blank" rel="noreferrer" className="p-2 bg-[#022b3a] text-primary hover:text-white rounded-full transition-colors" title="Twitter">
                          <Share2 size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <h4 className="text-lg font-bold text-white uppercase tracking-wider group-hover:text-primary transition-colors">{member.name}</h4>
                <p className="text-primary text-xs font-semibold tracking-widest uppercase mt-1">{member.role}</p>
                {member.bio && <p className="text-slate-400 text-xs mt-2 leading-relaxed">{member.bio}</p>}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
};

export default About;
