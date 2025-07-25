const db = require('../models');
const Service = db.howItWorks
const HowItWorksHeader = db.howItWorksHeader;

// Helper function to update header references
const updateHeaderReferences = async () => {
  try {
    const allServices = await Service.find();
    const serviceIds = allServices.map(service => service._id);
    
    let header = await HowItWorksHeader.findOne({ isActive: true });
    if (!header) {
      header = new HowItWorksHeader({
        headerTitle: 'How It Works',
        headerDescription: 'Our Simple 3-Step Process',
        howItWorksItems: serviceIds,
        isActive: true
      });
    } else {
      header.howItWorksItems = serviceIds;
    }
    await header.save();
  } catch (error) {
    console.error('Error updating header references:', error);
  }
};

exports.create = async (_req, res) => {
  try {
    const {title, description} = _req.body;

    if (!title || !description) {
      throw new Error('title, description is required');
    }

    // Create a new Service
    const newService = new Service({
      title,
      description,
    });

    // Save the service to the database
    await newService.save();

      // Auto-update header references
    await updateHeaderReferences();

    res.status(201).json({message: 'Created successfully!'});
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};

exports.update = async (_req, res) => {
  try {
    const {id, title, description, icon} = _req.body;

    if (!id) {
      throw new Error('id field is required');
    }

    const service = await Service.findOne({
      _id: id,
    });

    if (!service) {
      res.status(500).message('Record not found');
    }

    const updatedService = await Service.findOneAndUpdate(
      {_id: id},
      {
        title,
        description,
      },
      {new: true, upsert: false, runValidators: true}
    );

       // Auto-update header references (in case order needs to be maintained)
    await updateHeaderReferences();

    return res.status(200).json({message: 'Record updated successfully!'});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

exports.delete = async (_req, res) => {
  try {
    const { id } = _req.params;

    if (!id) {
      throw new Error('ID is required');
    }

    const deletedService = await Service.findByIdAndDelete(id);

    if (!deletedService) {
      return res.status(404).json({ message: 'Record not found' });
    }
  // Auto-update header references
    await updateHeaderReferences();

    res.status(200).json({ message: 'Record deleted successfully!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getAll = async (_req, res) => {
  try {
    const services = await Service.find();

    res.status(200).json({
      message: 'Data fetched successfully!',
      data: services,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

