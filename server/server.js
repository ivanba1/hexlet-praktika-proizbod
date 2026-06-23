require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const tasksRouter = require('./routes/tasks');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/tasks', tasksRouter);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});