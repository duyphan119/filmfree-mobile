import { StyleSheet, Text } from "react-native";

import Header from "@/components/Header";
import ParallaxScrollView from "@/components/ParallaxScrollView";

export default function MenuScreen() {
  return (
    <ParallaxScrollView header={<Header />}>
      <Text>Menu</Text>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({});
