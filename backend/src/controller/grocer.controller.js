import Grocer from '../models/grocer.model.js';
// Create a new grocer
export const createGrocer = async (req, res) => {
  try {
    const { nameGrocer, ccGrocer } = req.body;
    const grocer = new Grocer({ nameGrocer, ccGrocer });
    await grocer.save();
    res.status(201).json(grocer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create grocer' });
  }
};

// Get all grocers
export const getAllGrocers = async (req, res) => {
  try {
    const grocers = await Grocer.find();
    res.json(grocers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get grocers' });
  }
};

// Get a single grocer by ID
export const getGrocerById = async (req, res) => {
  try {
    const { id } = req.params;
    const grocer = await Grocer.findById(id);
    if (!grocer) {
      return res.status(404).json({ error: 'Grocer not found' });
    }
    res.json(grocer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get grocer' });
  }
};

// Update a grocer by ID
export const updateGrocerById = async (req, res) => {
  try {
    const { id } = req.params;
    const { nameGrocer, ccGrocer } = req.body;
    const grocer = await Grocer.findByIdAndUpdate(
      id,
      { nameGrocer, ccGrocer },
      { new: true }
    );
    if (!grocer) {
      return res.status(404).json({ error: 'Grocer not found' });
    }
    res.json(grocer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update grocer' });
  }
};

// Delete a grocer by ID
export const deleteGrocerById = async (req, res) => {
  try {
    const { id } = req.params;
    const grocer = await Grocer.findByIdAndDelete(id);
    if (!grocer) {
      return res.status(404).json({ error: 'Grocer not found' });
    }
    res.json({ message: 'Grocer deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete grocer' });
  }
};

