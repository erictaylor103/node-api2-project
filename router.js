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

//DELETE a post by id
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    Posts.remove(id)
      .then(post => {
        if (post) {
          res.status(200).json({ message: 'Post Deleted!' });
        } else {
          res.status(404).json({ message: 'The post with the specified ID does not exist.' });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ error: 'The post could not be removed' });
      });
  });

//PUT edit a post by id
router.put('/:id', (req, res) => {
    const post = req.body;
    const { id } = req.params;
    if (!req.body.title || !req.body.contents) {
      res.status(400).json({errorMessage: 'Please provide title and contents for the post.'});
    } else {
      Posts.update(id, post)
        .then(updated => {
          if (updated) {
            res.status(200).json(updated);
          } else {
            res.status(404).json({message: 'The post with the specified ID does not exist.'});
          }
        })
        .catch(error => {
          console.log(error);
          res.status(500).json({ error: 'The post information could not be modified' });
        });
    }
  });

module.exports = router;
