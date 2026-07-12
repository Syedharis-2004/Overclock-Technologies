import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';

// Placeholders for other pages
const Portfolio = () => <div className="p-20 text-2xl">Portfolio Page</div>;
const Blog = () => <div className="p-20 text-2xl">Blog Page</div>;
const Careers = () => <div className="p-20 text-2xl">Careers Page</div>;
const Contact = () => <div className="p-20 text-2xl">Contact Page</div>;

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="blog" element={<Blog />} />
        <Route path="careers" element={<Careers />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}

export default App;
