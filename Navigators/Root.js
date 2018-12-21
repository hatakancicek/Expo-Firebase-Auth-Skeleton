import { 
  createAppContainer, 
  createSwitchNavigator, 
} from 'react-navigation';
import Home from '../Containers/Home.js';
import Auth from '../Containers/Auth.js';
import Name from '../Screen/Name';
import LoadingScreen from '../Screen/Loading';

export default createAppContainer(createSwitchNavigator({
  LoadingScreen,
  Auth,
  Name,
  Home,
}));