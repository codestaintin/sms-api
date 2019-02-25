module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Contacts', {
      name: {
        type: Sequelize.STRING,
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
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        validate: {
          len: {
            args: [11, 14],
            msg: 'Phone number should be 11 or 14 characters long'
          }
        }
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
    return queryInterface.dropTable('Contacts');
  }
};