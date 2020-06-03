const express = require('express');

const postsRouter = require('./router');

//create server
const server = express();

//middleware
server.use(express.json()); //needed to parese JSON from the body

//for URL's that start with /api/posts
server.use("/api/posts", postsRouter);


//GET all the posts and send an html message to the body
server.get('/', (req, res) => {
    res.send(`
        <h2>Posts API</h>
        <p>Welcome to the Lambda Posts API</p>
    `);
  });


server.listen(4000, () => {
    console.log(`server running on http://localhost:4000`);
    
})
