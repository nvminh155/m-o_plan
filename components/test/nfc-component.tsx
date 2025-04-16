import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  TextInput,
} from 'react-native';
import NfcManager, {NfcTech} from 'react-native-nfc-manager';

// Pre-step, call this before any NFC operations

function App() {
  const [data, setData] = React.useState('hi youtute');
  const [log, setLog] = React.useState('');

  useEffect(() => {
    NfcManager.start();
  }, []);

  async function checkNfcSupport() {
    const isSupported = await NfcManager.isSupported();
    const isEnabled = await NfcManager.isEnabled();
    console.log(`NFC Supported: ${isSupported}, Enabled: ${isEnabled}`);
  }

  async function readNdef() {
    try {
      // register for the NFC tag with NDEF in it
      let resp: any = await NfcManager.requestTechnology(
        [NfcTech.IsoDep, NfcTech.Ndef, NfcTech.NfcA],
        {
          alertMessage: 'Ready to scan some NFC tags!',
        },
      ).catch(e => console.log(e));
      console.log('resp', resp);

      const tag = await NfcManager.getTag();
      console.log('Tag info:', JSON.stringify(tag, null, 2));
      console.log('Mess info:', tag?.ndefMessage[0].payload);

      let text = '';
      if (tag && tag.ndefMessage) {
        for(let i = 3; i < tag.ndefMessage[0].payload.length; i++) {
          text = text + String.fromCharCode(tag.ndefMessage[0].payload[i]);
        }
      }
      console.log('ss', decodeURIComponent(escape(text)))
      setLog(JSON.stringify(decodeURIComponent(escape(text))))

    } catch (ex) {
      console.log('Oops!', ex);
      setLog(JSON.stringify(ex))
    } finally {
      // stop the nfc scanning
      NfcManager.cancelTechnologyRequest();
    }
  }

  return (
    <View style={styles.wrapper}>
      <TextInput placeholder='text' value={data} onChangeText={e => setData(e)} />

      <TouchableOpacity >
        <Text>write a Tag</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={readNdef}>
        <Text>read a Tag</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={checkNfcSupport}>
        <Text>check nfc</Text>
      </TouchableOpacity>


      <Text>{log}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
