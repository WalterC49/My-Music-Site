import multer from "multer";
import { dirname, extname, join } from "path";
import { fileURLToPath } from "url";

const CURRENT_DIR = dirname(fileURLToPath(import.meta.url));
const AVATARS_FOLDER = "../public/users-avatars";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, join(CURRENT_DIR, AVATARS_FOLDER));
  },
  fileName: (req, file, cb) => {
    const fileExtension = extname(file.originalname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${file.fieldName}_${uniqueSuffix}${fileExtension}`);
  },
});

export const imageUpload = multer({
  storage,
  limits: { fileSize: 45 * 1024 * 1024 },
}).single("avatar");
