const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TextSchema = new Schema({
    _id: Schema.Types.ObjectId,
    page: { type: String, required: true },
    text: { type: String, required: false }
})

//create schema for todo
const CategorySchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  pages: [{type: TextSchema, required: false}]
})

//create model for todo
const Category = mongoose.model('category', CategorySchema);
const Text = mongoose.model('text', TextSchema)

module.exports = { Category, Text };