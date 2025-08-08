require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const http = require("http");
const { Server } = require("socket.io");

require('./models/connection');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// --- Paramètres du jeu ---
const DAY_DURATION = 1;
const NIGHT_DURATION = 5;
const VOTE_DURATION = 4;
const START_COUNTDOWN = 5;

// --- Données ---
let users = {
    0: { id: 0, username: 'Bot_0', skin: 'han', role: 'hacker', isDead: false },
    1: { id: 1, username: 'Bot_1', skin: 'han', role: 'dev', isDead: false },
    2: { id: 2, username: 'Bot_2', skin: 'han', role: 'dev', isDead: false },
    3: { id: 3, username: 'Bot_3', skin: 'han', role: 'dev', isDead: false },
};

let chatHistory = [];
let chatHistoryDevOps = [];

let gameState = {
    started: false,
    timer: null,
    countdown: START_COUNTDOWN,
    phase: "day",
    phaseTime: DAY_DURATION,
    phaseTimer: null,
    voting: false,
    votes: {},
    hasVoted: {},
};

let nightVotes = {};
let nightHasVoted = {};

// ✅ Reset du jeu
function resetGame(io) {
    if (gameState.timer) clearInterval(gameState.timer);
    if (gameState.phaseTimer) clearInterval(gameState.phaseTimer);

    gameState = {
        started: false,
        timer: null,
        countdown: START_COUNTDOWN,
        phase: "day",
        phaseTime: DAY_DURATION,
        phaseTimer: null,
        voting: false,
        votes: {},
        hasVoted: {},
    };

    users = {
        0: { id: 0, username: 'Bot_0', skin: 'han', role: 'hacker', isDead: false },
        1: { id: 1, username: 'Bot_1', skin: 'han', role: 'dev', isDead: false },
        2: { id: 2, username: 'Bot_2', skin: 'han', role: 'dev', isDead: false },
        3: { id: 3, username: 'Bot_3', skin: 'han', role: 'dev', isDead: false },

    };

    chatHistory = [];
    chatHistoryDevOps = [];

    io.emit("gameReset", { users: Object.values(users) });
    // console.log("🔄 Partie réinitialisée !");
}

// ✅ Phase de nuit avec vote
function startNightVoting(io) {
    gameState.phase = "night-vote";
    gameState.phaseTime = VOTE_DURATION;
    nightVotes = {};
    nightHasVoted = {};
    gameState.voting = true;

    io.emit("nightVotingStart", { time: VOTE_DURATION });
    io.emit("phaseChange", { phase: gameState.phase, timeLeft: gameState.phaseTime });

    gameState.phaseTimer = setInterval(() => {
        gameState.phaseTime--;
        io.emit("phaseUpdate", { phase: gameState.phase, timeLeft: gameState.phaseTime });
        if (gameState.phaseTime <= 0) {
            clearInterval(gameState.phaseTimer);
            gameState.phaseTimer = null;
            endNightVoting(io);
        }
    }, 1000);
}

// ✅ Fin du vote de nuit
function endNightVoting(io) {
    gameState.voting = false;

    let maxVotes = 0;
    let eliminated = null;

    for (let [username, count] of Object.entries(nightVotes)) {
        if (count > maxVotes) {
            maxVotes = count;
            eliminated = username;
        } else if (count === maxVotes && eliminated !== null) {
            eliminated = null;
        }
    }

    if (eliminated) {
        // console.log(`🌒 Nuit : ${eliminated} a été éliminé !`);
        io.emit("playerEliminatedNight", eliminated);

        const userId = Object.keys(users).find(id => users[id].username === eliminated);
        if (userId) {
            users[userId].isDead = true;
            users[userId].skin = 'ghost';
        }
        io.emit("updateUsers", Object.values(users));
    } else {
        io.emit("noEliminationNight");
    }

    startPhase(io, "day");
}

// ✅ Lancer une phase
function startPhase(io, phase) {
    if (gameState.phaseTimer) clearInterval(gameState.phaseTimer);

    if (phase === "day") {
        gameState.phase = "day";
        gameState.phaseTime = DAY_DURATION;
        gameState.voting = false;
        // console.log("🌞 Début de la journée");
        io.emit("receive_message", {
            username: "Système",
            message: "Le jour commence",
            color: "orange"
        });
    } else if (phase === "vote") {
        gameState.phase = "vote";
        gameState.phaseTime = VOTE_DURATION;
        gameState.voting = true;
        gameState.votes = {};
        gameState.hasVoted = {};
        // console.log("🗳️ Début du vote");
        io.emit("votingStart", { time: VOTE_DURATION });
        io.emit("receive_message", {
            username: "Système",
            message: "Le vote commence",
            color: "grey"
        });
    } else if (phase === "night") {
        // console.log("🌙 Début de la nuit avec vote");
        io.emit("receive_message", {
            username: "Système",
            message: "La nuit commence",
            color: "blue"
        });
        startNightVoting(io);
        return;
    }

    io.emit("phaseChange", { phase: gameState.phase, timeLeft: gameState.phaseTime });

    gameState.phaseTimer = setInterval(() => {
        gameState.phaseTime--;
        io.emit("phaseUpdate", { phase: gameState.phase, timeLeft: gameState.phaseTime });

        if (gameState.phaseTime <= 0) {
            clearInterval(gameState.phaseTimer);
            gameState.phaseTimer = null;

            if (gameState.phase === "day") startPhase(io, "vote");
            else if (gameState.phase === "vote") endVoting(io);
        }
    }, 1000);
}

// ✅ Fin du vote de jour
function endVoting(io) {
    gameState.voting = false;

    let maxVotes = 0;
    let eliminated = null;

    for (let [username, count] of Object.entries(gameState.votes)) {
        if (count > maxVotes) {
            maxVotes = count;
            eliminated = username;
        } else if (count === maxVotes && eliminated !== null) {
            eliminated = null;
        }
    }

    if (eliminated) {
        // console.log(`❌ ${eliminated} est éliminé !`);
        io.emit("playerEliminated", eliminated);

        const userId = Object.keys(users).find(id => users[id].username === eliminated);
        if (userId) {
            users[userId].isDead = true;
            users[userId].skin = 'ghost';
        }
        io.emit("updateUsers", Object.values(users));
    } else {
        io.emit("noElimination");
    }

    startPhase(io, "night");
}

// --- Socket.IO ---
io.on("connection", (socket) => {
    console.log(`Nouvelle connexion: ${socket.id}`);

    socket.on("joinLobby", (player) => {
        if (gameState.started) {
            socket.emit("gameError", { message: "La partie est déjà en cours !" });
            return;
        }

        // console.log(Object.keys(users).length)
        if (Object.keys(users).length === 5) {
            return;
        }

        const alreadyExists = Object.values(users).some(u => u.username === player.username);
        if (alreadyExists) return;

        users[socket.id] = {
            id: socket.id,
            token: player.token,
            username: player.username,
            skin: player.skin,
            role: player.role,
            isDead: false
        };

        io.emit("updateUsers", Object.values(users));

        if (Object.keys(users).length >= 3 && !gameState.timer) {
            let countdown = gameState.countdown;
            // console.log("⏳ La partie démarre dans", countdown, "sec");

            gameState.timer = setInterval(() => {
                countdown--;
                io.emit("countdown", countdown);

                if (countdown <= 0) {
                    clearInterval(gameState.timer);
                    gameState.timer = null;
                    gameState.started = true;
                    io.emit("gameStarted");

                    Object.values(users).forEach((user, index) => {
                        if (!user.role) {
                            user.role = 'hacker';
                        }
                        console.log(user.role)
                    });

                    io.emit("updateUsers", Object.values(users));

                    startPhase(io, "day");
                }
            }, 1000);
        }
    });

    socket.on("leaveLobby", () => {
        // console.log(`👋 ${users[socket.id]?.username || socket.id} a quitté le lobby`);
        // delete users[socket.id];
        if (users[socket.id]) {

            users[socket.id].isDead = true;
            users[socket.id].skin = 'ghost';
        }

        io.emit("updateUsers", Object.values(users));
    });

    // Chat
    socket.emit("chat_history", chatHistory);
    socket.emit("chat_history_devops", chatHistoryDevOps);


    socket.on("send_message", (data) => {
        if (users[socket.id]?.isDead) return;
        chatHistory.push(data);
        io.emit("receive_message", data);
    });

    socket.on("send_message_devops", (data) => {
        if (users[socket.id]?.isDead) return;
        chatHistoryDevOps.push(data);
        io.emit("receive_message_devops", data);
    });

    // Vote de jour
    socket.on("votePlayer", (targetUsername) => {
        if (!gameState.voting || gameState.phase !== "vote") return;
        if (gameState.hasVoted[socket.id]) return;
        if (users[socket.id]?.isDead) return;
        // if (users[socket.id]?.username === targetUsername) return;

        gameState.hasVoted[socket.id] = true;
        if (!gameState.votes[targetUsername]) {
            gameState.votes[targetUsername] = 0;
        }
        gameState.votes[targetUsername]++;

        console.log(`${users[socket.id]?.username} a voté contre ${targetUsername}`);
        io.emit("voteUpdate", gameState.votes);
    });

    // Vote de nuit
    socket.on("votePlayerNight", (targetUsername) => {
        if (!gameState.voting || gameState.phase !== "night-vote") return;
        if (nightHasVoted[socket.id]) return;
        if (users[socket.id]?.isDead) return;

        nightHasVoted[socket.id] = true;
        if (!nightVotes[targetUsername]) {
            nightVotes[targetUsername] = 0;
        }
        nightVotes[targetUsername]++;

        console.log(`${users[socket.id]?.username} a voté (nuit) contre ${targetUsername}`);
        io.emit("nightVoteUpdate", nightVotes);
    });

    socket.on("unvotePlayer", (targetUsername) => {
        if (!gameState.voting || gameState.phase !== "vote") return;
        if (!gameState.hasVoted[socket.id]) return;
        if (users[socket.id]?.isDead) return;

        if (gameState.votes[targetUsername]) {
            gameState.votes[targetUsername]--;
            if (gameState.votes[targetUsername] <= 0) {
                delete gameState.votes[targetUsername];
            }
        }

        delete gameState.hasVoted[socket.id];

        io.emit("voteUpdate", gameState.votes);
    });

    socket.on("unvotePlayerNight", (targetUsername) => {
        if (!gameState.voting || gameState.phase !== "night-vote") return;
        if (!nightHasVoted[socket.id]) return;
        if (users[socket.id]?.isDead) return;


        if (nightVotes[targetUsername]) {
            nightVotes[targetUsername]--;
            if (nightVotes[targetUsername] <= 0) {
                delete nightVotes[targetUsername];
            }
        }
        console.log(nightVotes)
        delete nightHasVoted[socket.id];

        io.emit("nightVoteUpdate", nightVotes);
    });


 


    //   socket.on("unvotePlayerNight", () => {
    //         if (!gameState.voting || gameState.phase !== "night-vote") return;
    //         if (!nightHasVoted[socket.id]) return;
    //         if (users[socket.id]?.isDead) return;

    //         const targetUsername = nightHasVoted[socket.id];
    //         if (nightVotes[targetUsername]) {
    //             nightVotes[targetUsername]--;
    //             if (nightVotes[targetUsername] <= 0) delete nightVotes[targetUsername];
    //         }
    //         delete nightHasVoted[socket.id];
    //         io.emit("nightVoteUpdate", nightVotes);
    //     });




    socket.on("stopGame", () => {
        resetGame(io);
    });
});

server.listen(3001, () => {
    console.log("✅ Serveur lancé sur http://localhost:3001");
});

module.exports = app;
