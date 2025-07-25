const db = require('../models');
const FAQheader = db.faqHeader;
const FAQ = db.faq;

// Get complete membership section (header + benefits)
exports.getCompleteFAQSection = async (_req, res) => {
  try {
    let header = await FAQheader.findOne({ isActive: true }).populate('faqs');
    
    // If no header exists, create default one
    if (!header) {
      const allServices = await FAQ.find();
      const serviceIds = allServices.map(service => service._id);
      
      header = new FAQheader({
        headerTitle: 'Frequently Asked Questions (FAQs)',
        headerDescription: 'Find the information you need about our services, plans, and processes. If you have more questions, feel free to reach out to us!',
        faqs: serviceIds,
        isActive: true
      });
      await header.save();
      await header.populate('faqs');
    }
    
    res.status(200).json({
      message: 'Data fetched successfully!',
      data: {
        headerTitle: header.headerTitle,
        headerDescription: header.headerDescription,
        faqs: header.faqs
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
    
    let header = await FAQheader.findOne({ isActive: true });
    
    if (!header) {
      // If no header exists, create one with current services
      const allServices = await FAQ.find();
      const serviceIds = allServices.map(service => service._id);
      
      header = new FAQheader({
        headerTitle,
        headerDescription,
        faqs: serviceIds,
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
    let header = await FAQheader.findOne({ isActive: true });
    
    if (!header) {
      header = {
        headerTitle: 'Frequently Asked Questions (FAQs)',
        headerDescription: 'Find the information you need about our services, plans, and processes. If you have more questions, feel free to reach out to us!'
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
    
    let header = await FAQheader.findOne({ isActive: true });
    
    if (!header) {
      return res.status(404).json({ message: 'Header not found' });
    }
    
    // Validate that all provided IDs exist in services
    const existingServices = await FAQ.find({ _id: { $in: serviceIds } });
    if (existingServices.length !== serviceIds.length) {
      throw new Error('Some service IDs are invalid');
    }
    
    header.faqs = serviceIds;
    await header.save();
    
    res.status(200).json({ message: 'Benefits reordered successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};