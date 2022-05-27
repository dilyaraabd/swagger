const util = require("util");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const dbConfig = require("../config/anotherdb");
const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images')
    },
        filename: (req, file, cb) => {
            {
                cb(null, Date.now() + "--" + file.originalname);
            }
        }
})
const upload = multer({ storage: fileStorageEngine });
const storage = new GridFsStorage({
    url: dbConfig.url + dbConfig.database,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        const match = ["image/png", "image/jpeg"];
        if (match.indexOf(file.mimetype) === -1) {
            const filename = `${Date.now()}-bezkoder-${file.originalname}`;
            return filename;
        }
        return {
            bucketName: dbConfig.imgBucket,
            filename: `${Date.now()}-bezkoder-${file.originalname}`
        };
    }
});
const uploadFiles = multer({ storage: storage }).array("file", 10);
const uploadFilesMiddleware = util.promisify(uploadFiles);
module.exports = uploadFilesMiddleware;