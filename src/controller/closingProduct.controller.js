import modelClosingProduct from '../models/closingProduct.model.js';

// Create a new closingProduct
export const createClosingProduct = async (req, res) => {
  try {
    const closingProduct = new modelClosingProduct(req.body);
    await closingProduct.save();
    res.status(201).json(closingProduct);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the closingProduct' });
  }
};

// Get all closingProducts
export const getAllClosingProducts = async (req, res) => {
  try {
    const closingProducts = await modelClosingProduct.find();
    res.status(200).json(closingProducts);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the closingProducts' });
  }
};

// Get a single closingProduct by ID
export const getClosingProductById = async (req, res) => {
  try {
    const closingProduct = await modelClosingProduct.findById(req.params.id);
    if (!closingProduct) {
      return res.status(404).json({ error: 'ClosingProduct not found' });
    }
    res.status(200).json(closingProduct);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the closingProduct' });
  }
};

// Update a closingProduct by ID
export const updateClosingProduct = async (req, res) => {
  try {
    const closingProduct = await modelClosingProduct.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!closingProduct) {
      return res.status(404).json({ error: 'ClosingProduct not found' });
    }
    res.status(200).json(closingProduct);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the closingProduct' });
  }
};

// Delete a closingProduct by ID
export const deleteClosingProduct = async (req, res) => {
  try {
    const closingProduct = await modelClosingProduct.findByIdAndDelete(req.params.id);
    if (!closingProduct) {
      return res.status(404).json({ error: 'ClosingProduct not found' });
    }
    res.status(200).json({ message: 'ClosingProduct deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the closingProduct' });
  }
};

