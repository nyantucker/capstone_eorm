import multer from 'multer';

let storage = multer.diskStorage({
    destination: process.cwd() + "/public/imgs",
    filename: (req, file, callback) => {
        let newName = new Date().getTime() + "_" + file.originalname;
        callback(null, newName);
    }
})

export const upload = multer({ storage })
