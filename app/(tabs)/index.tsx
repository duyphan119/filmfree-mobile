import { StyleSheet, View } from "react-native";

import Header from "@/components/Header";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import FilmList from "@/components/film/FilmList";
import LatestFilmCarosel from "@/components/film/LatestFilmCarosel";
import { FilmTypeList } from "@/constants/FilmTypeList";

export default function HomeScreen() {
  return (
    <ParallaxScrollView header={<Header />}>
      <LatestFilmCarosel />
      <View style={styles.filmTypeList}>
        {FilmTypeList.map(({ name, slug }) => (
          <FilmList key={slug} title={name} slug={slug} />
        ))}
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  filmTypeList: {
    gap: 32,
  },
});
