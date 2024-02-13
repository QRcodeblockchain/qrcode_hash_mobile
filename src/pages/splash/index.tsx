// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, useEffect, useContext} from 'react';
import {ActivityIndicator, View, StyleSheet, Text} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import SettingModel from '../../db/model/SettingModel';
import LanguageContext from '../../Context/LanguageContext';
import {History} from '../history';
// import AsyncStorage from '@react-native-community/async-storage';

const Splash: React.FC<{navigation: any}> = () => {
  const {handleLanguageChange} = useContext(LanguageContext);
  const [animating, setAnimating] = useState(true);
  const navigation = useNavigation<any>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const list = await SettingModel.getAll();
        switch (list[0].settings) {
          case 'fr':
            handleLanguageChange('fr');
            break;
          case 'gm':
            handleLanguageChange('gm');
            break;
          default:
            handleLanguageChange('en');
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      navigation.navigate('Auth');
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator
        animating={animating}
        color="#FFFFFF"
        size="large"
        style={styles.activityIndicator}
      />
      <Text style={styles.text}>Loading</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#009788',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 120,
  },
  text: {
    color: 'white',
  },
});
