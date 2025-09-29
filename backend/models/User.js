const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 50],
        is: /^[a-zA-Z0-9_]+$/
      }
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        len: [6, 255]
      }
    },
    first_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: [1, 100]
      }
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: [1, 100]
      }
    },
    role: {
      type: DataTypes.ENUM('admin', 'accountant', 'sales', 'inventory', 'viewer'),
      allowNull: false,
      defaultValue: 'viewer'
    },
    permissions: {
      type: DataTypes.JSONB,
      defaultValue: {}
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    last_login: {
      type: DataTypes.DATE
    },
    password_reset_token: {
      type: DataTypes.STRING
    },
    password_reset_expires: {
      type: DataTypes.DATE
    },
    email_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    email_verification_token: {
      type: DataTypes.STRING
    },
    profile_image: {
      type: DataTypes.STRING
    },
    phone: {
      type: DataTypes.STRING(20)
    },
    department: {
      type: DataTypes.STRING(100)
    },
    job_title: {
      type: DataTypes.STRING(100)
    },
    notes: {
      type: DataTypes.TEXT
    }
  }, {
    tableName: 'users',
    indexes: [
      {
        unique: true,
        fields: ['email']
      },
      {
        unique: true,
        fields: ['username']
      },
      {
        fields: ['role']
      },
      {
        fields: ['is_active']
      }
    ],
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const saltRounds = parseInt(process.env.BCRYPT_ROUNDS) || 12;
          user.password = await bcrypt.hash(user.password, saltRounds);
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed('password')) {
          const saltRounds = parseInt(process.env.BCRYPT_ROUNDS) || 12;
          user.password = await bcrypt.hash(user.password, saltRounds);
        }
      }
    }
  });

  // Instance methods
  User.prototype.validatePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  };

  User.prototype.getFullName = function() {
    return `${this.first_name} ${this.last_name}`;
  };

  User.prototype.toSafeJSON = function() {
    const user = this.toJSON();
    delete user.password;
    delete user.password_reset_token;
    delete user.password_reset_expires;
    delete user.email_verification_token;
    return user;
  };

  // Class methods
  User.findByCredentials = async function(emailOrUsername, password) {
    const user = await this.findOne({
      where: {
        [sequelize.Sequelize.Op.or]: [
          { email: emailOrUsername },
          { username: emailOrUsername }
        ],
        is_active: true
      }
    });

    if (!user) {
      return null;
    }

    const isValid = await user.validatePassword(password);
    if (!isValid) {
      return null;
    }

    return user;
  };

  return User;
};