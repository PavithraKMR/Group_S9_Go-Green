const express = require('express');
var router = express.Router();
var TipController = require('../Controllers/Tip');
var diseaseController = require('../Controllers/Disease');
var fileUpload = require('../Middleware/interventionFile-upload');
const multer = require('multer');

router.get('/Interventions/:interventionId', TipController.getTip);
router.get('/getInterventions/:cropName', TipController.getTipsByCropName);

router.post('/createIntervention', TipController.createTip);
router.patch(
	'/cropInterventions/update/:interventionId',
	TipController.updateTipsByCropName
);
router.delete(
	'/cropInterventions/delete/:interventionId',
	TipController.deleteTipByCropName
);

router.post(
	'/createIntervention',
	fileUpload.single('image'),
	diseaseController.createDisease
);

module.exports = router;
