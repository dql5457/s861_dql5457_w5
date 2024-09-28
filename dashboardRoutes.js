const express = require('express');
const router = express.Router();
const auth = require('./auth');
const User = require('./user');

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json({
            name: user.name,
            email: user.email,
            expertise: user.expertise,
            location: user.location,
            availability: user.availability,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
