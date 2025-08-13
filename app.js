require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

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
const io = new Server(server, { cors: { origin: '*' } });

// --- Paramètres ---
const DAY_DURATION = 5;
const VOTE_DURATION = 5;
const START_COUNTDOWN = 5;

// --- Données ---
let users = [

    { id: 0, username: 'Bot_1', skin: 'xxx', role: 'dev', isDead: false, DevOpsSeeU: false, protected: false },
    { id: 1, username: 'Bot_2', skin: 'han', role: 'chatgpt', isDead: false, DevOpsSeeU: false, protected: false },
    { id: 2, username: 'Bot_3', skin: 'cat', role: 'dev', isDead: false, DevOpsSeeU: false, protected: false },
    { id: 3, username: 'Bot_4', skin: 'basic', role: 'dev', isDead: false, DevOpsSeeU: false, protected: false },
    { id: 4, username: 'Bot_5', skin: 'plant', role: 'dev', isDead: false, DevOpsSeeU: false, protected: false },
    { id: 5, username: 'Bot_6', skin: 'nosferatu', role: 'dev', isDead: false, DevOpsSeeU: false, protected: false },
    { id: 6, username: 'Bot_7', skin: 'wolf', role: 'hacker', isDead: false, DevOpsSeeU: false, protected: false },
    { id: 7, username: 'Bot_8', skin: 'clown', role: 'dev', isDead: false, DevOpsSeeU: false, protected: false },
    { id: 8, username: 'Bot_9', skin: 'duck', role: 'dev', isDead: false, DevOpsSeeU: false, protected: false },
    { id: 9, username: 'Bot_10', skin: 'steve', role: 'dev', isDead: false, DevOpsSeeU: false, protected: false },
    { id: 10, username: 'Bot_11', skin: 'pichu', role: 'dev', isDead: false, DevOpsSeeU: false, protected: false },
    { id: 11, username: 'Bot_12', skin: 'emo', role: 'dev', isDead: false, DevOpsSeeU: false, protected: false },
    { id: 12, username: 'Bot_13', skin: 'mafia', role: 'dev', isDead: false, DevOpsSeeU: false, protected: false },
    { id: 13, username: 'Bot_14', skin: 'requin', role: 'dev', isDead: false, DevOpsSeeU: false, protected: false },

    // { id: 3, username: 'Bot_2', skin: 'han', role: 'dev', isDead: false, DevOpsSeeU: false },


    // { id: 0, username: 'Bot_0', skin: 'demon', role: 'hacker', isDead: false },
    // { id: 1, username: 'Bot_1', skin: 'han', role: 'dev', isDead: false },
    // { id: 2, username: 'Bot_2', skin: 'duck', role: 'dev', isDead: false },
    // { id: 3, username: 'Bot_3', skin: 'emo', role: 'dev', isDead: false },
    // { id: 4, username: 'Bot_4', skin: 'garfield', role: 'dev', isDead: false },
    // { id: 5, username: 'Bot_5', skin: 'dealos', role: 'dev', isDead: false },
    // { id: 6, username: 'Bot_6', skin: 'pichu', role: 'dev', isDead: false },
    // { id: 7, username: 'Bot_7', skin: 'nosferatu', role: 'dev', isDead: false },
    // { id: 8, username: 'Bot_8', skin: 'plant', role: 'dev', isDead: false },
    // { id: 9, username: 'Bot_9', skin: 'puck', role: 'dev', isDead: false },
    // { id: 10, username: 'Bot_10', skin: 'steve', role: 'dev', isDead: false },
    // { id: 11, username: 'Bot_11', skin: 'toto-dead', role: 'dev', isDead: false },
    // { id: 12, username: 'Bot_12', skin: 'stitch', role: 'dev', isDead: false },

    // { id: 13, username: 'Bot_13', skin: 'wolf', role: 'dev', isDead: false },
    // { id: 14, username: 'Bot_14', skin: 'zombie', role: 'dev', isDead: false },


];

let chatHistory = [];
let chatHistoryDevOps = [];
let chatHistoryHacker = [];

let gameState = {
    started: false,
    timer: null,
    countdown: START_COUNTDOWN,
    phase: 'day',
    phaseTime: DAY_DURATION,
    phaseTimer: null,
    voting: false,
    votes: {},          // votes jour
    hasVoted: {},       // sockets qui ont voté (jour)
};

let nightVotes = {};      // votes nuit
let nightHasVoted = {};   // sockets qui ont voté (nuit)

// --- Reset ---
function resetGame(io) {
    if (gameState.timer) clearInterval(gameState.timer);
    if (gameState.phaseTimer) clearInterval(gameState.phaseTimer);

    gameState = {
        started: false,
        timer: null,
        countdown: START_COUNTDOWN,
        phase: 'day',
        phaseTime: DAY_DURATION,
        phaseTimer: null,
        voting: false,
        votes: {},
        hasVoted: {},
    };

    users = [
        { id: 0, username: 'Bot_1', skin: 'xxx', role: 'dev', isDead: false, DevOpsSeeU: false, protected: false },
        { id: 1, username: 'Bot_2', skin: 'han', role: 'chatgpt', isDead: false, DevOpsSeeU: false, protected: false },
        { id: 2, username: 'Bot_3', skin: 'cat', role: 'dev', isDead: false, DevOpsSeeU: false, protected: false },
        { id: 3, username: 'Bot_4', skin: 'basic', role: 'dev', isDead: false, DevOpsSeeU: false, protected: false },
        { id: 4, username: 'Bot_5', skin: 'plant', role: 'dev', isDead: false, DevOpsSeeU: false, protected: false },
        { id: 5, username: 'Bot_6', skin: 'nosferatu', role: 'dev', isDead: false, DevOpsSeeU: false, protected: false },
        { id: 6, username: 'Bot_7', skin: 'wolf', role: 'hacker', isDead: false, DevOpsSeeU: false, protected: false },
        { id: 7, username: 'Bot_8', skin: 'clown', role: 'dev', isDead: false, DevOpsSeeU: false, protected: false },
        { id: 8, username: 'Bot_9', skin: 'duck', role: 'dev', isDead: false, DevOpsSeeU: false, protected: false },
        { id: 9, username: 'Bot_10', skin: 'steve', role: 'dev', isDead: false, DevOpsSeeU: false, protected: false },
        { id: 10, username: 'Bot_11', skin: 'pichu', role: 'dev', isDead: false, DevOpsSeeU: false, protected: false },
        { id: 11, username: 'Bot_12', skin: 'emo', role: 'dev', isDead: false, DevOpsSeeU: false, protected: false },
        { id: 12, username: 'Bot_13', skin: 'mafia', role: 'dev', isDead: false, DevOpsSeeU: false, protected: false },
        { id: 13, username: 'Bot_14', skin: 'requin', role: 'dev', isDead: false, DevOpsSeeU: false, protected: false },

        // { id: 3, username: 'Bot_2', skin: 'han', role: 'dev', isDead: false, DevOpsSeeU: false },


        // { id: 0, username: 'Bot_0', skin: 'demon', role: 'hacker', isDead: false },
        // { id: 1, username: 'Bot_1', skin: 'han', role: 'dev', isDead: false },
        // { id: 2, username: 'Bot_2', skin: 'duck', role: 'dev', isDead: false },
        // { id: 3, username: 'Bot_3', skin: 'emo', role: 'dev', isDead: false },
        // { id: 4, username: 'Bot_4', skin: 'garfield', role: 'dev', isDead: false },
        // { id: 5, username: 'Bot_5', skin: 'dealos', role: 'dev', isDead: false },
        // { id: 6, username: 'Bot_6', skin: 'pichu', role: 'dev', isDead: false },
        // { id: 7, username: 'Bot_7', skin: 'nosferatu', role: 'dev', isDead: false },
        // { id: 8, username: 'Bot_8', skin: 'plant', role: 'dev', isDead: false },
        // { id: 9, username: 'Bot_9', skin: 'puck', role: 'dev', isDead: false },
        // { id: 10, username: 'Bot_10', skin: 'steve', role: 'dev', isDead: false },
        // { id: 11, username: 'Bot_11', skin: 'toto-dead', role: 'dev', isDead: false },
        // { id: 12, username: 'Bot_12', skin: 'stitch', role: 'dev', isDead: false },

        // { id: 13, username: 'Bot_13', skin: 'wolf', role: 'dev', isDead: false },
        // { id: 14, username: 'Bot_14', skin: 'zombie', role: 'dev', isDead: false },


    ];

    chatHistory = [];
    chatHistoryDevOps = [];
    chatHistoryHacker = [];
    nightVotes = {};
    nightHasVoted = {};

    io.emit('gameReset', { users });
}

// --- Phases ---
function startPhase(io, phase) {
    if (gameState.phaseTimer) clearInterval(gameState.phaseTimer);

    if (phase === 'day') {
        gameState.phase = 'day';
        gameState.phaseTime = DAY_DURATION;
        gameState.voting = false;
        io.emit('receive_message', { username: 'Systeme', message: 'Le jour commence', color: 'orange' });
    } else if (phase === 'vote') {
        gameState.phase = 'vote';
        gameState.phaseTime = VOTE_DURATION;
        gameState.voting = true;
        gameState.votes = {};
        gameState.hasVoted = {};
        io.emit('votingStart', { time: VOTE_DURATION });
        io.emit('receive_message', { username: 'Systeme', message: 'Le vote commence', color: 'grey' });
    } else if (phase === 'night') {
        io.emit('receive_message', { username: 'Systeme', message: 'La nuit commence', color: 'blue' });
        startNightVoting(io);
        return;
    }

    io.emit('phaseChange', { phase: gameState.phase, timeLeft: gameState.phaseTime });

    gameState.phaseTimer = setInterval(() => {
        gameState.phaseTime--;
        io.emit('phaseUpdate', { phase: gameState.phase, timeLeft: gameState.phaseTime });

        if (gameState.phaseTime <= 0) {
            clearInterval(gameState.phaseTimer);
            gameState.phaseTimer = null;

            if (gameState.phase === 'day') startPhase(io, 'vote');
            else if (gameState.phase === 'vote') endVoting(io);
        }
    }, 1000);
}

function endVoting(io) {
    gameState.voting = false;

    let maxVotes = 0;
    let eliminated = null;

    for (const name in gameState.votes) {
        const count = gameState.votes[name];
        if (count > maxVotes) { maxVotes = count; eliminated = name; }
        else if (count === maxVotes && eliminated !== null) { eliminated = null; }
    }

    if (eliminated) {
        io.emit('playerEliminated', eliminated);
        const idx = users.findIndex(u => u.username === eliminated);
        if (idx !== -1) {
            users[idx].isDead = true;
            users[idx].skin = 'ghost';
        }
        io.emit('updateUsers', users);
    } else {
        io.emit('noElimination');
    }

    startPhase(io, 'night');
}

function startNightVoting(io) {
    gameState.phase = 'night-vote';
    gameState.phaseTime = VOTE_DURATION;
    nightVotes = {};
    nightHasVoted = {};
    gameState.voting = true;

    io.emit('nightVotingStart', { time: VOTE_DURATION });
    io.emit('phaseChange', { phase: gameState.phase, timeLeft: gameState.phaseTime });

    gameState.phaseTimer = setInterval(() => {
        gameState.phaseTime--;
        io.emit('phaseUpdate', { phase: gameState.phase, timeLeft: gameState.phaseTime });

        if (gameState.phaseTime <= 0) {
            clearInterval(gameState.phaseTimer);
            gameState.phaseTimer = null;
            endNightVoting(io);
        }
    }, 1000);
}

function endNightVoting(io) {
    gameState.voting = false;

    let maxVotes = 0;
    let eliminated = null;

    for (const name in nightVotes) {
        const count = nightVotes[name];
        if (count > maxVotes) { maxVotes = count; eliminated = name; }
        else if (count === maxVotes && eliminated !== null) { eliminated = null; }
    }




    if (eliminated) {

        io.emit('playerEliminatedNight', eliminated);
        const idx = users.findIndex(u => u.username === eliminated);

        const user = users.find(u => u.id === idx);


        // console.log(user.protected)
        if (idx !== -1 && !user.protected) {
            users[idx].isDead = true;
            users[idx].skin = 'ghost';
        }


        io.emit('updateUsers', users);
    } else {
        io.emit('noEliminationNight');
    }



    const userPropro = users.find(u => u.protected === true);
    if (userPropro) {
        userPropro.protected = false
    }

    io.emit('updateUsers', users);

    console.log(userPropro)
    startPhase(io, 'day');
}

// --- Socket.io ---
io.on('connection', (socket) => {
    console.log('Connexion:', socket.id);

    socket.on('joinLobby', (player) => {
        if (gameState.started) {
            socket.emit('gameError', { message: 'La partie est déjà en cours !' });
            return;
        }

        if (users.length === 6) return; // limite simple

        const exists = users.some(u => u.username === player.username);
        if (exists) return;

        users.push({
            id: socket.id,
            token: player.token,
            username: player.username,
            skin: player.skin,
            role: player.role, // null au début
            isDead: false,
            DevOpsSeeU: false,
            protected: false,
        });

        io.emit('updateUsers', users);

        if (users.length >= 3 && !gameState.timer) {
            let c = gameState.countdown;

            gameState.timer = setInterval(() => {
                c--;
                io.emit('countdown', c);

                if (c <= 0) {
                    clearInterval(gameState.timer);
                    gameState.timer = null;
                    gameState.started = true;
                    io.emit('gameStarted');

                    // Attribution simple de rôle si null
                    users = users.map(u => {
                        // if (!u.role) return { ...u, role: 'devops' };
                        // return u;

                        return !u.role ? { ...u, role: Math.random() < 0.5 ? 'hacker' : 'chatgpt' } : u;

                    });

                    io.emit('updateUsers', users);
                    startPhase(io, 'night');

                }
            }, 1000);
        }
    });

    socket.on('leaveLobby', () => {
        const idx = users.findIndex(u => String(u.id) === String(socket.id));
        if (idx !== -1) {
            users[idx].isDead = true;
            users[idx].skin = 'ghost';
        }
        io.emit('updateUsers', users);
    });

    // Historique
    socket.emit('chat_history', chatHistory);
    socket.emit('chat_history_devops', chatHistoryDevOps);
    socket.emit('chat_history_hacker', chatHistoryHacker);

    // Chat global
    socket.on('send_message', (data) => {
        const me = users.find(u => String(u.id) === String(socket.id));
        if (me?.isDead) return;
        chatHistory.push(data);
        io.emit('receive_message', data);
    });

    // Chat devops
    socket.on('send_message_devops', (data) => {
        const me = users.find(u => String(u.id) === String(socket.id));
        if (me?.isDead) return;
        chatHistoryDevOps.push(data);
        io.emit('receive_message_devops', data);
    });


    // Chat hacker
    socket.on('send_message_hacker', (data) => {
        const me = users.find(u => String(u.id) === String(socket.id));
        if (me?.isDead) return;
        chatHistoryHacker.push(data);
        io.emit('receive_message_hacker', data);
    });



    socket.on('devops_see_you', (data) => {
        const user = users.find(u => String(u.id) === String(data));
        if (user?.isDead) return;
        user.DevOpsSeeU = true
        console.log(users)
        io.emit('updateUsers', users);

    });

    socket.on('chatgpt_protect', (data) => {
        // scotch du futur
        const userPropro = users.find(u => u.protected === true);
        if (userPropro) {
            userPropro.protected = false
        }

        const user = users.find(u => String(u.id) === String(data));
        if (user?.isDead) return;
        user.protected = true
        // console.log(users)
        io.emit('updateUsers', users);
        console.log(data);

    });

    // Votes jour
    socket.on('votePlayer', (targetUsername) => {
        if (!gameState.voting || gameState.phase !== 'vote') return;
        if (gameState.hasVoted[socket.id]) return;

        const me = users.find(u => String(u.id) === String(socket.id));
        if (me?.isDead) return;

        gameState.hasVoted[socket.id] = true;
        gameState.votes[targetUsername] = (gameState.votes[targetUsername] || 0) + 1;
        io.emit('voteUpdate', gameState.votes);
    });

    socket.on('unvotePlayer', (targetUsername) => {
        if (!gameState.voting || gameState.phase !== 'vote') return;
        if (!gameState.hasVoted[socket.id]) return;

        const me = users.find(u => String(u.id) === String(socket.id));
        if (me?.isDead) return;

        if (gameState.votes[targetUsername]) {
            gameState.votes[targetUsername]--;
            if (gameState.votes[targetUsername] <= 0) delete gameState.votes[targetUsername];
        }
        delete gameState.hasVoted[socket.id];
        io.emit('voteUpdate', gameState.votes);
    });

    // Votes nuit (hackers)
    socket.on('votePlayerNight', (targetUsername) => {
        if (!gameState.voting || gameState.phase !== 'night-vote') return;
        if (nightHasVoted[socket.id]) return;

        const me = users.find(u => String(u.id) === String(socket.id));
        if (me?.isDead) return;

        nightHasVoted[socket.id] = true;
        nightVotes[targetUsername] = (nightVotes[targetUsername] || 0) + 1;
        io.emit('nightVoteUpdate', nightVotes);
    });

    socket.on('unvotePlayerNight', (targetUsername) => {
        if (!gameState.voting || gameState.phase !== 'night-vote') return;
        if (!nightHasVoted[socket.id]) return;

        const me = users.find(u => String(u.id) === String(socket.id));
        if (me?.isDead) return;

        if (nightVotes[targetUsername]) {
            nightVotes[targetUsername]--;
            if (nightVotes[targetUsername] <= 0) delete nightVotes[targetUsername];
        }
        delete nightHasVoted[socket.id];
        io.emit('nightVoteUpdate', nightVotes);
    });

    socket.on('stopGame', () => resetGame(io));
});

server.listen(3001, () => {
    console.log('✅ Serveur lancé sur http://localhost:3001');
});

module.exports = app;
