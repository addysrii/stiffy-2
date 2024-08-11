// routes/api/user.js

const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const User = require('../models/Users');

// @route   GET /api/user
// @desc    Get authenticated user's details
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        // req.user is populated from the auth middleware
        const user = await User.findById(req.user.id).select('-password');
          console.log(user);
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
