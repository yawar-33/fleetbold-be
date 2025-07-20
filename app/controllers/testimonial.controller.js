const db = require('../models');

const Testimonial = db.testimonial;
exports.createTestimonial = async (_req, res) => {
  try {
    const {name,designation,content,image,inActive} = _req.body;

    if (!name || !content ) {
      throw new Error('name, content is required');
    }

    // Create a new Service
    const newService = new Testimonial({
      name,
      designation,
      content,
      image, 
      inActive
    });

    // Save the service to the database
    await newService.save();

    res.status(201).json({message: 'Created successfully!'});
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};

exports.updateTestimonial = async (_req, res) => {
  try {
    const {id,name,designation,content,image,inActive} = _req.body;

    if (!id) {
      throw new Error('id field is required');
    }

    const service = await Testimonial.findOne({
      _id: id,
    });

    if (!service) {
      res.status(500).message('Record not found');
    }

    const updatedService = await Testimonial.findOneAndUpdate(
      {_id: id},
      {
      name,
      designation,
      content,
      image,
      inActive
      },
      {new: true, upsert: false, runValidators: true}
    );

    return res.status(200).json({message: 'Record updated successfully!'});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

exports.deleteTestimonial = async (_req, res) => {
  try {
    const { id } = _req.params;

    if (!id) {
      throw new Error('ID is required');
    }

    const deletedService = await Testimonial.findByIdAndDelete(id);

    if (!deletedService) {
      return res.status(404).json({ message: 'Record not found' });
    }

    res.status(200).json({ message: 'Record deleted successfully!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getAllTestimonial = async (_req, res) => {
  try {  
    const services = await Testimonial.find();

    res.status(200).json({
      message: 'Data fetched successfully!',
      data: services,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};