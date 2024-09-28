const User = require('./user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User Registration
exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }
        user = new User({ name, email, password });
        await user.save();
        const payload = {
            user: { id: user.id }
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        res.json({ token });
    } catch (err) {
        res.status(500).send('Server error');
    }
};

// User Login
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        const payload = {
            user: {
                id: user.id
            }
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        res.json({ token });
    } catch (err) {
        res.status(500).send('Server error');
    }
};
