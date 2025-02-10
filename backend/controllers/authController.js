const User = require('../database/models/user');
const Role = require('../database/models/role');

const env = require("dotenv").config();
const { createSecretToken, verifySecretToken } = require("../tokenGeneration/generateToken");
const bcrypt = require("bcrypt");


exports.registerUser = async (req, res) => {
    try {
        if (
            !(
                req.body.email &&
                req.body.password &&
                req.body.role &&
                req.body.username
            )
        ) {
            res.status(400).send("All input is required");
        }

        if (!["agent", "professor"].includes(req.body.role))
            res.status(403).send("Only allowed self-assigned roles are: agent, professor!");

        const oldUser = await User.findOne({ email: req.body.email });

        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }
        const salt = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            role: req.body.role,
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });
        const user = await newUser.save();
        const token = createSecretToken(user._id);

        res.cookie("token", token, {
            path: "/", // Cookie is accessible from all paths
            expires: new Date(Date.now() + 86400000), // Cookie expires in 1 day
            secure: process.env.SECURE_COOKIE, // Cookie will only be sent over HTTPS if true
            httpOnly: true, // Cookie cannot be accessed via client-side scripts
            sameSite: "None",
        });

        console.log("cookie set succesfully");

        res.json(user);
    } catch (error) {
        console.log("Gott an error", error);
    }
};


exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!(email && password)) {
        return res.status(400).json({ message: "All input is required" });
    }
    const user = await User.findOne({ email });
    if (!(user && (await bcrypt.compare(password, user.password)))) {
        return res.status(404).json({ message: "Invalid credentials" });
    }
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
        // domain: process.env.FRONTEND_URL, // Set your domain here
        path: "/", // Cookie is accessible from all paths
        expires: new Date(Date.now() + 86400000), // Cookie expires in 1 day
        secure: process.env.SECURE_COOKIE, // Cookie will only be sent over HTTPS if true
        httpOnly: true, // Cookie cannot be accessed via client-side scripts
        sameSite: "None",
    });

    res.json({ token, user });
};


exports.logoutUser = async (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out" });
}

exports.loggedIn = async (req, res) => {
    const token = req.cookies.token; // Get token from HTTP-only cookie

    if (!token) {
        return res.json({ loggedIn: false, user: null });
    }

    try {
        const verified = verifySecretToken(token);
        return res.json({ loggedIn: true, user: verified });
    } catch (err) {
        return res.json({ loggedIn: false, user: null });
    }
}

// Reset a user's password
exports.resetPassword = (req, res) => {
    const { username, newPassword } = req.body;

    User.findOne({ username }, (err, user) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.setPassword(newPassword, (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            user.save((err) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.json({ message: 'Password reset successfully' });
            });
        });
    });
};


// Delete a user's account
exports.deleteUser = (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    User.findByIdAndDelete(userId, (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to destroy session' });
            }
            res.clearCookie('connect.sid'); // Clear the session cookie if needed
            res.json({ message: 'Account deleted successfully' });
        });
    });
};