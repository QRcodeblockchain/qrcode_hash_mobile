import React, {useEffect, useState, useContext} from 'react';
import {StatusBar, View, Image, Text, Dimensions} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PaperProvider} from 'react-native-paper';
import {Dashboard} from '../dashboard';

// import {initMQTT} from '../../utilies/mqtt';
import LanguageContext from '../../Context/LanguageContext';

const dashboardIcon = require('../../../assets/icons/bottomMenu/settings.png');

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

  // useEffect(() => {
  //   initMQTT();
  // }, []);

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
            tabBarActiveTintColor: '#967BB6',
            tabBarInactiveTintColor: 'black',
            tabBarStyle: {
              paddingBottom: 5,
              paddingTop: 5,
              height: screenHeight * 0.08,
            },
            tabBarBackground: () => (
              <View
                style={{
                  backgroundColor: '#967BB6',
                  flex: 1,
                }}
              />
            ),
            tabBarIcon: ({focused, color, size}) => {
              switch (route.name) {
                case 'Dashboard':
                  setIconPadding(1000);
                  break;
                // case 'History':
                //   break;
                // case 'Settings':
                //   break;
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
        </Tab.Navigator>
      </GestureHandlerRootView>
    </PaperProvider>
  );
};

export default Main;
