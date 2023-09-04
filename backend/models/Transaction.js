const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Transaction = sequelize.define('Transaction', {
    transaction_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    sender_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    receiver_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    currency: {
        type: DataTypes.STRING(3),
        allowNull: false,
    },
    isCurrentUserRequest: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    transaction_date: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    usd_amt: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    receiver_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    sender_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'transactions',
    timestamps: false,
});

Transaction.belongsTo(User, { foreignKey: 'sender_id', as: 'Sender' });
Transaction.belongsTo(User, { foreignKey: 'receiver_id', as: 'Receiver' });

module.exports = Transaction;
