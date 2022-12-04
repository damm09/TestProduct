'use strict';
const bcrypt = require('bcryptjs');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
    }
  }
  User.init({
    company: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: `Username has been taken`
      },
      validate: {
        notEmpty: {
          msg: `Username is Required`
        },
        notNull: {
          msg: `Username is Required`
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: `email is already exists`
      },
      validate: {
        notEmpty: {
          msg: `Email is Required`
        },
        notNull: {
          msg: `Email is Required`
        },
        isEmail: {
          msg: `Email is Invalid`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Password is Required`
        },
        notNull: {
          msg: `Password is Required`
        },
        isAlphanumeric: {
          msg: `Password must alphanumeric`
        }
      }
    },
    companyLabel: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((value) => {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(value.password, salt);
    value.password = hash
  })
  
  return User;
};