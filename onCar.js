import React, {
  Component,
} from 'react';

import {
  Text,
  View,
  findNodeHandle,
  UIManager
} from 'react-native';
import { Tcp,Infrared } from 'NativeModules';

// export const {
//   hasIrEmitter,
//   getCarrierFrequencies,
//   transmit,
//   transmitProntoCode
// } = RNIRManagerModule;
Infrared.hasIrEmitter()
.then((res)=>{
  console.log('手机是事支持红外线：',res)
})


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
  demo: {
    start() {
      console.log('测试开始')
      const SAMSUNG_TURN_ON_PRONTO_CODE = `0000 006d 0022 0003 00a9 00a8 0015 003f 0015 003f 0015 003f 0015 0015 0015 0015 0015 0015 0015 0015 0015 0015 0015 003f 0015 003f 0015 003f 0015 0015 0015 0015 0015 0015 0015 0015 0015 0015 0015 0015 0015 003f 0015 0015 0015 0015 0015 0015 0015 0015 0015 0015 0015 0015 0015 0040 0015 0015 0015 003f 0015 003f 0015 003f 0015 003f 0015 003f 0015 003f 0015 0702 00a9 00a8 0015 0015 0015 0e6e`;
      //const d = '1901 4453 625 1614 625 1588 625 1614 625 442 625 442 625 468 625 442 625 494 572 1614 625 1588 625 1614 625 494 572 442 651 442 625 442 625 442 625 1614 625 1588 651 1588 625 442 625 494 598 442 625 442 625 520 572 442 625 442 625 442 651 1588 625 1614 625 1588 625 1614 625 1588 625 48958'
      //const d = '2328 1194 280 230 280 230 280 230 280 230 280 230 280 230 280 67c 280 230 280 230 280 230 280 230 280 230 280 230 280 230 280 230 280 230 280 230 280 230 280 230 280 230 280 230 280 67c 280 230 280 230 280 230 280 230 280 230 280 230 280 67c 280 230 280 67c 280 230 280 230 280 67c 280 230 280 4e20 280 67c 280 230 280 230 280 230 280 67c 280 230 280 230 280 230 280 230 280 230 280 230 280 230 280 230 280 67c 280 230 280 230 280 230 280 230 280 230 280 230 280 230 280 230 280 230 280 230 280 230 280 230 280 230 280 230 280 67c 280 230 280 67c 280 67c 280 9c40 2328 1194 280 230 280 230 280 230 280 230 280 230 280 230 280 67c 280 230 280 230 280 230 280 230 280 230 280 230 280 230 280 230 280 230 280 230 280 230 280 230 280 230 280 230 280 67c 280 230 280 230 280 230 280 230 280 230 280 230 280 67c 280 67c 280 67c 280 230 280 230 280 67c 280 230 280 4e20 280 230 280 230 280 230 280 230 280 230 280 230 280 230 280 230 280 230 280 230 280 230 280 230 280 230 280 230 280 230 280 230 280 230 280 230 280 230 280 230 280 230 280 230 280 230 280 230 280 230 280 230 280 230 280 230 280 67c 280 67c 280 230 280 230 280'
      Infrared.transmitProntoCode(SAMSUNG_TURN_ON_PRONTO_CODE)
      .then(console.log)
      .catch(console.log);

      Infrared.getCarrierFrequencies()
      .then(console.log)
      .catch(console.log);
    },
    end() {
      console.log('测试结束')
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
        style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0, backgroundColor: "#00ff00" }}
        onTouchStart={(e) => {
          this.setOn(e.nativeEvent);
        }}
        onTouchEnd={(e) => {
          this.onEnd(e.nativeEvent)
        }}
      >
        <View
          style={{ position: "absolute", bottom: 10, left: 20 }}
        >
          <View
            ref="forward"
            style={{ width: 150, height: 150, backgroundColor: "#ffff00" }}
          ><Text>前进</Text></View>
          <View
            ref="back"
            style={{ width: 150, height: 150, marginTop: 10, backgroundColor: "#ffff00" }}
          ><Text>后退</Text></View>
        </View>

        <View
          style={{ position: "absolute", top: 50, right: "50%" }}
        >
          <View
            ref="level_1"
            style={{ width: 150, height: 50, backgroundColor: "#ffff00" }}
          ><Text>一档</Text></View>
          <View
            ref="level_2"
            style={{ width: 150, height: 50, marginTop: 10, backgroundColor: "#ffff00" }}
          ><Text>二档</Text></View>
          <View
            ref="level_3"
            style={{ width: 150, height: 50, marginTop: 10, backgroundColor: "#ffff00" }}
          ><Text>三档</Text></View>
          <View
            ref="level_4"
            style={{ width: 150, height: 50, marginTop: 10, backgroundColor: "#ffff00" }}
          ><Text>四档</Text></View>
          <View
            ref="level_5"
            style={{ width: 150, height: 50, marginTop: 10, backgroundColor: "#ffff00" }}
          ><Text>五档</Text></View>
          <View
            ref="demo"
            style={{ width: 150, height: 50, marginTop: 10, backgroundColor: "#ffff00" }}
          ><Text>测试</Text></View>
        </View>

        <View
          style={{ position: "absolute", bottom: 10, right: 10 }}
        >
          <View style={{ width: 310, flex: 1, flexDirection: "row" }}>
            <View
              ref="left"
              style={{ width: 150, height: 150, backgroundColor: "#ffff00", flex: 1, flexDirection: "row" }}
            ><Text>向左</Text></View>
            <View
              ref="right"
              style={{ width: 150, height: 150, marginLeft: 10, backgroundColor: "#ffff00", flex: 1, flexDirection: "row" }}
            ><Text>向右</Text></View>
          </View>
        </View>
      </View>
    );
  }

};