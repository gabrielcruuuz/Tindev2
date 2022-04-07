import React , { useState } from 'react';
import { KeyboardAvoidingView, Text, StyleSheet , Image, TextInput, TouchableOpacity} from 'react-native';
import api from '../services/api';

import logo from '../assets/logo.png'; 

export default function Login({ navigation }){
    const [usuario, setUsuario] = useState('');
    
    async function Logar(){
        const response = await api.post('/devs', {usuarioGit : usuario});

        const {_id} = response.data;
        navigation.navigate('Home', { _id });
    }

    return (
        <KeyboardAvoidingView style={estilos.container}>
            <Image source={logo} />
            <TextInput 
                // FORMATANDO USO DO TECLADO DO CELULAR
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Digite seu usuário do Github"
                style={estilos.input}
                placeholderTextColor="#999"
                value={usuario}
                onChangeText={setUsuario}
             />
             <TouchableOpacity onPress={Logar} style={estilos.button}>
                <Text style={estilos.buttonText}>Enviar</Text>
             </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}

// CSS

const estilos = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30
    },

    input: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 4,
        marginTop: 20,
        paddingHorizontal: 15,
    },

    button: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#Df4723',
        borderRadius: 4,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    },
});

