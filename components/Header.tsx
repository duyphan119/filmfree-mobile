import { Colors } from "@/constants/Colors";
import { Padding } from "@/constants/Padding";
import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";
import SearchIcon from "./SearchIcon";

const Header = () => {
  return (
    <View style={styles.header}>
      <Link href="/" style={styles.logo}>
        FILMFREE
      </Link>
      <SearchIcon />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    padding: Padding.header,
    backgroundColor: Colors.bg,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    fontWeight: "500",
    fontSize: 24,
    color: Colors.text,
  },
});
