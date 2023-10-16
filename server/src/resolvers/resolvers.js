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
    updateUserAvatar: (_parent, args, context) => {
      const user = userServices.updateUserAvatar(args, context);
      return user;
    },
    updateUsername: (_parent, args, context) => {
      const user = userServices.updateUsername(args, context);
      return user;
    },
    updateEmail: (_parent, args, context) => {
      const user = userServices.updateEmail(args, context);
      return user;
    },
    updatePassword: (_parent, args, context) => {
      const user = userServices.updatePassword(args, context);
      return user;
    },
    deleteUser: (_parent, args, context) => {
      const user = userServices.deleteUser(args, context);
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
    updateSongReproductions: (_parent, args, context) => {
      const song = songServices.updateSongReproductions(args, context);
      return song;
    },
    updateSongFavorites: (_parent, args, context) => {
      const song = songServices.updateSongFavorites(args, context);
      return song;
    },
    updateSongLikes: (_parent, args, context) => {
      const song = songServices.updateSongLikes(args, context);
      return song;
    },
    updateSongDislikes: (_parent, args, context) => {
      const song = songServices.updateSongDislikes(args, context);
      return song;
    },
    deleteSong: (_parent, args, context) => {
      const song = songServices.deleteSong(args, context);
      return song;
    },
  },
};
