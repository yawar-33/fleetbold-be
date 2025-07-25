const db = require('../models');
const ServicesHeader = db.servicesHeader;
const Service = db.service;

// Get complete membership section (header + benefits)
exports.getCompleteServicesSection = async (_req, res) => {
  try {
    let header = await ServicesHeader.findOne({ isActive: true }).populate('services');
    
    // If no header exists, create default one
    if (!header) {
      const allServices = await Service.find();
      const serviceIds = allServices.map(service => service._id);
      
      header = new ServicesHeader({
        headerTitle: ' One Stop Design Solution',
        headerDescription: 'From web design to branding, our expert team delivers creative solutions that elevate your brand and captivate your audience.',
        services: serviceIds,
        isActive: true
      });
      await header.save();
      await header.populate('services');
    }
    
    res.status(200).json({
      message: 'Data fetched successfully!',
      data: {
        headerTitle: header.headerTitle,
        headerDescription: header.headerDescription,
        services: header.services
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update only header content (title and description)
exports.updateHeader = async (_req, res) => {
  try {
    const { headerTitle, headerDescription } = _req.body;
    
    if (!headerTitle || !headerDescription) {
      throw new Error('headerTitle and headerDescription are required');
    }
    
    let header = await ServicesHeader.findOne({ isActive: true });
    
    if (!header) {
      // If no header exists, create one with current services
      const allServices = await Service.find();
      const serviceIds = allServices.map(service => service._id);
      
      header = new ServicesHeader({
        headerTitle,
        headerDescription,
        services: serviceIds,
        isActive: true
      });
    } else {
      header.headerTitle = headerTitle;
      header.headerDescription = headerDescription;
    }
    
    await header.save();
    
    res.status(200).json({ message: 'Header updated successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 

// Get only header content
exports.getHeader = async (_req, res) => {
  try {
    let header = await ServicesHeader.findOne({ isActive: true });
    
    if (!header) {
      header = {
        headerTitle: ' One Stop Design Solution',
        headerDescription: 'From web design to branding, our expert team delivers creative solutions that elevate your brand and captivate your audience.'
      };
    }
    
    res.status(200).json({
      message: 'Header data fetched successfully!',
      data: {
        headerTitle: header.headerTitle,
        headerDescription: header.headerDescription
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Manually reorder benefits in header (optional)
exports.reorderBenefits = async (_req, res) => {
  try {
    const { serviceIds } = _req.body; // Array of service IDs in desired order
    
    if (!Array.isArray(serviceIds)) {
      throw new Error('serviceIds must be an array');
    }
    
    let header = await ServicesHeader.findOne({ isActive: true });
    
    if (!header) {
      return res.status(404).json({ message: 'Header not found' });
    }
    
    // Validate that all provided IDs exist in services
    const existingServices = await Service.find({ _id: { $in: serviceIds } });
    if (existingServices.length !== serviceIds.length) {
      throw new Error('Some service IDs are invalid');
    }
    
    header.services = serviceIds;
    await header.save();
    
    res.status(200).json({ message: 'Services reordered successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};