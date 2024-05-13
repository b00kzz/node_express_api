const Users = require("../model/user-model")

module.exports = {
    getAllUser: async (req, res) => {
        try {
            const users = await Users.findAndCountAll()
            res.status(200).json(users)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    createUser: async (req, res) => {
        try {
            const findUser = await Users.findOne({ where: { username: req.body.username } })
            if (findUser) {
                throw { statusCode: 400, message: "Username already exists" }
            }
            const { username, password } = req.body
            const user = await Users.create({
                username, password
            })
            res.status(201).json({
                statusCode: 201,
                message: "User Created successfully",
                user
            })
        } catch (error) {
            res.status(500).json(error)
        }
    },
    getUserById: async (req, res) => {
        try {
            const users = await Users.findByPk(req.params.id)
            res.status(200).json(users)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    updateUser: async (req, res) => {
        try {
            const findUser = await Users.findByPk(req.params.id)
            if (!findUser) {
                throw { statusCode: 400, message: "User not found" }
            }
            const { username, password, image } = req.body
            await Users.update({
                password,
                image
            }, { where: { id: findUser.id } })
            res.status(200).json({
                statusCode: 200,
                message: "User Updated successfully"
            })
        } catch (error) {
            res.status(500).json(error)
        }
    },
    deleteUser: async (req, res) => {
        try {
            await Users.destroy({ where: { id: req.params.id } })
            res.status(200).json("Deleted successfully")
        } catch (error) {
            res.status(500).json(error)
        }
    }
}