const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { registerUser, loginUser,updateuserProfile } = require('../controller/userController.');
const auth = require('../middleware/authMiddleware')
router.post('/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
  ],
  registerUser
);

router.post('/login', loginUser);

router.put('/profile', auth, updateuserProfile);
module.exports = router;
