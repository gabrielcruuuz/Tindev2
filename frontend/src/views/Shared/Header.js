import React from 'react';
import { Link } from 'react-router-dom';
import {logoutToken} from '../../services/Auth'

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { List, ListItem } from '@material-ui/core';

import './Header.css';
import logo from '../../assets/images/logo.svg';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    }
  }));

export default function Header(props){
    const classes = useStyles();
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
  
    const handleMenu = event => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const LogOut = () => {
        logoutToken();
        window.location = "/";
    };

    return (
      <div className={classes.root}>
        <AppBar position="static" className="menu-fixo">
          <Toolbar>
            <Link to="/dev">
                <img src={logo} alt="Tindev" />
            </Link>
            <div className="menu-direita">
                <List className="lista-rotas">
                    <Link to="/dev"><ListItem>Home</ListItem></Link>
                    <Link to="/matchs"><ListItem>Matchs</ListItem></Link>
                </List>
            </div>
            {auth && (
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  className="menu-header"
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <Link to="/perfil" className="linkMenu">
                    <MenuItem onClick={handleClose}>Perfil</MenuItem>
                  </Link>
                  <Link to="/" className="linkMenu">
                    <MenuItem onClick={LogOut}>Sair</MenuItem>
                  </Link>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }