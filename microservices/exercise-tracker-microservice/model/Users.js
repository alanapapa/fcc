const mongo = require('mongo');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    maxlength: [20, "Username is too long"]
  },
  versionKey: 0,
  count: {
    type: Number,
    default: 0
  },
  log: [
    {
      _id: false,
      description: {
        type: String,
        required: true
      },
      duration: {
        type: Number,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
},
{timestamps: true}
);

const Users = mongoose.model("Users", UsersSchema);
module.exports = Users;