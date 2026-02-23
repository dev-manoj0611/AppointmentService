const validators = require('../utils/validators');
const appointmentService = require('../services/appointmentService');

async function getAppointments(req, res, next) {
  try {
    const appointments = await appointmentService.getAppointments(req.query);
    res.json({ status: 'success', data: appointments });
  } catch (error) {
    next(error);
  }
}

async function getSlots(req, res, next) {
  try {
    const slots = await appointmentService.getSlots(req.query);
    res.json({ status: 'success', data: slots });
  } catch (error) {
    next(error);
  }
}

async function createSlot(req, res, next) {
  try {
    const { error, value } = validators.createSlot.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const slot = await appointmentService.createSlot(value);
    res.status(201).json({ status: 'success', data: slot });
  } catch (error) {
    next(error);
  }
}

async function bookAppointment(req, res, next) {
  try {
    const { error, value } = validators.bookSlot.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const slotId = req.body.slotId || req.query.slotId;
    if (!slotId) {
      return res.status(400).json({ message: 'slotId is required' });
    }

    const appointment = await appointmentService.bookAppointment({
      slotId,
      patientId: value.patientId
    });

    res.json({ status: 'success', data: appointment });
  } catch (error) {
    next(error);
  }
}

async function cancelAppointment(req, res, next) {
  try {
    const appointment = await appointmentService.cancelAppointment(req.params.id);
    res.json({ status: 'success', data: appointment });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAppointments,
  getSlots,
  createSlot,
  bookAppointment,
  cancelAppointment
};
