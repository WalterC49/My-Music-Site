import { dirname, join } from "path";
import { fileURLToPath } from "url";

export const UPLOAD_DIRECTORY_URL = new URL("../public/", import.meta.url);
export const AVATARS_URL = UPLOAD_DIRECTORY_URL + "users-avatars/";
export const SONGS_URL = UPLOAD_DIRECTORY_URL + "songs/";

const CURRENT_DIR = dirname(fileURLToPath(import.meta.url));

export const UPLOAD_DIRECTORY_IMAGE_PATH = join(
  CURRENT_DIR,
  "../public/users-avatars/",
);

export const UPLOAD_DIRECTORY_SONG_PATH = join(CURRENT_DIR, "../public/songs/");

export const FILETYPES = {
  IMAGE: "IMAGE",
  SONG: "SONG",
};

export const SALT = 10;
