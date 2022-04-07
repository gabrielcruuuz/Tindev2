import React, {Component} from 'react';
import api from '../../services/Api';
import FormUserDetails from './FormUserDetails';
import FormUserPerfil from './FormUserPerfil';

export class Register extends Component{
    state = {
        step:1,
        email: "",
        senha: "",
        nome: "",
        bio: "",
        avatar: null,
        formErrors: {
            email: "",
            senha: "",
            nome: "",
        }
    }

    nextStep = () => {
        if(this.formValid()){
            const { step } = this.state;
            this.setState({
                step: step + 1
            });
        }
    }

    prevStep = () => {
        const {step} = this.state;
        this.setState({
            step: step - 1
        });
    }

    handleInputFile = event => {
        this.setState({
            avatar: URL.createObjectURL(event.target.files[0])
        })
    }

    handleInputChange = event => {
       const valueInput = event.target.value;
       const nameInput = event.target.name;
       let formErrors = this.state.formErrors;

       switch(nameInput){
           case "email":
                if(!valueInput.includes("@"))
                    formErrors.email = "email invalido";
                else
                    formErrors.email = "";
           break;

           case "senha":
                if(valueInput.length < 5 )
                    formErrors.senha = "senha muito curta";
                else
                    formErrors.senha = "";
           break;

           default:
                if(valueInput.length > 0)
                {
                    formErrors[nameInput] = "";
                }
            break;
       }

       this.setState({
            [nameInput]: valueInput,
            formErrors: formErrors
        });
    }

    changeFormError = (input, mensagem) => {
        let formErrors = this.state.formErrors;
        formErrors[input] = mensagem;
        
        if(formErrors[input] === '')
        {
            
        }

        this.setState({
            formErrors: formErrors
        });
    }

    changeStep = (step) => {
        this.setState({
            step: step
        })
    }

    handleSubmit = async (e) =>{
        e.preventDefault();

        if(this.formValid())
        {
            const novoUsuario = {
                email: this.state.email,
                senha: this.state.senha,
                nome: this.state.nome,
                bio: this.state.bio,
                avatar: this.state.avatar
            }
            try{
                const response = await api.post('/register', {
                    novoUsuario: novoUsuario
                });

                const {status} = response;
                if(status === 200)
                    this.props.history.push('/');
            }
            catch (error){
                const {mensagem, errorCode} = error.response.data;
                switch(errorCode)
                {
                    case 1: 
                        this.changeFormError("email", mensagem);
                        this.changeStep(1);
                        break;

                    default:
                        this.changeFormError("email", "");
                        break;
                }
            }        
        }
        else
            alert('formulário invalido');
    }

    formValid = () => {
        let valid = true;
        const formErrors = this.state.formErrors;
        
        Object.keys(formErrors).forEach(val => {
            if(formErrors[val].length > 0)
                valid = false;
        });

        return valid;
    }

    render(){
        const {email, senha, nome, bio, avatar, formErrors} = this.state;
        const values = {email, senha, nome, bio, avatar, formErrors}

        switch(this.state.step){
            case 1:
                return (
                    <FormUserDetails
                        nextStep= {this.nextStep}
                        changeFormError = {this.changeFormError}
                        handleInputChange = {this.handleInputChange}  
                        values = {values}
                    />
                )
            default:
                return (
                    <FormUserPerfil
                        prevStep= {this.prevStep}
                        handleInputChange = {this.handleInputChange}  
                        handleInputFile = {this.handleInputFile}
                        values = {values}
                        handleSubmit = {this.handleSubmit}
                    />
                )
        }
    }
}

export default Register