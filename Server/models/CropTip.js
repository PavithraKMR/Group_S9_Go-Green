const mongoose = require('mongoose');
const UniqueValidator = require('mongoose-unique-validator');

const cropTipSchema = mongoose.Schema({
	cropName: { type: String, required: true },
	information: { type: String, required: true },
<<<<<<< HEAD
	// type: { type: String, required: true }
=======
	type: { type: String, required: true }
>>>>>>> main
});

// cropTipSchema.plugin(UniqueValidator); // to use unique value

module.exports = mongoose.model('Tip', cropTipSchema);
