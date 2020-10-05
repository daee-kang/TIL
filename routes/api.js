const express = require('express');
const router = express.Router();
const { Category, Text } = require('../model/data');
const mongoose = require('mongoose');
const marked = require('marked')

//---------------------------------------------------------------------------------
/* override marked renderer to match client side (dumbed down) */
const renderer = {
  heading(text, level) {
      return `<h${level} class="marked" id="blahblahblah">${text}</h${level}>`;
  }
};
marked.use({renderer})
//---------------------------------------------------------------------------------



router.get('/data', (req, res, next) => {
  Category.find({})
    .then(data => res.json(data))
    .catch(next)
})

router.post('/data', async (req, res, next) => {
  const data = await Category.find({name: req.body.name})
  if(data.length != 0) {
    res.json("already exists")
    return
  }
  
  const category = new Category({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
  })

  category.save()
    .then((data) => {
      console.log(data, `category ${data.name} saved`)
      res.json(data)
    })
    .catch(err => {
      console.log(err)
      res.json(err)
    })
})

router.post('/data/:category/:page', async (req, res, next) => {
  const { category, page } = req.params
  console.log(category, page)

  Category.updateOne({name: category}, {$addToSet: {
    "pages": {
      page: page,
      text: ""
    }
  }}, (err, data) => {
    if(err) console.log(err) 
    res.json(data)
  })
})

router.get('/tabs/:category/:page', (req, res, next) => {
  const { category, page } = req.params
  console.log(category, page)

  Text.findOne({ "category": category, "page": page })
    .then(results => {
      console.log(results)
      res.json(results)
    })
    .catch(err => {
      console.log(err)
    })
})

router.get('/tabs/allHeaders', (req, res, next) => {
  
  Text.find({}, (err, texts) => {
    let userMap = {}

    texts.forEach(t => {
      let markedText = marked(t.text)
      console.log(markedText)
      const regExpr = /<h[12] class=\"marked\" [^>]+>(.*?)<\/h[12]>/g 
      //const regExpr = /<h[12] [^>]+>(.*?)<\/h[12]>/g

      let m
      let regArray = []
      do{
        m = regExpr.exec(markedText)
        if(m) {
          regArray.push(m[1])
        }
      } while(m)

      userMap[t._id] = regArray
    })

    res.send(userMap)
  })
})

module.exports = router;