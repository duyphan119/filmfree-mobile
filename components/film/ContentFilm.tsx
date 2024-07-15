import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type ContentFilmProps = {
  content?: string;
};

function find30thWhitespacePosition(str: string): number {
  let count = 0;

  for (let i = 0; i < str.length; i++) {
    if (str[i] === " ") {
      count++;
      if (count === 30) {
        return i;
      }
    }
  }

  return -1;
}

function decodeHtmlEntities(str: string): string {
  const entityMap: { [key: string]: string } = {
    "&quot;": '"',
    "&nbsp;": " ",
  };

  return str.replace(/&quot;|&nbsp;/g, (match: string) => {
    return entityMap[match];
  });
}

const ContentFilm = ({ content }: ContentFilmProps) => {
  if (!content) return null;

  const text = decodeHtmlEntities(content);

  const spaceIndex = find30thWhitespacePosition(text);

  const [isLongText, setIsLongText] = useState<boolean>(spaceIndex !== -1);

  return (
    <View style={{ gap: 0 }}>
      <Text style={styles.content}>
        {isLongText ? text.substring(0, spaceIndex) : text}
        {isLongText && "..."}
      </Text>
      {isLongText ? (
        <TouchableOpacity
          style={styles.longTextAction}
          onPress={() => setIsLongText(false)}
        >
          <Text style={styles.longTextActionTitle}>Xem thêm</Text>
          <Ionicons name="chevron-down" style={styles.longTextActionIcon} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.longTextAction}
          onPress={() => setIsLongText(true)}
        >
          <Text style={styles.longTextActionTitle}>Thu gọn</Text>
          <Ionicons name="chevron-up" style={styles.longTextActionIcon} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ContentFilm;

const styles = StyleSheet.create({
  content: {
    color: Colors.text,
  },
  longTextAction: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  longTextActionTitle: {
    color: Colors.lightpink,
  },
  longTextActionIcon: {
    color: Colors.lightpink,
  },
});
