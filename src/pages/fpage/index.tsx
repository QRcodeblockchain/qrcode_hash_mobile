// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, useEffect, useContext} from 'react';
import {Image, View, StyleSheet, Text, Dimensions} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
// import AsyncStorage from '@react-native-community/async-storage';

const appIcon = require('../../../assets/icons/app_logo.png');
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Fpage: React.FC<{navigation: any}> = () => {
  const [isZFold2, setIsZFold2] = useState(false);
  const [iconPadding, setIconPadding] = useState(0);
  const [animating, setAnimating] = useState(true);
  const navigation = useNavigation<any>();

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      navigation.navigate('Main');
    }, 5000);
  }, []);

  useEffect(() => {
    const checkDevice = async () => {
      const brand = await DeviceInfo.getBrand();
      const model = await DeviceInfo.getModel();
      setIsZFold2(brand === 'Samsung' && model.includes('Z Fold 2'));
    };

    checkDevice();
  }, []);

  return (
    <View style={styles.container}>
      {!isZFold2 ? (
        <Image
          source={appIcon}
          resizeMode={'contain'}
          style={{
            height: screenHeight * 0.98,
            width: screenWidth * 0.98,
            padding: iconPadding,
          }}
        />
      ) : (
        <Image
          source={appIcon}
          resizeMode={'contain'}
          style={{
            height: 220,
            width: 220,
            padding: iconPadding,
          }}
        />
      )}

      <Text style={styles.text}>Authentiq</Text>
    </View>
  );
};

export default Fpage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#967BB6',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 120,
  },
  text: {
    color: 'white',
    fontsize: '30px',
  },
});
