import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import { isAuthenticated } from "./services/Auth";

import Login from './views/Login/Login';
import Register from './views/Register/Register';
import Home from './views/Home/Home';
import Matchs from './views/Matchs/Matchs';
import Perfil from './views/Perfil/Perfil';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );

export default function Rotas(){
     return (
         <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login}/>
                <PrivateRoute path="/dev" component={Home}/>
                <PrivateRoute path="/matchs" component={Matchs}/>
                <PrivateRoute path="/perfil" component={Perfil}/>
                <Route path="/register" component={Register}/>
            </Switch>
         </BrowserRouter>
     );
}