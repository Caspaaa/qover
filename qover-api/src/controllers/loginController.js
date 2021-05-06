const User = require("../models/User");
const jwt = require("jsonwebtoken");

const createUser = (request, response) => {
  const { login, password } = request.body;
  const user = new User({ login, password });

  user.save((error, newUser) => {
    if (error) {
      console.error(error);
      response
        .status(500)
        .send("Error adding the user. (Might already exists.)");
    } else {
      response.status(201).send(newUser);
    }
  });
};

const getToken = (request, response) => {
  console.log("checkUser");
  const { login, password } = request.body;

  User.findOne({ login }, function (error, user) {
    if (error) {
      console.error(error);

      response.status(500).json({
        error: "Internal error please try again",
      });

      return;
    }

    if (!user) {
      response.status(401).json({
        error: "Incorrect login",
      });

      return;
    }

    user.isCorrectPassword(password, function (error, same) {
      if (error) {
        console.log("error", error);
        response.status(500).json({
          error: "Internal error please try again",
        });

        return;
      }

      if (!same) {
        response.status(401).json({
          error: "Incorrect password",
        });

        return;
      }

      // If user exists and password correct then create token and put it in cookie
      const payload = { login };
      const secret = "supersecretsignature";

      const token = jwt.sign(payload, secret, {
        expiresIn: "1h",
      });
      console.log("token is set to ", token);
      response.json({ token: token });
    });
  });
};

module.exports = { createUser, getToken };
