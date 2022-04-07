import React, {useEffect , useState} from 'react';
import io from 'socket.io-client';
import api from '../../services/Api';
import {getToken} from '../../services/Auth'

import Header from '../Shared/Header';
import './Index.css';
import like from '../../assets/images/like.svg';
import dislike from '../../assets/images/dislike.svg';
import itsamatch from '../../assets/images/itsamatch.png';

export default function Index(props){ 
    const [listaUsuarios, setListaUsuarios] = useState([]);
    const [matchDev, setmatchDev] = useState(null);

    const token = getToken();

    // TODA VEZ QUE A VARIAVEL DENTRO DO ARRAY NO 2 PARAMETRO FOR ALTERADA, 
    // EXECUTA A ARROW FUNCTION
    useEffect(() => {
        async function carregarLista(){
            const response = await api.get('/devs', {
                headers: {
                    token: token,
                }
            })
            setListaUsuarios(response.data);
        }
        carregarLista();
    }, [token])

    useEffect(() => {
        const socket = io(process.env.REACT_APP_API_URL, {
            query: {token : token}
        });

        socket.on('match', dev => {
            setmatchDev(dev);
        });
      
    }, [token])

    async function handleLike(idTargetLike){
        await api.post(`/devs/${idTargetLike}/likes`, null, {
            headers: {token: token},
        })

        // ATUALIZANDO A LISTA LOGO APOS A ACAO DE DISLIKE/LIKE
        setListaUsuarios(listaUsuarios.filter(usuario => usuario._id !== idTargetLike));
    }

    async function handleDislike(idTargetDislike){
        await api.post(`/devs/${idTargetDislike}/dislikes`, null, {
            headers: {token: token},
        });
        // ATUALIZANDO A LISTA LOGO APOS A ACAO DE DISLIKE/LIKE
        setListaUsuarios(listaUsuarios.filter(usuario => usuario._id !== idTargetDislike));
    }

    return (
        <React.Fragment>
            <Header/>
            <div className="index-container">
                {listaUsuarios.length > 0 ? (
                <ul>
                    {listaUsuarios.map(usuario => (
                        <li key={usuario._id}>
                            <img src={usuario.avatar} alt=""></img>
                            <footer>
                                <strong>{usuario.nome}</strong>
                                <p>{usuario.bio}</p>
                            </footer>
    
                            <div className="buttons">
                                <button type="button" onClick={() => handleDislike(usuario._id)}>
                                    <img src={dislike} alt="dislike" />
                                </button>
                                <button type="button" onClick={() => handleLike(usuario._id)}>
                                    <img src={like} alt="like" />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
                ) : (
                    <div className="empty">Você zerou o tinder xD</div>
                )}

                {matchDev && (
                    <div className="match-container">
                        <img src={itsamatch} alt="é um match" />
                        <img className="avatar-match" src={matchDev.avatar} alt=""></img>
                        <strong>{matchDev.nome}</strong>
                        <p>{matchDev.bio}</p>
                        <button type="button" onClick={() => setmatchDev(null)}>Fechar</button>
                    </div>
                )}
        </div>
        </React.Fragment>
    );
}