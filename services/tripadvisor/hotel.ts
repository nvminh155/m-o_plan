import { TResponseAutoComplete } from "@/types/tripadvisor/auto-complete";
import { config, env } from "./constant";
import { objToQueryParams } from "@/utils/objToQueryParams";
import { HotelListCard } from "@/types/tripadvisor/hotel";

type HotelSearchParams = {
  location_id: number | string; // The value of location_id field returned in locations/search endpoint
  adults: number; // The number of adults in all rooms
  rooms: number; // The number of rooms
  nights: number; // The number of nights to live
  checkin?: string; // The check-in date at hotel, format: yyyy-MM-dd (e.g., 2020-05-15)
  offset?: number; // The number of items to ignore for paging purpose
  pricesmax?: number; // Maximum price range from filters/prices_slider field
  pricesmin?: number; // Minimum price range from filters/prices_slider field
  zff?: string; // Hotel style, comma-separated values (e.g., "4,6")
  subcategory?: string; // Hotel category, comma-separated values (e.g., "hotel,bb,specialty")
  hotel_class?: string; // Hotel class, comma-separated values (e.g., "1,2,3")
  currency?: string; // The currency code (default: USD)
  amenities?: string; // Amenities, comma-separated values (e.g., "beach,bar_lounge,airport_transportation")
  child_rm_ages?: string; // Children ages, comma-separated values (e.g., "7,10")
  order?: "asc" | "desc"; // Sorting order by price
  limit?: number; // Number of items per response (max 30)
  sort?: "recommended" | "popularity" | "price"; // Sorting type
  lang?: string; // The language code (default: vi_VN)
};

export function withDefaultParams(
  params: Partial<HotelSearchParams>
): HotelSearchParams {
  return {
    ...config,
    ...params,
  } as HotelSearchParams;
}

const HOTEL_PATH = "hotels/v2";


type Filter = {
  id: string;
  value: string[];
};

type Room = {
  adults: number;
  childrenAges: number[];
};

type Coordinate = {
  latitude: number;
  longitude: number;
};

type BoundingBox = {
  northEastCorner: Coordinate;
  southWestCorner: Coordinate;
};

type HotelSearchBody = {
  geoId: number;
  checkIn: string; // timestamp Format to yyyy-MM-dd
  checkOut: string; // timestamp Format to yyyy-MM-dd
  sort?: "PRICE_LOW_TO_HIGH" | "PRICE_HIGH_TO_LOW" | "BEST_SELLER"; // Add other sort types if needed
  sortOrder?: "asc" | "desc";
  filters?: Filter[];
  rooms?: Room[];
  boundingBox?: BoundingBox;
  updateToken?: string;
};


export const hotelService = {
  list: async (body: HotelSearchBody) => {
    const searchParamsString = objToQueryParams(config);

    const url = `${env.BASE_URL}/${HOTEL_PATH}/list?${searchParamsString}`;
    console.log("ss", url);

    const baseBody = {
      sort: "PRICE_LOW_TO_HIGH",
      sortOrder: "asc",
      filters: [
        {
          id: "deals",
          value: ["1", "2", "3"],
        },
        {
          id: "type",
          value: ["9189", "9201"],
        },
        {
          id: "amenity",
          value: ["9156", "9658", "21778", "9176"],
        },
        {
          id: "rating",
          value: ["40"],
        },
        {
          id: "style",
          value: ["5184", "9654", "6216", "6296", "9624", "9650", "5951"],
        },
      ],
      updateToken: "",
    };

    const options = {
      method: "POST",
      headers: {
        "x-rapidapi-key": env.RAPIDAPI_KEY,
        "x-rapidapi-host": env.RAPIDAPI_HOST,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...baseBody,
        ...body,
      }),
    };

    const res = await fetch(url, options);
    const data = await res.json();
    console.log("data",  data.data.AppPresentation_queryAppListV2[0]);
    return {
      data: data.data.AppPresentation_queryAppListV2[0].sections as HotelListCard[]
    };
  },
};
