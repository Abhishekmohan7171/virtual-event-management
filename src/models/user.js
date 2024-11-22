const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"], // Restrict roles to either 'admin' or 'user'
    default: "user",
  },
  registeredEvents: [
    {
      event_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event", // This makes it a reference to an Event document
      },
      name: {
        type: String,
        required: true,
      },
    },
  ],
});

const User = mongoose.model("User", userSchema);
module.exports = User;

