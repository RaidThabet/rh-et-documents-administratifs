const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors')

const authRoutes = require('./routes/auth');
const logRoutes = require('./routes/log');
const recordsRoutes = require('./routes/records');
const leaveRoutes = require('./routes/leave');

const Connect = require('./database/db')


const app = express();

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use('/auth', authRoutes);
app.use('/log', logRoutes);
app.use('/records', recordsRoutes);
app.use('/leave', leaveRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  Connect();
});