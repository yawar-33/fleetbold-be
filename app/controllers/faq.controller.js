const db = require('../models');

const FAQ = db.faq;

const fAQHeader = db.faqHeader;

// Helper function to update header references
const updateHeaderReferences = async () => {
  try {
    const allServices = await FAQ.find();
    const serviceIds = allServices.map(service => service._id);
    
    let header = await fAQHeader.findOne({ isActive: true });
    if (!header) {
      header = new fAQHeader({
        headerTitle: 'Frequently Asked Questions (FAQs)',
        headerDescription: 'Find the information you need about our services, plans, and processes. If you have more questions, feel free to reach out to us!',
        faqs: serviceIds,
        isActive: true
      });
    } else {
      header.faqs = serviceIds;
    }
    await header.save();
  } catch (error) {
    console.error('Error updating header references:', error);
  }
};

exports.createFAQ = async (_req, res) => {
  try {
    const {question, answer} = _req.body;

    if (!question || !answer ) {
      throw new Error('question, answer is required');
    }

    // Create a new FAQ
    const newFAQ = new FAQ({
      question,
      answer,
    });

    // Save the FAQ to the database
    await newFAQ.save();

      // Auto-update header references
    await updateHeaderReferences();
    res.status(201).json({message: 'FAQ created successfully!'});
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};

exports.updateFAQ = async (_req, res) => {
  try {
    const {question, answer,id} = _req.body;

    if (!id) {
      throw new Error('id field is required');
    }

    const FAQ = await FAQ.findOne({
      _id: id,
    });

    if (!FAQ) {
      res.status(500).message('FAQ not found');
    }

    const updatedFAQ = await FAQ.findOneAndUpdate(
      {_id: id},
      {
        question,
        answer,
      },
      {new: true, upsert: false, runValidators: true}
    );

      // Auto-update header references
    await updateHeaderReferences();
    return res.status(200).json({message: 'FAQ updated successfully!'});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

exports.deleteFAQ = async (_req, res) => {
  try {
    const { id } = _req.params;

    if (!id) {
      throw new Error('FAQ ID is required');
    }

    const deletedFAQ = await FAQ.findByIdAndDelete(id);

    if (!deletedFAQ) {
      return res.status(404).json({ message: 'FAQ not found' });
    }

      // Auto-update header references
    await updateHeaderReferences();
    res.status(200).json({ message: 'FAQ deleted successfully!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getAllFAQs = async (_req, res) => {
  try {
    const FAQs = await FAQ.find();

    res.status(200).json({
      message: 'FAQs fetched successfully!',
      data: FAQs,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

