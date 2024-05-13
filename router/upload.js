const express = require("express")
const multer = require('multer');
const router = express.Router()
const path = require("path")
require('dotenv').config();

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../uploads/users"))
    },
    filename: (req, file, cb) => {
        cb(req.errored, "image" + "_" + Date.now() + "." + file.originalname.split('.').pop())
    }
})

const upload = multer({ storage: storage })

router.post("/upload", upload.single('image'), (req, res) => {
    try {
        const fileType = req.file.filename.split('.').pop();
        if (!req.file || fileType != "jpg" && fileType != "jpeg" && fileType != "png" && fileType != "gif") {
            throw { statusCode: 400, message: "File is require jpg, jpeg, png, gif" };
        }
        res.status(200).json({ message: "Upload file successfully", fileName: process.env.FILE_PATH + req.file.filename })
    } catch (error) {
        console.log("upload: ~ error:", error)
        res.status(500).json(error)
    }
})

//http://localhost:3000/api/uploads/profile/filename
router.use("/uploads/profile/", express.static(path.join(__dirname, "../uploads/users")))

module.exports = router