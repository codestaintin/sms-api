module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      senderId: {
        type: Sequelize.STRING,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'Contacts',
          key: 'phoneNumber',
          as: 'senderId',
        },
      },
      recipientId: {
        type: Sequelize.STRING,
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        references: {
          model: 'Contacts',
          key: 'phoneNumber',
          as: 'recipientId',
        },
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Message content can not be empty'
          }
        }
      },
      status: {
        type: Sequelize.ENUM('sent', 'read'),
        defaultValue: 'sent'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Messages');
  }
};