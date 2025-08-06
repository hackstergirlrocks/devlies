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


let users = {
    0: {
        id: 0,
        username: 'Bot_0',
        skin: 'han',
    },
    1: {
        id: 1,
        username: 'Bot_1',
        skin: 'han',
    },
    2: {
        id: 2,
        username: 'Bot_2',
        skin: 'han',
    }
}; // stocke les utilisateurs connectés
let chatHistory = [];

let gameState = {
    started: false,
    timer: null,
    countdown: 10, // durée avant lancement (en secondes)
};

// ✅ Fonction pour reset le jeu
function resetGame(io) {
    if (gameState.timer) {
        clearInterval(gameState.timer);
        gameState.timer = null;
    }

    gameState.started = false;
    gameState.countdown = 10;

    // ⚡ Option 1 : garder les bots
    users = {
        0: { id: 0, username: 'Bot_0', skin: 'han' },
        1: { id: 1, username: 'Bot_1', skin: 'han' },
        2: { id: 2, username: 'Bot_2', skin: 'han' },
    };

    chatHistory = [];

    io.emit("gameReset", { users: Object.values(users) });
    console.log("🔄 Partie réinitialisée !");
}

io.on("connection", (socket) => {
    console.log(`Nouvelle connexion: ${socket.id}`);

    socket.on("joinLobby", (player) => {
        if (gameState.started) {
            socket.emit("gameError", { message: "La partie est déjà en cours !" });
            return;
        }

        // Vérifie si pseudo déjà présent
        const alreadyExists = Object.values(users).some(
            (u) => u.username === player.username
        );
        if (alreadyExists) return;

        users[socket.id] = {
            id: socket.id,
            username: player.username,
            skin: player.skin,
        };

        io.emit("updateUsers", Object.values(users));

        // ✅ Lancer le timer si assez de joueurs et pas encore démarré
        if (Object.keys(users).length >= 3 && !gameState.timer) {
            let countdown = gameState.countdown;
            console.log("⏳ La partie démarre dans", countdown, "secondes");

            gameState.timer = setInterval(() => {
                countdown--;
                io.emit("countdown", countdown);

                if (countdown <= 0) {
                    clearInterval(gameState.timer);
                    gameState.timer = null;
                    gameState.started = true;
                    io.emit("gameStarted");
                    console.log("🚀 Partie lancée !");
                }
            }, 1000);
        }
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

    // ✅ Nouveau : stopper la partie
    socket.on("stopGame", () => {
        resetGame(io);
    });
});


server.listen(3001, () => {
    console.log("✅ Serveur lancé sur http://localhost:3001");
});


module.exports = app;