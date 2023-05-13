// exports.dummyLink = (req,res)=>{
//     res.send("this is my dummy page");
// }

const Like = require("../Models/likeModel");
const Post = require("../Models/postModel");

exports.createLike = async (req, res) => {
  try {
    const { post, user } = req.body;
    const like = new Like({
      post,
      user,
    });

    const savedLike = await like.save();

    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $push: { likes: savedLike._id } },
      { new: true }
    )
      .populate("likes")
      .exec();
    res.json({
      post: updatedPost,
    });
  } catch (error) {
    res.status(500).json({
      error: "error while liking post",
    });
  }
};

// unlike a post
exports.unLikePost = async (req, res) => {
  try {
    const { post, like } = req.body;
    //find and delete like collection me se
    const deletedLike = await Like.findByIdAndDelete({post:post,_id:like})
    
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $pull: {likes:deletedLike._id } },
      { new: true }
    );
    res.json({
      post: updatedPost,
    });

  } 
  catch (error) {
    res.status(400).json({
      error: "error while unliking post",
    });
  }
};
