const db = require('../models');

const Service = db.howItWorks
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

