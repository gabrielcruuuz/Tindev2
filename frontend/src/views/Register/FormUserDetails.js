import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import './Register.css';
import TextField from '@material-ui/core/TextField';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },            
    },
});     

export class FormUserDetails extends Component{
    continue = e => {
        e.preventDefault();
        this.VerifyInputs();
        
        this.props.nextStep();
    }

    VerifyInputs = () => {
        const {email, senha, nome} = this.props.values;
        const inputs = {email, senha, nome};
        const {changeFormError} = this.props;
        let mensagem = '';

        Object.keys(inputs).forEach(val => {
            if(inputs[val] ==='')
            {
                mensagem = 'required field';
                changeFormError(val, mensagem);
            }          
            else{
                mensagem = '';
                changeFormError(val, mensagem);
            } 
        });   
    }

    render(){    
        const {values, handleInputChange} = this.props;
        const { classes } = this.props;

        return (
            <div className="register-container">
                <div className="form-box">
                    <h1>New account</h1>
                    <form className={classes.root}>
                    <TextField
                            required
                            fullWidth
                            onChange={handleInputChange}
                            name="nome"
                            id="nome"
                            label="Full name"
                            margin="normal"
                            error ={values.formErrors.nome.length === 0 ? false : true }
                            helperText={values.formErrors.nome}
                            defaultValue={values.nome}
                        />
                        <br />
                        <TextField
                            onChange={handleInputChange}
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            margin="normal"
                            type="email"
                            error ={values.formErrors.email.length === 0 ? false : true }
                            helperText={values.formErrors.email}
                            defaultValue={values.email}
                        />
                        <br />
                         <TextField
                            onChange={handleInputChange}
                            name="senha"
                            required
                            fullWidth
                            id="senha"
                            label="Password"
                            className=""
                            margin="normal"
                            type="password"
                            error ={values.formErrors.senha.length === 0 ? false : true }
                            helperText={values.formErrors.senha}
                            defaultValue={values.senha}
                        />
                        <button 
                            type="button" 
                            onClick={this.continue}>Next
                        </button>
                    </form>
                    <span>Already have a account?
                        <Link to="/"> Login</Link>
                    </span>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(FormUserDetails);

