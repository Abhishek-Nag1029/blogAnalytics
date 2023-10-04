const express = require('express');
const _ = require('lodash');
const axios = require('axios');
const app = express();
const dotenv=require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 5000;
const blogRouter = require('./routes/blog');

app.use(express.json());
app.use('/api', blogRouter);

try {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
} catch (error) {
  console.error(`Error starting the server: ${error}`);
}
