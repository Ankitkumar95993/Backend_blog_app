const express = require('express');
const router = express.Router();

//import controller

// const {dummyLink} = require('../Controllers/likeController');
const {createComment} = require('../Controllers/commentController');
const {createPost,getAllPosts} = require('../Controllers/postController');
const {createLike, unLikePost} = require("../Controllers/likeController");

//Mapping create
// router.get("/dummyroute",dummyLink);
router.post("/comments/create",createComment);
router.post("/posts/create",createPost);
router.get("/posts",getAllPosts);
router.post("/likes/like",createLike);
router.post("/likes/unlike",unLikePost);


//export krwana hai
module.exports = router;

