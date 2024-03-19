import Closing from '../models/closing.model.js';

// Create a new closing
export const createClosing = async (req, res) => {
    try {
        const { grocer, date, gas, closingProducts, closingTotalDay, cashValueToday, surplusOfDay } = req.body;

        const newClosing = new Closing({
            grocer,
            date,
            gas,
            closingProducts,
            closingTotalDay,
            cashValueToday,
            surplusOfDay
        });

        const savedClosing = await newClosing.save();

        res.status(201).json(savedClosing);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the closing nooo' });
    }
};

// Retrieve all closings
export const getAllClosings = async (req, res) => {
    try {
        const closings = await Closing.find().populate('grocer').populate({
            path: 'gas',
            populate: { path: 'Pumps' }
        });

        res.status(200).json(closings);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving the closings' });
    }
};

export const getClosingsByDate = async (req, res) => {
    try {
        const date = new Date(req.params.date);
        console.log(date)
        const closings = await Closing.find({
            "$expr": {
                "$and": [
                  { $eq: [{ $year: "$date" }, { $year: new Date(date) }]},
                  { $eq: [{ $month: "$date" }, { $month: new Date(date) }]},
                  { $eq: [{ $dayOfMonth: "$date" }, { $dayOfMonth: new Date(date) }]}
                ]
              }
        }).populate('grocer').populate({
            path: 'gas',
            populate: { path: 'Pumps' }
        });

        res.status(200).json(closings);
    } catch (error) {
        res.status(500).json({error: error.message});   
       // res.status(500).json({ error: 'An error occurred while retrieving the closings' });
    }
};
// Retrieve a single closing by ID
export const getClosingById = async (req, res) => {
    try {
        const { id } = req.params;

        const closing = await Closing.findById(id);

        if (!closing) {
            return res.status(404).json({ error: 'Closing not found' });
        }

        res.status(200).json(closing);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving the closing' });
    }
};

// Update a closing by ID
export const updateClosingById = async (req, res) => {
    try {
        const { id } = req.params;
        const { grocer, date, gas, closingProducts, closingTotalDay, cashValueToday, surplusOfDay } = req.body;

        const updatedClosing = await Closing.findByIdAndUpdate(
            id,
            {
                grocer,
                date,
                gas,
                closingProducts,
                closingTotalDay,
                cashValueToday,
                surplusOfDay
            },
            { new: true }
        );

        if (!updatedClosing) {
            return res.status(404).json({ error: 'Closing not found' });
        }

        res.status(200).json(updatedClosing);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the closing' });
    }
};

// Delete a closing by ID
export const deleteClosingById = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedClosing = await Closing.findByIdAndDelete(id);

        if (!deletedClosing) {
            return res.status(404).json({ error: 'Closing not found' });
        }

        res.status(200).json({ message: 'Closing deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the closing' });
    }
};
