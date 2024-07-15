import { StyleSheet, Text } from "react-native";

import Header from "@/components/Header";
import ParallaxScrollView from "@/components/ParallaxScrollView";

export default function DownloadScreen() {
  return (
    <ParallaxScrollView header={<Header />}>
      <Text>Download</Text>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({});
