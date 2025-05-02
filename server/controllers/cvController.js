import CV from '../models/CV.js';

// Create a new CV
export const createCV = async (req, res) => {
    try {
        // Create new CV
        const cv = new CV(req.body);
        await cv.save();
        res.status(201).json(cv);
    } catch (error) {
        console.error("Error creating CV:", error);
        res.status(400).json({ 
            message: 'Error creating CV',
            error: error.message 
        });
    }
};

// Get CV by ID
export const getCV = async (req, res) => {
    try {
        const cv = await CV.findById(req.params.id);
        if (!cv) {
            return res.status(404).json({ message: 'CV not found' });
        }
        res.json(cv);
    } catch (error) {
        console.error("Error getting CV:", error);
        res.status(500).json({ message: error.message });
    }
};

// Update CV
export const updateCV = async (req, res) => {
    try {
        const cv = await CV.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!cv) {
            return res.status(404).json({ message: 'CV not found' });
        }
        res.json(cv);
    } catch (error) {
        console.error("Error updating CV:", error);
        res.status(400).json({ message: error.message });
    }
};

// Delete CV
export const deleteCV = async (req, res) => {
    try {
        const cv = await CV.findByIdAndDelete(req.params.id);
        if (!cv) {
            return res.status(404).json({ message: 'CV not found' });
        }
        res.json({ message: 'CV deleted successfully' });
    } catch (error) {
        console.error("Error deleting CV:", error);
        res.status(500).json({ message: error.message });
    }
}; 