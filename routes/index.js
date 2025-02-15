const express = require('express');
const { adminAuth } = require('../middlewares/adminAuth');
const { createFile, createArticle, getFile, getArticles } = require('../controllers/articleController');

const rt = express.Router();

rt.post("/file", adminAuth, createFile)
rt.post("/article", adminAuth, createArticle)
rt.get("/file", getFile)
rt.get("/article", getArticles)

module.exports = rt;