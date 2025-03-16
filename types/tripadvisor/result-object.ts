type TPhotoResultObject = {
  images: Record<TImageSize, TImageObject>;
  is_blessed: boolean;
  uploaded_date: string;
  caption: string;
  id: string;
  helpful_votes: string;
  published_date: string;
  user: any;
};
type TImageSize = "small" | "thumbnail" | "original" | "large" | "medium";
type TImageObject = {
  width: string;
  url: string;
  height: string;
};

type TResultBase = {
  location_id: string;
  name: string;
  latitude: string;
  longitude: string;
  num_reviews: string;
  timezone: string;
  location_string: string;
  photo: TPhotoResultObject;
  awards: {};
  preferred_map_engine: string;
  distance: {};
  description: string;
  web_url: string;
  ancestors: {};
  category: {};
  subcategory: {};
  is_jfy_enabled: boolean;
  nearest_metro_station: {};
};

type TResultObjectGeos = TResultBase & {
  doubleclick_zone: string;
  geo_type: string;
  category_counts: {};
  nearby_attractions: {};
  has_restaurant_coverpage: boolean;
  has_attraction_coverpage: boolean;
  has_curated_shopping_list: boolean;
};

type TResultObjectOtherBase = TResultBase & {
  distance_string: {};
  bearing: {};
  rating: string;
  is_closed: boolean;
  is_long_closed: boolean;
  address: string;
  is_candidate_for_contact_info_suppression: boolean;
};

type TAddressObject = {
  street1: string;
  street2: string;
  city: string;
  state: any;
  country: string;
  postalcode: string;
};
type TResultObjectLodging = TResultObjectOtherBase & {
  special_offers: {};
  address_obj: TAddressObject;
  amenities: {};
};

type TResultObjectThingsToDo = TResultObjectOtherBase & {
  location_subtype: string;
};

type TResultObjectRestaurants = TResultObjectOtherBase & {
  address_obj: TAddressObject;
  cuisine: {};
  establishment_types: {};
};

type TResultObject =
  | TResultObjectGeos
  | TResultObjectLodging
  | TResultObjectThingsToDo
  | TResultObjectRestaurants;
export type {
  TResultObjectGeos,
  TResultObjectLodging,
  TResultObjectThingsToDo,
  TResultObjectRestaurants,
  TResultObject,
};
