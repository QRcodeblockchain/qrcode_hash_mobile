import 'react-native-gesture-handler';

// Import React and Component
import React from 'react';

// Import Navigators from React Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LanguageContext, {
  LanguageProvider,
} from './src/Context/LanguageProvider';
// Import Screens
import Splash from './src/pages/splash';
import {Login} from './src/pages/auth/Login';
import {Signup} from './src/pages/auth/SignUp';
import Main from './src/pages/main';
import {LogBox} from 'react-native';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

type RootStackParamList = {
  Splash: undefined;
  // Auth: undefined;
  Main: undefined;
};

type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  Main: undefined;
};

// const StackAuth = createStackNavigator<AuthStackParamList>();
const Stack = createStackNavigator<RootStackParamList>();

// const Auth = () => {
//   // Stack Navigator for Login and Sign up Screen
//   return (
//     <StackAuth.Navigator initialRouteName="Login">
//       <StackAuth.Screen
//         name="Login"
//         component={Login}
//         options={{headerShown: false}}
//       />
//       <StackAuth.Screen
//         name="Signup"
//         component={Signup}
//         options={{headerShown: false}}
//       />
//     </StackAuth.Navigator>
//   );
// };

const App = (): JSX.Element => {
  return (
    <LanguageProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{headerShown: false}}
          />
          {/* <Stack.Screen
            name="Auth"
            component={Auth}
            options={{headerShown: false}}
          /> */}
          <Stack.Screen
            name="Main"
            component={Main}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </LanguageProvider>
  );
};

export default App;
