const multer = require('multer');
// const uuid = require('uuid/v1')
const MIME_TYPE_MAP = {
	'image/jpg': 'jpg',
	'image/jpeg': 'jpeg',
	'image/png': 'png',
	'image/jfif': 'jfif'
};
const fileUpload = multer({
	limits: 500000000,
	storage: multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, 'uploads/Diseases/');
		},

		filename: (req, file, cb) => {
			const ext = MIME_TYPE_MAP[file.mimetype];
			cb(null, Date.now()+ '.'+ ext);
		},
		fileFilter: (req, file, cb) => {
			const isValid = !!MIME_TYPE_MAP[file.mimetype];
			const error = isValid ? null : new Error('Invalid Mime Type');
			cb(error, isValid);
		}
	})
}); //it provide middleware

// const storage = multer.diskStorage({
// 	destination: (req, file, cb) => {
// 		cb(null, 'Server/uploads');
// 	},

// 	filename: (req, file, cb) => {
// 		const name = file.originalname.toLowerCase().split(' ').join('-');
// 		const ext = MIME_TYPE_MAP[file.mimetype];
// 		cb(null, name +'-'+Date.now()+'.'+ ext);
// 	},
// 	fileFilter: (req, file, cb) => {
// 		const isValid = !!MIME_TYPE_MAP[file.mimetype];
// 		const error = isValid ? null : new Error('Invalid Mime Type');
// 		cb(error, isValid);
// 	}
// });
// module.exports = storage;
module.exports = fileUpload;
