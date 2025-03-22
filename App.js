// import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Pages/Home';
import SelectType from './Pages/SelectType';
import UploadImg from './Pages/UploadImg';
import NewPattern from './Pages/NewPattern';
import ShowPattern from './Pages/ShowPattern';
import AdditionalInfo from './Pages/AdditionalInfo';
import SelectActivity from './Pages/SelectActivity';
// import Header from './Pages/Header';
import Login from './Pages/Login';
import { createDrawerNavigator, DrawerToggleButton, DrawerActions } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Community from './Pages/Community';
import { StyleSheet, View, Dimensions, TouchableOpacity,Image } from 'react-native';
import AllPosts from './Pages/Community/AllPosts';
import EachPost from './Pages/Community/EachPost';
// import MyPage from './Pages/Community/MyPost';
import NewPost from './Pages/Community/NewPost';
import MyPost from './Pages/Community/MyPost';
import ScrapList from './Pages/Community/ScrapList';

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
    borderRadius:14,
  }
}

const MenuButton = ({ navigation }) => {
  // const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} style={{ width: 30, height: 30 }}>
      <Image source={require('./assets/menu_navigation.png')} />
    </TouchableOpacity>
  );
}
const DrawerNavigator = () => (<Drawer.Navigator
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
  <Drawer.Screen name="Login" component={Login} options={{ ...options, drawerLabel: "로그인" }} />
  {/* <Drawer.Screen name="SelectActivity" component={SelectActivity} options={{ ...options, drawerLabel: "" }} /> */}
  <Drawer.Screen name="NewPattern" component={NewPattern} options={{ ...options, drawerLabel: "도안 생성" }} />
  {/* <Drawer.Screen name="SelectType" component={SelectType} options={{ ...options, drawerLabel: "타입 고르기" }} /> */}
  {/* <Drawer.Screen name="UploadImg" component={UploadImg} options={{ ...options, drawerLabel: "이미지 업로드" }} /> */}
  {/* <Drawer.Screen name="ShowPattern" component={ShowPattern} options={{ ...options, drawerLabel: "패턴 확인" }} /> */}
  {/* <Drawer.Screen name="AdditionalInfo" component={AdditionalInfo} options={{ ...options, drawerLabel: "추가 정보 입력" }} /> */}
  <Drawer.Screen name="Community" component={Community} options={{ ...options, drawerLabel: "커뮤니티" }} />
  <Drawer.Screen name="AllPosts" component={AllPosts} options={{ ...options, drawerLabel: "커뮤니티- 게시물 조회" }} />
  <Drawer.Screen name="MyPost" component={MyPost} options={{ ...options, drawerLabel: "내가 쓴 글" }} />
  <Drawer.Screen name="ScrapList" component={ScrapList} options={{ ...options, drawerLabel: "스크랩한 글" }} />
</Drawer.Navigator>
)

const AppNavigator = () => (
  <Stack.Navigator
    // screenOptions={({ navigation }) => ({
    //   headerRight: () => <MenuButton navigation={navigation} />, // 🚀 navigation을 직접 전달
    // })}
  >
    <Stack.Screen name="Drawer" component={DrawerNavigator} options={{ headerShown: false }} />
    <Stack.Screen name="SelectType" component={SelectType} options={{ title: "" }} />
    <Stack.Screen name="UploadImg" component={UploadImg} options={{ title: "" }} />
    <Stack.Screen name="SelectActivity" component={SelectActivity} options={{ title: "" }} />
    <Stack.Screen name="ShowPattern" component={ShowPattern} options={{ title: "" }} />
    <Stack.Screen name="AdditionalInfo" component={AdditionalInfo} options={{ title: "" }} />
    <Stack.Screen name="EachPost" component={EachPost} options={{ title: "" }} />
    <Stack.Screen name="NewPost" component={NewPost} options={{ title: "" }} />
  </Stack.Navigator>
);

export default function App() {
 
  return (    
    <NavigationContainer style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT,overflow:'none'}}>
      <AppNavigator/>
    </NavigationContainer>
  );
}
