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
        title: data.title,
        description: data.description,
        content: data.content,
        author: data.ratting,
        score: data.score,
        cover: data.cover
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
    let post = await Post.findByIdAndUpdate(id, data, { new: true })
    res.status(200).json({ post })
  } catch (error) {
    res.status(400).json({
      message: '可能欄位錯誤哦'
    })
  }
})

/* FELETE */
router.delete('/:id', async function (req, res, next) {
  const id = req.params.id
  try {
    await Post.findByIdAndDelete(id)
    res.status(200).json({ message: '刪除成功' })
  } catch (error) {
    res.status(400).json(error)
  }
})

module.exports = router;
