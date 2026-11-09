import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Clock, ArrowRight, CheckCircle2, Send, Sparkles, Upload, AlertCircle } from 'lucide-react';
import { api } from '../services/api';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const Careers = () => {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedJob, setSelectedJob] = useState(null);
  const [applied, setApplied] = useState(false);
  const [cvFile, setCvFile] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchCareersData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await api.getCareers();
        if (isMounted) {
          const list = Array.isArray(data) ? data : [];
          setCareers(list.filter(c => c.isActive !== false));
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load career listings at this time.');
          setCareers([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    fetchCareersData();
    return () => { isMounted = false; };
  }, []);

  const departments = ['All', ...new Set(careers.map(c => c.department || 'Engineering'))];

  const filteredCareers = selectedDept === 'All'
    ? careers
    : careers.filter(c => c.department === selectedDept);

  const handleApply = (e) => {
    e.preventDefault();
    setApplied(true);
    setTimeout(() => {
      setApplied(false);
      setSelectedJob(null);
      setCvFile(null);
    }, 2500);
  };

  return (
    <div className="bg-[#022b3a] min-h-screen pt-12 pb-24 relative overflow-hidden text-slate-200">
      {/* Background Glow Effects */}
      <div className="absolute top-1/4 left-1/2 w-[700px] h-[700px] bg-primary/5 rounded-full blur-[140px] -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 pt-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1 border border-primary text-primary text-sm font-bold tracking-widest uppercase mb-6 bg-primary/10 shadow-[0_0_15px_rgba(31,122,140,0.3)]"
          >
            <Sparkles size={16} /> Join The Team
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 uppercase tracking-wider"
          >
            Careers at Overclock
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-3xl mx-auto text-lg leading-relaxed"
          >
            We are looking for bold thinkers, fast executioners, and passionate creators ready to push the frontiers of technology. Explore open positions below.
          </motion.p>
        </div>

        {/* Department Filter Tabs */}
        {departments.length > 1 && (
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-5 py-2 rounded text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  selectedDept === dept
                    ? 'bg-primary text-[#022b3a] shadow-[0_0_15px_rgba(31,122,140,0.4)]'
                    : 'bg-[#0e3a4b] text-slate-300 hover:bg-[#0e3a4b]/80 border border-primary/20'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        )}

        {/* Loading / Error / Empty / Listings States */}
        {loading ? (
          <div className="text-center py-20 text-slate-400 font-medium animate-pulse flex items-center justify-center gap-3">
            <span className="w-3 h-3 bg-primary rounded-full animate-ping"></span>
            Loading positions...
          </div>
        ) : error ? (
          <div className="max-w-md mx-auto text-center py-12 px-6 bg-[#0e3a4b] border border-red-500/30 text-rose-300">
            <AlertCircle size={36} className="mx-auto mb-3 text-rose-400" />
            <p className="font-semibold">{error}</p>
          </div>
        ) : filteredCareers.length === 0 ? (
          <div className="text-center py-16 bg-[#0e3a4b]/40 border border-primary/20 p-8 rounded text-slate-400 max-w-lg mx-auto">
            No open positions currently available. Please check back soon.
          </div>
        ) : (
          /* Job Listings Grid */
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-6"
          >
            {filteredCareers.map((job) => (
              <motion.div
                key={job._id}
                variants={itemVariants}
                className="bg-[#0e3a4b] p-8 border-l-4 border-primary hover:border-white transition-all duration-300 shadow-lg group relative overflow-hidden"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="bg-primary/10 border border-primary/40 text-primary text-xs font-bold px-3 py-1 uppercase tracking-widest">
                        {job.department}
                      </span>
                      <span className="flex items-center gap-1 text-slate-400 text-xs font-medium">
                        <MapPin size={14} className="text-primary" /> {job.location}
                      </span>
                      <span className="flex items-center gap-1 text-slate-400 text-xs font-medium">
                        <Clock size={14} className="text-primary" /> {job.type}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white uppercase tracking-wider group-hover:text-primary transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-slate-300 mt-2 leading-relaxed text-sm max-w-4xl">
                      {job.description}
                    </p>

                    {/* Requirements List */}
                    {job.requirements && job.requirements.length > 0 && (
                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-400">
                        {job.requirements.map((req, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <CheckCircle2 size={14} className="text-primary mt-0.5 shrink-0" />
                            <span>{req}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="shrink-0 flex items-center">
                    <button
                      onClick={() => setSelectedJob(job)}
                      className="bg-primary text-[#022b3a] px-6 py-3 rounded font-bold hover:bg-white transition-all duration-300 text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(31,122,140,0.4)] flex items-center gap-2"
                    >
                      Apply Now <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Application Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0e3a4b] border border-primary/40 p-6 sm:p-8 w-full sm:max-w-lg max-h-[90vh] overflow-y-auto relative shadow-[0_0_40px_rgba(31,122,140,0.4)] rounded-t-2xl sm:rounded-none">
            <h3 className="text-xl font-bold text-white uppercase tracking-wider mb-1">
              Apply for {selectedJob.title}
            </h3>
            <p className="text-xs text-primary tracking-widest uppercase mb-6">
              {selectedJob.department} &bull; {selectedJob.location}
            </p>

            {applied ? (
              <div className="py-12 text-center text-primary font-bold uppercase tracking-wider space-y-2">
                <CheckCircle2 size={48} className="mx-auto text-primary animate-bounce" />
                <p className="text-lg">Application Submitted!</p>
                <p className="text-xs text-slate-300 font-normal">Our talent acquisition team will be in touch soon.</p>
              </div>
            ) : (
              <form onSubmit={handleApply} className="space-y-4 text-sm">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-slate-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    className="w-full bg-[#022b3a] border border-slate-700 focus:border-primary p-3 text-white outline-none rounded-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-slate-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    className="w-full bg-[#022b3a] border border-slate-700 focus:border-primary p-3 text-white outline-none rounded-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-slate-300 mb-1">Portfolio / LinkedIn URL</label>
                  <input
                    type="url"
                    required
                    placeholder="https://linkedin.com/in/johndoe"
                    className="w-full bg-[#022b3a] border border-slate-700 focus:border-primary p-3 text-white outline-none rounded-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-slate-300 mb-1">Cover Note</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us why you are a great fit..."
                    className="w-full bg-[#022b3a] border border-slate-700 focus:border-primary p-3 text-white outline-none rounded-none"
                  />
                </div>

                {/* CV / Resume Upload */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-slate-300 mb-2">CV / Resume</label>
                  <label
                    htmlFor="cv-upload"
                    className="flex items-center justify-between gap-3 w-full bg-[#022b3a] border border-dashed border-primary/50 hover:border-primary p-3 cursor-pointer transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3">
                      <Upload size={18} className="text-primary group-hover:scale-110 transition-transform shrink-0" />
                      <span className="text-slate-400 text-xs truncate">
                        {cvFile ? cvFile.name : 'Click to upload PDF, DOC, or DOCX'}
                      </span>
                    </div>
                    <span className="text-[10px] text-primary/70 uppercase tracking-wider font-bold shrink-0">Max 5MB</span>
                  </label>
                  <input
                    id="cv-upload"
                    type="file"
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    className="hidden"
                    onChange={(e) => setCvFile(e.target.files?.[0] || null)}
                  />
                  {cvFile && (
                    <p className="text-[10px] text-primary mt-1 tracking-wider">
                      ✓ {cvFile.name} ({(cvFile.size / 1024).toFixed(0)} KB)
                    </p>
                  )}
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-700">
                  <button
                    type="button"
                    onClick={() => { setSelectedJob(null); setCvFile(null); }}
                    className="px-5 py-2 border border-slate-600 text-slate-300 hover:text-white uppercase tracking-wider text-xs font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-primary text-[#022b3a] hover:bg-white uppercase tracking-wider text-xs font-bold transition-all flex items-center gap-2"
                  >
                    <Send size={14} /> Submit Application
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Careers;
