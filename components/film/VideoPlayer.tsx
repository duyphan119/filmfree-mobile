import { ResizeMode, Video } from "expo-av";
import { useRef, useState } from "react";
import { StyleSheet } from "react-native";

type VideoPlayerProps = {
  uri: string;
};

const VideoPlayer = ({ uri }: VideoPlayerProps) => {
  // const video = useRef(null);

  return (
    <Video
      // ref={video}
      style={styles.video}
      source={{
        uri,
      }}
      useNativeControls
      resizeMode={ResizeMode.CONTAIN}
      isLooping
    />
  );
};

export default VideoPlayer;

const styles = StyleSheet.create({
  video: {
    width: "100%",
    height: 200,
    backgroundColor: "#000",
  },
});
