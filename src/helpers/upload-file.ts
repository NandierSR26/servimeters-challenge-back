import multer from "multer";
import { join } from 'path'


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const path = join(__dirname, '../public');
        cb(null, path)
    },
    filename: function(req, file, cb) {
        const extension = file.originalname.split(".").pop()
        const filename = `file-${Date.now()}.${extension}`
        cb(null, filename)
    }
})

export const upload = multer({storage})