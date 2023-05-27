require('dotenv').config();

const http = require("http");
const path = require("path");
const express = require("express");
const cors = require("cors");
const { instrument } = require("@socket.io/admin-ui");
const { Server } = require("socket.io");

const sequelize = require("./utils/postgresql");
const { errorHandler, notFoundHandler } = require("./middlewares/handlers");

const PORT = process.env.PORT || 3000,
  app = express(),
  server = http.createServer(app);

// const server = require('http').createServer(app);
// const io = require('socket.io')(server, {cors: { origin: '*' }});
const io = new Server(server, { cors: { origin: "*" } });
// const io = require('socket.io').listen(server, { cors: { origin: "*", credentials: true } })

app.set("io", io);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))
app.use("/", require("./routes"));
app.use(notFoundHandler);
app.use(errorHandler);
io.on("connection", require("./controllers/ioController"));

instrument(io, {
  auth: false,
  mode: "development",
});

const start = async () => {
  try {
    await sequelize.sync();
    
    server.listen(PORT, () => {
      console.log(`Server started on port ${PORT}...`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();