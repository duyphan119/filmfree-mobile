import { StyleSheet, Text } from "react-native";

import Header from "@/components/Header";
import ParallaxScrollView from "@/components/ParallaxScrollView";

export default function ExploreScreen() {
  return (
    <ParallaxScrollView header={<Header />}>
      <Text>Explore</Text>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({});
