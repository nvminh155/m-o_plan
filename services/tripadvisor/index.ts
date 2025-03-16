import { config, env } from "./constant";

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

export const tripadvisorService = {
  locationSearch: async (obj: TLocationSearch) => {
    const queryParams = new URLSearchParams();
    obj.currency = config.currency;
    obj.lang = config.lang;
    obj.units = config.units;
    obj.sort = "relevance";
    obj.limit = 30;
    obj.offset = 0;
    obj.location_id = 1;

    Object.entries(obj).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, value.toString());
      }
    });

    const url = `${env.BASE_URL}/locations/search?${queryParams.toString()}`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-key": env.RAPIDAPI_KEY,
        "x-rapidapi-host": env.RAPIDAPI_HOST,
      },
    });
  
    return await res.json();
  },
};
