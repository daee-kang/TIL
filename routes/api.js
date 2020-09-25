const express = require ('express');
const router = express.Router();
const Tabs = require('../model/tabs');
const mongoose = require('mongoose');

router.get('/tabs', (req, res, next) => {
  Tabs.find({})
    .then(data => res.json(data))
    .catch(next)
})

router.post('/tabs', (req, res, next) => {
  const tab = new Tabs({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    pages: req.body.pages
  })

  tab.save()
    .then((data) => {
      console.log(data, `tab ${tab.name} saved`)
      res.json(data)
    })
    .catch(err => {
      console.log(err)
      res.json(err)
    })
})

  module.exports = router;