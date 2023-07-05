require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const productRoute = require('./routes/productRoute')
const errorMiddleware = require('./middleware/errorMiddleware')

const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT || 3000
const FRONTEND_URL = process.env.FRONTEND_URL

const corsOptions = {
  origin: [FRONTEND_URL],
  optionsSuccessStatus: 200
}

const app = express();
app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/api', productRoute)
app.get('/', (req, res) => {
	res.send('Hello Node API');
});
app.get('/blog', (req, res) => {
	res.send('Hello blog, my name is Kur');
});

// middleware
app.use(errorMiddleware)

// connect
mongoose
	.connect(MONGO_URL)
	.then(() => {
		console.log('Connected to MongoDB');
		app.listen(PORT, () => {
			console.log(`Node API app is running on port ${PORT}`);
		});
	})
	.catch((err) => {
		console.log(err);
	});
