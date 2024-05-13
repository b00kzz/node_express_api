const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/database');

const Posts = sequelize.define('posts', {
    title: {
        type: DataTypes.STRING(100)
    },
    content: {
        type: DataTypes.STRING(100)
    },
})

module.exports = Posts;