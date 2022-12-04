var aws = require('aws-sdk')
var multer = require('multer');
const multerS3 = require('multer-s3');
aws.config.update({
    secretAccessKey: "Fh7iPbY5X1akZSfdtp8XWeLYMK8K5IIOXO9DmU3y",
    accessKeyId: "AKIAYCTAQ5OTUB73VM64",
    region: "eu-west-2"
});


var s3 = new aws.S3();

upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'eclyt-app',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'private',
        metadata: function(req, file, cb) {
            cb(null, {
                fieldName: file.fieldname
            });
        },
        key: function(req, file, cb) {
            cb(null, "uploads/" + Date.now().toString() + "/" + file.originalname)
        }
    })
});


exports.vision_image = function(req, res, next) {
    upload.fields([{
            name: 'image_name',
            maxCount: 100
        }

    ])(req, res, function(err, some) {
        if (err) {
            return res.status(422).send({
                message: err.message,
                response: null
            });
        }
        console.log("saved")
        next();
    });
}
