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
  }, {});
  
  Message.associate = (models) => {
    Message.belongsTo(models.Contact, {
      as: 'sender',
      foreignKey: 'senderId'
    });
    Message.belongsTo(models.Contact, {
      as: 'recipient',
      foreignKey: 'recipientId'
    });
  };

  Message.createRules = () => ({
    content: 'required|min:1',
    senderId: ['required', 'min:11', 'max:14', 'regex:/^[0-9]+/'],
    recipientId: ['required', 'min:11', 'max:14', 'regex:/^[0-9]+/']
  });
  return Message;
};