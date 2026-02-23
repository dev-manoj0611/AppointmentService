const { Op } = require('sequelize');
const { AppointmentSlot } = require('../models');

async function getAppointments(filters = {}) {
  const where = {};

  if (filters.patientId) {
    where.bookedBy = filters.patientId;
  }
  if (filters.doctorId) {
    where.doctorId = filters.doctorId;
  }
  if (filters.status) {
    where.status = filters.status;
  }
  if (filters.dateFrom || filters.dateTo) {
    where.date = {};
    if (filters.dateFrom) {
      where.date[Op.gte] = filters.dateFrom;
    }
    if (filters.dateTo) {
      where.date[Op.lte] = filters.dateTo;
    }
  }

  return AppointmentSlot.findAll({
    where,
    order: [
      ['date', 'ASC'],
      ['startTime', 'ASC']
    ]
  });
}

async function getSlots(filters = {}) {
  const where = {};

  if (filters.doctorId) {
    where.doctorId = filters.doctorId;
  }
  if (filters.date) {
    where.date = filters.date;
  }
  if (filters.status) {
    where.status = filters.status;
  }

  return AppointmentSlot.findAll({
    where,
    order: [
      ['date', 'ASC'],
      ['startTime', 'ASC']
    ]
  });
}

async function createSlot(payload) {
  return AppointmentSlot.create(payload);
}

async function bookAppointment({ slotId, patientId }) {
  const slot = await AppointmentSlot.findByPk(slotId);

  if (!slot) {
    const err = new Error('Slot not found');
    err.statusCode = 404;
    throw err;
  }

  if (!slot.isAvailable || slot.status !== 'available') {
    const err = new Error('Slot is not available');
    err.statusCode = 409;
    throw err;
  }

  slot.bookedBy = patientId;
  slot.isAvailable = false;
  slot.status = 'booked';
  await slot.save();

  return slot;
}

async function cancelAppointment(slotId) {
  const slot = await AppointmentSlot.findByPk(slotId);

  if (!slot) {
    const err = new Error('Appointment not found');
    err.statusCode = 404;
    throw err;
  }

  slot.bookedBy = null;
  slot.isAvailable = true;
  slot.status = 'available';
  await slot.save();

  return slot;
}

module.exports = {
  getAppointments,
  getSlots,
  createSlot,
  bookAppointment,
  cancelAppointment
};
