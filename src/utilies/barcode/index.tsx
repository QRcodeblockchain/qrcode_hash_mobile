import React, {useEffect, useState, useRef} from 'react';
import {
  StatusBar,
  View,
  Image,
  Text,
  TextInput,
  Dimensions,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {Avatar, Button, Card} from 'react-native-paper';
import {RNCamera, BarCodeType, BarCodeReadEvent} from 'react-native-camera';
import {smallFontSize, mediumFontSize} from '../../styles';

interface DashboardProps {
  isScanning: boolean;
  setIsScanning: React.Dispatch<React.SetStateAction<boolean>>;
  result: string[];
  setResult: React.Dispatch<React.SetStateAction<string[]>>;
}

const BarCode: React.FC<DashboardProps> = ({
  isScanning,
  setIsScanning,
  result,
  setResult,
}) => {
  const cameraRef = useRef<RNCamera | null>(null);
  const [success, setSuccess] = useState(false);

  let barcodeTimeout: NodeJS.Timeout | null = null;

  useEffect(() => {}, []);

  // const handleBarcodeScanning = () => {
  //   setIsScanning(true);
  // };

  const handleBarcodeRead = (event: BarCodeReadEvent) => {
    if (isScanning) {
      setIsScanning(false);
      const data = event.data;
      setResult((prevValues: string[]) => [...prevValues, data]);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
    }
  };

  const aspectRatio = 4 / 9;
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  let cameraWidth, cameraHeight;

  if (windowWidth / windowHeight > aspectRatio) {
    cameraHeight = windowHeight * 0.7; // Set the desired height
    cameraWidth = cameraHeight * aspectRatio; // Calculate width based on aspect ratio
  } else {
    cameraWidth = windowWidth * 0.7; // Set the desired width
    cameraHeight = cameraWidth / aspectRatio; // Calculate height based on aspect ratio
  }
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flex: 1,
        }}>
        <RNCamera
          ref={ref => (cameraRef.current = ref)}
          style={{
            width: cameraWidth,
            height: cameraHeight,
            alignSelf: 'center',
            flex: 1,
            transform: [{rotate: '90deg'}],
          }}
          type={RNCamera.Constants.Type.back}
          captureAudio={false}
          barCodeTypes={[RNCamera.Constants.BarCodeType.code128]}
          onBarCodeRead={handleBarcodeRead}
          // autoFocus={RNCamera.Constants.AutoFocus.on}
        ></RNCamera>
        {success && (
          <View
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              backgroundColor: 'white',
            }}></View>
        )}
      </View>

      <ScrollView style={{flex: 1, marginHorizontal: 10}}>
        {result?.map((subresult, index) => (
          <Text
            key={index}
            style={{
              flex: 1,
              height: 50,
              fontSize: mediumFontSize,
              color: 'white',
              textAlign: 'center',
              width: '100%',
              marginVertical: 5,
              padding: 5,
              borderRadius: 24,
              backgroundColor: '#009788',
              textAlignVertical: 'center',
            }}>
            {subresult}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    backgroundColor: 'red', // Set the container background to transparent
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  scanText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 8,
  },
  barcodeData: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});
export default BarCode;
