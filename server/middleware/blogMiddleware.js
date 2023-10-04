const express=require('express');
const _=require('lodash');
const axios=require('axios');
const app=express();

const fetchBlogDataMiddleware=async (req,res,next)=>{
    try{
       const response=await axios.get('https://intent-kit-16.hasura.app/api/rest/blogs',
       {
        headers:{
            'x-hasura-admin-secret': '32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6',

        },
       });
       if (response.status === 200) {
        const blogData = response.data;
  
        
        const totalBlogs = _.get(blogData, 'blogs.length', 0);
      const blogWithLongestTitle = _.maxBy(blogData.blogs, (blog) => blog.title.length);

   
      const blogsWithPrivacyKeyword = _.filter(blogData.blogs, (blog) =>
        _.includes(_.toLower(blog.title), 'privacy')
      ).length;

      
      const uniqueBlogTitles = _.uniqBy(blogData.blogs, 'title').map((blog) => blog.title);

      
      req.blogStats = {
        totalBlogs,
        blogWithLongestTitle,
        blogsWithPrivacyKeyword,
        uniqueBlogTitles,
       
      };
        next();
      } else {
        throw new Error('Failed to fetch blog data');
      }
    }
    catch(error){
        console.error('Error fetching blog data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports={fetchBlogDataMiddleware}