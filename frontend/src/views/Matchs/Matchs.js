import React, {useEffect , useState} from 'react';
import api from '../../services/Api';
import {getToken} from '../../services/Auth'

import Header from '../Shared/Header';
import './Matchs.css';

export default function Index(props){ 
    const [listaMatchs, setlistaMatchs] = useState([]);

    const token = getToken();

    // TODA VEZ QUE A VARIAVEL DENTRO DO ARRAY NO 2 PARAMETRO FOR ALTERADA, 
    // EXECUTA A ARROW FUNCTION
    useEffect(() => {
        async function carregarListaMatchs(){
            const response = await api.get('/matchs', {
                headers: {
                    token: token,
                }
            })
            setlistaMatchs(response.data);

            console.log(response.data);
        }
        carregarListaMatchs();
    }, [token])

    return (
        <React.Fragment>
            <Header/>
            <div className="matchs-container">
                {listaMatchs.length > 0 ? (
                <ul>
                    {listaMatchs.map(usuario => (
                        <li key={usuario._id}>
                            <img src={usuario.avatar} alt=""></img>
                            <footer>
                                <strong>{usuario.nome}</strong>
                            </footer>
                        </li>
                    ))}
                </ul>
                ) : (
                    <div className="empty">Você ainda não tem matchs</div>
                )}
        </div>
        </React.Fragment>
    );
}