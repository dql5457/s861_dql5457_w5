const express = require('express');
const { check, validationResult } = require('express-validator');
const { createData, updateData, getAllData, getDataById, deleteData } = require('./dataController');
const auth = require('./auth');
const router = express.Router();

// Validation and sanitization rules
const dataValidationRules = [
  check('name', 'Name is invalid').not().isEmpty().trim().escape(),
  check('email', 'Email is invalid').isEmail().normalizeEmail(),
  check('password', 'Password is invalid (minimum 6 characters)').isLength({ min: 6 }),
  check('birthDate', 'Birth date is invalid (format YYYY-MM-DD)').isISO8601(),
  check('phoneNumber', 'Phone number is invalid (numeric; no dashes)').isNumeric(),
  check('location', 'Location is invalid').not().isEmpty().trim().escape(),
  check('expertise', 'Expertise is invalid').not().isEmpty().trim().escape(),
  check('availability', 'Availability is invalid (format YYYY-MM-DD)').isISO8601()
];

// Data Create - POST /api/data
router.post('/data', [auth, ...dataValidationRules], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  createData(req, res);
});

// Data Update - PUT /api/data/:id
router.put('/data/:id', [auth, ...dataValidationRules], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  updateData(req, res);
});

// Data Get All - GET /api/data
router.get('/data', auth, getAllData);

// Data Get Single - GET /api/data/:id
router.get('/data/:id', auth, getDataById);

// Data Delete - DELETE /api/data/:id
router.delete('/data/:id', auth, deleteData);

module.exports = router;
