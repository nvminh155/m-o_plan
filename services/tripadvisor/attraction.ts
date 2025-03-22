import { config, config_en, tripadvisorOptions } from "./constant";
import { objToQueryParams } from "@/utils/objToQueryParams";
import { TFilter } from "@/types/tripadvisor/attraction/filter";
import { http } from "@/lib/http";
import { TAttractionListResponse } from "@/types/tripadvisor/attraction";

const ATTRACTION_PATH = "attractions/v2";

type Coordinate = {
  latitude: number; // Latitude of the coordinate
  longitude: number; // Longitude of the coordinate
};

type BoundingBox = {
  northEastCorner: Coordinate; // Top right coordinate of the bounding box
  southWestCorner: Coordinate; // Bottom left coordinate of the bounding box
};

type Pax = {
  ageBand: "ADULT"; // The value is always "ADULT"
  count: number; // Number of adults
};

type AttractionBody = {
  geoId: number; // Required: The geoId field from locations API
  filters?: TFilter[]; // Optional: List of filters
  boundingBox?: BoundingBox; // Optional: Geographical bounding box
  pax?: Pax[]; // Required: Array of passenger details
  startDate: string; // Required: Start date in format yyyy-MM-dd (e.g., "2021-06-28")
  endDate: string; // Required: End date in format yyyy-MM-dd (e.g., "2021-06-28")
  sort?: "TRAVELER_RANKED" | "TRAVELER_FAVORITE_V2"; // Required: Sorting type
  sortOrder?: "asc" | "desc"; // Required: Sorting order
  updateToken?: string; // Optional: Update token for pagination or polling
};

export const attractionService = {
  list: async (body: AttractionBody) => {
    const searchParamsString = objToQueryParams(config);

    const url = `/${ATTRACTION_PATH}/list?${searchParamsString}`;

    const baseBody = {
      pax: [
        {
          ageBand: "ADULT",
          count: 2,
        },
      ],
      sort: "TRAVELER_FAVORITE_V2",
      sortOrder: "asc",
      filters: [
        {
          id: "category",
          value: ["47", "49"],
        },
        {
          id: "rating",
          value: ["40"],
        },
        {
          id: "navbar",
          value: ["ATTRACTIONOVERVIEW:-true"],
        },
      ] as TFilter[],
      updateToken: "",
    };

    const res = await http.post<TAttractionListResponse>(
      url,
      {
        ...baseBody,
        ...body,
      },
      {
        ...tripadvisorOptions,
      }
    );

    console.log("res", res.payload.AppPresentation_queryAppListV2[0].sections);
    return {
      ...res,
      payload: res.payload.AppPresentation_queryAppListV2[0].sections,
    };
  },
};
