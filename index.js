const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/databaseConnections');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const staffRoutes = require('./routes/staffRoutes');
const footerItemsRouter = require('./routes/footerItems');
const blogRoutes = require('./routes/blogRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(cors({
    origin: 'http://localhost:8080'
}));

app.use('/api', authRoutes);
app.use('/api', footerItemsRouter);

app.use('/api/staff', staffRoutes);

app.use('/api/blog', blogRoutes)
app.use('/api/portfolio', portfolioRoutes)

sequelize.sync();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});