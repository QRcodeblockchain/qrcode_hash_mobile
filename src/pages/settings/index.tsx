import React, {useState, useEffect, useContext} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import TopBar from '../../components/TopBar';
import {Switch, Card, Modal, RadioButton} from 'react-native-paper';
import LanguageContext from '../../Context/LanguageContext';
import SettingModel from '../../db/model/SettingModel';

export const Settings = (): JSX.Element => {
  const {handleLanguageChange, strings, Language} = useContext(LanguageContext);
  const [languageSettingVisible, setLanguageSettingVisible] = useState(false);
  const [checked, setChecked] = useState<string | undefined>('en'); // Declare state with the correct type
  const [state, setStated] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const list = await SettingModel.getAll();
        setChecked(list[0].settings);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const showLanguageModal = () => setLanguageSettingVisible(true);
  const hideLanguageModal = () => setLanguageSettingVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};
  type SwitchState = {
    settingName: string;
    settingState: boolean;
  };
  type DatType = {
    settingName: String;
  };
  const [dataInfo, setDataInfo] = useState<SwitchState[]>([
    {settingName: 'Sound', settingState: false},
    {settingName: 'FaceIDenabled', settingState: false},
    {settingName: 'BatchScan', settingState: true},
    {settingName: 'ConfirmScanManually', settingState: false},
  ]);
  const [otherinfo, setOtherInfo] = useState([
    {settingName: 'UserCredential', value: ''},
    {settingName: 'ResendFunctionality', value: ''},
    {settingName: 'Language', value: 'en'},
  ]);

  const toggleSwitch = async (changeIndex: number, value: boolean) => {
    let updateData = dataInfo.map((item, index) => {
      if (index === changeIndex) {
        return {...item, settingState: !value};
      }
      return item;
    });
    setDataInfo(updateData);
  };

  const otherSetting = (data: DatType) => {
    if (data.settingName === 'Language') {
      showLanguageModal();
    }
  };

  return (
    <>
      <TopBar text={strings.Settings} />
      <View
        style={{
          flex: 1,
          height: 500,
          marginVertical: 10,
          width: '100%',
          padding: 10,
          marginTop: 20,
        }}>
        <Card
          style={{
            paddingHorizontal: 20,
            paddingVertical: 20,
          }}>
          {dataInfo.map((data, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                borderBottomColor: '#e0e0e0',
                borderBottomWidth: 1,
                width: '100%',
                height: 50,
                alignItems: 'center',
              }}>
              <View>
                <Text style={{fontSize: 15, color: 'black'}}>
                  {strings[data.settingName]}
                </Text>
              </View>
              <Switch
                style={{flex: 1}}
                trackColor={{false: 'grey', true: '#967BB655'}}
                thumbColor={data.settingState ? '#967BB6' : 'white'}
                onValueChange={() => toggleSwitch(index, data.settingState)}
                value={data.settingState}
              />
            </View>
          ))}
          {otherinfo.map((data, index) => (
            <TouchableOpacity key={index} onPress={() => otherSetting(data)}>
              <View
                style={{
                  flexDirection: 'row',
                  borderBottomWidth: 1,
                  borderColor: '#e0e0e0',
                  width: '100%',
                  height: 50,
                  marginBottom: 5,
                  alignItems: 'center',
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                }}>
                <Text style={{fontSize: 15, color: 'black'}}>
                  {strings[data.settingName]}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </Card>
      </View>
      <Modal
        style={{
          paddingHorizontal: 30,
        }}
        visible={languageSettingVisible}
        onDismiss={hideLanguageModal}
        contentContainerStyle={containerStyle}>
        <View style={styles.radioButton}>
          <RadioButton
            value="second"
            status={checked === 'en' ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked('en');
            }}
          />
          <Text>English</Text>
        </View>

        <View style={styles.radioButton}>
          <RadioButton
            value="fr"
            status={checked === 'fr' ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked('fr');
            }}
          />
          <Text>Franch</Text>
        </View>

        <View style={styles.radioButton}>
          <RadioButton
            value="gm"
            status={checked === 'gm' ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked('gm');
            }}
          />
          <Text>Germay</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            gap: 5,
          }}>
          <TouchableOpacity
            style={styles.okTouchableOpacity}
            onPress={async () => {
              handleLanguageChange(checked);
              hideLanguageModal();
              await SettingModel.update(1, checked);
            }}>
            <Text>OK</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelTouchableOpacity}
            onPress={() => hideLanguageModal()}>
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  okTouchableOpacity: {},
  cancelTouchableOpacity: {},
});
