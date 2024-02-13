import React, {useEffect, useState, useContext} from 'react';
import {StatusBar, View, Image, Text, Dimensions} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PaperProvider} from 'react-native-paper';
import {Dashboard} from '../dashboard';
import {Settings} from '../settings';
import {History} from '../history';
import {initMQTT} from '../../utilies/mqtt';
import LanguageContext from '../../Context/LanguageContext';

const dashboardIcon = require('../../../assets/icons/bottomMenu/settings.png');
const settingsIcon = require('../../../assets//icons/bottomMenu/settings.png');
const historyIcon = require('../../../assets//icons/bottomMenu/history.png');

const Tab = createBottomTabNavigator();

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Main: React.FC<{navigation: any}> = ({navigation}) => {
  const [iconPadding, setIconPadding] = useState(0);

  const {handleLanguageChange, strings} = useContext(LanguageContext);
  const [currentTab, setCurrentTab] = useState('Dashboard');

  const handleChangeTab = (tabName: string) => {
    setCurrentTab(tabName);
  };

  useEffect(() => {
    initMQTT();
  }, []);

  useEffect(() => {}, [currentTab]);
  return (
    <PaperProvider>
      <GestureHandlerRootView style={{flex: 1}}>
        <StatusBar hidden />
        <Tab.Navigator
          screenListeners={({route}) => ({
            tabPress: () => handleChangeTab(route.name),
          })}
          screenOptions={({route}) => ({
            tabBarActiveTintColor: '#009788',
            tabBarInactiveTintColor: 'black',
            tabBarStyle: {
              paddingBottom: 5,
              paddingTop: 5,
              height: screenHeight * 0.08,
            },
            tabBarBackground: () => (
              <View
                style={{
                  backgroundColor: '#FFFFFF',
                  flex: 1,
                }}
              />
            ),
            tabBarIcon: ({focused, color, size}) => {
              switch (route.name) {
                case 'Dashboard':
                  setIconPadding(1000);
                  break;
                case 'History':
                  break;
                case 'Settings':
                  break;
              }
              return <></>;
            },
          })}>
          <Tab.Screen
            name="Dashboard"
            component={Dashboard}
            options={{
              headerShown: false,
              tabBarLabel: strings.Dashboard,
              tabBarIcon: ({color, size}) => (
                <Image
                  source={dashboardIcon}
                  resizeMode={'contain'}
                  style={[
                    {
                      height: screenHeight * 0.08,
                      width: screenWidth * 0.08,
                      padding: iconPadding,
                    },
                  ]}
                />
              ),
            }}
          />
          <Tab.Screen
            name="History"
            component={History}
            initialParams={{state: currentTab}}
            options={{
              headerShown: false,
              tabBarLabel: strings.History,
              tabBarIcon: ({color, size}) => (
                <Image
                  source={historyIcon}
                  resizeMode={'contain'}
                  style={[
                    {
                      height: screenHeight * 0.08,
                      width: screenWidth * 0.08,
                    },
                  ]}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Settings"
            component={Settings}
            options={{
              headerShown: false,
              tabBarLabel: strings.History,
              tabBarIcon: ({color, size}) => (
                <Image
                  source={settingsIcon}
                  resizeMode={'contain'}
                  style={[
                    {
                      height: screenHeight * 0.05,
                      width: screenWidth * 0.08,
                    },
                  ]}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </GestureHandlerRootView>
    </PaperProvider>
  );
};

export default Main;
