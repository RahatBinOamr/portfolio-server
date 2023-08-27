const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./portfolio/routes');

const port = process.env.PORT || 5000;

/* middleware */
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
async function main() {
  try {
    const url = process.env.DB_URL;
    console.log(url);
    await mongoose.connect(url);
    console.log('database connection successful on port', port);
  } catch (err) {
    console.log(err.message);
  }
}
main();

/* router handler  */
app.use('/api/v1/portfolio', router);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
module.exports = app;
