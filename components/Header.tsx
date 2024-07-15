import { Colors } from "@/constants/Colors";
import { Padding } from "@/constants/Padding";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const Header = () => {
  return (
    <View style={styles.header}>
      <Link href="/" style={styles.logo}>
        FILMFREE
      </Link>
      <TouchableOpacity>
        <Ionicons name="search" style={styles.search} />
      </TouchableOpacity>
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
    paddingHorizontal: 16,
  },
  logo: {
    fontWeight: "500",
    fontSize: 24,
    color: Colors.text,
  },
  search: {
    color: Colors.text,
    fontSize: 24,
  },
});
