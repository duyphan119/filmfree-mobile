import { LatestFilm, filmApi } from "@/api/filmApi";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

const LatestFilmCarosel = () => {
  const [films, setfilms] = useState<LatestFilm[]>([]);

  useEffect(() => {
    const fetchLatestFilms = async () => {
      const items = await filmApi.getLatest();

      setfilms(items);
    };

    fetchLatestFilms();
  }, []);

  const width = Dimensions.get("window").width;
  return (
    <View style={{ flex: 1 }}>
      <Carousel
        loop
        width={width}
        height={(width * 9) / 16}
        autoPlay={true}
        data={films}
        scrollAnimationDuration={3456}
        // onSnapToItem={(index) => console.log("current index:", index)}
        renderItem={({ item }) => (
          <View style={styles.imageWrapper}>
            <Image
              style={styles.image}
              source={item.thumb_url}
              contentFit="cover"
              transition={1000}
            />
          </View>
        )}
      />
    </View>
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
