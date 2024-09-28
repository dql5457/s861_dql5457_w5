const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
	const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];
	console.log('Received Token:', token);
	if (!token) {
		console.log('Missing Token');
		return res.status(401).json({ msg: 'Token is missing' });
	}
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		console.log('Decoded Token:', decoded);
		req.user = decoded.user;
		next();
	} catch (err) {
		console.error('Invalid Token', err);
		res.status(401).json({ msg: 'Token is not valid' });
	}
};
