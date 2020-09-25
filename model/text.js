const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema for todo
const TextSchema = new Schema({
    _id: Schema.Types.ObjectId,
    parent: { type: Schema.Types.ObjectId, ref: 'tabs' },
    text: { type: String, required: true }
})

//create model for todo
const Text = mongoose.model('text', TextSchema);

module.exports = Text;