import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center px-4"
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-primary dark:text-accent">
          Innovating the Future
        </h1>
        <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
          We build modern, scalable, and secure digital solutions for startups and enterprises worldwide.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/services" className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors">
            Our Services
          </Link>
          <Link to="/contact" className="border-2 border-primary text-primary dark:text-white dark:border-white px-8 py-3 rounded-full font-semibold hover:bg-primary hover:text-white dark:hover:bg-white dark:hover:text-secondary transition-colors">
            Book Consultation
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
