import { Schema, model } from "mongoose";

const schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  roles: {
    type: [String],
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatarPath: {
    type: String,
    required: true,
  },
  songs: [
    {
      ref: "Song",
      type: Schema.Types.ObjectId,
    },
  ],
});

export default model("User", schema);
