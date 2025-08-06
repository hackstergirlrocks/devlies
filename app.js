require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

require('./models/connection');

var app = express();

const cors = require('cors');
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

let users = {}; // stocke les utilisateurs connectés

io.on("connection", (socket) => {
  console.log(`Nouvelle connexion: ${socket.id}`);

  socket.on("joinLobby", (player) => {
    if (!player?.username) return;
    console.log("🟢", player);

    const user = { id: socket.id, username: player.username, skin: player.skin };
    users[socket.id] = user;

    io.emit("updateUsers", Object.values(users));
  });

  socket.on("disconnect", () => {
    console.log(`🔴 Déconnexion: ${socket.id}`);
    delete users[socket.id];
    io.emit("updateUsers", Object.values(users));
  });
});

server.listen(3001, () => {
  console.log("✅ Serveur lancé sur http://localhost:3001");
});


module.exports = app;