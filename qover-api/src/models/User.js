const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

let saltRounds = 10;

// -------- Create models with Mongoose -------- //

const UserSchema = new mongoose.Schema({
  login: { type: String, required: true },
  password: { type: String, required: true },
});

// Hash the password before storing
UserSchema.pre("save", function (next) {
  // Check if document is new or if a new password has been set
  if (this.isNew || this.isModified("password")) {
    // Saving reference to this because of changing scopes
    const document = this;
    bcrypt.hash(document.password, saltRounds, (err, hashedPassword) => {
      if (err) {
        next(err);
      } else {
        document.password = hashedPassword;
        next();
      }
    });
  } else {
    next();
  }
});

UserSchema.methods.isCorrectPassword = function (password, callback) {
  bcrypt.compare(password, this.password, (err, same) => {
    if (err) {
      callback(err);
    } else {
      callback(err, same);
    }
  });
};

module.exports = mongoose.model("User", UserSchema);
