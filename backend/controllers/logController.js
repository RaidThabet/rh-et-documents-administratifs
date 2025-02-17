const Log = require('../database/models/log');

// Routes
// Create a new log
exports.createLog = async (req, res) => {
    try {
        const log = new Log({ message: req.body.message, action: req.body.action });
        await log.save();
        res.status(201).json(log);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.addLog = async (action, message) => {
    try {
        const newLog = new Log({ action, message });
        await newLog.save();
        console.log('Log added successfully:', newLog.message);
    } catch (error) {
        console.error('Error adding log:', error.message);
    }
};

// Read all logs
exports.getAllLogs = async (req, res) => {
    try {
        const logs = await Log.find();
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a log by ID
exports.updateLog = async (req, res) => {
    try {
        const log = await Log.findByIdAndUpdate(
            req.params.id,
            { message: req.body.message, action: req.body.action },
            { new: true }
        );
        if (!log) {
            return res.status(404).json({ error: 'Log not found' });
        }
        res.status(200).json(log);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a log by ID
exports.deleteLog = async (req, res) => {
    try {
        const log = await Log.findByIdAndDelete(req.params.id);
        if (!log) {
            return res.status(404).json({ error: 'Log not found' });
        }
        res.status(200).json({ message: 'Log deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};