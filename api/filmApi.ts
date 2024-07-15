import axios from "axios";

export type LatestFilm = {
  modified: {
    time: string;
  };
  _id: string;
  name: string;
  slug: string;
  origin_name: string;
  poster_url: string;
  thumb_url: string;
  year: number;
};

export type Movie = {
  modified: {
    time: string;
  };
  created: {
    time: string;
  };
  _id: string;
  name: string;
  slug: string;
  origin_name: string;
  poster_url: string;
  thumb_url: string;
  content: string;
  type: string;
  status: string;
  is_copyright: boolean;
  sub_docquyen: boolean;
  chieurap: boolean;
  trailer_url: string;
  time: string;
  episode_current: string;
  episode_total: string;
  quality: string;
  lang: string;
  notify: string;
  showtimes: string;
  year: number;
  view: number;
  actor: string[];
  director: string[];
  category: { id: string; name: string; slug: string }[];
  country: { id: string; name: string; slug: string }[];
};

export type Episode = {
  server_name: string;
  server_data: {
    name: string;
    slug: string;
    filename: string;
    link_embed: string;
    link_m3u8: string;
  }[];
};

export type SeoOnPage = {
  og_type: string;
  titleHead: string;
  descriptionHead: string;
  og_image: string[];
  og_url: string;
};

export type BreadCrumbItem = {
  name: string;
  slug?: string;
  isCurrent?: boolean;
  position: number;
};

export type Params = {
  type_slug: string;
  filterCategory: string[];
  filterCountry: string[];
  filterYear: string;
  filterType: string;
  sortField: string;
  sortType: string;
  pagination: {
    totalItems: number;
    totalItemsPerPage: number;
    currentPage: number;
    totalPages: number;
  };
};

export type FilmListResponse = {
  seoOnPage: SeoOnPage;
  breadCrumb: BreadCrumbItem[];
  titlePage: string;
  items: Movie[];
  params: Params;
  type_list: string;
  APP_DOMAIN_FRONTEND: string;
  APP_DOMAIN_CDN_IMAGE: string;
};

export const filmApi = {
  getLatest: async (params?: Record<string, any>) => {
    try {
      const response = await axios.get(
        "https://phimapi.com/danh-sach/phim-moi-cap-nhat",
        { params }
      );
      return response.data.items as LatestFilm[];
    } catch (error) {
      return [];
    }
  },
  getDetails: async (slug: string) => {
    try {
      const response = await axios.get(`https://phimapi.com/phim/${slug}`);
      const { movie, episodes } = response.data;
      return { movie, episodes: episodes || [] } as {
        movie: Movie;
        episodes: Episode[];
      };
    } catch (error) {
      return {
        movie: null,
        episodes: [],
      };
    }
  },
  getByFilmType: async (filmTypeSlug: string, params?: Record<string, any>) => {
    try {
      const response = await axios.get(
        `https://phimapi.com/v1/api/danh-sach/${filmTypeSlug}`,
        { params }
      );
      return response.data.data as FilmListResponse;
    } catch (error) {
      return null;
    }
  },
  search: async (keyword: string, params?: Record<string, any>) => {
    try {
      const response = await axios.get("https://phimapi.com/v1/api/tim-kiem", {
        params: { keyword, ...params },
      });
      return response.data.data as FilmListResponse;
    } catch (error) {
      return null;
    }
  },
};
