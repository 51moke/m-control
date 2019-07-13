import React, {
  Component,
} from 'react';

import {
  StyleSheet,
  Text,
  Image,
  View,
  findNodeHandle,
  UIManager,
  Dimensions
} from 'react-native';
import { Tcp } from 'NativeModules';

let onObj = {
  emitError(msg) {
    alert('通信异常', msg);
  },
  timeout: {
    motion: null,
    direction: null,
  }
}


let onData = {
  forward: {
    start() {
      console.log('前进开始')
      clearInterval(onObj.timeout.motion)
      Tcp.emit("w", onObj.emitError);
      onObj.timeout.motion = setInterval(() => {
        console.log("w");
        Tcp.emit("w", onObj.emitError);
      }, 120);
    },
    end() {
      console.log('前进结束')
      clearInterval(onObj.timeout.motion)
    }
  },
  back: {
    start() {
      console.log('后退开始')
      clearInterval(onObj.timeout.motion)
      Tcp.emit("s", onObj.emitError);
      onObj.timeout.motion = setInterval(() => {
        console.log("s");
        Tcp.emit("s", onObj.emitError);
      }, 120);
    },
    end() {
      console.log('后退结束')
      clearInterval(onObj.timeout.motion)
    }
  },
  left: {
    start() {
      console.log('左拐开始')
      clearInterval(onObj.timeout.direction)
      Tcp.emit("a", onObj.emitError);
      onObj.timeout.direction = setInterval(() => {
        console.log("a");
        Tcp.emit("a", onObj.emitError);
      }, 220);
    },
    end() {
      console.log('左拐结束')
      clearInterval(onObj.timeout.direction)
    }
  },
  right: {
    start() {
      console.log('右拐开始')
      clearInterval(onObj.timeout.direction)
      Tcp.emit("d", onObj.emitError);
      onObj.timeout.direction = setInterval(() => {
        console.log("d");
        Tcp.emit("d", onObj.emitError);
      }, 220);
    },
    end() {
      console.log('右拐结束')
      clearInterval(onObj.timeout.direction)
    }
  },
  level_1: {
    start() {
      console.log('一档开始')
      Tcp.emit("1", onObj.emitError);
    },
    end() {
      console.log('一档结束')
    }
  },
  level_2: {
    start() {
      console.log('二档开始')
      Tcp.emit("2", onObj.emitError);
    },
    end() {
      console.log('二档结束')
    }
  },
  level_3: {
    start() {
      console.log('三档开始')
      Tcp.emit("3", onObj.emitError);
    },
    end() {
      console.log('三档结束')
    }
  },
  level_4: {
    start() {
      console.log('四档开始')
      Tcp.emit("4", onObj.emitError);
    },
    end() {
      console.log('四档结束')
    }
  },
  level_5: {
    start() {
      console.log('五档开始')
      Tcp.emit("5", onObj.emitError);
    },
    end() {
      console.log('五档结束')
    }
  },
}
let onEndTmp = {}

//事件测试
export default class onCar extends Component {

  setOn(e) {
    for (let i in onData) {
      let c = onData[i];
      const handle = findNodeHandle(this.refs[i])
      UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
        if (e.pageX >= pageX && e.pageY >= pageY && e.pageX <= (pageX + width) && e.pageY <= (pageY + height)) {
          c.start();
          onEndTmp[e.identifier] = c.end;
        }
      })
    }
  }

  onEnd(e) {
    let end = onEndTmp[e.identifier];
    if (end) {
      end();
      delete onEndTmp[e.identifier];
    }
  }

  render() {
    return (
      <View
        style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }}
        onTouchStart={(e) => {
          this.setOn(e.nativeEvent);
        }}
        onTouchEnd={(e) => {
          this.onEnd(e.nativeEvent)
        }}
      >
        <View>
          <Image style={[styles.bgImg]} source={
            require('./img/bg.jpeg')
          } >
          </Image>
        </View>
        <View
          style={{ position: "absolute", bottom: 22, left: 94 }}
        >
          <View
            ref="forward"
            style={[styles.borderR]}
          ><Text>前进</Text></View>
          <View
            ref="back"
            style={[styles.borderR, { marginTop: 35, }]}
          ><Text>后退</Text></View>
        </View>

        <View
          style={{ position: "absolute", bottom: 35, right: "40%", flexDirection: 'row' }}
        >
          <View style={{ flexDirection: 'column' ,marginRight:10}}>
            <View
              ref="level_1"
              style={[styles.gearText]}
            ><Text style={styles.gearFont}>1{/* 一档 */}</Text></View>
            <View
              ref="level_2"
              style={[styles.gearText, { marginTop: 10, }]}
            ><Text style={styles.gearFont}>2{/* 二档 */}</Text></View>
          </View>
          <View style={{ flexDirection: 'column' }}>
            <View
              ref="level_3"
              style={[styles.gearText,{}]}
            ><Text style={styles.gearFont}>3{/* 三档 */}</Text></View>
            <View
              ref="level_4"
              style={[styles.gearText, { marginTop: 5}]}
            ><Text style={styles.gearFont}>4{/* 四档 */}</Text></View>
            <View
              ref="level_5"
              style={[styles.gearText, { marginTop: 5, }]}
            ><Text style={styles.gearFont}>5{/* 五档 */}</Text></View>
          </View>
        </View>
        <View
          style={{ position: "absolute", bottom: 61, right: 98 }}
        >
          <View style={{ width: 200, flex: 1, flexDirection: "row" }}>
            <View
              ref="left"
              style={[styles.borderR]}
            ><Text>向左</Text></View>
            <View
              ref="right"
              style={[styles.borderR, { marginLeft: 50 }]}
            ><Text>向右</Text></View>
          </View>
        </View>
      </View>
    );
  }

};
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  borderR: {
    width: 78,
    height: 78,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333',
    flex: 1,
    flexDirection: 'row',
    borderRadius: 100,
    opacity: 0
  },
  gearText: {
    fontSize: 20,
    color: '#F00',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    backgroundColor: "#333",
    borderRadius: 100,
    opacity: 0.5
  },
  gearFont: {
    fontSize: 20,
    color: '#FFF'
  },
  bgImg: {
    width: width,
    height: height
  }
})