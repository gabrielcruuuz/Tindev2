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
         
         usuarioLogado.dislikes.push(usuarioAlvo._id);

        //  ATUALIZA A LISTA DE LIKES DO USUARIO LOGADO
         await usuarioLogado.save();

         return res.json(usuarioLogado)

    }
}