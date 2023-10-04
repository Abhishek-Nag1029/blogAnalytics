
const express=require('express');
const _=require('lodash');
const axios=require('axios');
const app=express();
const router=express.Router();


// const memoizedBlogSearch=memo(async())


const getBlogStats=async(req,res)=>{
  const {
    totalBlogs,
    blogWithLongestTitle,
    blogsWithPrivacyKeyword,
    uniqueBlogTitles,
  } = req.blogStats;

  res.json({
    totalBlogs,
    longestBlogTitle: blogWithLongestTitle.title,
    blogsContainingPrivacy: blogsWithPrivacyKeyword,
    uniqueBlogTitles,
  });
};




const blogSearch=async(req,res)=>{
  
    try {
        const response = await axios.get('https://intent-kit-16.hasura.app/api/rest/blogs', {
          headers: {
            'x-hasura-admin-secret': '32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6',
          },
        });
    
        if (response.status === 200) {
          const blogData = response.data;
          const query = req.query.query.toLowerCase();
          const searchResults = blogData.blogs.filter((blog) => blog.title.toLowerCase().includes(query));
          res.json({ searchResults });
        } else {
          throw new Error('Failed to fetch blog data');
        }
      } catch (error) {
        console.error('Error in /api/blog-search:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
      console.timeEnd('blogSearchExecutionTime');
};

module.exports={
    getBlogStats,
    blogSearch,
};