import Settings from './Settings';
import { secondary } from '../Constants';
import { createBottomTabNavigator } from 'react-navigation';

const Home = createBottomTabNavigator({
    Settings,
},{
    headerMode: "none",
    tabBarOptions: {
        activeTintColor: secondary,
        inactiveTintColor: 'gray',
        showLabel: false,
    },
    initialRouteName: "Settings",
},);
  
Home.navigationOptions = {
    header: null
};

export default Home;