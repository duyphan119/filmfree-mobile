import { Colors } from "@/constants/Colors";
import { useModal } from "@/hooks/useModal";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";

const SearchIcon = () => {
  const { onShow } = useModal();

  const handlePress = () => {
    onShow("search");
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Ionicons name="search" style={styles.search} />
    </TouchableOpacity>
  );
};

export default SearchIcon;

const styles = StyleSheet.create({
  search: {
    color: Colors.text,
    fontSize: 24,
  },
});
