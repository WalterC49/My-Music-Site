import { FILETYPES } from "../contants/conts.js";
import { storeFile } from "../utils/storeUploads.js";
import { validations } from "../utils/validations.js";
import SongModel from "./../models/song.js";

const addSong = async (args, context) => {
  const { currentUser } = context;

  validations.isAuthenticated(currentUser);

  const { title, singer, songFile, isCover, lyrics, tags } = args;

  const songPath = await storeFile(songFile, FILETYPES.SONG);

  const song = new SongModel({
    title,
    singer,
    songPath,
    isCover,
    lyrics,
    tags,
  });

  await song.save();

  currentUser.song.concat(song);

  await currentUser.save();

  return song;
};

const getAllSongs = async ({ currentUser }) => {
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

export const songServices = {
  addSong,
  getAllSongs,
  getSongById,
};
