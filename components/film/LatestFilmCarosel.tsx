import { LatestFilm, filmApi } from "@/api/filmApi";
import { ThemedView } from "@/components/ThemedView";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import PagerView from "react-native-pager-view";

// const blurhash =
//   "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

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
        <ThemedView
          style={{
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
          key={item._id}
        >
          <Image
            style={{ height: "100%", width: "100%" }}
            source={item.thumb_url}
            contentFit="cover"
            transition={1000}
            // {...(index > 0
            //   ? {
            //       placeholder: {
            //         uri: films[index - 1].thumb_url,
            //       },
            //     }
            //   : {})}
          />
          {/* <Image
            source={{ uri: item.thumb_url }}
            style={{ height: "100%", width: "100%", objectFit: "cover" }}
          /> */}
        </ThemedView>
      ))}
    </PagerView>
  );
};

export default LatestFilmCarosel;

const styles = StyleSheet.create({});
