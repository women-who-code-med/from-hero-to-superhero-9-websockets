const { DataTypes, Model } = require('sequelize');
const sequelize = require("../utils/postgresql");
const {encryptPassword} = require("../utils/authentication");

/**
 * @property {string} email - User uniques email
 * @property {string} firstName - User first name
 * @property {string} lastName -  User last name
 * @property {string} password - User sensitive password - only received on creation or at login
 */
class User extends Model {
  /**
   * @promise
   *
   * @param {string} email - User email
   * @param {string} password - Password to validate
   * @returns {Promise<User>} - User if exists, null otherwise
   */
  static login(email, password) {
    return User.findOne({
      where: { email, password: encryptPassword(password) },
      
    }, );
  }
  
  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

User.init({
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(password) {
      this.setDataValue("password", encryptPassword(password));
    }
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
  }
}, {
  sequelize,
  defaultScope: {
    attributes: {
      exclude: ["password"]
    }
  },
  scopes: {
    withPassword: {
      attributes: {}
    }
  },
  hooks: {
    afterCreate(user, _) {
      delete user.dataValues.password;
    }
  },
  modelName: 'User'
});

module.exports = User;