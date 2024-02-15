const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const staffRoutes = require('./routes/staffRoutes');
const sequelize = require('./config/databaseConnections');
const Admin = require('./models/admin');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(cors({
    origin: 'http://localhost:8080'
}));

app.use('/api', authRoutes);

app.use('/api/staff', staffRoutes);

sequelize.sync();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});