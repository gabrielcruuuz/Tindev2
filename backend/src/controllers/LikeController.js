const Dev = require('../models/Dev');
const {DecrypToken} = require ('./AuthController');

module.exports = {
    async store(req, res){
         const {devId} = req.params;
         const { token } = req.headers;

         const {idUsuarioLogado} = DecrypToken(token);
         const usuarioLogado = await Dev.findById(idUsuarioLogado);
         const usuarioAlvo = await Dev.findById(devId);

         if(!usuarioAlvo){
             return res.status(400).json({erro: 'Usuario não existe'});
         }

         if(usuarioAlvo.likes.includes(usuarioLogado._id)){
            const socketLogado = req.usuariosConectados[idUsuarioLogado];
            const socketAlvo = req.usuariosConectados[devId];

            usuarioLogado.likes.push(usuarioAlvo._id);

            usuarioLogado.matchs.push(usuarioAlvo._id);
            usuarioAlvo.matchs.push(usuarioLogado._id);
            
            if(socketLogado){
                req.io.to(socketLogado).emit('match', usuarioAlvo);
            }

            if(socketLogado){
                req.io.to(socketAlvo).emit('match', usuarioLogado);
            }
        }

         usuarioLogado.likes.push(usuarioAlvo._id);

        //  ATUALIZA A LISTA DE LIKES DO USUARIO LOGADO
         await usuarioLogado.save();
         await usuarioAlvo.save();

         return res.json(usuarioLogado)
    }
}