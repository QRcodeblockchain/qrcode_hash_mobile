import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Modal,
  Pressable,
  StyleSheet,
  Dimensions,
  BackHandler,
  Alert,
} from 'react-native';
import {mediumFontSize} from '../../styles';
import TopBar from '../../components/TopBar';
import Splash from '../../pages/splash';
import {Button, Text} from 'react-native-paper';
import Animated from 'react-native-reanimated';
import BarCode from '../../utilies/barcode';
import HistoryModel from '../../db/model/HistoryModel';
import LanguageContext from '../../Context/LanguageContext';
import {
  COLOR_BUTTON_CANCEL,
  COLOR_BUTTON_DEFAULT,
  COLOR_MODAL_OVERLAY,
  COLOR_PINK,
  COLOR_WHITE,
} from '../../constants/colors';
import {FONT_REGULAR} from '../../constants/fonts';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const aspectRatio = width / height;
const baseWidth = 375;
const scale =
  aspectRatio >= 0.65 && aspectRatio <= 0.85
    ? (width / baseWidth) * 1.2
    : width / baseWidth;
const dynamicFontSize = (size: number) => size * scale;

export const Dashboard = (): JSX.Element => {
  const {strings} = useContext(LanguageContext);
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState('');
  // const [isPressed, setIsPressed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modal, setModal] = useState('');

  // const onPressOut = () => setIsPressed(false);
  // const onPressIn = () => setIsPressed(true);
  const goToDetailsScreen = async () => {
    setIsLoading(true);
    setIsScanning(true);
    if (result === null || result.length !== 64) {
      setModal(JSON.stringify('Invalid QR. Please try again.'));
      setIsLoading(false);
      setModalVisible(true);
    }
    const response = await HistoryModel.create(result);
    setIsLoading(false);
    setModal(JSON.stringify(response.result));
    setModalVisible(true); // Show the modal
  };

  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    // Clean up the event listener on component unmount
    return () => backHandler.remove();
  }, []);

  useEffect(() => {}, []);

  return (
    <>
      {isLoading ? (
        <Splash navigation={undefined} />
      ) : (
        <Animated.View style={{flex: 1}}>
          <TopBar text={strings.Dashboard} />
          <View
            style={{flex: 1, flexDirection: 'column', paddingHorizontal: 10}}>
            {/* <Text style={{color: '#967BB6', fontSize: mediumFontSize}}>
              {strings.Dashboard}
            </Text> */}
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
              <>
                <Button
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    backgroundColor: '#967BB6',
                  }}
                  onPress={goToDetailsScreen}
                  // onPressIn={goToDetailsScreen}
                  // onPressOut={goToDetailsScreen}
                >
                  <Text style={{color: 'white', fontSize: mediumFontSize}}>
                    {strings.ReviewAndConfirm}
                  </Text>
                </Button>
              </>
            </View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={isModalVisible}
              onRequestClose={() => {
                setModalVisible(!isModalVisible);
              }}>
              <View style={styles.OverlayStyle} />
              <View style={styles.ModalView}>
                <View style={styles.BottomButton}>
                  <Pressable style={[styles.Button, styles.ButtonApply]}>
                    <Text style={[styles.TextStyle, styles.TextApply]}>
                      {modal}
                    </Text>
                  </Pressable>
                  <Pressable
                    style={[styles.Button, styles.ButtonCancel]}
                    onPress={() => setModalVisible(false)}>
                    <Text style={[styles.TextStyle, styles.TextCancel]}>
                      Close
                    </Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
          </View>
        </Animated.View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  OverlayStyle: {
    backgroundColor: COLOR_MODAL_OVERLAY,
    position: 'absolute',
    width: width,
    height: height,
  },
  ModalView: {
    marginTop: height - 260,
    width: width,
    height: 260,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  Button: {
    borderRadius: 10,
    padding: 10,
    width: '100%',
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  ButtonCancel: {
    backgroundColor: COLOR_BUTTON_CANCEL,
  },
  ButtonReadyApply: {
    borderWidth: 1,
    borderColor: COLOR_PINK,
  },
  ButtonApply: {
    backgroundColor: COLOR_PINK,
    marginTop: 10,
  },
  TextStyle: {
    fontFamily: FONT_REGULAR,
    fontSize: dynamicFontSize(16),
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  TextCancel: {
    color: COLOR_BUTTON_DEFAULT,
  },
  TextReadyApply: {
    color: COLOR_PINK,
  },
  TextApply: {
    color: COLOR_WHITE,
  },
  BottomButton: {
    marginHorizontal: 24,
    position: 'absolute',
    bottom: 30,
    width: width - 48,
  },
});
