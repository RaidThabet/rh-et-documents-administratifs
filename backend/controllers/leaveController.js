const Leave = require('../database/models/leave');

// Routes
// Create a new leave
exports.createLeave = async (req, res) => {
    try {
        const leave = new Leave({
            userId: req.body.userId,
            leave_type: req.body.leave_type,
            leave_start: req.body.leave_start,
            leave_end: req.body.leave_end,
            justification: req.body.justification,
        });
        await leave.save();
        res.status(201).json(leave);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Read all leaves
exports.getAllLeaves = async (req, res) => {
    try {
        const leaves = await Leave.find().sort({ createdAt: -1 });
        res.status(200).json(leaves);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Read all leaves of user
exports.getAllLeavesOfUser = async (req, res) => {
    try {
        const leaves = await Leave.find({ userId: req.params.id }).sort({ createdAt: -1 });
        res.status(200).json(leaves);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a leave by ID
exports.updateLeave = async (req, res) => {
    try {
        const leave = await Leave.findByIdAndUpdate(
            req.params.id,
            {
                userId: req.body.userId,
                leave_type: req.body.leave_type,
                leave_start: req.body.leave_start,
                leave_end: req.body.leave_end,
                justification: req.body.justification,
            },
            { new: true }
        );
        if (!leave) {
            return res.status(404).json({ error: 'Leave not found' });
        }
        res.status(200).json(leave);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.handleLeaveRequest = async (req, res) => {
    try {
        const leave = await Leave.findByIdAndUpdate(
            req.params.id,
            {
                request_status: req.body.leave_request_status,
            },
            { new: true }
        );
        if (!leave) {
            return res.status(404).json({ error: 'Leave not found' });
        }
        res.status(200).json(leave);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a leave by ID
exports.deleteLeave = async (req, res) => {
    try {
        const leave = await Leave.findByIdAndDelete(req.params.id);
        if (!leave) {
            return res.status(404).json({ error: 'Leave not found' });
        }
        res.status(200).json({ message: 'Leave deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};