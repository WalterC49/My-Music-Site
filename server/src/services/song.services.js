import { FILETYPES, UPLOAD_DIRECTORY_SONG_PATH } from "../contants/conts.js";
import { storeFile } from "../utils/storeUploads.js";
import { validations } from "../utils/validations.js";
import SongModel from "./../models/song.js";

const addSong = async (args, context) => {
  const { currentUser } = context;

  validations.isAuthenticated(currentUser);

  const { song, songFile } = args;

  validations.validateAddSong(song);
  validations.validateIsCover(song);

  const songPath = await storeFile(songFile, FILETYPES.SONG);

  const newSong = new SongModel({
    ...song,
    songPath,
    source: song.isCover
      ? {
          title: song.sourceTitle,
          singer: song.sourceSinger,
        }
      : null,
  });

  await newSong.save();

  currentUser.songs = currentUser.songs.concat(newSong);

  await currentUser.save();

  return newSong;
};

const getAllSongs = async () => {
  /* validations.isAuthenticated(currentUser);
  validations.isAdmin(currentUser); */

  const songs = await SongModel.find();

  return songs;
};

const getSongById = async ({ id }) => {
  validations.validateId(id);
  const song = await SongModel.findById(id);

  validations.songExists(song);

  return song;
};

const getSongFileById = async (req, res, next) => {
  const { id } = req.params;
  validations.validateId(id);
  const song = await SongModel.findById(id);

  validations.songExists(song);

  const { songPath } = song;

  res.sendFile(UPLOAD_DIRECTORY_SONG_PATH + songPath, err => {
    if (err) {
      next(err);
    }
  });
};

export const songServices = {
  addSong,
  getAllSongs,
  getSongById,
  getSongFileById,
};
