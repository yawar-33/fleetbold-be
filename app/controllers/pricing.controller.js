const db = require('../models');

const Pricing = db.pricing;

exports.createPricingPlan = async (_req, res) => {
  try {
    const {name, description,features,price} = _req.body;

    if (!name || !description ) {
      throw new Error('name, description is required');
    }

    // Create a new Service
    const newService = new Pricing({
      name,
      description,
      features,
      price,
    });

    // Save the service to the database
    await newService.save();

    res.status(201).json({message: 'Created successfully!'});
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};

exports.updatePricingPlan = async (_req, res) => {
  try {
    const {id, name, description, price,features} = _req.body;

    if (!id) {
      throw new Error('id field is required');
    }

    const service = await Pricing.findOne({
      _id: id,
    });

    if (!service) {
      res.status(500).message('Record not found');
    }

    const updatedService = await Pricing.findOneAndUpdate(
      {_id: id},
      {
        name,
        description,
        features,
        price,
      },
      {new: true, upsert: false, runValidators: true}
    );

    return res.status(200).json({message: 'Record updated successfully!'});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

exports.deletePricingPlan = async (_req, res) => {
  try {
    const { id } = _req.params;

    if (!id) {
      throw new Error('ID is required');
    }

    const deletedService = await Pricing.findByIdAndDelete(id);

    if (!deletedService) {
      return res.status(404).json({ message: 'Record not found' });
    }

    res.status(200).json({ message: 'Record deleted successfully!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getAllPricingPlan = async (_req, res) => {
  try {
    const services = await Pricing.find();

    res.status(200).json({
      message: 'Pricing Plan fetched successfully!',
      data: services,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

