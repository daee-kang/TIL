const express = require ('express');
const router = express.Router();
const Tabs = require('../model/tabs');
const Text = require('../model/text')
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

router.post('/tabs/:category/:page', (req, res, next) => {
  const { category, page } = req.params
  console.log(res.body)

  let text = req.body.text
  if(text === undefined) {
    text = ""
  }

  Text.updateOne({"category": category, "page": page}, 
    {"category": category, "page": page, "text": text})
    .then(val => {
      res.json(val)
    })
    .catch(err => {
      console.log(err)
  })


})

router.get('/tabs/:category/:page', (req, res, next) => {
  const { category, page } = req.params
  console.log(category, page)

  Text.findOne({"category": category, "page": page})
    .then(results => {
      console.log(results)
      res.json(results)
    })
    .catch(err => {
      console.log(err)
    })

})

  module.exports = router;