import { FilmListResponse, filmApi } from "@/api/filmApi";
import { Colors } from "@/constants/Colors";
import { useModal } from "@/hooks/useModal";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type FilmListProps = {
  slug: string;
  title: string;
};

const FilmList = ({ slug, title }: FilmListProps) => {
  const [data, setData] = useState<FilmListResponse>();

  const { onShow } = useModal();

  useEffect(() => {
    const fetchFilms = async () => {
      const response = await filmApi.getByFilmType(slug, {
        limit: 6,
      });

      if (response) {
        setData(response);
      }
    };

    fetchFilms();
  }, [slug]);

  if (!data) return null;

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{title}</Text>
          <MaterialIcons name="chevron-right" style={styles.titleIcon} />
        </View>
      </TouchableOpacity>
      <View style={styles.filmList}>
        {data.items.map((movie) => (
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
    </View>
  );
};

export default FilmList;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
  },
  titleWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  title: {
    fontSize: 20,
    paddingVertical: 12,
    color: Colors.text,
  },
  titleIcon: {
    fontSize: 20,
    color: Colors.text,
  },
  filmList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 8,
  },
  film: {
    width: "32%",
  },
  filmImage: {
    width: "100%",
    aspectRatio: 3 / 4,
  },
  filmName: {
    color: Colors.text,
  },
});
