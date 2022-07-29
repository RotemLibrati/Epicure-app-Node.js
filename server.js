const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(express.json({ extended: false }));


app.use('/api/restaurants', require('./routes/api/restaurants'));
app.use('/api/chefs', require('./routes/api/chefs'));
app.use('/api/dishes', require('./routes/api/dishes'));

const PORT = process.env.POST || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));