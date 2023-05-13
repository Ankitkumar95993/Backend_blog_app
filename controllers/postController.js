// import model

const Post = require("../Models/postModel");

//business logic

exports.createPost = async (req, res) => {
  try {
    //taking the data from the request body
    const { title, body } = req.body;
    //creating the new object
    const post = new Post({
      title,
      body,
    });
    const savedPost = await post.save();
    res.json({
      post: savedPost,
    });
  } catch (error) {
    return res.status(400).json({
      error: "error while creating post",
    });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("likes").populate("comments").exec();  
    // need more testing after adding likescontrollers and like model
    res.json({
      posts,
    });
  } catch (error) {
    return res.status(400).json({
      error: "error while creating post",
    });
  }
};
