import React, {useEffect, useState, useContext} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
} from 'react-native';

import {ScrollView} from 'react-native-gesture-handler';

import TopBar from '../../components/TopBar';
import {Searchbar, IconButton} from 'react-native-paper';
import {
  DefaultTheme,
  Provider as PaperProvider,
  Button,
} from 'react-native-paper';
import {useNavigation, useRoute} from '@react-navigation/native';

import {Card} from 'react-native-paper';
import {largeFontSize} from '../../styles';
import HistoryModel from '../../db/model/HistoryModel';
import LanguageContext from '../../Context/LanguageContext';
const searchIcon = require('./../../../assets/icons/search.png');

type RouteProps = {
  Home: {name: string};
  // ... other route names and their parameters
};
export const History = ({route}: any): JSX.Element => {
  interface Item {
    barCode: String;
    createdAt: String;
  }
  const {state} = route.params; // Access the passed props

  const {strings} = useContext(LanguageContext);
  const [dataInfo, setDataInfo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Your asynchronous logic here
        const list = await HistoryModel.getAll();
        console.log(list);
        setDataInfo(list);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [route]);
  const handleSearch = (text: string) => {
    console.log('Search:', text);
  };

  const navigation = useNavigation<any>();

  const goToDetailsScreen = () => {
    // navigation.navigate('Dashboard');
  };
  const [searchQuery, setSearchQuery] = React.useState('');

  const [isPressed, setIsPressed] = useState(false);
  const onPressIn = () => setIsPressed(true);
  const onPressOut = () => setIsPressed(false);

  const onChangeSearch = () => {};

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: isPressed ? 'blue' : DefaultTheme.colors.primary,
    },
  };
  return (
    <>
      <TopBar text={strings.History} />
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          padding: 10,
        }}>
        <SafeAreaView>
          <Searchbar
            placeholder={strings.History}
            onChangeText={onChangeSearch}
            value={searchQuery}
            icon={({color, size}) => (
              <Image
                source={searchIcon}
                resizeMode={'contain'}
                style={[
                  {
                    height: 20,
                    width: 20,
                  },
                ]}
              />
            )}
          />
        </SafeAreaView>

        <Card
          style={{
            paddingHorizontal: 20,
            paddingVertical: 20,
            flex: 1,
            height: 500,
            marginVertical: 20,
            width: '100%',
            padding: 5,
            marginTop: 20,
          }}>
          <ScrollView>
            {dataInfo?.map((item: Item, index) => (
              <View
                key={index}
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  borderColor: '#e0e0e0',
                  borderBottomWidth: 1,
                  width: '100%',
                  height: 50,
                  alignItems: 'center',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  paddingHorizontal: 20,
                }}>
                <Text
                  style={{
                    flex: 2,
                    fontSize: 15,
                    color: 'black',
                  }}>
                  {item?.barCode}
                </Text>
                <Text
                  style={{
                    flex: 1,
                    fontSize: 15,
                    color: 'black',
                  }}>
                  {item?.createdAt}
                </Text>
              </View>
            ))}
          </ScrollView>
        </Card>
        <Button
          style={{
            height: 50,
            width: '100%',
            justifyContent: 'center',
            marginBottom: 10,
            backgroundColor: '#009788',
          }}
          onPress={goToDetailsScreen}
          onPressIn={onPressIn}
          onPressOut={onPressOut}>
          <Text style={{color: 'white', fontSize: largeFontSize}}>
            Scan IOL
          </Text>
        </Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
