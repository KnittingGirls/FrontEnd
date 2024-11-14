import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Pages/Home';
import SelectType from './Pages/SelectType';
import UploadImg from './Pages/UploadImg';
import NewPattern from './Pages/NewPattern';
import ShowPattern from './Pages/ShowPattern';
import AdditionalInfo from './Pages/AdditionalInfo';
import SelectActivity from './Pages/SelectActivity';
import Login from './Pages/Login';

const Stack = createNativeStackNavigator();

export default function App() {
  // const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="SelectActivity" component={SelectActivity} options={{ headerShown: false, }} />
        <Stack.Screen name="NewPattern" component={NewPattern} options={{ headerShown: false, }} />
        <Stack.Screen name="SelectType" component={SelectType} options={{ headerShown: false, }} />
        <Stack.Screen name="UploadImg" component={UploadImg} options={{ headerShown: false, }} />
        <Stack.Screen name="ShowPattern" component={ShowPattern} options={{ headerShown: false, }} />
        <Stack.Screen name="AdditionalInfo" component={AdditionalInfo} options={{ headerShown: false, }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

