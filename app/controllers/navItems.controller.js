const db = require('../models');

const NavItem = db.navItem;

exports.createNavItem = async (_req, res) => {
  try {
    const {label,url,order} = _req.body;

    if (!label) {
      throw new Error('label is required');
    }

    // Create a new NavItem
    const newNavItem = new NavItem({
      label,
      url,
      order,
    });

    // Save the NavItem to the database
    await newNavItem.save();

    res.status(201).json({message: 'NavItem created successfully!'});
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};

exports.updateNavItem = async (_req, res) => {
  try {
    const {id,label, url, order} = _req.body;

    if (!id) {
      throw new Error('id field is required');
    }

    const navItem = await NavItem.findOne({
      _id: id,
    });

    if (!navItem) {
      res.status(500).message('NavItem not found');
    }

    const updatedNavItem = await NavItem.findOneAndUpdate(
      {_id: id},
      {
        label,
        url,
        order,
      },
      {new: true, upsert: false, runValidators: true}
    );

    return res.status(200).json({message: 'NavItem updated successfully!'});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

exports.deleteNavItem = async (_req, res) => {
  try {
    const { id } = _req.params;

    if (!id) {
      throw new Error('NavItem ID is required');
    }

    const deletedNavItem = await NavItem.findByIdAndDelete(id);

    if (!deletedNavItem) {
      return res.status(404).json({ message: 'NavItem not found' });
    }

    res.status(200).json({ message: 'NavItem deleted successfully!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getAllNavItems = async (_req, res) => {
  try {
    const services = await NavItem.find();

    res.status(200).json({
      message: 'NavItems fetched successfully!',
      data: services,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

