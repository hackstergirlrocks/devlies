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
let chatHistory = [];


io.on("connection", (socket) => {
    console.log(`Nouvelle connexion: ${socket.id}`);

    socket.on("joinLobby", (player) => {
        if (!player?.username) return;

        // Vérifie si un utilisateur avec ce pseudo existe déjà
        const alreadyExists = Object.values(users).some(
            (u) => u.username === player.username
        );

        if (alreadyExists) {
            console.log(`⚠️ ${player.username} déjà présent dans le lobby`);
            return;
        }

        console.log("🟢 Nouveau joueur:", player);

        const user = { id: socket.id, username: player.username, skin: player.skin, role: null };
        users[socket.id] = user;

        io.emit("updateUsers", Object.values(users));


    });


    socket.on("leaveLobby", () => {
        console.log(`👋 ${users[socket.id]?.username || socket.id} a quitté le lobby`);
        delete users[socket.id];
        io.emit("updateUsers", Object.values(users));
    });

    socket.emit('chat_history', chatHistory);

    socket.on('send_message', (data) => {
        console.log('📩 Data reçu :', data);
        chatHistory.push(data);
        io.emit('receive_message', data); // renvoyer à tous
    });

});

server.listen(3001, () => {
    console.log("✅ Serveur lancé sur http://localhost:3001");
});


module.exports = app;