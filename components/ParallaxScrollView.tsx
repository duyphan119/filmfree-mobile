import type { PropsWithChildren, ReactElement } from "react";
import { StyleSheet } from "react-native";
import Animated, { useAnimatedRef } from "react-native-reanimated";

import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";

const HEADER_HEIGHT = 250;

type Props = PropsWithChildren<{
  header?: ReactElement;
}>;

export default function ParallaxScrollView({ children, header }: Props) {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  return (
    <SafeAreaView style={styles.container}>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        {header}
        <ThemedView>{children}</ThemedView>
      </Animated.ScrollView>
      {/* {header}
      {children} */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
});
