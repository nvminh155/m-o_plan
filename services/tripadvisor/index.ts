import { TResponseAutoComplete } from "@/types/tripadvisor/auto-complete";
import { config, env } from "./constant";
import { hotelService } from "./hotel";
import { attractionService } from "./attraction";

type TLocationSearch = {
  query: string;
  limit?: number;
  offset?: number;
  units?: "km" | "mi";
  location_id?: string | number;
  currency?: string;
  sort?: "relevance" | "distance";
  lang?: string;
};

type TAutoComplete = {
  query: string;
  lang?: string;
  units?: "km" | "mi";
};

export const tripadvisorService = {
  autoComplete: async (obj: TAutoComplete) => {
    const url = `${env.BASE_URL}/locations/v2/auto-complete?${objToQueryParams(
      obj
    )}`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": env.RAPIDAPI_KEY,
        "x-rapidapi-host": env.RAPIDAPI_HOST,
      },
    };
    const res = await fetch(url, options);

    return (await res.json()) as TResponseAutoComplete;
  },
  locationSearch: async (obj: TLocationSearch) => {
    obj.currency = config.currency;
    obj.lang = config.lang;
    obj.units = config.units;
    obj.sort = "relevance";
    obj.limit = 30;
    obj.offset = 0;
    obj.location_id = 1;

    const url = `${env.BASE_URL}/locations/search?${objToQueryParams(obj)}`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-key": env.RAPIDAPI_KEY,
        "x-rapidapi-host": env.RAPIDAPI_HOST,
      },
    });

    return await res.json();
  },

  hotel: hotelService,
  attraction: attractionService,
};

const objToQueryParams = (obj: Record<string, any>) => {
  const queryParams = new URLSearchParams();

  Object.entries(obj).forEach(([key, value]) => {
    if (value !== undefined) {
      queryParams.append(key, value.toString());
    }
  });

  return queryParams.toString();
};
