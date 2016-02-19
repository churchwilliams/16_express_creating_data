
var mongoose = require('mongoose');

var schema = mongoose.Schema({
  title: {type: String, default: "default, yo" },
  body: {type: String, default: "default playa" },
  author: Number
});

var Post = mongoose.model('posts', schema);
module.exports = Post;

