import { Colors } from "@/constants/Colors";
import { Link } from "expo-router";
import { StyleSheet, useColorScheme } from "react-native";

import { ThemedView } from "./ThemedView";
import { Padding } from "@/constants/Padding";

const Header = () => {
  const colorScheme = useColorScheme() ?? "light";
  return (
    <ThemedView
      style={[
        styles.header,
        {
          backgroundColor: Colors[colorScheme].headerBg,
        },
      ]}
    >
      <Link
        href="/"
        style={[
          styles.logo,
          {
            color: Colors[colorScheme].text,
          },
        ]}
      >
        FILMFREE
      </Link>
    </ThemedView>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    padding: Padding.header,
  },
  logo: {
    fontWeight: "500",
    fontSize: 24,
  },
});
