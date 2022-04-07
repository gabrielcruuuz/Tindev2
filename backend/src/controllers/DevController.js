const fs = require('fs');
const fileType = require('file-type');
const multiparty = require('multiparty');

const {DecrypToken} = require ('./AuthController');
const Dev = require ('../models/Dev');
const FileUpload = require ('../Utils/File');


module.exports = {
    async index(req, res){
        const { token } = req.headers;
        const {idUsuarioLogado} = DecrypToken(token);

        const UsuarioLogado = await Dev.findById(idUsuarioLogado);

        // PEGANDO LISTA DE USUARIOS QUE AINDA NÃO TIVERAM LIKES, DISLIKES E NEM O MESMO USUARIO DA REQUISIÇÃO
        const listaUsuarios = await Dev.find({
            $and:[
                {_id: {$ne: UsuarioLogado}},
                {_id: {$nin: UsuarioLogado.likes}},
                {_id: {$nin: UsuarioLogado.dislikes}},
            ],
        })
        return res.json(listaUsuarios);
    },

    async GetDev(req, res){
        const { token } = req.headers;
        const {idUsuarioLogado} = DecrypToken(token);

        const UsuarioLogado = await Dev.findById(idUsuarioLogado);

        if(UsuarioLogado){
            return res.json({
                usuarioLogado: UsuarioLogado
            });
        }
        else{
            return res.status(401);
        }
    },

    async RegisterDev(req, res)
    {
       const {novoUsuario} = req.body;
       const UsuarioExiste = await Dev.findOne({ email: novoUsuario.email });

       if(UsuarioExiste)
            return res.status(400).send({
                mensagem: 'email já cadastrado',
                errorCode: 1
            });
       
       else{
            const {email, senha, nome, bio, avatar} = novoUsuario;

            const dev = await Dev.create({
                email: email,
                senha: senha,
                nome:  nome,
                bio: bio,
                // avatar: avatar
                avatar: 'data:image/jpeg;base64,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'
            });

            // TO DO 

            // const form = new multiparty.Form();
            //     form.parse(request, async (error, fields, files) => {
            //     if (error) throw new Error(error);
            //     try {
            //         const path = files.file[0].path;
            //         const buffer = fs.readFileSync(path);
            //         const type = fileType(buffer);
            //         const timestamp = Date.now().toString();
            //         const fileName = `Profile-Images/${email}-${timestamp}`;
            //         const data = await FileUpload(buffer, fileName, type);
            //         return res.status(200).send({mensagem: 'usuario cadastrado com sucesso'});
            //     } catch (error) {
            //         return response.status(400).send(error);
            //     }
            // });

            return res.status(200).send({mensagem: 'usuario cadastrado com sucesso'});
        }
    },

    async EditDev(req, res)
    {
       const {updatedUser} = req.body;
        try{
            const filter = { _id: updatedUser._id };
            const update = { bio: updatedUser.bio };

            await Dev.findOneAndUpdate(filter, update);
            return res.status(200).send({mensagem: 'usuario editado com sucesso'});
        }
        catch{
            return res.status(400).send({mensagem: 'erro ao tentar editar o usuario'});
        }
    }
}