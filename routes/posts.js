var express = require('express');
var router = express.Router();

const Post = require('../models/m_post')

/* GET */
router.get('/', async function (req, res, next) {
  let posts = await Post.find()
  res.status(200).json({ posts })
  // res.send('respond with a resource');
});

/* POST */
router.post('/', async function (req, res, next) {
  try {
    const data = req.body
    const newPost = await Post.create(
      {
        name: data.name,
        content: data.content,
        type: data.type,
        tags: data.tags,
        image: data.image
      }
    )
    res.status(200).json({ newPost })
  } catch (error) {
    res.status(400).json({
      message: '可能欄位錯誤哦'
    })
  }
})

/* PATCH */
router.patch('/:id', async function (req, res, next) {
  const id = req.params.id
  const data = req.body
  // console.log('req.params', req.params);
  // console.log('req.body', req.body);
  try {
    if (data.content && data.name) {
      let post = await Post.findByIdAndUpdate(id, data, { new: true })
      if (post !== null) {
        res.status(200).json({ post })
      } else {
        res.status(400).json({ message: '文章不存在' })
      }

    } else {
      res.status(400).json({ message: '文章不存在' })
    }

  } catch (error) {
    res.status(400).json({
      message: '可能欄位錯誤哦'
    })
  }
})

/* DELETE */
router.delete('/:id', async function (req, res, next) {
  const id = req.params.id
  let post = await Post.findByIdAndDelete(id)

  if (post !== null) {
    res.status(200).json({ message: '刪除成功' })
  } else {
    res.status(400).json({ message: '找不到文章' })
  }

})

module.exports = router;
