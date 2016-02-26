var express = require('express');
var router = express.Router();

var Post = require('./../models/post');

// posts

router.get('/', function(req, res) {
  Post.find({}).exec(function(err, posts) {
    if (err) {
      console.log("db error in GET /posts: " + err);
      res.render('500');
    } else {
      res.render('posts/index', {posts: posts});
    }
  });
});

router.get('/new', function(req, res) {
  var post = new Post();
  res.render('posts/new', {post: post});
});

router.post('/', function(req, res) {
  console.log(req.body);
  Post.create(req.body, function(err, post) {
    if (err) {
      console.log("db error in POST /posts: " + err);
      res.render('500');
    }
    else {
      var url = '/posts/'+post.id;
      req.flash('success', 'A new post was created');
      res.redirect(url);
    }
  });
});

router.get('/:id', function(req, res) {
  Post.findById(req.params.id).exec(function(err, post) {
    if (err) {
      console.log("db error in GET /posts: " + err);
      res.render('500');
    } else if (!post) {
      res.render('404');
    } else {
      res.render('posts/show', {post: post});
    }
  });
});

router.get('/:id/edit', function(req, res) {
  Post.findById(req.params.id).exec(function(err, post) {
    if (err) {
      console.log("db error in GET /posts: " + err);
      res.render('500');
    } else if (!post) {
      res.render('404');
    } else {
      res.render('posts/edit', {post: post});
    }
  });
});

router.put('/:id', function(req, res) {
  Post.findById(req.params.id, function(err, post) {
    if (err) {
      console.log("db find error in PUT /posts/" + req.params.id + ": " + err);
      res.render('500');
    } else if (!post) {
      res.render('404');
    } else {
      // update properties that can be modified. assumes properties are set in request body
      console.log(req.body);
      post.title = req.body.title;
      post.body = req.body.body;

      post.save(function(err) {
        if (err) {
          console.log("db save error in PUT /posts/" + req.params.id + ": " + err);
          res.render('500');
        } else {
          var url = '/posts/'+post.id;
          req.flash('success', 'Post updated');
          res.redirect(url);
        }
      });
    }
  });
});

router.delete('/:id', function(req, res) {
  Post.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      console.log("db save error in DELETE /posts/" + req.params.id + ": " + err);
      res.render('500');
    } else {
      req.flash('success', 'Post deleted');
      res.redirect('/posts');
    }
  });
});

module.exports = router;