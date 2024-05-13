const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/database');

const User = sequelize.define('user', {
    username: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    password: { type: DataTypes.STRING(100), allowNull: false },
    image: { type: DataTypes.STRING(100), allowNull: true }
})

module.exports = User;
