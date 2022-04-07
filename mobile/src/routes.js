import {createAppContainer, createSwitchNavigator} from 'react-navigation'

import Login from './views/Login';
import Home from './views/Home';

export default createAppContainer(
    createSwitchNavigator({
        Login,
        Home,
    })
);