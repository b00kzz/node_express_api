const { Op } = require("sequelize");
const posts = require("../model/posts-model");

module.exports = {
    getAllPosts: async (req, res) => {
        try {
            const { searchText, pageNo, limit, order, category } = req.body
            const offset = (pageNo - 1) * limit;
            const option = category || "createdAt"
            if (!order || !limit) {
                throw { statusCode: 400, message: "Order and limit is required" }
            }
            const post = await posts.findAndCountAll(
                {
                    order: [[option, order]],
                    where: {
                        [Op.or]: [
                            { title: { [Op.like]: `%${searchText}%` } },
                            { content: { [Op.like]: `%${searchText}%` } }
                        ]
                    },
                    limit,
                    offset
                }
            )
            res.status(200).json(post);
        } catch (error) {
            console.log("getAllPosts: ~ error:", error.message)
            let statusCode = error.statusCode || 500;
            res.status(statusCode).json({
                message: "something went wrong",
                errorMessage: error.message,
                statusCode
            })
        }
    },
    getPostById: async (req, res) => {
        try {
            const post = await posts.findByPk(req.params.id);
            res.status(200).json(post);
        } catch (error) {
            console.log("getPostById: ~ error:", error.message)
            res.status(500).json(error)
        }
    },
    createPosts: async (req, res) => {
        try {
            const { title, content } = req.body;
            if (!title || !content) {
                throw { statusCode: 400, message: "Body is require" };
            }
            const post = await posts.create({ title, content });
            res.status(201).json(post);
        } catch (error) {
            let statusCode = error.statusCode || 500;
            res.status(statusCode).json({
                message: "something went wrong",
                errorMessage: error.message,
                statusCode
            })
        }
    },
    deletePost: async (req, res) => {
        try {
            const post = await posts.findByPk(req.params.id);
            await post.destroy();
            res.status(200).json("Deleted successfully");
        } catch (error) {
            console.log("deletePost: ~ error:", error.message)
            res.status(500).json(error)
        }
    }
}

