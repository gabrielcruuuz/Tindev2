import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import FacebookLogin from 'react-facebook-login';

import api from '../../services/Api';
import { loginToken } from "../../services/Auth";
import './Login.css';
import logo from '../../assets/images/logo.svg';

export default function Login(props){
    const [ email , setEmail ]= useState('');
    const [ senha , setSenha ]= useState('');
    const [ errorLogin , setErrorLogin ]= useState('');
    
    async function handlerSubmit(e){
        e.preventDefault();
        try{
            const response = await api.post('/login', {
                emailUsuario: email,
                senhaUsuario: senha,
            });

            redirectToHomePage(response);
        }
        catch (error){
            const {mensagem} = error.response.data;
            setErrorLogin(mensagem);
        }        
    }

    async function handlerLoginFacebook(responseFacebook){
        const {name, email, userID} = responseFacebook;

        const avatarURL =`https://graph.facebook.com/${userID}/picture?type=large`;

        const response = await api.post('/loginFacebook', {
            emailUsuario: email,
            nameUsuario: name,
            avatarUsuario: avatarURL
        });

        redirectToHomePage(response);
    }

    function redirectToHomePage(response){
        const token = response.data.token;
        loginToken(token);    
        props.history.push('/dev/');
    }

    return (
        <div className="login-container">
            <img src={logo} alt="Tindev" />
            <div className="login-terceiros">
            <FacebookLogin
                callback = {handlerLoginFacebook} 
                appId="2890505337662648"
                fields="name, email, picture"
                cssClass="loginBtn loginBtn-facebook"
                textButton= "Logar com Facebook">
            </FacebookLogin>
            </div>

            <div className="divider">
                <strong>ou</strong>
            </div>

            <form onSubmit = {handlerSubmit}>
                <TextField
                    required  
                    placeholder="Digite seu email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <TextField
                    placeholder="senha"
                    type="password"
                    name="senha"
                    required
                    value={senha}
                    onChange={e => setSenha(e.target.value)}
                />
                <span>{errorLogin}</span>
                <button type="submit">Entrar</button>
            </form>

            <span>Ainda não tem conta?
                <Link to="/register"> Cadastre-se</Link>
            </span>
        </div>
    );
}
