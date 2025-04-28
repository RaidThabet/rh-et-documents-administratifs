const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    responableId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },
    deadline: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
    },
    taskStatus: {
        type: String,
        enum: ['enCours', 'termine'],
        default: 'enCours',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;