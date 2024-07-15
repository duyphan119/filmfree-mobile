import { StyleSheet } from "react-native";

import Header from "@/components/Header";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import FilmList from "@/components/film/FilmList";
import LatestFilmCarosel from "@/components/film/LatestFilmCarosel";
import { FilmTypeList } from "@/constants/FilmTypeList";

export default function HomeScreen() {
  return (
    <ParallaxScrollView header={<Header />}>
      <LatestFilmCarosel />
      <ThemedView style={{ gap: 32 }}>
        {FilmTypeList.map(({ name, slug }) => (
          <FilmList key={slug} title={name} slug={slug} />
        ))}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({});
