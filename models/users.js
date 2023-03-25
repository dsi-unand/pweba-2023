const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize("mysql://root@localhost:3306/pweba");

const User = sequelize.define(
    'User', 
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        active: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        created_at: {
            type: DataTypes.DATE
        },
        updated_at: {
            type: DataTypes.DATE
        }
    },
    {
        tableName: 'users',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

module.exports = User;