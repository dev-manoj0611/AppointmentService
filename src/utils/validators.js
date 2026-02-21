const Joi = require('joi');

const validators = {
  createSlot: Joi.object({
    doctorId: Joi.string().uuid().required(),
    date: Joi.date().required(),
    startTime: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).required(),
    endTime: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).required(),
    consultationType: Joi.string().valid('in-person', 'telemedicine', 'phone').optional()
  }),

  bookSlot: Joi.object({
    patientId: Joi.string().uuid().required(),
    reason: Joi.string().optional()
  })
};

module.exports = validators;
