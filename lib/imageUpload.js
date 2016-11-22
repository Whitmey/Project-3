const s3 = require('../lib/s3');
const uuid = require('uuid');

function imageUpload(req,res, next) {
  if(!req.body.base64)return next();

  const base64Data = req.body.base64.match(/base64,(.*)$/)[1];
  const mime = req.body.base64.match(/^data:(.*);/)[1];
  const extension = mime.replace('image/', '');
  const filename = `${uuid.v1()}.${extension}`;

  s3.upload({
    Bucket: 'wdi-fitness-app',
    Key: filename,
    Body: new Buffer(base64Data, 'base64'),
    ContentType: mime
  },(err) => {
    if(err) next(err);

    req.file = filename;
    next();
  });
}
module.exports = imageUpload;
