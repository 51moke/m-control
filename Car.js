import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { Tcp } from 'NativeModules';
import Orientation from 'react-native-orientation';

export default class Car extends Component {

  constructor(props) {
    super(props)
    this.emitError = this.emitError.bind(this);
    this.timeout = {
      motion: null,
      direction: null
    }
  }

  componentWillMount() {
    Orientation.lockToLandscape();  //强行横屏
  }

  emitError(msg) {
    alert('通信异常', msg);
  }

  render() {
    return (
      <View>
        <View style={{ ...styles.wh }}>
          <TouchableHighlight
            underlayColor="rgba(34, 26, 38, 0.1)"
            onPressIn={() => {
              console.log("onPressIn");
              clearInterval(this.timeout.motion)
              Tcp.emit("w", this.emitError);
              this.timeout.motion = setInterval(() => {
                console.log("w");
                Tcp.emit("w", this.emitError);
              }, 100);
            }}
            onPressOut={() => {
              console.log("onPressOut")
              clearInterval(this.timeout.motion);
            }}
          >
            <Text>前</Text>
          </TouchableHighlight>
        </View>
        <View style={{ ...styles.wh }}>
          <TouchableHighlight
            underlayColor="rgba(34, 26, 38, 0.1)"
            onPressIn={() => {
              console.log("onPressIn");
              clearInterval(this.timeout.motion)
              Tcp.emit("s", this.emitError);
              setInterval(() => {
                Tcp.emit("s", this.emitError);
              }, 100);
            }}
            onPressOut={() => {
              console.log("onPressOut")
              clearInterval(this.timeout.motion);
            }}
          >
            <Text>后</Text>
          </TouchableHighlight>
        </View>
        <View style={{ ...styles.wh }}>
          <TouchableHighlight
            underlayColor="rgba(34, 26, 38, 0.1)"
            onPressIn={() => {
              console.log("onPressIn");
              clearInterval(this.timeout.direction)
              Tcp.emit("a", this.emitError);
              this.timeout.direction = setInterval(() => {
                Tcp.emit("a", this.emitError);
              }, 100);
            }}
            onPressOut={() => {
              console.log("onPressOut")
              clearInterval(this.timeout.direction);
            }}
          >
            <Text>左</Text>
          </TouchableHighlight>
        </View>
        <View style={{ ...styles.wh }}>
          <TouchableHighlight
            underlayColor="rgba(34, 26, 38, 0.1)"
            onPressIn={() => {
              console.log("onPressIn");
              clearInterval(this.timeout.direction)
              Tcp.emit("d", this.emitError);
              this.timeout.direction = setInterval(() => {
                Tcp.emit("d", this.emitError);
              }, 100);
            }}
            onPressOut={() => {
              console.log("onPressOut")
              clearInterval(this.timeout.direction);
            }}
          >
            <Text>右</Text>
          </TouchableHighlight>
        </View>

        <View style={{ ...styles.wh }}>
          <Text

            onPress={() => {
              Tcp.emit("1", this.emitError);
            }}
          >一档</Text>
        </View>
        <View style={{ ...styles.wh }}>
          <Text

            onPress={() => {
              Tcp.emit("2", this.emitError);
            }}
          >二档</Text>
        </View>

        <View style={{ ...styles.wh }}>
          <Text

            onPress={() => {
              Tcp.emit("3", this.emitError);
            }}
          >三档</Text>
        </View>
        {/* 
        <View style={{...styles.wh}}>
          <Text
            
            onPress={() => {
              Tcp.emit("4", this.emitError);
            }}
          >四档</Text>
        </View>

        <View style={{...styles.wh}}>
          <Text
            
            onPress={() => {
              Tcp.emit("5", this.emitError);
            }}
          >五档</Text>
        </View> */}


      </View>
    );
  }
}

const styles = StyleSheet.create({
  wh: {
    width: 50,
    height: 50,
  }
});
