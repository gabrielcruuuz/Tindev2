const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rotas = require('./routes');
const {DecrypToken} = require ('./controllers/AuthController');

const app = express();
app.use(cors());
const server = require('http').Server(app);
const io = require('socket.io')(server);
require('dotenv').config();

const usuariosConectados = {};

io.on('connection', socket => {
    const {token} = socket.handshake.query;
    const {idUsuarioLogado} = DecrypToken(token);
   usuariosConectados[idUsuarioLogado] = socket.id;
});


mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true
});

app.use((req, res, next) => {
    req.io = io;
    req.usuariosConectados = usuariosConectados;
    return next();
});

app.use(express.json());
app.use(rotas);

server.listen(process.env.PORT || 3333);
