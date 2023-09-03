const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    full_name: {
        type: DataTypes.STRING(100),
    },
    date_of_birth: {
        type: DataTypes.DATE,
    },
    phone_number: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
    },
}, {
    sequelize,
    tableName: 'users',
    timestamps: false,
});

module.exports = User;
