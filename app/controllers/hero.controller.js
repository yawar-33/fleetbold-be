const db = require('../models');

const HeroSection = db.hero;

exports.createHeroSection = async (_req, res) => {
  try {
    const {badge,headline, subheadline,buttonText,buttonLink} = _req.body;

    if (!headline || !subheadline ) {
      throw new Error('headline, subheadline, icon is required');
    }

    // Create a new HeroSection
    const newHeroSection = new HeroSection({
        badge,
        headline,
        subheadline,
        buttonText,
        buttonLink
    });

    // Save the HeroSection to the database
    await newHeroSection.save();

    res.status(201).json({message: 'HeroSection created successfully!'});
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};

exports.updateHeroSection = async (_req, res) => {
  try {
    const {id, badge,headline, subheadline,buttonText,buttonLink} = _req.body;

    if (!id) {
      throw new Error('id field is required');
    }

    const heroSection = await HeroSection.findOne({
      _id: id,
    });

    if (!heroSection) {
      res.status(500).message('HeroSection not found');
    }

    const updatedService = await HeroSection.findOneAndUpdate(
      {_id: id},
      {
       badge,
        headline,
        subheadline,
        buttonText,
        buttonLink
      },
      {new: true, upsert: false, runValidators: true}
    );

    return res.status(200).json({message: 'HeroSection updated successfully!'});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

exports.deleteHeroSection = async (_req, res) => {
  try {
    const { id } = _req.params;

    if (!id) {
      throw new Error('HeroSection ID is required');
    }

    const deletedHeroSection = await HeroSection.findByIdAndDelete(id);

    if (!deletedHeroSection) {
      return res.status(404).json({ message: 'HeroSection not found' });
    }

    res.status(200).json({ message: 'HeroSection deleted successfully!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getAllHeroSections = async (_req, res) => {
  try {
    const HeroSections = await HeroSection.find();

    res.status(200).json({
      message: 'HeroSections fetched successfully!',
      data: HeroSections,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

