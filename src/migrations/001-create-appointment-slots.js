'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('appointment_slots', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false
      },
      doctor_id: {
        type: Sequelize.UUID,
        allowNull: false
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      start_time: {
        type: Sequelize.TIME,
        allowNull: false
      },
      end_time: {
        type: Sequelize.TIME,
        allowNull: false
      },
      is_available: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      booked_by: {
        type: Sequelize.UUID,
        allowNull: true
      },
      consultation_type: {
        type: Sequelize.ENUM('in-person', 'telemedicine', 'phone'),
        allowNull: false,
        defaultValue: 'in-person'
      },
      status: {
        type: Sequelize.ENUM('available', 'booked', 'cancelled'),
        allowNull: false,
        defaultValue: 'available'
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now')
      }
    });

    await queryInterface.addIndex('appointment_slots', ['doctor_id']);
    await queryInterface.addIndex('appointment_slots', ['date']);
    await queryInterface.addIndex('appointment_slots', ['status']);
    await queryInterface.addIndex('appointment_slots', ['is_available']);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('appointment_slots');
  }
};
