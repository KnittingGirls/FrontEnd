// import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Pages/Home';
import SelectType from './Pages/SelectType';
import UploadImg from './Pages/UploadImg';
import NewPattern from './Pages/NewPattern';
import ShowPattern from './Pages/ShowPattern';
import AdditionalInfo from './Pages/AdditionalInfo';
import SelectActivity from './Pages/SelectActivity';
import Login from './Pages/Login';
import { StyleSheet, View, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const Stack = createNativeStackNavigator();

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Community from './Pages/Community';

const Drawer = createDrawerNavigator();

export default function App() {
  const options = {
    drawerActiveBackgroundColor: "orange",
    overlayColor: "white",
    drawerInactiveBackgroundColor: "white",
    drawerActiveTintColor: "black"
  }

  return (    
    <NavigationContainer style={{ flex: 10, width: SCREEN_WIDTH, height: SCREEN_HEIGHT,overflow:'none'}}>
      <Drawer.Navigator initialRouteName='Home' drawerPosition="right" backBehavior="history">
        <Drawer.Screen name="Home" component={Home} options={options} />
        <Drawer.Screen name="Login" component={Login} options={options} />
        <Drawer.Screen name="SelectActivity" component={SelectActivity} options={options} />
        <Drawer.Screen name="도안 생성" component={NewPattern} options={options} />
        <Drawer.Screen name="SelectType" component={SelectType} options={options} />
        <Drawer.Screen name="UploadImg" component={UploadImg} options={options} />
        <Drawer.Screen name="ShowPattern" component={ShowPattern} options={options} />
        <Drawer.Screen name="AdditionalInfo" component={AdditionalInfo} options={options} />
        <Drawer.Screen name="Community" component={Community} options={options} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
