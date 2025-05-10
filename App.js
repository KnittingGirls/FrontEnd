import { AuthProvider } from "./AuthContext";
import { useAuth } from "./AuthContext";
import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Pages/Home';
import SelectType from './Pages/SelectType';
import UploadImg from './Pages/UploadImg';
import NewPattern from './Pages/NewPattern';
import ShowPattern from './Pages/ShowPattern';
import AdditionalInfo from './Pages/AdditionalInfo';
import SelectActivity from './Pages/SelectActivity';
import Login from './Pages/Login';
import { createDrawerNavigator, DrawerToggleButton, DrawerActions } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Community from './Pages/Community';
import { StyleSheet, View, Dimensions, TouchableOpacity,Image ,Text} from 'react-native';
import AllPosts from './Pages/Community/AllPosts';
import EachPost from './Pages/Community/EachPost';
// import MyPage from './Pages/Community/MyPost';
import NewPost from './Pages/Community/NewPost';
import MyPost from './Pages/Community/MyPost';
import ScrapList from './Pages/Community/ScrapList';

import { Platform } from "react-native";
import { useEffect } from "react";
import { useState } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const options = {
  
  drawerActiveBackgroundColor: "orange",
  overlayColor: "white",
  drawerInactiveBackgroundColor: "white",
  drawerActiveTintColor: "black",
  headerTitle: "",
  headerStyle: {
    borderRadius:9,
  }
}

const MenuButton = ({ navigation }) => {
  // const navigation = useNavigation();
  const { token, nickname, isLoading } = useAuth(); 
  return (
    <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} style={{ width: 30, height: 30 }}>
      <Image source={require('./assets/menu_navigation.png')} />
    </TouchableOpacity>
  );
}
const DrawerNavigator = () => {
  const [token, setToken] = useState();
  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = SecureStore.getItemAsync("token");
      console.log("🔑 불러온 토큰:", storedToken);
      if (storedToken) {
        setToken(storedToken);
      }
    };
    fetchToken();
  }, []);
  return (
    <Drawer.Navigator
      drawerType="front"
      initialRouteName="Home"
      backBehavior='history'
      screenOptions={{
        drawerPosition: 'right',
        backBehavior: "history",
        // headerBackButtonDisplayMode: screenLeft,
        headerLeft:
          // () => <TouchableOpacity style={{ width: 30, height: 30 }} onPress={() => { navigation(-1) }}  >
          //               <Image source={require('./assets/backBtn.svg')}/>
          // </TouchableOpacity>
          false,
        headerRight: () => <DrawerToggleButton />,
      }}
    >
    <Drawer.Screen name="Home" component={Home} options={{ ...options, drawerLabel: "홈화면" }} />
    {!token && 
        (<Drawer.Screen name="Login" component={Login} options={{ ...options, drawerLabel: "로그인" }} />)}
    {/* <Drawer.Screen name="Login" component={Login} options={{ ...options, drawerLabel: "로그인" }} /> */}
    {/* {!token ? <Drawer.Screen name="Login" component={Login} options={{ ...options, drawerLabel: "로그인" }} /> : <Drawer.Screen name="Home" component={Home} options={{ ...options, drawerLabel: "홈화면" }} />} */}
    <Drawer.Screen name="NewPattern" component={NewPattern} options={{ ...options, drawerLabel: "도안 생성" }} />
    <Drawer.Screen name="AllPosts" component={AllPosts} options={{ ...options, drawerLabel: "커뮤니티" }} />
    <Drawer.Screen name="MyPost" component={MyPost} options={{ ...options, drawerLabel: "내가 쓴 글" }} />
    <Drawer.Screen name="ScrapList" component={ScrapList} options={{ ...options, drawerLabel: "스크랩한 글" }} />
</Drawer.Navigator>
)}

const AppNavigator = () => {
  // const [token, setToken] = useState();
  const { token, nickname, isLoading } = useAuth();
  // useEffect(() => {
  //     const fetchToken = async () => {
  //     const storedToken = SecureStore.getItemAsync("token");
  //     console.log("🔑 불러온 토큰:", storedToken);
  //     if (storedToken) {
  //       setToken(storedToken);
  //     }
  //   };
  //   fetchToken();
  // }, []);
  if (isLoading) {
    return(
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>ss</Text>
      </View>
    );
  }
  console.log("token: ", token);
  // console.log("isLoading: ", isLoading);
  console.log("현재 플랫폼:", Platform.OS);

  
  return (
    <Stack.Navigator>
      <Stack.Screen name="Drawer" component={DrawerNavigator} options={{ headerShown: false, presentation: 'card', detachPreviousScreen: false }} />
    <Stack.Screen name="SelectType" component={SelectType} options={{ title: "", presentation: 'card', detachPreviousScreen: false }} />
    <Stack.Screen name="UploadImg" component={UploadImg} options={{ title: "", presentation: 'card', detachPreviousScreen: false }} />
    <Stack.Screen name="SelectActivity" component={SelectActivity} options={{ title: "" }} />
    <Stack.Screen name="ShowPattern" component={ShowPattern} options={{ title: "" }} />
    <Stack.Screen name="AdditionalInfo" component={AdditionalInfo} options={{ title: "" }} />
    <Stack.Screen name="EachPost" component={EachPost} options={{ title: "" }} />
    <Stack.Screen name="NewPost" component={NewPost} options={{ title: "" }} />
    <Stack.Screen name="AllPosts" component={AllPosts} options={{ title: "" }} />
    </Stack.Navigator>
  )
};

export default function App() {
 
  return (    
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} edges={['top', 'bottom']}>
    <AuthProvider>
      <NavigationContainer style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT, overflow: 'none'}}>
        <AppNavigator/>
      </NavigationContainer>
    </AuthProvider>
  </SafeAreaView >
  );
}
