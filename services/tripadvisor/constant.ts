import { CustomOptions } from "@/lib/http";

export const env = {
  BASE_URL: "https://travel-advisor.p.rapidapi.com",
  RAPIDAPI_KEY: "17e4c0d158msh45c10489d7556ccp110955jsn7f133c335ccf",
  RAPIDAPI_HOST: "travel-advisor.p.rapidapi.com",
};

export const tripadvisorOptions: CustomOptions = {
  headers: {
    "x-rapidapi-key": env.RAPIDAPI_KEY,
    "x-rapidapi-host": env.RAPIDAPI_HOST,
  },
  baseUrl: env.BASE_URL,
};

export const config: {
  currency: string;
  units: "km" | "mi";
  lang: string;
} = {
  currency: "VND",
  units: "km",
  lang: "vi_VN",
};

export const config_en = { ...config, lang: "en_US", currency: "USD" };
