const express = require("express")
const userController = require("../controller/users-controller")
const router = express.Router()
const userRouter = router

userRouter.get("/", userController.getAllUser);
userRouter.get("/:id", userController.getUserById);
userRouter.post("/", userController.createUser);
userRouter.put("/:id", userController.updateUser);
userRouter.delete("/:id", userController.deleteUser);

router.use("/users", userRouter);


module.exports = router