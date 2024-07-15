import { Episode, Movie, filmApi } from "@/api/filmApi";
import { Padding } from "@/constants/Padding";
import { useModal } from "@/hooks/useModal";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ParallaxScrollView from "../ParallaxScrollView";
import ContentFilm from "./ContentFilm";
import VideoPlayer from "./VideoPlayer";
import { Colors } from "@/constants/Colors";
import ArrowCloseModal from "../ArrowCloseModal";

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
    <Modal visible={visible} onRequestClose={onHide} animationType="none">
      <ArrowCloseModal />
      <VideoPlayer
        uri={state.episodes?.[0]?.server_data?.[0].link_m3u8 || ""}
      />
      <View style={styles.filmWrapper}>
        <ParallaxScrollView>
          <Text style={styles.filmName}>{movieName}</Text>
          {state.movie && (
            <View style={styles.filmInfoList}>
              <Text style={styles.filmInfo}>
                Diễn viên: {state.movie?.actor?.join(", ")}
              </Text>
              <Text style={styles.filmInfo}>
                Đạo diễn: {state.movie?.director?.join(", ")}
              </Text>
              <Text style={styles.filmInfo}>
                Thể loại:{" "}
                {state.movie?.category?.map((item) => item.name).join(", ")}
              </Text>
              <Text style={styles.filmInfo}>
                Quốc gia:{" "}
                {state.movie?.country?.map((item) => item.name).join(", ")}
              </Text>
              <ContentFilm content={state.movie?.content} />
            </View>
          )}
          {currentEpisode && currentEpisode.server_data?.length > 1 && (
            <View style={styles.episodeListWrapper}>
              <Text style={styles.episodeListText}>Danh sách tập</Text>
              <View style={styles.episodeWrapper}>
                {currentEpisode.server_data.map(({ name }, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {}}
                    style={styles.episode}
                  >
                    <Image
                      source={state.movie?.thumb_url || data?.movie?.thumb_url}
                      style={styles.episodeImage}
                    />
                    <Text style={styles.episodeName}>{name}</Text>
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

const styles = StyleSheet.create({
  filmWrapper: {
    backgroundColor: Colors.bg,
    flex: 1,
  },
  filmName: {
    padding: Padding.header,
    fontSize: 20,
    fontWeight: "500",
    backgroundColor: Colors.bg,
    color: Colors.white,
  },
  filmInfoList: {
    backgroundColor: Colors.bg,
    flex: 1,
    padding: Padding.header,
    rowGap: Padding.header,
  },
  filmInfo: {
    color: Colors.white,
  },
  episodeListWrapper: {
    backgroundColor: Colors.bg,
  },
  episodeListText: {
    padding: Padding.header,
    color: Colors.white,
  },
  episodeWrapper: {
    backgroundColor: Colors.bg,
    rowGap: 2,
  },
  episode: {
    height: 96,
    flexDirection: "row",
    columnGap: 12,
    alignItems: "center",
  },
  episodeImage: {
    height: "100%",
    aspectRatio: 16 / 9,
    objectFit: "cover",
  },
  episodeName: {
    color: Colors.white,
  },
});
