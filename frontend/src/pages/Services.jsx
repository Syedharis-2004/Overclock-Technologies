const Services = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h1 className="text-4xl font-bold text-primary dark:text-accent mb-6">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        <div className="p-6 bg-white dark:bg-slate-800 shadow-lg rounded-lg">
          <h3 className="text-xl font-bold mb-2">Web Development</h3>
          <p className="text-slate-600 dark:text-slate-400">Custom web applications using MERN stack.</p>
        </div>
        <div className="p-6 bg-white dark:bg-slate-800 shadow-lg rounded-lg">
          <h3 className="text-xl font-bold mb-2">Mobile Apps</h3>
          <p className="text-slate-600 dark:text-slate-400">Native and cross-platform mobile experiences.</p>
        </div>
        <div className="p-6 bg-white dark:bg-slate-800 shadow-lg rounded-lg">
          <h3 className="text-xl font-bold mb-2">AI Solutions</h3>
          <p className="text-slate-600 dark:text-slate-400">Integrating machine learning into your workflow.</p>
        </div>
      </div>
    </div>
  );
};
export default Services;
