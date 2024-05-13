const express = require("express");
const postsController = require("../controller/posts-controller");
const router = express.Router();
const postRouter = router

postRouter.patch("/", postsController.getAllPosts);
postRouter.get("/:id", postsController.getPostById);
postRouter.post("/", postsController.createPosts);
postRouter.delete("/:id", postsController.deletePost);

router.use("/posts", postRouter);


module.exports = router