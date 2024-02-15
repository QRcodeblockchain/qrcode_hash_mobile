import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LanguageContext from '../../Context/LanguageContext';

export const Login: React.FC<{navigation: any}> = () => {
  const navigation = useNavigation<any>();
  const [userName, setUserNmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const {strings} = React.useContext(LanguageContext);
  const handleButtonPress = () => {
    if (userPassword == '123' && userName == '123') navigation.navigate('Main');
  };
  return (
    <View
      style={{flex: 1, backgroundColor: '#967BB6', justifyContent: 'center'}}>
      <View style={{width: '100%'}}>
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 24,
            fontWeight: '500',
            color: 'white',
          }}>
          {strings.Login}
        </Text>
      </View>
      <View style={styles.SectionStyle}>
        <TextInput
          style={styles.inputStyle}
          onChangeText={userName => setUserNmail(userName)}
          placeholder={strings.EnterUserName} //dummy@abc.com
          placeholderTextColor="white"
          autoCapitalize="none"
          returnKeyType="next"
          underlineColorAndroid="#f000"
          blurOnSubmit={false}
        />
      </View>
      <View style={styles.SectionStyle}>
        <TextInput
          style={styles.inputStyle}
          onChangeText={UserPassword => setUserPassword(UserPassword)}
          placeholder={strings.EnterPassword} //12345
          placeholderTextColor="white"
          keyboardType="default"
          blurOnSubmit={false}
          secureTextEntry={true}
          underlineColorAndroid="#f000"
          returnKeyType="next"
        />
      </View>
      <TouchableOpacity
        style={styles.buttonStyle}
        activeOpacity={0.5}
        onPress={handleButtonPress}>
        <Text style={styles.buttonTextStyle}>{strings.LoginNow}</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: 'white',
  },
  registerTextStyle: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
});
