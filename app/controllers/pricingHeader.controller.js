const db = require('../models');
const PricingHeader = db.pricingHeader;
const Pricing = db.pricing;

// Get complete membership section (header + benefits)
exports.getCompletePricingSection = async (_req, res) => {
  try {
    let header = await PricingHeader.findOne({ isActive: true }).populate('pricingList');
    
    // If no header exists, create default one
    if (!header) {
      const allServices = await Pricing.find();
      const serviceIds = allServices.map(service => service._id);
      
      header = new PricingHeader({
        headerTitle: 'Pricing with No Hidden Fees',
        headerDescription: 'Our modern design, real-time insights, and seamless tools deliver the control and confidence you need to scale. No long-term commitments, surprise charges, or setup costs—just clarity and performance.',
        pricingList: serviceIds,
        isActive: true
      });
      await header.save();
      await header.populate('pricingList');
    }
    
    res.status(200).json({
      message: 'Data fetched successfully!',
      data: {
        headerTitle: header.headerTitle,
        headerDescription: header.headerDescription,
        pricingList: header.pricingList
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
    
    let header = await PricingHeader.findOne({ isActive: true });
    
    if (!header) {
      // If no header exists, create one with current services
      const allServices = await Pricing.find();
      const serviceIds = allServices.map(service => service._id);
      
      header = new PricingHeader({
        headerTitle,
        headerDescription,
        pricingList: serviceIds,
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
    let header = await PricingHeader.findOne({ isActive: true });
    
    if (!header) {
      header = {
        headerTitle: 'Pricing with No Hidden Fees',
        headerDescription: 'Our modern design, real-time insights, and seamless tools deliver the control and confidence you need to scale. No long-term commitments, surprise charges, or setup costs—just clarity and performance.'
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
    
    let header = await PricingHeader.findOne({ isActive: true });
    
    if (!header) {
      return res.status(404).json({ message: 'Header not found' });
    }
    
    // Validate that all provided IDs exist in services
    const existingServices = await Pricing.find({ _id: { $in: serviceIds } });
    if (existingServices.length !== serviceIds.length) {
      throw new Error('Some service IDs are invalid');
    }
    
    header.pricingList = serviceIds;
    await header.save();
    
    res.status(200).json({ message: 'Benefits reordered successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};