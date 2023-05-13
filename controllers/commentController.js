// import model

const Post = require("../Models/postModel");
const Comment = require("../Models/commentModel");

//business logic
exports.createComment = async (req, res) => {
  try {
    // fetch data from req body
    const { post, body, user } = req.body;

    // const savedComment = await Comment.create({post,body,user});

    // one more method is there i.e save method

    // create a comment object
    const comment = new Comment({
      post,
      body,
      user,
    });

    //save the new comment into the database
    const savedComment = await comment.save();

    //find the Post by id and then add the new comment to is Comment array
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $push: { comments: savedComment._id } },
      { new: true }
    ) // return the updated document
      .populate("comments") // populate the comment array with comment document
      .exec();

    res.json({
      post: updatedPost,
    });
  } catch (error) {
    res.status(500).json({
      error: "error while creating comment",
    });
  }
};
