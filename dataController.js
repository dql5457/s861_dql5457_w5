const Data = require('./data');

// Create Data
exports.createData = async (req, res) => {
	try {
		const { name, email, password, birthDate, phoneNumber, location, expertise, availability } = req.body;
		const newData = new Data({ name, email, password, birthDate, phoneNumber, location, expertise, availability, createdBy: req.user.id });
		const data = await newData.save();
		res.json(data);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
};

// Update Data
exports.updateData = async (req, res) => {
	try {
		const { name, email, password, birthDate, phoneNumber, location, expertise, availability } = req.body;
		const updatedData = await Data.findByIdAndUpdate(req.params.id, { name, email, password, birthDate, phoneNumber, location, expertise, availability }, { new: true });
		if (!updatedData) {
			return res.status(404).json({ msg: 'Data not found' });
		}
		res.json(updatedData);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
};

// Get All Data
exports.getAllData = async (req, res) => {
	try {
		const data = await Data.find({ createdBy: req.user.id });
		res.json(data);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
};

// Get Data by ID
exports.getDataById = async (req, res) => {
	try {
		const data = await Data.findById(req.params.id);
		if (!data || data.createdBy.toString() !== req.user.id) {
			return res.status(404).json({ msg: 'Data not found' });
		}
		res.json(data);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
};

// Delete Data
exports.deleteData = async (req, res) => {
	try {
		const data = await Data.findById(req.params.id);
		if (!data || data.createdBy.toString() !== req.user.id) {
			return res.status(404).json({ msg: 'Data not found' });
		}
		await data.deleteOne();
		res.json({ msg: 'Data removed' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
};
