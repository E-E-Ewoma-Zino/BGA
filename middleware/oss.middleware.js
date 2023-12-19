const OSS = require("ali-oss");
const multer = require("multer");
const MAO = require("multer-aliyun-oss");
const settings = require("../config/index");

const config = {
	region: settings.alibabaRegion,
	accessKeyId: settings.alibabaKeyID,
	accessKeySecret: settings.alibabaKeySecret,
	bucket: settings.alibabaBucketName
}

// set up alicloud(I am using to get other function on alicloud SDK)
const client = new OSS(config);

// set up multer for uploading to alicloud
const uplaodFile = multer({
	storage: MAO({
		config,
		destination: function (req, file, callback) {
			try {
				const folder1 = file.mimetype.substr(0, file.mimetype.search("/"));
				const folder2 = file.fieldname;

				callback(null, `BGA___vv2.0.0/${folder1}/${folder2}_container`);
			} catch (error) {
				console.error("Failed to upload to cloud destination:", error);
				callback(error, null);
			}
		}
	})
});

module.exports = { client, uplaodFile };