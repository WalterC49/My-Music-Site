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
    minLength: 8,
  },
  avatarPath: {
    type: String,
    required: true,
  },
});

export default model("User", schema);
