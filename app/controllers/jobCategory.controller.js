const db = require('../models');

const JobCategory = db.jobCategory;
const Job = db.job;

exports.createJobCategory = async (_req, res) => {
  try {
    const { title, description, icon } = _req.body;

    if (!title) {
      throw new Error('title is required');
    }

    const newJobCategory = new JobCategory({
      title,
      description,
      icon,
    });

    await newJobCategory.save();

    res.status(201).json({ message: 'Job category created successfully!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateJobCategory = async (_req, res) => {
  try {
    const { id, title, description, icon } = _req.body;

    if (!id) {
      throw new Error('id field is required');
    }

    const jobCategory = await JobCategory.findOne({
      _id: id,
    });

    if (!jobCategory) {
      return res.status(404).json({ message: 'Job category not found' });
    }

    const updateData = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (icon) updateData.icon = icon;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: 'No fields provided for update' });
    }

    const updatedJobCategory = await JobCategory.findOneAndUpdate(
      { _id: id },
      updateData,
      { new: true, upsert: false, runValidators: true }
    );

    return res.status(200).json({ message: 'Job category updated successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteJobCategory = async (_req, res) => {
  try {
    const { id } = _req.params;

    if (!id) {
      throw new Error('Job category ID is required');
    }

    const deletedJobCategory = await JobCategory.findByIdAndDelete(id);

    if (!deletedJobCategory) {
      return res.status(404).json({ message: 'Job category not found' });
    }

    res.status(200).json({ message: 'Job category deleted successfully!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllJobCategories = async (_req, res) => {
  try {
    const jobCategories = await JobCategory.find();

    res.status(200).json({
      message: 'Job categories fetched successfully!',
      data: jobCategories,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getJobCategoryById = async (_req, res) => {
  try {
    const { id } = _req.params;

    if (!id) {
      throw new Error('Job category ID is required');
    }

    const jobCategory = await JobCategory.findById(id);

    if (!jobCategory) {
      return res.status(404).json({ message: 'Job category not found' });
    }

    res.status(200).json({
      message: 'Job category fetched successfully!',
      data: jobCategory,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getJobCategoriesWithCount = async (_req, res) => {
  try {
    const jobCategoriesWithCount = await JobCategory.aggregate([
      {
        $lookup: {
          from: 'jobs', 
          localField: '_id',
          foreignField: 'category',
          as: 'jobs'
        }
      },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          icon: 1,
          inActive: 1,
          jobCount: { $size: '$jobs' }
        }
      },
      {
        $sort: { title: 1 }
      }
    ]);

    res.status(200).json({
      message: 'Job categories with counts fetched successfully!',
      data: jobCategoriesWithCount,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// New dummy function to seed job categories
exports.seedJobCategories = async (_req, res) => {
  try {
    const categoriesToSeed = [
      { title: 'Engineering & Development', description: 'Jobs related to software engineering, development, and programming.', icon: 'code-icon' },
      { title: 'Quality Assurance', description: 'Jobs focused on ensuring product quality and testing.', icon: 'qa-icon' },
      { title: 'Hardware & Embedded', description: 'Jobs involving hardware design, embedded systems, and electronics.', icon: 'hardware-icon' },
      { title: 'Data & Analytics', description: 'Jobs in data science, data analysis, and business intelligence.', icon: 'data-icon' },
      { title: 'Design & UX', description: 'Jobs in user experience (UX) design, user interface (UI) design, and graphic design.', icon: 'design-icon' },
      { title: 'Product & Marketing', description: 'Jobs in product management, product marketing, and brand strategy.', icon: 'product-icon' },
      { title: 'Customer Success & Support', description: 'Jobs focused on customer satisfaction, support, and relationship management.', icon: 'support-icon' },
      { title: 'Business Operations', description: 'Jobs in operational management, process improvement, and business strategy.', icon: 'operations-icon' },
      { title: 'Legal & Compliance', description: 'Jobs in legal affairs, regulatory compliance, and corporate governance.', icon: 'legal-icon' },
      { title: 'Finance & Accounting', description: 'Jobs in financial management, accounting, auditing, and treasury.', icon: 'finance-icon' },
      { title: 'People & Operations', description: 'Jobs in human resources, talent acquisition, and organizational development.', icon: 'hr-icon' },
    ];

    const results = [];
    for (const category of categoriesToSeed) {
      const result = await JobCategory.findOneAndUpdate(
        { title: category.title }, // Find by title
        { $set: category },         // Set all fields
        { upsert: true, new: true } // Create if not exists, return new document
      );
      results.push(result);
    }

    res.status(200).json({
      message: 'Job categories seeded successfully!',
      data: results,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
