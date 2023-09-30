import { Schema, model } from "mongoose";

const schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  singer: {
    type: String,
    required: true,
  },
  songPath: {
    type: String,
    required: true,
  },
  isCover: {
    type: Boolean,
    required: true,
  },
  source: {
    title: {
      type: String,
      required: true,
    },
    singer: {
      type: String,
      required: true,
    },
  },
  reproductions: {
    type: Number,
    required: true,
    default: 0,
  },
  favorites: {
    type: Number,
    required: true,
    default: 0,
  },
  likes: {
    type: Number,
    required: true,
    default: 0,
  },
  dislikes: {
    type: Number,
    required: true,
    default: 0,
  },
  lyrics: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
});

export default model("Song", schema);
