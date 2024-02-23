import ClosingGas from '../models/closingGas.model.js';

// Create a new closingGas entry
export const createClosingGas = async (req, res) => {
  try {
    const closingGas = new ClosingGas(req.body);
    await closingGas.save();
    res.status(201).json(closingGas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all closingGas entries
export const getAllClosingGas = async (req, res) => {
  try {
    const closingGasEntries = await ClosingGas.find().populate('Pumps'); 
    res.status(200).json(closingGasEntries);
  } catch (error) {
    res.status(500).json({ error: error.message});
  }
};

// Get a single closingGas entry by ID
export const getClosingGasById = async (req, res) => {
  console.log(req.params.id)
  try {
    const closingGas = await ClosingGas.findById(req.params.id).populate('Pumps');
    console.log(closingGas)
    if (!closingGas) {
      return res.status(404).json({ error: 'ClosingGas entry not found' });
    }
    res.status(200).json(closingGas);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the closingGas entry' });
  }
};

// Update a closingGas entry by ID
export const updateClosingGasById = async (req, res) => {
  try {
    const closingGas = await closingGas.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!closingGas) {
      return res.status(404).json({ error: 'ClosingGas entry not found' });
    }
    res.status(200).json(closingGas);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the closingGas entry' });
  }
};

// Delete a closingGas entry by ID
export const deleteClosingGasById = async (req, res) => {
  try {
    const closingGas = await closingGas.findByIdAndDelete(req.params.id);
    if (!closingGas) {
      return res.status(404).json({ error: 'ClosingGas entry not found' });
    }
    res.status(200).json({ message: 'ClosingGas entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the closingGas entry' });
  }
};
