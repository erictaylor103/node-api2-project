const express = require('express');

const postsRouter = require('./router');

//create server
const server = express();

//middleware
server.use(express.json()); //needed to parese JSON from the body

//for URL's that start with /api/posts
//server.use("/api/posts", postsRouter);


//GET all the posts and send an html message to the res



server.listen(4000, () => {
    console.log(`server running on http://localhost:4000`);
    
})
