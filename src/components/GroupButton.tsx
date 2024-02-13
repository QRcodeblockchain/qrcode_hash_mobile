import React, {useContext} from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';

import {grey} from '../styles';
import {Action} from '@ant-design/react-native/lib/modal/PropsType';
import LanguageContext from '../Context/LanguageContext';
interface DashboardProps {
  scanMethod: boolean;
  setScanMethod: React.Dispatch<React.SetStateAction<boolean>>;
}

const GroupButton: React.FC<DashboardProps> = ({scanMethod, setScanMethod}) => {
  const {strings} = useContext(LanguageContext);
  const buttons = [
    {id: 1, label: strings.BatchScan},
    {id: 2, label: strings.SingleScan},
  ];

  const handleButtonPress = (buttonId: number) => {
    setScanMethod(!scanMethod);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        key={buttons[0].id}
        onPress={() => handleButtonPress(0)}
        style={[styles.button, scanMethod === false && styles.buttonSelected]}>
        <Text
          style={[
            styles.buttonText,
            scanMethod === true && styles.buttonTextSelected,
            scanMethod === false ? {color: 'white'} : {color: '#009788'},
          ]}>
          {buttons[0].label}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        key={buttons[1].id}
        onPress={() => handleButtonPress(1)}
        style={[styles.button, scanMethod === true && styles.buttonSelected]}>
        <Text
          style={[
            styles.buttonText,
            scanMethod === true && styles.buttonTextSelected,
          ]}>
          {buttons[1].label}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: grey,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 4,
    flex: 1,
  },
  buttonSelected: {
    backgroundColor: '#009788',
  },
  buttonText: {
    color: '#009788',
    fontSize: 14,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  buttonTextSelected: {
    color: 'white',
  },
});

export default GroupButton;
