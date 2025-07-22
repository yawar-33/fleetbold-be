const db = require('../models');

const FAQ = db.faq;

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

