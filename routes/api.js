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
marked.use({ renderer })
//---------------------------------------------------------------------------------

//return all
router.get('/', (req, res, next) => {
  console.log('/')
  Category.find({})
    .then(data => res.json(data))
    .catch(next)
})

//creates category
router.post('/:category', async (req, res, next) => {
  const { category } = req.params
  console.log(`POST /${category}`)

  const data = await Category.find({ name: category })
  if (data.length != 0) {
    res.json("already exists")
    return
  }

  const c = new Category({
    _id: new mongoose.Types.ObjectId(),
    name: category,
  })

  c.save()
    .then((data) => {
      console.log(data, `category ${data.name} saved`)
      res.json(data)
    })
    .catch(err => {
      console.log(err)
      res.json(err)
    })
})

//add blank page to category
router.post('/:category/:page', (req, res, next) => {
  const { category, page } = req.params
  console.log(`POST /${category}/${page}`)

  Category.updateOne({ name: category }, {
    $addToSet: {
      "pages": {
        page: page,
        text: ""
      }
    }
  }, (err, data) => {
    if (err) console.log(err)
    res.json(data)
  })
})

//update page in category
router.put('/:category/:page', (req, res, next) => {
  const { category, page } = req.params
  console.log(`PUT /${category}/${page}`)

  Category.findOne({ name: category }, (err, data) => {
    if (data === null) {
      res.json("category doesn't exist")
      return
    }

    console.log(data);
    for (let i = 0; i < data.pages.length; i++) {
      if (data.pages[i].page === page) {
        data.pages[i].text = req.body.text
      }
    }

    data.save()
      .then((out) => {
        res.json(out)
      })
      .catch(err => {
        console.log(err)
        res.json(err)
      })
  })
})

//return page
router.get('/:category/:page', (req, res, next) => {
  const { category, page } = req.params
  console.log(`GET /${category}/${page}`)

  Category.findOne({ name: category, "pages.page": page })
    .then(results => {
      if (results === null) {
        res.json("not found")
        return
      }

      for (let i = 0; i < results.pages.length; i++) {
        if (results.pages[i].page === page) {
          res.json(results.pages[i])
          return
        }
      }
    })
    .catch(err => {
      console.log(err)
    })
})

router.get('/menuItems', (req, res, next) => {
  console.log(`GET /menuItems`)
  Category.find({})
    .then((data) => {
      if (data === null) {
        res.json([])
        return
      }

      let out = []
      data.forEach((category) => {
        let outItem = {}
        outItem.title = category.name

        let outPages = []
        category.pages.forEach(page => {
          outPages.push(page.page)
        })

        outItem.pages = outPages

        out.push(outItem)
      })

      res.json(out)
    })
    .catch(next)
})

router.get('/allHeaders', (req, res, next) => {
  console.log(`GET /allHeaders`)
  Text.find({}, (err, texts) => {
    let userMap = {}

    texts.forEach(t => {
      let markedText = marked(t.text)
      console.log(markedText)
      const regExpr = /<h[12] class=\"marked\" [^>]+>(.*?)<\/h[12]>/g
      //const regExpr = /<h[12] [^>]+>(.*?)<\/h[12]>/g

      let m
      let regArray = []
      do {
        m = regExpr.exec(markedText)
        if (m) {
          regArray.push(m[1])
        }
      } while (m)

      userMap[t._id] = regArray
    })

    res.send(userMap)
  })
})

router.get('/headers/:category/:page', (req, res, next) => {
  const { category, page } = req.params
  console.log(`GET /headers/${category}/${page}`)

  Category.findOne({ name: category, "pages.page": page }, (err, data) => {
    if (err) {
      res.json(err)
      return
    }

    if (data === null) {
      res.json({})
      return
    }

    for(let i = 0; i < data.pages.length; i++) {
      let p = data.pages[i]

      if (p.page === page) {
        if(p.text === null || p.text === "") {
          res.json([])
          return;
        }
        let markedText = marked(p.text)
        const regExpr = /<h[23] class=\"marked\" [^>]+>(.*?)<\/h[23]>/g
        //const regExpr = /<h[12] [^>]+>(.*?)<\/h[12]>/g
        let m
        let regArray = []
        do {
          m = regExpr.exec(markedText)
          if (m) {
            regArray.push(m[1])
          }
        } while (m)

        res.json(regArray)
        return
      }
    }

    res.json([])
  })
})

module.exports = router;