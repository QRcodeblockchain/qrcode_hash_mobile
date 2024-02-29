// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, useEffect, useContext} from 'react';
import {ActivityIndicator, View, StyleSheet, Text} from 'react-native';

// import AsyncStorage from '@react-native-community/async-storage';

const Splash: React.FC<{navigation: any}> = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        animating={true}
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
    backgroundColor: '#967BB6',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 120,
  },
  text: {
    color: 'white',
  },
});
