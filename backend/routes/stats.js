const Leave = require('../database/models/leave');
const User = require('../database/models/user');
const Task = require('../database/models/task');

const moment = require('moment-business-days');

const express = require('express');
const router = express.Router();

router.get('/users-by-role', async (req, res) => {
    const result = await User.aggregate([
        { $group: { _id: "$role", count: { $sum: 1 } } }
    ]);
    res.json(result);
});

router.get('/absenteeism-rate', async (req, res) => {
    try {
        // Fetch accepted leaves
        const acceptedLeaves = await Leave.find({ request_status: 'accepted' });

        // Calculate total business days absent
        let totalAbsentDays = 0;
        acceptedLeaves.forEach(leave => {
            const start = moment(leave.leave_start);
            const end = moment(leave.leave_end);
            const workingDays = start.businessDiff(end) + 1; // Include start day
            totalAbsentDays += workingDays;
        });

        // Count agents
        const totalUsers = await User.countDocuments({ role: { $in: ['agent'] } });

        // Calculate absenteeism rate
        const totalWorkDaysPerYear = totalUsers * 260;
        const absenteeismRate = (totalAbsentDays / totalWorkDaysPerYear) * 100;

        res.json({ absenteeismRate: absenteeismRate.toFixed(2) + "%" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error calculating absenteeism rate" });
    }
});



router.get('/tasks-status-per-user', async (req, res) => {
    const result = await Task.aggregate([
        {
            $group: {
                _id: { userId: "$responableId", status: "$taskStatus" },
                count: { $sum: 1 }
            }
        },
        {
            $group: {
                _id: "$_id.userId",
                tasks: {
                    $push: { status: "$_id.status", count: "$count" }
                }
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "_id",
                foreignField: "_id",
                as: "user"
            }
        },
        { $unwind: "$user" },
        {
            $project: {
                userName: "$user.name",
                tasks: 1
            }
        }
    ]);
    res.json(result);
});

module.exports = router;