import React from "react";
import PropTypes from "prop-types";
import { View, StyleSheet, Text, Button } from "react-native";
import KSYVideo from "react-native-ksyvideo";
class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paused: false
    };
  }
  render() {   
    return (
      <View>
        <KSYVideo
          source={{
            uri: "rtmp://192.168.1.102/live/stream"
          }} // Can be a URL or a local file.
          ref={ref => {
            this.player = ref;
          }} // Store reference
          volume={1.0}
          muted={false}
          paused={this.state.paused} // Pauses playback entirely.
          resizeMode="cover" // Fill the whole screen at aspect ratio.*
          repeat={true} // Repeat forever.
          playInBackground={true} // Audio continues to play when app entering background.
          progressUpdateInterval={250.0}
          style={{ height: 300, width:500 }}
        />
        {/*<Text>Video streaming....</Text>*/}
        <View style={styles.buttonStyle}>
          <Button
            title={"Pause"}
            style={styles.buttonStyle}
            onPress={() => {
              this.setState({ paused: true });
            }}
            color="#841584"
          />
        </View>
        <View style={styles.buttonStyle}>
          <Button
            title={"Play"}
            onPress={() => {
              this.setState({ paused: false });
            }}
            color="green"
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  buttonStyle: {
    marginHorizontal: 20,
    marginTop: 5
  }
});
export default VideoPlayer;