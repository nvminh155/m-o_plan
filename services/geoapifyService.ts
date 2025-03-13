import uuid from "react-native-uuid";

const API_KEY = "28661b09c8bf4a3d9b627653b632764c";
const BASE_URL = `https://api.geoapify.com/v1/geocode`;

type BBox = {
  lon1: number;
  lat1: number;
  lon2: number;
  lat2: number;
};

type TResultType =
  | "state"
  | "city"
  | "postcode"
  | "street"
  | "amenity"
  | "locality"
  | "country";

export type TSearchResponse = {
  country: string;
  country_code: string;
  state: string;
  city: string;
  lon: number;
  lat: number;
  result_type: TResultType;
  formatted: string;
  address_line1: string;
  address_line2: string;
  place_id: string;
  bbox: BBox;
};

export const geoapifyService = {
  search: async (text: string) => {
    const url = `${BASE_URL}/search?text=${text}&format=json&apiKey=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json() as {
      results: TSearchResponse[];
    };

    return data.results;
  },
  autoComplete: async (text: string) => {
    const url = `${BASE_URL}/autocomplete?text=${text}&lang=en&limit=5&format=json&apiKey=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json() as {
      results: TSearchResponse[];
    };

    return data.results;
  }
};
