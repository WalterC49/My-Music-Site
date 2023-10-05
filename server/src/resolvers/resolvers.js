import { songServices } from "../services/song.services.js";
import { userServices } from "./../services/user.services.js";
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";

export const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    users: (_parent, _args, context) => {
      return userServices.getAllUsers(context);
    },
    user: (_parent, { id }) => {
      return userServices.getUserById({ id });
    },
    songs: (_parent, _args, _context) => {
      return songServices.getAllSongs();
    },
    song: (_parent, { id }) => {
      return songServices.getSongById({ id });
    },
  },
  Mutation: {
    createUser: (_parent, args) => {
      return userServices.createUser(args);
    },
    updateUserAvatar: (_parent, args) => {
      const user = userServices.updateUserAvatar(args);
      return user;
    },
    updateUsername: (_parent, args) => {
      const user = userServices.updateUsername(args);
      return user;
    },
    updateEmail: (_parent, args) => {
      const user = userServices.updateEmail(args);
      return user;
    },
    updatePassword: (_parent, args) => {
      const user = userServices.updatePassword(args);
      return user;
    },
    deleteUser: (_parent, args) => {
      const user = userServices.deleteUser(args);
      return user;
    },
    login: (_parent, args) => {
      const token = userServices.login(args);
      return token;
    },
    addSong: (_parent, args, context) => {
      const song = songServices.addSong(args, context);
      return song;
    },
    updateSongTitle: (_parent, args, context) => {
      const song = songServices.updateSongTitle(args, context);
      return song;
    },
    updateSongSinger: (_parent, args, context) => {
      const song = songServices.updateSongSinger(args, context);
      return song;
    },
    updateSongLyrics: (_parent, args, context) => {
      const song = songServices.updateSongLyrics(args, context);
      return song;
    },
    updateSongTags: (_parent, args, context) => {
      const song = songServices.updateSongTags(args, context);
      return song;
    },
    updateSongFile: (_parent, args, context) => {
      const song = songServices.updateSongFile(args, context);
      return song;
    },
    updateIsCover: (_parent, args, context) => {
      const song = songServices.updateIsCover(args, context);
      return song;
    },
    updateSongSourceTitle: (_parent, args, context) => {
      const song = songServices.updateSongSourceTitle(args, context);
      return song;
    },
    updateSongSourceSinger: (_parent, args, context) => {
      const song = songServices.updateSongSourceSinger(args, context);
      return song;
    },
    deleteSong: (_parent, args, context) => {
      const song = songServices.deleteSong(args, context);
      return song;
    },
  },
};
