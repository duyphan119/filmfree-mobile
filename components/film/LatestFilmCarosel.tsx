import { LatestFilm, filmApi } from "@/api/filmApi";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import PagerView from "react-native-pager-view";

const LatestFilmCarosel = () => {
  const [films, setfilms] = useState<LatestFilm[]>([]);

  useEffect(() => {
    const fetchLatestFilms = async () => {
      const items = await filmApi.getLatest();

      setfilms(items);
    };

    fetchLatestFilms();
  }, []);

  return (
    <PagerView style={{ height: 200 }} initialPage={0}>
      {films.map((item, index) => (
        <View key={item._id} style={styles.imageWrapper}>
          <Image
            style={styles.image}
            source={item.thumb_url}
            contentFit="cover"
            transition={1000}
          />
        </View>
      ))}
    </PagerView>
  );
};

export default LatestFilmCarosel;

const styles = StyleSheet.create({
  imageWrapper: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  image: { height: "100%", width: "100%" },
});
