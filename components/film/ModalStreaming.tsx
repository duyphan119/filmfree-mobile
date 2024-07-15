import { Episode, Movie, filmApi } from "@/api/filmApi";
import { Padding } from "@/constants/Padding";
import { useModal } from "@/hooks/useModal";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ParallaxScrollView from "../ParallaxScrollView";
import VideoPlayer from "./VideoPlayer";

const ModalStreaming = () => {
  const { name, visible, onHide, data } = useModal();
  const [state, setState] = useState<{
    episodes: Episode[];
    movie: Movie | null;
  }>({
    episodes: [],
    movie: null,
  });

  useEffect(() => {
    if (visible && data && data.movie) {
      const { slug } = data.movie;

      const fetchFilmDetails = async () => {
        const response = await filmApi.getDetails(slug);
        setState(response);
      };
      fetchFilmDetails();
    } else {
      setState({
        movie: null,
        episodes: [],
      });
    }
  }, [visible]);

  if (!visible || name !== "streaming") return <></>;

  const movieName = state?.movie?.name || data?.movie?.name;

  const currentEpisode = state.episodes.length > 0 ? state.episodes[0] : null;

  return (
    <Modal
      visible={visible}
      onRequestClose={onHide}
      animationType="none"
      presentationStyle="fullScreen"
    >
      <View
        style={{
          padding: Padding.header,
          backgroundColor: "#333",
        }}
      >
        <TouchableOpacity onPress={onHide}>
          <MaterialIcons
            name="arrow-back"
            style={{ color: "white" }}
            size={24}
          />
        </TouchableOpacity>
      </View>
      <VideoPlayer
        uri={state.episodes?.[0]?.server_data?.[0].link_m3u8 || ""}
      />
      <View
        style={{
          backgroundColor: "#333",
          flex: 1,
        }}
      >
        <ParallaxScrollView>
          <Text
            style={{
              padding: Padding.header,
              fontSize: 20,
              fontWeight: 500,
              backgroundColor: "#333",
              color: "white",
            }}
          >
            {movieName}
          </Text>
          <View
            style={{
              backgroundColor: "#333",
              flex: 1,
              padding: Padding.header,
              rowGap: Padding.header,
            }}
          >
            <Text
              style={{
                color: "white",
              }}
            >
              Diễn viên: {state?.movie?.actor?.join(", ")}
            </Text>
            <Text
              style={{
                color: "white",
              }}
            >
              Đạo diễn: {state?.movie?.director?.join(", ")}
            </Text>
            <Text
              style={{
                color: "white",
              }}
            >
              Thể loại:{" "}
              {state?.movie?.category?.map((item) => item.name).join(", ")}
            </Text>
            <Text
              style={{
                color: "white",
              }}
            >
              Quốc gia:{" "}
              {state?.movie?.country?.map((item) => item.name).join(", ")}
            </Text>
          </View>
          {currentEpisode && currentEpisode.server_data?.length > 1 && (
            <View
              style={{
                backgroundColor: "#333",
              }}
            >
              <Text
                style={{
                  padding: Padding.header,
                  color: "white",
                }}
              >
                Danh sách tập
              </Text>
              <View
                style={{
                  backgroundColor: "#333",
                  rowGap: 2,
                }}
              >
                {currentEpisode.server_data.map(({ name }, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {}}
                    style={{
                      height: 96,
                      flexDirection: "row",
                      columnGap: 12,
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={state?.movie?.thumb_url || data?.movie?.thumb_url}
                      style={{
                        height: "100%",
                        aspectRatio: 16 / 9,
                        objectFit: "cover",
                      }}
                    />
                    <Text style={{ color: "white" }}>{name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </ParallaxScrollView>
      </View>
    </Modal>
  );
};

export default ModalStreaming;

const styles = StyleSheet.create({});
