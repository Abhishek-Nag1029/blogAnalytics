
const express=require('express');
const router=express.Router();
const {blogSearch,getBlogStats}=require('../controllers/blog');
const {fetchBlogDataMiddleware}=require('../middleware/blogMiddleware');
router.get('/blog-stats',fetchBlogDataMiddleware,getBlogStats);
router.get('/blog-search',fetchBlogDataMiddleware,blogSearch);

module.exports=router;