import React, {useEffect, useState, useContext} from 'react';
import {View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {mediumFontSize} from '../../styles';
import TopBar from '../../components/TopBar';
import {Avatar, Button, Card, Text} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import GroupButton from '../../components/GroupButton';
import BarCode from '../../utilies/barcode';
import HistoryModel from '../../db/model/HistoryModel';
import LanguageContext from '../../Context/LanguageContext';
export const Dashboard = (): JSX.Element => {
  const navigation = useNavigation<any>();
  const {strings} = useContext(LanguageContext);
  const [isScanning, setIsScanning] = useState(false);
  const [scanMethod, setScanMethod] = useState(false);
  const [result, setResult] = useState<string[]>([]);
  const [isPressed, setIsPressed] = useState(false);

  const onPressIn = () => setIsPressed(true);
  const onPressOut = () => setIsPressed(false);

  const goToDetailsScreen = () => {
    for (let i = 0; i < result.length; i++) {
      HistoryModel.create(result[i]);
    }
    setResult([]);
    navigation.navigate('History');
  };

  const goToScaning = () => {
    setIsScanning(true);
  };

  const insertResult = () => {
    for (let i = 0; i < result.length; i++) {
      HistoryModel.create(result[i]);
    }
    setResult([]);
    navigation.navigate('History');
  };

  useEffect(() => {}, []);

  return (
    <Animated.View style={{flex: 1}}>
      <TopBar text={strings.Dashboard} />
      <View style={{flex: 1, flexDirection: 'column', paddingHorizontal: 10}}>
        <GroupButton scanMethod={scanMethod} setScanMethod={setScanMethod} />
        <View
          style={{
            marginHorizontal: 10,
            alignSelf: 'center',
            padding: 10,
            width: '100%',
            flex: 1,
          }}>
          <BarCode
            result={result}
            setResult={setResult}
            setIsScanning={setIsScanning}
            isScanning={isScanning}
          />
        </View>
        <View
          style={{
            height: 50,
            width: '100%',
            marginBottom: 20,
            flexDirection: 'row',
            paddingHorizontal: 10,
            gap: 10,
          }}>
          {scanMethod && (
            <Button
              style={[
                isScanning
                  ? {backgroundColor: 'grey'}
                  : {backgroundColor: '#009788'},
                {
                  flex: 1,
                  justifyContent: 'center',
                },
              ]}
              onPress={insertResult}
              onPressIn={onPressIn}
              disabled={isScanning ? true : false}
              onPressOut={onPressOut}>
              <Text style={{color: 'white', fontSize: mediumFontSize}}>
                {strings.FinishBatch}
              </Text>
            </Button>
          )}
          {!scanMethod && (
            <>
              <Button
                style={[
                  isScanning
                    ? {backgroundColor: 'grey'}
                    : {backgroundColor: '#009788'},
                  {
                    flex: 1,
                    justifyContent: 'center',
                  },
                ]}
                onPress={goToScaning}
                onPressIn={onPressIn}
                disabled={isScanning ? true : false}
                onPressOut={onPressOut}>
                <Text style={{color: 'white', fontSize: mediumFontSize}}>
                  {strings.FinishBatch}
                </Text>
              </Button>
              <Button
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  backgroundColor: '#009788',
                }}
                onPress={goToDetailsScreen}
                onPressIn={onPressIn}
                onPressOut={onPressOut}>
                <Text style={{color: 'white', fontSize: mediumFontSize}}>
                  {strings.ReviewAndConfirm}
                </Text>
              </Button>
            </>
          )}
        </View>
      </View>
    </Animated.View>
  );
};
