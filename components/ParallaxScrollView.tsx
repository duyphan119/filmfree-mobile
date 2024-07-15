import { Colors } from "@/constants/Colors";
import type { PropsWithChildren, ReactElement } from "react";
import { StyleSheet } from "react-native";
import Animated, { useAnimatedRef } from "react-native-reanimated";

import { SafeAreaView } from "react-native-safe-area-context";

type Props = PropsWithChildren<{
  header?: ReactElement;
}>;

export default function ParallaxScrollView({ children, header }: Props) {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  return (
    <SafeAreaView style={styles.container}>
      {header}
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        {children}
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: Colors.bg,
  },
});
