const axios = require ('axios');
const Dev = require ('../models/Dev');

var jwt = require('jsonwebtoken');

async function SubmitLogin(req, res){
    const {emailUsuario, senhaUsuario} = req.body;

    const usuarioExiste = await Dev.findOne({
        email: emailUsuario,
        senha: senhaUsuario
    });

    if(usuarioExiste){
        const tokenData ={
            idUsuarioLogado: usuarioExiste._id,
            nome: usuarioExiste.nome
        }
        const generatedToken = jwt.sign(tokenData, 'somepass', {expiresIn: '4h'});
        return res.json({
            status: 200,
            token: generatedToken
        });
    }
    else{
        return res.status(401).send({mensagem : 'email ou senha incorretos!'});
    }
}

async function SubmitLoginFacebook(req, res){
    const {emailUsuario, avatarUsuario, nameUsuario} = req.body;
    let generatedToken = null;

    const usuarioExiste = await Dev.findOne({
        email: emailUsuario
    });

    if(usuarioExiste){
        const tokenData ={
            idUsuarioLogado: usuarioExiste._id,
            nome: usuarioExiste.nome
        }
        generatedToken = jwt.sign(tokenData, 'somepass', {expiresIn: '4h'});
    }

    else{
        const dev = await Dev.create({
            email: emailUsuario,
            senha: '123456',
            nome: nameUsuario,
            bio: "",
            avatar: avatarUsuario
        });
        
        const tokenData ={
            idUsuarioLogado: dev._id,
            nome: dev.nome
        }

        generatedToken = jwt.sign(tokenData, 'somepass', {expiresIn: '4h'});
}

    return res.json({
        status: 200,
        token: generatedToken
    });
}

function DecrypToken(token){
    if (!token)
        return null; 
        
        const tokenData = jwt.verify(token,'somepass');
        return tokenData;
}

function GenerateToken(usuario){
    const tokenData ={
            idUsuarioLogado: usuario._id,
            nome: usuario.nome
        }

    const generatedToken = jwt.sign(tokenData, 'somepass', {expiresIn: '4h'});
    return generatedToken;
}

module.exports = {
    SubmitLogin,
    DecrypToken,
    SubmitLoginFacebook
}