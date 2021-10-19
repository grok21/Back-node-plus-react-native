import React from 'react';
import { View, Text, Image, Button, PermissionsAndroid } from 'react-native';
import * as ImagePicker from "react-native-image-picker"
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const createFormData = (photo, body) => {
  const data = new FormData();

  data.append('photo', {
    name: photo.fileName,
    type: photo.type,
    uri:
      Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', ''),
  });

  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });

  return data;
};

export default class App extends React.Component {
  state = {
    photo: null,
  };

  handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.uri) {
        this.setState({ photo: response });
      }
    });
  };

  handleMakePhoto = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'App Camera Permission',
        message: 'App needs access to your camera',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    console.log(granted);
    const options = {
      maxWidth: 240,
      maxHeight: 240,
      noData: true,
    };
    ImagePicker.launchCamera(options, res => {
      this.setState({ photo: res.assets[0] });
      console.log(res);
    })
  }

  handleUploadPhoto = () => {
    console.log('\n\nYA  V UPLOAD\n\n');
    // fetch('http://10.0.2.2:3000/api/upload', {
    fetch('https://localhost/api', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer '
      },
      body: createFormData(this.state.photo, {}),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log('upload succes', response);
        alert('Upload success!');
        this.setState({ photo: null });
      })
      .catch((error) => {
        console.log('upload error', error);
        alert('Upload failed!');
      });
  };

  render() {
    const { photo } = this.state
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {photo && (
          <React.Fragment>
            <Image
              source={{ uri: photo.uri }}
              style={{ width: 300, height: 300 }}
            />
            <Button title="Upload" onPress={this.handleUploadPhoto} />
          </React.Fragment>
        )}
        <Button title="Choose Photo" onPress={this.handleChoosePhoto} />
        <Button title="Make Photo" onPress={this.handleMakePhoto} />
      </View>
    )
  }
}