import {
  Alert,
  StyleProp,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { FilmListResponse, Movie, filmApi } from "@/api/filmApi";
import { Image } from "expo-image";
import { MaterialIcons } from "@expo/vector-icons";
import { useModal } from "@/hooks/useModal";

type FilmListProps = {
  slug: string;
  title: string;
  style?: StyleProp<ViewStyle>;
};

const FilmList = ({ slug, title, style }: FilmListProps) => {
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
    <ThemedView style={[{ paddingHorizontal: 8 }, style]}>
      <TouchableOpacity>
        <ThemedView
          style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
        >
          <ThemedText style={{ fontSize: 20, paddingVertical: 12 }}>
            {title}
          </ThemedText>
          <MaterialIcons name="chevron-right" size={20} />
        </ThemedView>
      </TouchableOpacity>
      <ThemedView
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          rowGap: 8,
        }}
      >
        {data.items.map((item) => (
          <TouchableOpacity
            key={item._id}
            onPress={() => {
              onShow("streaming", {
                movie: item,
              });
            }}
            style={{ width: "32%" }}
          >
            <Image
              source={`${data.APP_DOMAIN_CDN_IMAGE}/${item.poster_url}`}
              style={{ width: "100%", aspectRatio: 3 / 4 }}
            />
            <ThemedText>{item.name}</ThemedText>
          </TouchableOpacity>
        ))}
      </ThemedView>
    </ThemedView>
  );
};

export default FilmList;

const styles = StyleSheet.create({});
