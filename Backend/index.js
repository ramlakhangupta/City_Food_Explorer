const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const allRoutes = require('./routes/allRoutes');
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();

const app = express();
connectDB();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());

app.use(cors({
    origin: true,
    methods: ['POST', 'GET'],
    credentials: true
  }));
app.use('/api', allRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server running on Port ${PORT}`));

app.get('/', (req, res) => {
  // console.log('Your server is up and running..!');
  res.send(`<div>
  This is Default Route  
  <p>Everything is OK</p>
  </div>`);
})
