export default (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    senderId: {
      type: DataTypes.STRING,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: 'Contacts',
        key: 'phoneNumber',
        as: 'senderId',
      },
    },
    recipientId: {
      type: DataTypes.STRING,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: 'Contact',
        key: 'phoneNumber',
        as: 'recipientId'
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Message content can not be empty'
        }
      }
    },
    status: { 
      type: DataTypes.ENUM('sent', 'read'),
      defaultValue: 'sent'
    },
  }, {
    timeStamp: false,
    hooks: {
      beforeCreate: (message) => {
        message.sentOn = Date();
      },
  }
  });
  
  Message.associate = (models) => {
    // associations can be defined here
    Message.belongsTo(models.Contact, {
      as: 'sender',
      foreignKey: 'senderId'
    })
    Message.belongsTo(models.Contact, {
      as: 'recipient',
      foreignKey: 'recipientId'
    })
  };
  return Message;
};