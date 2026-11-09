const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const User = require('./models/User');
const Service = require('./models/Service');
const Portfolio = require('./models/Portfolio');
const Career = require('./models/Career');
const Team = require('./models/Team');

const defaultServices = [
  {
    icon: 'Code',
    title: 'Web & Software Development',
    description: 'Custom scalable web applications, enterprise software solutions, and robust APIs tailored to your business needs.',
    order: 0
  },
  {
    icon: 'PenTool',
    title: 'Graphic Design',
    description: 'Stunning visual identities, UI/UX design, branding, and marketing materials that captivate your audience.',
    order: 1
  },
  {
    icon: 'BrainCircuit',
    title: 'AI & Data Solutions',
    description: 'Intelligent automation, machine learning models, and data-driven insights to accelerate your growth.',
    order: 2
  },
  {
    icon: 'LineChart',
    title: 'Consultation & Strategy',
    description: 'Expert guidance to navigate digital transformation, optimize workflows, and scale your tech infrastructure.',
    order: 3
  },
  {
    icon: 'Smartphone',
    title: 'Mobile App Development',
    description: 'High-performance iOS and Android applications built with modern frameworks for seamless user experiences.',
    order: 4
  },
  {
    icon: 'Cloud',
    title: 'Cloud & DevOps',
    description: 'Scalable cloud architecture, CI/CD pipelines, and infrastructure management on AWS, Azure, and Google Cloud.',
    order: 5
  },
  {
    icon: 'Shield',
    title: 'Cybersecurity',
    description: 'Comprehensive security audits, vulnerability assessments, and robust protection for your digital assets.',
    order: 6
  },
  {
    icon: 'Database',
    title: 'Database Management',
    description: 'Optimized database design, migration, and maintenance ensuring data integrity and high availability.',
    order: 7
  }
];

const defaultProjects = [
  {
    title: 'NexGen ERP System',
    category: 'Enterprise Software',
    description: 'A comprehensive cloud-based ERP solution for a manufacturing giant, increasing operational efficiency by 40%.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
    imageUrl: '',
    liveDemoUrl: '#',
    githubUrl: '#',
    order: 0
  },
  {
    title: 'FinTech Mobile Wallet',
    category: 'Mobile App',
    description: 'A highly secure and intuitive mobile wallet application supporting crypto and fiat currencies for over 1M users.',
    technologies: ['React Native', 'TypeScript', 'Node.js', 'MongoDB'],
    imageUrl: '',
    liveDemoUrl: '#',
    githubUrl: '#',
    order: 1
  },
  {
    title: 'AI Predictive Analytics Dashboard',
    category: 'Data & AI',
    description: 'Custom dashboard utilizing machine learning models to forecast retail sales trends with 95% accuracy.',
    technologies: ['Python', 'PyTorch', 'React', 'FastAPI'],
    imageUrl: '',
    liveDemoUrl: '#',
    githubUrl: '#',
    order: 2
  },
  {
    title: 'Global E-Commerce Platform',
    category: 'Web Development',
    description: 'Scalable e-commerce architecture built on microservices, handling 10k+ concurrent transactions during peak sales.',
    technologies: ['Next.js', 'GraphQL', 'Redis', 'AWS'],
    imageUrl: '',
    liveDemoUrl: '#',
    githubUrl: '#',
    order: 3
  },
  {
    title: 'Smart Logistics Tracker',
    category: 'IoT & Cloud',
    description: 'Real-time supply chain tracking system integrating IoT sensors with a robust cloud backend.',
    technologies: ['Go', 'MQTT', 'React', 'GCP'],
    imageUrl: '',
    liveDemoUrl: '#',
    githubUrl: '#',
    order: 4
  },
  {
    title: 'Brand Identity Redesign',
    category: 'Graphic Design',
    description: 'Complete visual overhaul for a tech startup, resulting in a 200% increase in brand recognition and user trust.',
    technologies: ['Figma', 'UI/UX', '3D Rendering'],
    imageUrl: '',
    liveDemoUrl: '#',
    githubUrl: '#',
    order: 5
  }
];

const defaultCareers = [
  {
    title: 'Senior Full Stack Engineer',
    department: 'Engineering',
    location: 'Remote / Silicon Valley',
    type: 'Full-time',
    description: 'We are looking for a Senior Full Stack Engineer to lead the architecture and development of scalable web services and cloud architectures.',
    requirements: [
      '5+ years experience with React, Node.js, and TypeScript',
      'Strong knowledge of GraphQL, RESTful APIs, and microservices architecture',
      'Experience with AWS or GCP cloud deployments',
      'Passion for high performance and clean code'
    ],
    isActive: true,
    order: 0
  },
  {
    title: 'AI / Machine Learning Engineer',
    department: 'Artificial Intelligence',
    location: 'Remote',
    type: 'Full-time',
    description: 'Join our AI team to design, train, and deploy next-generation LLM and machine learning models for enterprise data platforms.',
    requirements: [
      '3+ years experience with Python, PyTorch, or TensorFlow',
      'Experience with RAG pipeline architectures and vector databases',
      'Strong background in mathematical modeling and data pipelines',
      'Published research or open source contributions are a plus'
    ],
    isActive: true,
    order: 1
  },
  {
    title: 'Lead UI/UX Product Designer',
    department: 'Design',
    location: 'On-site / Hybrid',
    type: 'Full-time',
    description: 'Create ultra-modern, high-impact user experiences for enterprise software and consumer digital products.',
    requirements: [
      '4+ years of UX/UI design experience for complex web & mobile products',
      'Mastery of Figma, design systems, and rapid interactive prototyping',
      'Deep understanding of micro-interactions and accessibility standards',
      'Strong visual portfolio showcasing modern aesthetic execution'
    ],
    isActive: true,
    order: 2
  },
  {
    title: 'DevOps & Infrastructure Architect',
    department: 'Infrastructure',
    location: 'Remote',
    type: 'Full-time',
    description: 'Architect automated deployment pipelines, Kubernetes clusters, and zero-downtime infrastructure for high-scale applications.',
    requirements: [
      'Experience with Docker, Kubernetes, Terraform, and CI/CD pipelines',
      'Proficiency in Cloud Security, Monitoring (Prometheus/Grafana), and Disaster Recovery',
      'Strong scripting ability in Bash or Python'
    ],
    isActive: true,
    order: 3
  }
];

const defaultTeam = [
  {
    name: 'Alex Mercer',
    role: 'CEO & Founder',
    bio: 'Visionary technology leader with 15+ years experience building enterprise systems.',
    imageUrl: '',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    order: 0
  },
  {
    name: 'Sophia Chen',
    role: 'Chief Technology Officer',
    bio: 'Expert in distributed cloud architecture, AI systems, and scalable backend platforms.',
    imageUrl: '',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    order: 1
  },
  {
    name: 'David Vance',
    role: 'VP of Engineering',
    bio: 'Specialist in agile engineering practices, continuous delivery, and system security.',
    imageUrl: '',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    order: 2
  },
  {
    name: 'Elena Rostova',
    role: 'Head of Product & Design',
    bio: 'Award-winning product strategist crafting modern visual aesthetics and intuitive UX.',
    imageUrl: '',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    order: 3
  }
];

const seedData = async () => {
  const adminEmail = 'admin@overclock.com';
  const existingAdmin = await User.findOne({ email: adminEmail });
  if (!existingAdmin) {
    await User.create({
      name: 'Super Admin',
      email: adminEmail,
      password: 'Ot@54321',
      role: 'admin'
    });
    console.log('Admin user seeded: admin@overclock.com');
  }

  const serviceCount = await Service.countDocuments();
  if (serviceCount === 0) {
    await Service.insertMany(defaultServices);
    console.log(`Seeded ${defaultServices.length} default services`);
  }

  const projectCount = await Portfolio.countDocuments();
  if (projectCount === 0) {
    await Portfolio.insertMany(defaultProjects);
    console.log(`Seeded ${defaultProjects.length} default portfolio projects`);
  }

  const careerCount = await Career.countDocuments();
  if (careerCount === 0) {
    await Career.insertMany(defaultCareers);
    console.log(`Seeded ${defaultCareers.length} default careers`);
  }

  const teamCount = await Team.countDocuments();
  if (teamCount === 0) {
    await Team.insertMany(defaultTeam);
    console.log(`Seeded ${defaultTeam.length} default team members`);
  }
};

const destroyData = async () => {
  await Service.deleteMany();
  await Portfolio.deleteMany();
  await Career.deleteMany();
  await Team.deleteMany();
  await User.deleteMany();
  console.log('All data destroyed!');
};

if (require.main === module) {
  const run = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log('Connected to MongoDB for Seeder...');

      if (process.argv[2] === '-d') {
        await destroyData();
      } else {
        await seedData();
      }
      process.exit(0);
    } catch (err) {
      console.error('Seeder error:', err.message);
      process.exit(1);
    }
  };
  run();
}

module.exports = {
  seedData,
  destroyData,
  defaultServices,
  defaultProjects,
  defaultCareers,
  defaultTeam
};
