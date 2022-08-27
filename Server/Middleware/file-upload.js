const multer = require('multer');
<<<<<<< HEAD
// const uuid = require('uuid/v1')
=======
const uuid = require('uuid');

>>>>>>> main
const MIME_TYPE_MAP = {
	'image/jpg': 'jpg',
	'image/jpeg': 'jpeg',
	'image/png': 'png',
	'image/jfif': 'jfif'
};
const fileUpload = multer({
<<<<<<< HEAD
	limits: 500000000,
	storage: multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, 'uploads/Diseases/');
=======
	limits: 500000,
	storage: multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, 'uploads/CropImages');
>>>>>>> main
		},

		filename: (req, file, cb) => {
			const ext = MIME_TYPE_MAP[file.mimetype];
<<<<<<< HEAD
			cb(null, Date.now() + '.' + ext);
=======
			cb(null, uuid(), '.', ext);
>>>>>>> main
		},
		fileFilter: (req, file, cb) => {
			const isValid = !!MIME_TYPE_MAP[file.mimetype];
			const error = isValid ? null : new Error('Invalid Mime Type');
			cb(error, isValid);
		}
	})
}); //it provide middleware

module.exports = fileUpload;
