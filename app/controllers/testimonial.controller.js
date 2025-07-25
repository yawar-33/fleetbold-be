const db = require('../models');

const Testimonial = db.testimonial;
const TestimonialHeader = db.testimonialHeader;

// Helper function to update header references
const updateHeaderReferences = async () => {
  try {
    const allServices = await Testimonial.find();
    const serviceIds = allServices.map(service => service._id);
    
    let header = await TestimonialHeader.findOne({ isActive: true });
    if (!header) {
      header = new TestimonialHeader({
        headerTitle: 'What Our Clients Are Saying',
        headerDescription: 'Discover how our solutions have transformed businesses and brought visions to life through our clients experiences.',
        testimonialList: serviceIds,
        isActive: true
      });
    } else {
      header.testimonialList = serviceIds;
    }
    await header.save();
  } catch (error) {
    console.error('Error updating header references:', error);
  }
};
exports.createTestimonial = async (_req, res) => {
  try {
    const {name,designation,content,image,inActive} = _req.body;

    if (!name || !content ) {
      throw new Error('name, content is required');
    }

    // Create a new Testimonial
    const newService = new Testimonial({
      name,
      designation,
      content,
      image, 
      inActive
    });

    // Save the service to the database
    await newService.save();
 // Auto-update header references (in case order needs to be maintained)
    await updateHeaderReferences();

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
 // Auto-update header references (in case order needs to be maintained)
    await updateHeaderReferences();

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
 // Auto-update header references (in case order needs to be maintained)
    await updateHeaderReferences();

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