/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, DeviceEventEmitter} from 'react-native';
import { SensorManager, Tcp } from 'NativeModules';
import Orientation from 'react-native-orientation';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

//陀螺仪
DeviceEventEmitter.addListener('Gyroscope', function (data) {

  //console.log('data',data);
  /**
  * data.x
  * data.y
  * data.z
  **/
});
SensorManager.startGyroscope(100);
//SensorManager.stopGyroscope();

DeviceEventEmitter.addListener('onWifi',(data)=>{
  console.log('监听到wifi信息',data);
})

type Props = {};
export default class App extends Component<Props> {

  componentWillMount() {
    Orientation.lockToLandscape();  //强行横屏
    //Orientation.lockToPortrait(); //强行竖屏
  }

  render() {
    Tcp.emit("测试",(msg)=>{
      alert("异常"+msg);
    });
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
