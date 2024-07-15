import { Colors } from "@/constants/Colors";
import { Padding } from "@/constants/Padding";
import { useModal } from "@/hooks/useModal";
import { MaterialIcons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type ArrowCloseModalProps = {
  content?: React.ReactElement;
};

const ArrowCloseModal = ({ content }: ArrowCloseModalProps) => {
  const { onHide } = useModal();
  return (
    <View style={styles.arrowBack}>
      <TouchableOpacity onPress={onHide}>
        <MaterialIcons name="arrow-back" style={{ color: "white" }} size={24} />
      </TouchableOpacity>
      {content}
    </View>
  );
};

export default ArrowCloseModal;

const styles = StyleSheet.create({
  arrowBack: {
    padding: Padding.header,
    backgroundColor: Colors.bg,
    flexDirection: "row",
    alignItems: "center",
    columnGap: 8,
  },
});
