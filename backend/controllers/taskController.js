const Task = require('../database/models/task');

// Create a new task
exports.createTask = async (req, res) => {
    try {
        const { responableId, deadline, description } = req.body;

        const task = new Task({
            responableId,
            deadline,
            description,
        });

        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all tasks
exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Read all tasks of user
exports.getAllTasksOfUser = async (req, res) => {
    try {
        const tasks = await Task.find({ responableId: req.params.id }).sort({ createdAt: -1 });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a task by ID
exports.updateTask = async (req, res) => {
    try {
        const { responableId, deadline, description, taskStatus } = req.body;

        const task = await Task.findByIdAndUpdate(
            req.params.id,
            { responableId, deadline, description, taskStatus },
            { new: true }
        );

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Complete a task (set status to 'termine')
exports.completeTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            { taskStatus: 'termine' },
            { new: true }
        );

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.status(200).json({ message: 'Task marked as completed', task });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a task by ID
exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};