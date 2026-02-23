const express = require('express');
const controller = require('../controllers/appointmentController');

const router = express.Router();

router.get('/appointments', controller.getAppointments);
router.post('/appointments', controller.bookAppointment);
router.patch('/appointments/:id/cancel', controller.cancelAppointment);

router.get('/slots', controller.getSlots);
router.post('/slots', controller.createSlot);

module.exports = router;
