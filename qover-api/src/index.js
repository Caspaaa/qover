require("./mongoose");
const express = require("express");
const cors = require("cors");
// const cookieParser = require("cookie-parser");
const auth = require("./middlewares/auth");
const loginController = require("./controllers/loginController");

const server = express();
const port = 5000;

server.use(cors());
server.use(express.urlencoded());
server.use(express.json());
// server.use(cookieParser());

server.post("/api/register", loginController.createUser);

server.post("/api/getToken", loginController.getToken);

server.get("/api/checkToken", auth, function (request, response) {
  response.sendStatus(200);
});

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
