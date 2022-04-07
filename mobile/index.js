/**
 * @format
 */

import {AppRegistry} from 'react-native';
//JA PEGA O INDEX.JS POR PADRÃO
import App from './src';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
