const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Todo = new Schema({
  title: {
    type: String,
    required: true, // Making the field required
  },
  description: {
    type: String,
    required: true,
  },
  dosage: {
    type: String, // Assuming it's a string, but you can change it to Number if necessary
    required: true,
  },
  manufacturingDate: {
    type: Date,
    required: true,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  image: {
    type: String, // Storing image URL or path (if using file upload)
    required: true, // This is optional, as not all todos might have an image (previous it is false)
  }
});

module.exports = mongoose.model('Todo', Todo);
