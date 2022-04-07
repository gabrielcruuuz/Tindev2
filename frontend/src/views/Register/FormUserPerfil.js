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

export class FormUserPerfil extends Component{
    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }

    render(){
        const {values, handleInputChange, handleInputFile, handleSubmit} = this.props;
        const { classes } = this.props;

        return(
            <React.Fragment>
                <div className="register-container">
                    <div className="form-box">
                        <h1>Perfil</h1>
                        <form className={classes.root} onSubmit={handleSubmit}>
                        <TextField
                                onChange={handleInputChange}
                                className="textarea"
                                name="bio"
                                id="bio"
                                label="Bio"
                                multiline= {true}
                                rows={5}
                                inputProps={{ maxLength: 215, className:"textarea"}}
                                defaultValue={values.bio}
                            />
                            <br/>
                            <div className="upload-img">
                                <h4>Foto</h4>
                                <input
                                    accept="image/*"
                                    id="avatar"
                                    type="file"
                                    name="avatar"
                                    onChange={handleInputFile}
                                />  
                                <img
                                 className="img-avatar"
                                 alt="avatar"
                                 src={values.avatar} />
                            </div>
                            <button 
                                type="button" 
                                onClick={this.back}
                                className="btn-side-to-side btn-gray">Voltar
                            </button>
                            <button 
                                type="submit" 
                                className="btn-side-to-side">Cadastrar
                            </button>
                        </form>
                        <span>Já tem uma conta?
                            <Link to="/"> Logar</Link>
                        </span>
                    </div>
                </div>
            </React.Fragment>  
        )
    }
}

export default withStyles(styles)(FormUserPerfil);
