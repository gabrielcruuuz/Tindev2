const Dev = require ('../models/Dev');
const {DecrypToken} = require ('./AuthController');

module.exports = {
    async index(req, res){
        const { token } = req.headers;
        const {idUsuarioLogado} = DecrypToken(token);

        const UsuarioLogado = await Dev.findById(idUsuarioLogado);

        const listaMatchs = await Dev.find({
            $and:[
                {_id: {$in: UsuarioLogado.matchs}},
            ],
        })

        return res.json(listaMatchs);
    }
}