import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {tapbarBackgroundColor, largeFontSize} from '../styles';
// const backArrowIcon = require('../../assets/icons/back_arrow.png');
interface TopBarProps {
  text: string;
}

const TopBar: React.FC<TopBarProps> = (props, routes) => {
  const navigation = useNavigation();
  const route = useRoute();

  const handlePress = () => {
    if (route.name !== 'Dashboard') {
      navigation.goBack();
    }
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        backgroundColor: tapbarBackgroundColor,
        marginBottom: 10,
        paddingVertical: 20,
        padding: 20,
      }}>
      {/* <TouchableOpacity onPress={handlePress}>
        <Image
          source={backArrowIcon}
          // resizeMode={'contain'}
          style={[{height: 13, width: 22, marginTop: 2}]}
        />
      </TouchableOpacity> */}
      <Text style={{fontSize: largeFontSize, color: 'white'}}>
        {props.text}
      </Text>
    </View>
  );
};

export default TopBar;
