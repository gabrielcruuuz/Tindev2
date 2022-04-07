import axios from 'axios';

const api = axios.create({
    // USANDO EMULADOR DO ANDROID GENYMOTION 
    // APONTAMOS PARA ESTE ENDEREÇO QUE  É O LOCALHOST
    baseURL: 'http://10.0.3.2:3333'

    // baseURL: 'http://localhost:3333'
});

export default api;