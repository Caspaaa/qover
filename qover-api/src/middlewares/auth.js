const jwt = require("jsonwebtoken");

const secret = "supersecretsignature";

const auth = function (request, response, next) {
  console.log("middleware");
  console.log(request.headers);
  let token = "";
  if (request.headers.authorization) {
    token = request.headers.authorization.substring(7);
  }
  // const token = request.headers.authorization.substring(7);

  if (!token) {
    console.log("B");
    response.status(401).send("Unauthorized: No token provided");

    return;
  }

  jwt.verify(token, secret, function (error, payload) {
    if (error) {
      console.log("error", error);

      response.status(401).send("Unauthorized: Invalid token");

      return;
    }

    next();
  });
};

module.exports = auth;
