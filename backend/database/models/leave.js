const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },
    leave_type: {
        type: { type: String, enum: ['annual_leave', 'sick_leave', 'compensatory_leave', 'exceptional_leave', 'unpaid_leave'] },
        required: true,
    },
    leave_start: {
        type: Date,
        required: true,
    },
    leave_end: {
        type: Date,
        required: true,
    },
    justification: {
        type: String,
    },
    request_status: {
        type: { type: String, enum: ['pending', 'accepted', 'rejected'] },
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Leave = mongoose.model("Leave", leaveSchema);

module.exports = Leave;