const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const AnimalIntervention = require('../models/AnimalIntervention');

const createIntervention = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw new HttpError('Invalid inputs passed, please check your data.', 422);
	}

	console.log(req.body);
	const url = req.protocol + '://' + req.get('host');

	const newIntervention = new AnimalIntervention({
		cropName: req.body.cropName,
		interventionName: req.body.interventionName,
		image: url + '/uploads/Intervention/' + req.file.filename,

		whyIsImportant: req.body.whyIsImportant,
		whatIdDoes: req.body.whatIdDoes,
		whyAndWhereItOccours: req.body.whyAndWhereItOccours,
		howToIdentify: req.body.howToIdentify,
		howToManage: req.body.howToManage,

		about: req.body.aboutIntervention
	});
	console.log(newIntervention);

	try {
		await newIntervention.save();
	} catch (err) {
		const error = new HttpError('Creating Intervention failed,try again', 500);
		return next(error);
	}
	res.json({ newIntervention: newIntervention.toObject({ getters: true }) });
};

const getInterventionByCropName = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw new HttpError('Invalid inputs passed, please check your data.', 422);
	}

	const cropName = req.params.cropName;

	let cropInteventions;

	try {
		cropInteventions = await AnimalIntervention.find({ cropName: cropName }); // only get email and name
	} catch (err) {
		const error = new HttpError('signing up failed could not save ', 500);
		return next(error);
	}

	if (!cropInteventions || cropInteventions.length === 0) {
		res.status(201).json({ message: 'There is no Diseases' });
	} else {
		res.status(200).json({
			cropInteventions: cropInteventions.map((disease) =>
				cropIntevention.toObject({ getters: true })
			)
		});
	}
};

const getIntrevention = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw new HttpError('Invalid inputs passed, please check your data.', 422);
	}

	const { interventionId } = req.params;
	let intervention;
	try {
		intervention = await AnimalIntervention.findById(interventionId);
	} catch (err) {
		const error = new HttpError('finding user failed bt id,try again', 500);
		return next(error);
	}

	if (!intervention) {
		res.status(201).json({ message: 'There is no Intervention ' });
	} else {
		return res.status(201).json(intervention.toObject({ getters: true }));
	}
};

const updateDiseaseByCropName = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw new HttpError('Invalid inputs passed, please check your data.', 422);
	}

	// const { name, age } = req.body;
	const { about, remedyAction, cropName, image, diseaseName } = req.body;

	const diseaseId = req.params.diseaseId;

	let disease;
	try {
		disease = await Disease.findById(diseaseId);
	} catch (err) {
		const error = new HttpError(
			'Something went Wrong,Could not update Place',
			500
		);
		return next(error);
	}

	disease.about = about;
	disease.remedyAction = remedyAction;
	disease.cropName = cropName;
	disease.image = image;
	disease.diseaseName = diseaseName;

	try {
		await disease.save();
	} catch (err) {
		const error = new HttpError(
			'Something went Wrong,Could not update Place',
			500
		);
		return next(error);
	}

	res.status(201).json({ disease: disease.toObject({ getters: true }) });
};

const deleteDiseaseByCropName = async (req, res, next) => {
	const diseaseId = req.params.diseaseId;
	let disease;
	try {
		disease = await Disease.findById(diseaseId);
	} catch (err) {
		const error = new HttpError(
			'Something went wrong, could not delete user',
			500
		);
		return next(error);
	}

	try {
		await disease.remove();
	} catch (err) {
		const error = new HttpError(
			'Something went wrong, could not delete user',
			500
		);
		return next(error);
	}
	res.status(200).json({ message: 'Deleted User' });
};

exports.getInterventionByCropName = getInterventionByCropName;
exports.getIntrevention = getIntrevention;
exports.deleteDiseaseByCropName = deleteDiseaseByCropName;
exports.updateDiseaseByCropName = updateDiseaseByCropName;
exports.createIntervention = createIntervention;
