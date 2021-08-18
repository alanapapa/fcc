const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
    {
      original_url: String,
      short_url: String,
    },
    {
      timestamps: true,
    }
  );
  
  const ShortURL = mongoose.model("ShortURL", urlSchema);
  
  module.exports = ShortURL;