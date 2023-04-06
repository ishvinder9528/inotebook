const mongoose = require("mongoose");
const { Schema } = mongoose;

const NotesSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
    default: "General",
  },

}  ,{ timestamps: true });

const Notes = mongoose.model("notes", NotesSchema);
module.exports = Notes;
