const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const session = require("express-session");

const authRouter = require("./auth/auth-router.js");
const usersRouter = require("./users/users-router.js");

const server = express();


server.use(helmet());
server.use(express.json());
server.use(cors());



const sessionConfig = {
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, 
    secure: process.env.SECURE_COOKIE || false,
    httpOnly: true, 
  },
  resave: false,
  saveUninitialized: process.env.USER_ALLOWED_COOKIES || true,
  name: "monster",
  secret: process.env.COOKIE_SECRET || "keepitsecret,keepitsafe",
};
server.use(session(sessionConfig)); 

server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

module.exports = server;
