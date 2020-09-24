const express = require ('express');
const router = express.Router();
const Tabs = require('../model/tabs')

router.get('/tabs', (req, res, next) => {
  Tabs.find({})
    .then(data => res.json(data))
    .catch(next)
})

router.post('/tabs', (req, res, next) => {
  if(req.body.pages) {
    Tabs.create(req.body)
    .then(data => res.json(data))
    .catch(next)
  } else {
    res.json({error :shit})
  }
})

  module.exports = router;