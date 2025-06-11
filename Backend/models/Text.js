// /models/Text

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const textSchema = new Schema(
  {
    content: { type: String, required: true },
    numWords: { type: Number, required: true },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
    },
    type: {
      type: String,
      enum: ["normal", "code", "text"],
      required: true,
    },
    language: { type: String, default: null },
  },
  { timestamps: true }
);

const Text = mongoose.model("Text", textSchema);

module.exports = Text;
