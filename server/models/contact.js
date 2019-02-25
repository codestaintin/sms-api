export default (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: {
          args: 2,
          msg: 'Contact name cannot be less than two characters'
        },
        notEmpty: {
          args: true,
          msg: 'Please fill in a contact name'
        }
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      validate: {
        len: {
          args: [11, 14],
          msg: 'Phone number should be 11 or 14 characters long'
        }
      }
    }
  }, {});

  Contact.removeAttribute('id');

  Contact.associate = (models) => {
    // associations can be defined here
    Contact.hasMany(models.Message, {
      as: 'sender',
      foreignKey: 'senderId'
    });
    Contact.hasMany(models.Message, {
      as: 'recipient',
      foreignKey: 'recipientId'
    })
  };
  return Contact;
};