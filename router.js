const express = require('express');

const Posts = require('./data/db');

const router = express.Router();

//ROUTE HANDLERS


//GET all posts
router.get('/', (req, res) => {
  Posts.find(req.body)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "The posts information could not be retrieved." });
    });
});

//GET posts by id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    Posts.findById(id)
      .then(post => {
        if (!post) {
          res.status(404).json({ message: 'The post with the specified ID does not exist.' });
        } else {
          res.status(200).json(post);
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ error: 'The post information could not be retrieved.' });
      });
  });

  //GET posts comments by post id
router.get('/:id/comments', (req, res) => {
  const { id } = req.params;
  Posts.findPostComments(id)
    .then(post => {
      if (post.length === 0) {
        res.status(404).json({ message: 'The post with the specified ID does not exist.' });
      } else {
        res.status(200).json(post);
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: 'The comments information could not be retrieved.' });
    });
});

module.exports = router;
