const Service = require('../models/Service');
const asyncHandler = require('../middlewares/async');
const mongoose = require('mongoose');

const isDBConnected = () => mongoose.connection.readyState === 1;

let inMemoryServices = [
  { _id: 'srv-1', icon: 'Code', title: 'Web & Software Development', description: 'Custom scalable web applications, enterprise software solutions, and robust APIs tailored to your business needs.' },
  { _id: 'srv-2', icon: 'PenTool', title: 'Graphic Design', description: 'Stunning visual identities, UI/UX design, branding, and marketing materials that captivate your audience.' },
  { _id: 'srv-3', icon: 'BrainCircuit', title: 'AI & Data Solutions', description: 'Intelligent automation, machine learning models, and data-driven insights to accelerate your growth.' },
  { _id: 'srv-4', icon: 'LineChart', title: 'Consultation & Strategy', description: 'Expert guidance to navigate digital transformation, optimize workflows, and scale your tech infrastructure.' },
  { _id: 'srv-5', icon: 'Smartphone', title: 'Mobile App Development', description: 'High-performance iOS and Android applications built with modern frameworks for seamless user experiences.' },
  { _id: 'srv-6', icon: 'Cloud', title: 'Cloud & DevOps', description: 'Scalable cloud architecture, CI/CD pipelines, and infrastructure management on AWS, Azure, and Google Cloud.' },
  { _id: 'srv-7', icon: 'Shield', title: 'Cybersecurity', description: 'Comprehensive security audits, vulnerability assessments, and robust protection for your digital assets.' },
  { _id: 'srv-8', icon: 'Database', title: 'Database Management', description: 'Optimized database design, migration, and maintenance ensuring data integrity and high availability.' }
];

// @desc    Get all services
// @route   GET /api/services
// @access  Public
exports.getServices = asyncHandler(async (req, res, next) => {
  if (isDBConnected()) {
    try {
      const services = await Service.find().sort({ order: 1, createdAt: -1 });
      return res.status(200).json({
        success: true,
        count: services.length,
        data: services
      });
    } catch (err) {
      console.warn('DB query failed in getServices, using fallback:', err.message);
    }
  }

  res.status(200).json({
    success: true,
    count: inMemoryServices.length,
    data: inMemoryServices
  });
});

// @desc    Get single service
// @route   GET /api/services/:id
// @access  Public
exports.getService = asyncHandler(async (req, res, next) => {
  if (isDBConnected()) {
    try {
      const service = await Service.findById(req.params.id);
      if (service) {
        return res.status(200).json({ success: true, data: service });
      }
    } catch (err) {
      console.warn('DB query failed in getService, using fallback:', err.message);
    }
  }

  const item = inMemoryServices.find(s => s._id === req.params.id);
  if (!item) {
    return res.status(404).json({ success: false, error: 'Service not found' });
  }

  res.status(200).json({ success: true, data: item });
});

// @desc    Create new service
// @route   POST /api/services
// @access  Private
exports.createService = asyncHandler(async (req, res, next) => {
  if (isDBConnected()) {
    try {
      const service = await Service.create(req.body);
      return res.status(201).json({ success: true, data: service });
    } catch (err) {
      console.warn('DB create failed in createService, using fallback:', err.message);
    }
  }

  const newItem = { _id: 'srv-' + Date.now(), ...req.body };
  inMemoryServices.unshift(newItem);
  res.status(201).json({ success: true, data: newItem });
});

// @desc    Update service
// @route   PUT /api/services/:id
// @access  Private
exports.updateService = asyncHandler(async (req, res, next) => {
  if (isDBConnected()) {
    try {
      let service = await Service.findById(req.params.id);
      if (service) {
        service = await Service.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true
        });
        return res.status(200).json({ success: true, data: service });
      }
    } catch (err) {
      console.warn('DB update failed in updateService, using fallback:', err.message);
    }
  }

  const index = inMemoryServices.findIndex(s => s._id === req.params.id);
  if (index !== -1) {
    inMemoryServices[index] = { ...inMemoryServices[index], ...req.body };
    return res.status(200).json({ success: true, data: inMemoryServices[index] });
  }

  const updatedItem = { _id: req.params.id, ...req.body };
  inMemoryServices.unshift(updatedItem);
  res.status(200).json({ success: true, data: updatedItem });
});

// @desc    Delete service
// @route   DELETE /api/services/:id
// @access  Private
exports.deleteService = asyncHandler(async (req, res, next) => {
  if (isDBConnected()) {
    try {
      const service = await Service.findById(req.params.id);
      if (service) {
        await service.deleteOne();
        return res.status(200).json({ success: true, data: {} });
      }
    } catch (err) {
      console.warn('DB delete failed in deleteService, using fallback:', err.message);
    }
  }

  inMemoryServices = inMemoryServices.filter(s => s._id !== req.params.id);
  res.status(200).json({ success: true, data: {} });
});

// @desc    Reorder services
// @route   PUT /api/services/reorder
// @access  Private/Admin
exports.reorderServices = asyncHandler(async (req, res, next) => {
  const { orderedIds } = req.body;
  if (Array.isArray(orderedIds)) {
    if (isDBConnected()) {
      try {
        for (let i = 0; i < orderedIds.length; i++) {
          await Service.findByIdAndUpdate(orderedIds[i], { order: i });
        }
      } catch (err) {
        console.warn('DB reorder failed in services:', err.message);
      }
    }

    const map = new Map(inMemoryServices.map(s => [s._id, s]));
    const reordered = [];
    orderedIds.forEach(id => {
      if (map.has(id)) {
        reordered.push(map.get(id));
        map.delete(id);
      }
    });
    inMemoryServices = [...reordered, ...map.values()];
  }

  res.status(200).json({ success: true, data: inMemoryServices });
});
