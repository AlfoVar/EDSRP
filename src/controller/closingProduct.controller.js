const ClosingProduct = require('../models/closingProduct.model');

// Function to get all closingProducts
const getAllClosingProducts = async (req, res) => {
  try {
    // Logic to fetch all closingProducts from the database
    const closingProducts = await ClosingProduct.find();

    // Send the closingProducts as a response
    res.json(closingProducts);
  } catch (error) {
    // Handle any errors that occur during the process
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Function to create a new closingProduct
const createClosingProduct = async (req, res) => {
  try {
    // Logic to create a new closingProduct based on the request body
    const newClosingProduct = await ClosingProduct.create(req.body);

    // Send the newly created closingProduct as a response
    res.json(newClosingProduct);
  } catch (error) {
    // Handle any errors that occur during the process
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Function to update an existing closingProduct
const updateClosingProduct = async (req, res) => {
  try {
    // Logic to update an existing closingProduct based on the request body
    const updatedClosingProduct = await ClosingProduct.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    // Send the updated closingProduct as a response
    res.json(updatedClosingProduct);
  } catch (error) {
    // Handle any errors that occur during the process
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Function to delete a closingProduct
const deleteClosingProduct = async (req, res) => {
  try {
    // Logic to delete a closingProduct based on the provided ID
    await ClosingProduct.findByIdAndDelete(req.params.id);

    // Send a success message as a response
    res.json({ message: 'Closing product deleted successfully' });
  } catch (error) {
    // Handle any errors that occur during the process
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Export the functions as constants
module.exports = {
  getAllClosingProducts,
  createClosingProduct,
  updateClosingProduct,
  deleteClosingProduct,
};
