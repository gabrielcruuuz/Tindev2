import React, {Component} from 'react';
import api from '../../services/Api';
import {getToken} from '../../services/Auth'

import Header from '../Shared/Header';
import './Perfil.css';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

export class Perfil extends Component{ 
    state = {
        usuario : this.GetUser(),
        showModal : false
    }

    async GetUser(){
        const token = getToken();
        const response = await api.get('/getDev', {
            headers: {
                token: token,
            }
        })

        if(response.status === 200){
            this.setState({
                usuario:  response.data.usuarioLogado
            })        
        }
        else{
            console.log('Ocorreu um erro ao buscar o perfil do usuario');
        }
    }

    handleInputChange = event => {
        const valueInput = event.target.value;
        const nameInput = event.target.name;

        const usuario = this.state.usuario;

        usuario[nameInput] = valueInput;
 
        this.setState({
             usuario: usuario
        });
    }

    handleOpen = () => {      
        this.setState({
             showModal: true
        });
    }

    handleClose = () => {      
        this.setState({
             showModal: false
        });
        window.location = "/dev/";
    }


    handleSubmit = async (e) =>{
        e.preventDefault();
        const updatedUser = this.state.usuario;

        try{
            const response = await api.post('/edit', {
                updatedUser: updatedUser
            });

            const {status} = response;
            if(status === 200){
                // alert(response.mensagem);
            }
        }
        catch (error){
           console.log('erro ao alterar usuario');
        }        
        
    }

    render(){
        const {avatar, nome, bio} = this.state.usuario;
        return(
            <React.Fragment>
                <Header/>
                <div className="container-perfil">
                    <form onSubmit={this.handleSubmit}>
                        <input id="perfil-nome" defaultValue={nome} />
                        <img id="perfil-avatar" alt="perfil-avatar" src={avatar} title="alterar imagem"></img>
                        <br />
                        <TextField
                            className="textarea"
                            name="bio"
                            id="perfil-bio"
                            multiline= {true}
                            rows={5}
                            onChange={this.handleInputChange}
                            inputProps={{ maxLength: 215}}
                            defaultValue={bio}
                        />                        
                        <button type="submit" onClick={this.handleOpen}>Editar</button>
                        <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            open={this.state.showModal}
                            onClose={this.handleClose}
                            className="modal"
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                            timeout: 500,
                            }}
                        >
                            <Fade in={this.state.showModal}>
                            <div className="modal-body">
                                <h2 id="transition-modal-title">
                                    Perfil alterado com sucesso!!
                                </h2>
                            </div>
                            </Fade>
                        </Modal>

                    </form>
                </div>
            </React.Fragment>
        )
    } 
}

export default Perfil