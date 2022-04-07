const express = require('express');
const DevController = require ('./controllers/DevController');
const MatchController = require ('./controllers/MatchController');
const AuthController = require ('./controllers/AuthController');
const LikeController = require ('./controllers/LikeController');
const DislikesController = require ('./controllers/DislikeController');


const rotas = express.Router();

rotas.post('/login', AuthController.SubmitLogin);
rotas.post('/loginFacebook', AuthController.SubmitLoginFacebook);
rotas.post('/register', DevController.RegisterDev);
rotas.post('/edit', DevController.EditDev);
rotas.post('/devs/:devId/likes', LikeController.store);
rotas.post('/devs/:devId/dislikes', DislikesController.store);

rotas.get('/devs', DevController.index)
rotas.get('/getDev', DevController.GetDev)
rotas.get('/matchs', MatchController.index)


module.exports = rotas