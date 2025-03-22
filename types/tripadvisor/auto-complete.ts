import { TPhoto } from "./photo";

type TGeoCode = {
  __typename: "LocationSelection_LocationInformationV2Geocode";
  latitude: number; //10.36191;
  longitude: number; //107.08564;
};

type TNames = {
  __typename: "LocationSelection_LocationNames";
  name: string; //"Vũng Tàu";
  longOnlyHierarchyTypeaheadV2: string; //"Tỉnh Bà Rịa-Vũng Tàu, Việt Nam";
};

type TDetailsV2 = {
  __typename: "LocationSelection_LocationInformationV2";
  locationId: number; // 303946;
  isGeo: boolean; //true;
  placeType: "CITY"; // check again
  names: TNames;
  geocode: TGeoCode;
  contact: {
    __typename: "LocationSelection_LocationInformationV2Contact";
    streetAddress: {
      __typename: "LocationSelection_Address";
      street1: "";
    };
  };
  route: {
    __typename: "Routing_Route";
    fragment: null;
    page: "Tourism";
    url: "/Tourism-g303946-Vung_Tau_Ba_Ria_Vung_Tau_Province-Vacations.html";
    nonCanonicalUrl: "/Tourism-g303946-Vung_Tau_Ba_Ria_Vung_Tau_Province-Vacations.html";
    typedParams: {
      __typename: "Routing_TourismParameters";
      geoId: 303946;
    };
  };
};

export type TTypeahead_LocationItem = {
  __typename: "Typeahead_LocationItem";
  documentId: string; //"loc;   ;g303946"; loc = locationId, g = geoId
  detailsV2: TDetailsV2;
  details: {
    __typename: "LocationInformation";
    socialStatistics: {
      __typename: "SocialStatistics";
      isSaved: false;
    };
  };
  image: {
    __typename: "PrimaryMedia_PrimaryMedia";
    photo: TPhoto;
  };
};

// type TResult = TTypeahead_LocationItem;

export type TResponseAutoComplete = {
  data: {
    Typeahead_autocomplete: {
      __typename: "Typeahead_Response";
      resultsId: string; // "fc128034-9ac4-47e7-bf73-431c35c183d0_abeba6a1-ea68-46c2-ac12-86ccce709390",
      results: TTypeahead_LocationItem[];
    };
  };
};
