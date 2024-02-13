import init from 'react_native_mqtt';
import {AsyncStorage} from '@react-native-async-storage/async-storage';

init({
  size: 10000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  reconnect: true,
  sync: {},
});
var client;
function initMQTT() {
  client = new Paho.MQTT.Client(
    '18.205.175.80',
    8083,
    'myclientid_' + parseInt(Math.random() * 100, 10),
  );
  // Connection event handlers
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;
  client.connect({
    onSuccess: onConnect,
    onFailure: onFailure,
    userName: 'subscriber',
    password: 'subscriber',
    useSSL: false,
  });
}
function onFailure(e) {
  console.log(e);
}
function onConnect() {
  console.log('Connected!!!');
  // Once a connection has been made, make a subscription and send a message.
  client.subscribe('Test');
  var message = new Paho.MQTT.Message('Hello!');
  message.destinationName = 'Test';
  client.send(message);
}

function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log('onConnectionLost:' + responseObject.errorMessage);
  }
}

function onMessageArrived(message) {
  console.log('onMessageArrived:' + message.payloadString);
}
export {initMQTT, onConnect, onConnectionLost, onMessageArrived};
