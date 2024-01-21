const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
  {
    // ID column
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Title column
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Content column
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // User ID column (foreign key)
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: true, // Enable timestamps for createdAt and updatedAt
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
  }
);

module.exports = Post;