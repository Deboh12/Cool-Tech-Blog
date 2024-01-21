const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
  // Method to check password validity
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    // ID column
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    // Username column
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // Password column
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8] // Password must be at least 8 characters long
      }
    }
  },
  {
    sequelize,
    timestamps: true,
    hooks: {
      // Hash password before saving a new user
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      // Hash password before updating user data
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      }
    },
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
  }
);

module.exports = User;