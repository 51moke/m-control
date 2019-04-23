import React, {
  Component,
} from 'react';

import {
  Text,
  View,
  findNodeHandle,
  UIManager
} from 'react-native';


let onData = {
  aa: {
    start() {
      console.log('按钮aa开始')
    },
    end() {
      console.log('按钮aa结束')
    }
  },
  bb: {
    start() {
      console.log('按钮bb开始')
    },
    end() {
      console.log('按钮bb结束')
    }
  }
}
let onEndTmp = {}

//事件测试
export default class onDemo extends Component {

  setOn(e) {
    //console.log(e)
    for (let i in onData) {
      let c = onData[i];
      const handle = findNodeHandle(this.refs[i])
      UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
        // console.log(i,'组件宽度width:', width);
        // console.log(i,'组件高度height:', height);
        // console.log(i,'距离屏幕的绝对位置x:', pageX);
        // console.log(i,'距离屏幕的绝对位置y:', pageY);
        // console.log(e.pageX,pageX,e.pageY,pageY,width,height)
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
        style={{ backgroundColor: "#00ff00", width: "100%", height: "100%" }}
        onTouchStart={(e) => {
          //console.log('开始',e)
          this.setOn(e.nativeEvent);
          // const handle = findNodeHandle(this.refs.aa)
          // UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
          //   console.log('a相对父视图位置x:', x);
          //   console.log('a相对父视图位置y:', y);
          //   console.log('a组件宽度width:', width);
          //   console.log('a组件高度height:', height);
          //   console.log('a距离屏幕的绝对位置x:', pageX);
          //   console.log('a距离屏幕的绝对位置y:', pageY);
          // })

          // const handle2 = findNodeHandle(this.refs.bb)
          // UIManager.measure(handle2, (x, y, width, height, pageX, pageY) => {
          //   console.log('b相对父视图位置x:', x);
          //   console.log('b相对父视图位置y:', y);
          //   console.log('b组件宽度width:', width);
          //   console.log('b组件高度height:', height);
          //   console.log('b距离屏幕的绝对位置x:', pageX);
          //   console.log('b距离屏幕的绝对位置y:', pageY);
          // })


        }}
        onTouchEnd={(e) => {
          this.onEnd(e.nativeEvent)
        }}
      >
        <View
          ref="aa"
          style={{ width: 500, height: 300, backgroundColor: "#ff00ff" }}
        ><Text>aaaaaa</Text></View>
        <View
          ref="bb"
          style={{ width: 500, height: 300, backgroundColor: "#ffff00" }}
        ><Text>bbb</Text></View>

      </View>
    );
  }

};