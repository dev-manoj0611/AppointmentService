const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize) => {
  const AppointmentSlot = sequelize.define('AppointmentSlot', {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true
    },
    doctorId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: false
    },
    endTime: {
      type: DataTypes.TIME,
      allowNull: false
    },
    isAvailable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    bookedBy: {
      type: DataTypes.UUID,
      allowNull: true
    },
    consultationType: {
      type: DataTypes.ENUM('in-person', 'telemedicine', 'phone'),
      defaultValue: 'in-person'
    },
    status: {
      type: DataTypes.ENUM('available', 'booked', 'cancelled'),
      defaultValue: 'available'
    }
  }, {
    tableName: 'appointment_slots',
    timestamps: true,
    underscored: true
  });

  return AppointmentSlot;
};
