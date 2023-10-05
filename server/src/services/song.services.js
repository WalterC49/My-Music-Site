import { FILETYPES, UPLOAD_DIRECTORY_SONG_PATH } from "../contants/conts.js";
import { deleteFile, storeFile } from "../utils/storeUploads.js";
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
      /* next(err); */
    }
  });
};

const updateSongTitle = async ({ id, title }, context) => {
  const { currentUser } = context;
  validations.isAuthenticated(currentUser);
  validations.validateId(id);
  validations.validateSongTitle(title);

  const song = await SongModel.findById(id);
  validations.songExists(song);
  song.title = title;
  await song.save();
  return song;
};

const updateSongSinger = async ({ id, singer }, context) => {
  const { currentUser } = context;
  validations.isAuthenticated(currentUser);
  validations.validateId(id);
  validations.validateSongSinger(singer);

  const song = await SongModel.findById(id);
  validations.songExists(song);
  song.singer = singer;
  await song.save();
  return song;
};

const updateSongLyrics = async ({ id, lyrics }, context) => {
  const { currentUser } = context;
  validations.isAuthenticated(currentUser);
  validations.validateId(id);
  validations.validateSongLyrics(lyrics);

  const song = await SongModel.findById(id);
  validations.songExists(song);
  song.lyrics = lyrics;
  await song.save();
  return song;
};

const updateSongTags = async ({ id, tags }, context) => {
  const { currentUser } = context;
  validations.isAuthenticated(currentUser);
  validations.validateId(id);
  validations.validateSongTags(tags);

  const song = await SongModel.findById(id);
  validations.songExists(song);
  song.tags = tags;
  await song.save();
  return song;
};

const updateSongFile = async ({ id, songFile }, context) => {
  const { currentUser } = context;
  validations.isAuthenticated(currentUser);
  validations.validateId(id);

  const song = await SongModel.findById(id);
  validations.songExists(song);
  deleteFile(UPLOAD_DIRECTORY_SONG_PATH + song.songPath);

  const songPath = await storeFile(songFile, FILETYPES.SONG);
  song.songPath = songPath;
  song.save();
  return song;
};

const updateIsCover = async (args, context) => {
  const { currentUser } = context;
  validations.isAuthenticated(currentUser);

  const { id, isCover } = args;
  validations.validateId(id);

  const song = await SongModel.findById(id);
  validations.songExists(song);

  if (isCover === song.isCover) return song;

  if (isCover) {
    validations.validateIsCover({
      isCover,
      sourceTitle: args.sourceTitle,
      sourceSinger: args.sourceSinger,
    });
  }

  song.isCover = isCover;
  song.source = isCover
    ? {
        title: args.sourceTitle,
        singer: args.sourceSinger,
      }
    : null;

  await song.save();
  return song;
};

const updateSongSourceTitle = async ({ id, sourceTitle }, context) => {
  const { currentUser } = context;
  validations.isAuthenticated(currentUser);
  validations.validateId(id);
  validations.validateSongSourceTitle(sourceTitle);

  const song = await SongModel.findById(id);
  validations.songExists(song);
  if (song.isCover === false) return null;
  song.source.title = sourceTitle;
  await song.save();
  return song;
};

const updateSongSourceSinger = async ({ id, sourceSinger }, context) => {
  const { currentUser } = context;
  validations.isAuthenticated(currentUser);
  validations.validateId(id);
  validations.validateSongSourceSinger(sourceSinger);

  const song = await SongModel.findById(id);
  if (song.isCover === false) return null;
  validations.songExists(song);
  song.source.singer = sourceSinger;
  await song.save();
  return song;
};

const deleteSong = async ({ id, password }, context) => {
  const { currentUser } = context;
  validations.isAuthenticated(currentUser);
  validations.validateId(id);

  const song = await SongModel.findById(id);
  validations.songExists(song);
  await validations.comparePasswords(password, currentUser.password);

  const { songPath } = song;

  const deletedSong = await SongModel.deleteOne({ _id: id });
  deleteFile(UPLOAD_DIRECTORY_SONG_PATH + songPath);

  return deletedSong.acknowledged && deletedSong.deletedCount === 1;
};

export const songServices = {
  addSong,
  getAllSongs,
  getSongById,
  getSongFileById,
  updateSongTitle,
  updateSongSinger,
  updateSongLyrics,
  updateSongTags,
  updateSongFile,
  updateIsCover,
  updateSongSourceTitle,
  updateSongSourceSinger,
  deleteSong,
};
