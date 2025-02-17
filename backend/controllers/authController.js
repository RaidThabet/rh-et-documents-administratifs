const User = require('../database/models/user');
const Role = require('../database/models/role');
const Token = require('../database/models/token');

const logController = require('../controllers/logController');

const env = require("dotenv").config();
const { createSecretToken, verifySecretToken } = require("../tokenGeneration/generateToken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    host: process.env.BREVO_HOST,
    port: process.env.BREVO_PORT,
    auth: {
        user: process.env.BREVO_USER,
        pass: process.env.BREVO_PASS,
    },
});


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

        // if (!["agent", "professor"].includes(req.body.role))
        //     res.status(403).send("Only allowed self-assigned roles are: agent, professor!");
        // no need anymore: because now only admin can create new accounts

        const loggedToken = req.cookies.token;
        if (!loggedToken) {
            console.error("Action user is not logged in!")
        }
        try {
            const verified = verifySecretToken(loggedToken);
            const actionnerUser = await User.findById(verified.id)
            await logController.addLog("add", `${actionnerUser.username} registered ${req.body.username} as a new User`)
        } catch (error) {
            console.error(error);
        }

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
        /*const token = createSecretToken(user._id);

        res.cookie("token", token, {
            path: "/", // Cookie is accessible from all paths
            expires: new Date(Date.now() + 86400000), // Cookie expires in 1 day
            secure: process.env.SECURE_COOKIE, // Cookie will only be sent over HTTPS if true
            httpOnly: true, // Cookie cannot be accessed via client-side scripts
            sameSite: "None",
        });

        console.log("cookie set succesfully");*/

        res.json(user);
    } catch (error) {
        console.log("Got an error", error);
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

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    User.findOne({ email })
        .then((user) => {
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            Token.findOne({ userId: user._id })
                .then((token) => {
                    if (token)
                        token.deleteOne()
                })

            let resetToken = crypto.randomBytes(32).toString("hex");
            const salt = 10;
            bcrypt.hash(resetToken, salt)
                .then((hash) => {
                    Token.create({
                        userId: user._id,
                        token: hash,
                        createdAt: Date.now(),
                    })
                })

            const link = `${process.env.FRONTEND_URL}/password-reset?token=${resetToken}&id=${user._id}`;
            const to = email;
            const subject = "Resetting password";
            const text = `
                <h1>Hello ${user.username}!</h1>
                To reset your password, use this link
                It will expire in 1 hour
                ${link}
            `;

            const mailOptions = {
                from: process.env.SENDER_EMAIL,
                to,
                subject,
                text,
            };
            transporter.sendMail(mailOptions)
                .then(response => {
                    res.json({ message: "Email sent successfully!" });
                }).catch(error => {
                    console.error(error);
                    res.status(500).json({ message: "Error sending email" });
                })
        })
}


exports.checkResetCredentials = async (req, res) => {
    const { userId, token } = req.query;

    let passwordResetToken;
    try {
        passwordResetToken = await Token.findOne({ userId });
    } catch (error) {
        console.error("Invalid or expired password reset token");
        return res.status(200).json({ isCorrect: false, message: "Invalid or expired password reset token" })
    }
    if (!passwordResetToken) {
        console.error("Invalid or expired password reset token");
        return res.status(200).json({ isCorrect: false, message: "Invalid or expired password reset token" })
    }
    const isValid = await bcrypt.compare(token, passwordResetToken.token);
    if (!isValid) {
        console.error("Invalid or expired password reset token");
        return res.status(200).json({ isCorrect: false, message: "Invalid or expired password reset token" })
    }

    console.log("Correct password and reset token")
    return res.status(200).json({ isCorrect: true, message: "Correct password and reset token" })
};

// Reset a user's password
exports.resetPassword = async (req, res) => {
    const { userId, token, password } = req.body;

    let passwordResetToken;
    try {
        passwordResetToken = await Token.findOne({ userId });
    } catch (error) {
        console.error("Invalid or expired password reset token");
    }
    if (!passwordResetToken) {
        // throw new Error("Invalid or expired password reset token");
        console.error("Invalid or expired password reset token");
        return res.status(404).json({ message: "Invalid or expired password reset token" })
    }
    const isValid = await bcrypt.compare(token, passwordResetToken?.token);
    if (!isValid) {
        // throw new Error("Invalid or expired password reset token");
        console.error("Invalid or expired password reset token");
        return res.status(404).json({ message: "Invalid or expired password reset token" })
    }
    const salt = 10;
    const hash = await bcrypt.hash(password, salt);
    await User.updateOne(
        { _id: userId },
        { $set: { password: hash } },
        { new: true }
    );
    const user = await User.findById({ _id: userId });

    const to = user.email;
    const subject = "Resetting password";
    const text = `
        <h1>Hello ${user.username}!</h1>
        Your password has been changed successfully
    `;
    const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to,
        subject,
        text,
    };
    transporter.sendMail(mailOptions)
        .then(response => {
            res.json({ message: "Email sent successfully!" });
        }).catch(error => {
            console.error(error);
            res.status(500).json({ message: "Error sending email" });
        })

    await passwordResetToken.deleteOne();
};


// Delete a user's account
// exports.deleteUser = (req, res) => {
//     const userId = req.session.userId;
//     if (!userId) {
//         return res.status(401).json({ error: 'Unauthorized' });
//     }

//     User.findByIdAndDelete(userId, (err) => {
//         if (err) {
//             return res.status(500).json({ error: err.message });
//         }
//         req.session.destroy((err) => {
//             if (err) {
//                 return res.status(500).json({ error: 'Failed to destroy session' });
//             }
//             res.clearCookie('connect.sid'); // Clear the session cookie if needed
//             res.json({ message: 'Account deleted successfully' });
//         });
//     });
// };