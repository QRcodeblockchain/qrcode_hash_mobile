import React, {useEffect, useState, useRef} from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
import {RNCamera, BarCodeType, BarCodeReadEvent} from 'react-native-camera';

interface DashboardProps {
  isScanning: boolean;
  setIsScanning: React.Dispatch<React.SetStateAction<boolean>>;
  result: string;
  setResult: React.Dispatch<React.SetStateAction<string>>;
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

  const handleBarcodeRead = (event: BarCodeReadEvent) => {
    if (isScanning) {
      setIsScanning(false);
      const data = event.data;
      setResult(data);
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
          barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
          onBarCodeRead={handleBarcodeRead}></RNCamera>
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
