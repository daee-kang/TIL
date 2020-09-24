const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema for todo
const TabsSchema = new Schema({
  name: {
      type: String,
      required: true
  },
  pages: {
    type: [{
        text: { type: String, required: true}
    }],
    required: false,
  }
})

//create model for todo
const Tabs = mongoose.model('tabs', TabsSchema);

module.exports = Tabs;