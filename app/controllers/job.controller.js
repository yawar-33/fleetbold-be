const db = require('../models');

const Job = db.job;
const JobCategory = db.jobCategory;

exports.createJob = async (_req, res) => {
  try {
    const {
      aboutCompany,
      aboutRole,
      jobDescription,
      jobResponsibilities,
      whatWeOffer,
      jobLocation,
      jobType,
      category,
      inActive = true
    } = _req.body;

    if (!jobLocation) {
      throw new Error('jobLocation is required');
    }

    if (!jobType) {
      throw new Error('jobType is required');
    }

    const validJobLocations = ['ONSITE', 'REMOTE', 'HYBRID'];
    if (!validJobLocations.includes(jobLocation)) {
      throw new Error('jobLocation must be one of: ONSITE, REMOTE, HYBRID');
    }

    const validJobTypes = ['Full-Time', 'Part-time', 'Permanent'];
    if (!validJobTypes.includes(jobType)) {
      throw new Error('jobType must be one of: Full-Time, Part-time, Permanent');
    }

    if (category) {
      const categoryExists = await JobCategory.findById(category);
      if (!categoryExists) {
        throw new Error('Invalid category ID');
      }
    }

    const newJob = new Job({
      aboutCompany,
      aboutRole,
      jobDescription,
      jobResponsibilities,
      whatWeOffer,
      jobLocation,
      jobType,
      category,
      inActive
    });

    await newJob.save();

    res.status(201).json({ message: 'Job created successfully!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateJob = async (_req, res) => {
  try {
    const {
      id,
      aboutCompany,
      aboutRole,
      jobDescription,
      jobResponsibilities,
      whatWeOffer,
      jobLocation,
      jobType,
      category,
      inActive
    } = _req.body;

    if (!id) {
      throw new Error('id field is required');
    }

    const job = await Job.findOne({
      _id: id,
    });

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (jobLocation) {
      const validJobLocations = ['ONSITE', 'REMOTE', 'HYBRID'];
      if (!validJobLocations.includes(jobLocation)) {
        throw new Error('jobLocation must be one of: ONSITE, REMOTE, HYBRID');
      }
    }

    if (jobType) {
      const validJobTypes = ['Full-Time', 'Part-time', 'Permanent'];
      if (!validJobTypes.includes(jobType)) {
        throw new Error('jobType must be one of: Full-Time, Part-time, Permanent');
      }
    }

    if (category) {
      const categoryExists = await JobCategory.findById(category);
      if (!categoryExists) {
        throw new Error('Invalid category ID');
      }
    }

    const updateData = {};
    if (aboutCompany) updateData.aboutCompany = aboutCompany;
    if (aboutRole) updateData.aboutRole = aboutRole;
    if (jobDescription) updateData.jobDescription = jobDescription;
    if (jobResponsibilities) updateData.jobResponsibilities = jobResponsibilities;
    if (whatWeOffer) updateData.whatWeOffer = whatWeOffer;
    if (jobLocation) updateData.jobLocation = jobLocation;
    if (jobType) updateData.jobType = jobType;
    if (category) updateData.category = category;
    if (inActive) updateData.inActive = inActive;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: 'No fields provided for update' });
    }

    const updatedJob = await Job.findOneAndUpdate(
      { _id: id },
      updateData,
      { new: true, upsert: false, runValidators: true }
    );

    return res.status(200).json({ message: 'Job updated successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteJob = async (_req, res) => {
  try {
    const { id } = _req.params;

    if (!id) {
      throw new Error('Job ID is required');
    }

    const deletedJob = await Job.findByIdAndDelete(id);

    if (!deletedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.status(200).json({ message: 'Job deleted successfully!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllJobs = async (_req, res) => {
  try {
    const jobs = await Job.find().populate('category', 'title description');

    res.status(200).json({
      message: 'Jobs fetched successfully!',
      data: jobs,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getJobById = async (_req, res) => {
  try {
    const { id } = _req.params;

    if (!id) {
      throw new Error('Job ID is required');
    }

    const job = await Job.findById(id).populate('category', 'title description');

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.status(200).json({
      message: 'Job fetched successfully!',
      data: job,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getJobsByCategory = async (_req, res) => {
  try {
    const { categoryId } = _req.params;

    if (!categoryId) {
      throw new Error('Category ID is required');
    }

    const categoryExists = await JobCategory.findById(categoryId);
    if (!categoryExists) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const jobs = await Job.find({ category: categoryId }).populate('category', 'title description');

    res.status(200).json({
      message: 'Jobs fetched successfully!',
      data: jobs,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getJobsByLocation = async (_req, res) => {
  try {
    const { jobLocation } = _req.params;

    if (!jobLocation) {
      throw new Error('Job location is required');
    }

    const validJobLocations = ['ONSITE', 'REMOTE', 'HYBRID'];
    if (!validJobLocations.includes(jobLocation)) {
      throw new Error('Job location must be one of: ONSITE, REMOTE, HYBRID');
    }

    const jobs = await Job.find({ jobLocation }).populate('category', 'title description');

    res.status(200).json({
      message: 'Jobs fetched successfully!',
      data: jobs,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getJobsByType = async (_req, res) => {
  try {
    const { jobType } = _req.params;

    if (!jobType) {
      throw new Error('Job type is required');
    }

    const validJobTypes = ['Full-Time', 'Part-time', 'Permanent'];
    if (!validJobTypes.includes(jobType)) {
      throw new Error('Job type must be one of: Full-Time, Part-time, Permanent');
    }

    const jobs = await Job.find({ jobType }).populate('category', 'title description');

    res.status(200).json({
      message: 'Jobs fetched successfully!',
      data: jobs,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getActiveJobs = async (_req, res) => {
  try {
    const jobs = await Job.find({ inActive: { $ne: true } }).populate('category', 'title description');

    res.status(200).json({
      message: 'Active jobs fetched successfully!',
      data: jobs,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.searchJobs = async (_req, res) => {
  try {
    const { query, jobLocation, jobType, categoryId, inActive } = _req.query;

    let searchCriteria = {};

    if (query) {
      searchCriteria.$or = [
        { aboutCompany: { $regex: query, $options: 'i' } },
        { aboutRole: { $regex: query, $options: 'i' } },
        { jobDescription: { $regex: query, $options: 'i' } },
        { jobResponsibilities: { $regex: query, $options: 'i' } },
        { whatWeOffer: { $regex: query, $options: 'i' } }
      ];
    }

    if (jobLocation) {
      const validJobLocations = ['ONSITE', 'REMOTE', 'HYBRID'];
      if (validJobLocations.includes(jobLocation)) {
        searchCriteria.jobLocation = jobLocation;
      }
    }

    if (jobType) {
      const validJobTypes = ['Full-Time', 'Part-time', 'Permanent'];
      if (validJobTypes.includes(jobType)) {
        searchCriteria.jobType = jobType;
      }
    }

    if (categoryId) {
      searchCriteria.category = categoryId;
    }

    if (inActive !== undefined) {
      searchCriteria.inActive = inActive === 'true';
    }

    const jobs = await Job.find(searchCriteria).populate('category', 'title description');

    res.status(200).json({
      message: 'Jobs search completed successfully!',
      data: jobs,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.toggleJobStatus = async (_req, res) => {
  try {
    const { id } = _req.params;

    if (!id) {
      throw new Error('Job ID is required');
    }

    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      id,
      { inActive: !job.inActive },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: `Job ${updatedJob.inActive ? 'deactivated' : 'activated'} successfully!`,
      data: updatedJob
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 