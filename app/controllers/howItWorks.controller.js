// const db = require('../models');

// const Service = db.howItWorks
// exports.createService = async (_req, res) => {
//   try {
//     const {title, description, icon} = _req.body;

//     if (!title || !description || !icon) {
//       throw new Error('title, description, icon is required');
//     }

//     // Create a new Service
//     const newService = new Service({
//       title,
//       description,
//       icon,
//     });

//     // Save the service to the database
//     await newService.save();

//     res.status(201).json({message: 'Service created successfully!'});
//   } catch (err) {
//     res.status(500).json({message: err.message});
//   }
// };

// exports.updateService = async (_req, res) => {
//   try {
//     const {id, title, description, icon} = _req.body;

//     if (!id) {
//       throw new Error('id field is required');
//     }

//     const service = await Service.findOne({
//       _id: id,
//     });

//     if (!service) {
//       res.status(500).message('Service not found');
//     }

//     const updatedService = await Service.findOneAndUpdate(
//       {_id: id},
//       {
//         title,
//         description,
//         icon,
//       },
//       {new: true, upsert: false, runValidators: true}
//     );

//     return res.status(200).json({message: 'Service updated successfully!'});
//   } catch (error) {
//     res.status(500).json({message: error.message});
//   }
// };

// exports.deleteService = async (_req, res) => {
//   try {
//     const { id } = _req.params;

//     if (!id) {
//       throw new Error('Service ID is required');
//     }

//     const deletedService = await Service.findByIdAndDelete(id);

//     if (!deletedService) {
//       return res.status(404).json({ message: 'Service not found' });
//     }

//     res.status(200).json({ message: 'Service deleted successfully!' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };


// exports.getAllServices = async (_req, res) => {
//   try {
//     const services = await Service.find();

//     res.status(200).json({
//       message: 'Services fetched successfully!',
//       data: services,
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

