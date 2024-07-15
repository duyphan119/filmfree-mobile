import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useModal } from "@/hooks/useModal";
import ArrowCloseModal from "../ArrowCloseModal";
import { Colors } from "@/constants/Colors";
import { FilmListResponse, filmApi } from "@/api/filmApi";
import ParallaxScrollView from "../ParallaxScrollView";
import { Image } from "expo-image";
import { Padding } from "@/constants/Padding";

const ModalSearch = () => {
  const { name, visible, onHide, onShow } = useModal();

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>("");
  const [data, setData] = useState<FilmListResponse>();

  const handleSearch = async () => {
    if (!keyword) return;

    const response = await filmApi.search(keyword);

    if (response) setData(response);
    setIsSubmitted(true);
  };

  if (!visible || name !== "search") return <></>;

  return (
    <Modal visible={visible} onRequestClose={onHide} animationType="none">
      <ArrowCloseModal
        content={
          <TextInput
            style={styles.input}
            placeholder="Nhập từ khóa cần tìm"
            placeholderTextColor={Colors.border}
            inputMode="search"
            onChangeText={(text) => setKeyword(text)}
            value={keyword}
            onSubmitEditing={handleSearch}
          />
        }
      />
      <ParallaxScrollView>
        <View style={styles.content}>
          {keyword !== "" && isSubmitted && (
            <>
              <Text style={styles.resultCount}>
                Tìm thấy {data?.params?.pagination?.totalItems} kết quả
              </Text>
              <View style={styles.filmList}>
                {data?.items.map((movie) => (
                  <TouchableOpacity
                    key={movie._id}
                    onPress={() => onShow("streaming", { movie })}
                    style={styles.film}
                  >
                    <Image
                      source={`${data.APP_DOMAIN_CDN_IMAGE}/${movie.poster_url}`}
                      style={styles.filmImage}
                    />
                    <Text style={styles.filmName}>{movie.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}
        </View>
      </ParallaxScrollView>
    </Modal>
  );
};

export default ModalSearch;

const styles = StyleSheet.create({
  input: {
    borderRadius: 8,
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.border,
    color: Colors.text,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  content: {
    backgroundColor: Colors.bg,
    flex: 1,
  },
  resultCount: {
    color: Colors.text,
    padding: Padding.header,
  },
  filmList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  film: {
    width: (Dimensions.get("screen").width - 16) / 3,
  },
  filmImage: {
    width: "100%",
    aspectRatio: 3 / 4,
  },
  filmName: {
    color: Colors.text,
  },
});
