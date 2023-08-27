const { default: mongoose } = require('mongoose');

const PortfolioSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    image1: {
      type: String,
    },
    image2: {
      type: String,
    },
    image3: {
      type: String,
    },
    image4: {
      type: String,
    },
    live: {
      type: String,
      required: true,
    },
    client: {
      type: String,
    },
    server: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Portfolio = mongoose.model('Portfolio', PortfolioSchema);
module.exports = Portfolio;
