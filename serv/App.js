/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import type {Node} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import ReactNativeBlobUtil from 'react-native-blob-util';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  const photoUri = 'https://cdnimg.rg.ru/img/content/170/30/99/654_d_850.jpg';
  const UPLOAD_FOTO_ENDPOINT =
    'https://localhost/api';
  const TOKEN =
    'Bearer ';

  const onClickUpload = () => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();

    formData.append('image', {
      uri: photoUri,
      type: 'image/jpeg',
      name: 'photo.jpg',
    });
    formData.append('text', 'abc');

    formData.append('image1', {
      type: 'image/png',
      name: 'photo.png',
      data: 'abc'
    });

    // eslint-disable-next-line no-undef
    const blob = new Blob(['abc'], {
      type: 'image/jpeg',
      name: 'photo.jpg',
      uri: photoUri,
    });

    formData.append('ttt', blob);

    console.log(formData);

    xhr.open('POST', UPLOAD_FOTO_ENDPOINT);
    xhr.setRequestHeader('Authorization', TOKEN);
    xhr.send(formData);
  };

  const onClickUpload1 = async () => {
    const formData = new FormData();

    formData.append('image', {
      uri: photoUri,
      type: 'image/jpeg',
      name: 'photo.jpg',
    });
    console.log(formData);

    await fetch(UPLOAD_FOTO_ENDPOINT, {
      method: 'post',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data,octet-stream',
        Authorization: `Bearer ${TOKEN}`,
        Accept: 'application/json',
      },
    });
  };

  const onClickUpload2 = () => {
    const formData = new FormData();

    formData.append('image', {
      uri: photoUri,
      type: 'image/jpeg',
      name: 'photo.jpg',
    });
    console.log(formData);

    RNFetchBlob.fetch(
      'POST',
      UPLOAD_FOTO_ENDPOINT,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      },
      formData,
    ).then(r => console.log);
  };

  const onClickUpload3 = async () => {
    const formData = new FormData();

    formData.append('image', {
      uri: photoUri,
      type: 'image/jpeg',
      name: 'photo.jpg',
    });
    console.log(formData);

    await ReactNativeBlobUtil.fetch(
      'POST',
      UPLOAD_FOTO_ENDPOINT,
      {
        Authorization: `Bearer ${TOKEN}`,
      },
      formData,
    );
  };

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Button title={'UPLOAD'} onPress={onClickUpload} />
          <Button
            title={'UPLOAD1'}
            onPress={async () => {
              await onClickUpload1();
            }}
          />
          <Button title={'UPLOAD2'} onPress={onClickUpload2} />
          <Button title={'UPLOAD3'} onPress={onClickUpload3} />
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
