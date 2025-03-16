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
}

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

type TTypeahead_LocationItem = {
  documentId: string; //"loc;303946;g303946"; loc = locationId, g = geoId
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



type TResult = TTypeahead_LocationItem


type TResponse = {
  data: {
    Typeahead_autocomplete: {
      __typename: "Typeahead_Response",
      resultsId:
        "fc128034-9ac4-47e7-bf73-431c35c183d0_abeba6a1-ea68-46c2-ac12-86ccce709390",
        results: TResult[]
    }
  }
}
// const response = {
//   data: {
//     Typeahead_autocomplete: {
//       __typename: "Typeahead_Response",
//       resultsId:
//         "fc128034-9ac4-47e7-bf73-431c35c183d0_abeba6a1-ea68-46c2-ac12-86ccce709390",
//       results: [
//         {
//           __typename: "Typeahead_LocationItem",
//           documentId: "loc;303946;g303946",
//           detailsV2: {
//             __typename: "LocationSelection_LocationInformationV2",
//             locationId: 303946,
//             isGeo: true,
//             placeType: "CITY",
//             names: {
//               __typename: "LocationSelection_LocationNames",
//               name: "Vũng Tàu",
//               longOnlyHierarchyTypeaheadV2: "Tỉnh Bà Rịa-Vũng Tàu, Việt Nam",
//             },
//             geocode: {
//               __typename: "LocationSelection_LocationInformationV2Geocode",
//               latitude: 10.36191,
//               longitude: 107.08564,
//             },
//             contact: {
//               __typename: "LocationSelection_LocationInformationV2Contact",
//               streetAddress: {
//                 __typename: "LocationSelection_Address",
//                 street1: "",
//               },
//             },
//             route: {
//               __typename: "Routing_Route",
//               fragment: null,
//               page: "Tourism",
//               url: "/Tourism-g303946-Vung_Tau_Ba_Ria_Vung_Tau_Province-Vacations.html",
//               nonCanonicalUrl:
//                 "/Tourism-g303946-Vung_Tau_Ba_Ria_Vung_Tau_Province-Vacations.html",
//               typedParams: {
//                 __typename: "Routing_TourismParameters",
//                 geoId: 303946,
//               },
//             },
//           },
//           details: {
//             __typename: "LocationInformation",
//             socialStatistics: {
//               __typename: "SocialStatistics",
//               isSaved: false,
//             },
//           },
//           image: {
//             __typename: "PrimaryMedia_PrimaryMedia",
//             photo: {
//               __typename: "Photo",
//               photoSizeDynamic: {
//                 __typename: "PhotoSizeDynamic",
//                 maxHeight: 836,
//                 maxWidth: 4282,
//                 urlTemplate:
//                   "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/33/fe/96/vung-tau.jpg?w={width}&h={height}&s=1",
//               },
//               photoSizes: [
//                 {
//                   __typename: "PhotoSize",
//                   height: 0,
//                   width: 0,
//                   url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/33/fe/96/vung-tau.jpg?w=100&h=100&s=1",
//                 },
//                 {
//                   __typename: "PhotoSize",
//                   height: 50,
//                   width: 50,
//                   url: "https://media-cdn.tripadvisor.com/media/photo-t/15/33/fe/96/vung-tau.jpg",
//                 },
//                 {
//                   __typename: "PhotoSize",
//                   height: 150,
//                   width: 150,
//                   url: "https://media-cdn.tripadvisor.com/media/photo-l/15/33/fe/96/vung-tau.jpg",
//                 },
//                 {
//                   __typename: "PhotoSize",
//                   height: 200,
//                   width: 180,
//                   url: "https://media-cdn.tripadvisor.com/media/photo-i/15/33/fe/96/vung-tau.jpg",
//                 },
//                 {
//                   __typename: "PhotoSize",
//                   height: 49,
//                   width: 250,
//                   url: "https://media-cdn.tripadvisor.com/media/photo-f/15/33/fe/96/vung-tau.jpg",
//                 },
//                 {
//                   __typename: "PhotoSize",
//                   height: 120,
//                   width: 320,
//                   url: "https://media-cdn.tripadvisor.com/media/photo-b/320x120/15/33/fe/96/vung-tau.jpg",
//                 },
//                 {
//                   __typename: "PhotoSize",
//                   height: 107,
//                   width: 550,
//                   url: "https://media-cdn.tripadvisor.com/media/photo-s/15/33/fe/96/vung-tau.jpg",
//                 },
//                 {
//                   __typename: "PhotoSize",
//                   height: 250,
//                   width: 768,
//                   url: "https://media-cdn.tripadvisor.com/media/photo-b/768x250/15/33/fe/96/vung-tau.jpg",
//                 },
//                 {
//                   __typename: "PhotoSize",
//                   height: 250,
//                   width: 1024,
//                   url: "https://media-cdn.tripadvisor.com/media/photo-b/1024x250/15/33/fe/96/vung-tau.jpg",
//                 },
//                 {
//                   __typename: "PhotoSize",
//                   height: 200,
//                   width: 1024,
//                   url: "https://media-cdn.tripadvisor.com/media/photo-w/15/33/fe/96/vung-tau.jpg",
//                 },
//                 {
//                   __typename: "PhotoSize",
//                   height: 250,
//                   width: 1280,
//                   url: "https://media-cdn.tripadvisor.com/media/photo-b/1280x250/15/33/fe/96/vung-tau.jpg",
//                 },
//                 {
//                   __typename: "PhotoSize",
//                   height: 250,
//                   width: 1280,
//                   url: "https://media-cdn.tripadvisor.com/media/photo-m/1280/15/33/fe/96/vung-tau.jpg",
//                 },
//                 {
//                   __typename: "PhotoSize",
//                   height: 500,
//                   width: 2560,
//                   url: "https://media-cdn.tripadvisor.com/media/photo-b/2560x500/15/33/fe/96/vung-tau.jpg",
//                 },
//               ],
//             },
//           },
//         },
//         {
//           __typename: "Typeahead_QuerySuggestionItem",
//           documentId: "geo-pt;10023-303946;g303946;p10023",
//           suggestionType: "query",
//           buCategory: "HOTELS",
//           text: "vung tau khách sạn",
//           parentGeoDetails: {
//             __typename: "LocationSelection_LocationInformationV2",
//             names: {
//               __typename: "LocationSelection_LocationNames",
//               longOnlyHierarchyTypeaheadV2: "Tỉnh Bà Rịa-Vũng Tàu, Việt Nam",
//             },
//           },
//           route: {
//             __typename: "Routing_Route",
//             fragment: null,
//             page: "HotelsFusion",
//             url: "/Hotels-g303946-Vung_Tau_Ba_Ria_Vung_Tau_Province-Hotels.html",
//             nonCanonicalUrl:
//               "/Hotels-g303946-Vung_Tau_Ba_Ria_Vung_Tau_Province-Hotels.html",
//             typedParams: {
//               __typename: "Routing_HotelsFusionParameters",
//             },
//           },
//           scopeType: "GEO",
//         },
//         {
//           __typename: "Typeahead_QuerySuggestionItem",
//           documentId: "geo-pt;10021-303946;g303946;p10021",
//           suggestionType: "query",
//           buCategory: "ATTRACTIONS",
//           text: "vung tau hoạt động giải trí",
//           parentGeoDetails: {
//             __typename: "LocationSelection_LocationInformationV2",
//             names: {
//               __typename: "LocationSelection_LocationNames",
//               longOnlyHierarchyTypeaheadV2: "Tỉnh Bà Rịa-Vũng Tàu, Việt Nam",
//             },
//           },
//           route: {
//             __typename: "Routing_Route",
//             fragment: null,
//             page: "AttractionsFusion",
//             url: "/Attractions-g303946-Activities-Vung_Tau_Ba_Ria_Vung_Tau_Province.html",
//             nonCanonicalUrl:
//               "/Attractions-g303946-Activities-Vung_Tau_Ba_Ria_Vung_Tau_Province.html",
//             typedParams: {
//               __typename: "Routing_AttractionsFusionParameters",
//             },
//           },
//           scopeType: "GEO",
//         },
//         {
//           __typename: "Typeahead_QuerySuggestionItem",
//           documentId: "geo-pt;10022-303946;g303946;p10022",
//           suggestionType: "query",
//           buCategory: "RESTAURANTS",
//           text: "vung tau nhà hàng",
//           parentGeoDetails: {
//             __typename: "LocationSelection_LocationInformationV2",
//             names: {
//               __typename: "LocationSelection_LocationNames",
//               longOnlyHierarchyTypeaheadV2: "Tỉnh Bà Rịa-Vũng Tàu, Việt Nam",
//             },
//           },
//           route: {
//             __typename: "Routing_Route",
//             fragment: null,
//             page: "Restaurants",
//             url: "/Restaurants-g303946-Vung_Tau_Ba_Ria_Vung_Tau_Province.html",
//             nonCanonicalUrl:
//               "/Restaurants-g303946-Vung_Tau_Ba_Ria_Vung_Tau_Province.html",
//             typedParams: {
//               __typename: "Routing_RestaurantsParameters",
//             },
//           },
//           scopeType: "GEO",
//         },
//         {
//           __typename: "Typeahead_QuerySuggestionItem",
//           documentId: "tag;12121;g303946;p10023",
//           suggestionType: "query",
//           buCategory: "HOTELS",
//           text: "vung tau câu lạc bộ trẻ em",
//           parentGeoDetails: {
//             __typename: "LocationSelection_LocationInformationV2",
//             names: {
//               __typename: "LocationSelection_LocationNames",
//               longOnlyHierarchyTypeaheadV2: "Tỉnh Bà Rịa-Vũng Tàu, Việt Nam",
//             },
//           },
//           route: {
//             __typename: "Routing_Route",
//             fragment: null,
//             page: "HotelsFusion",
//             url: "/Hotels-g303946-zft12121-Vung_Tau_Ba_Ria_Vung_Tau_Province-Hotels.html",
//             nonCanonicalUrl:
//               "/Hotels-g303946-zft12121-Vung_Tau_Ba_Ria_Vung_Tau_Province-Hotels.html",
//             typedParams: {
//               __typename: "Routing_HotelsFusionParameters",
//             },
//           },
//           scopeType: "GEO",
//         },
//         {
//           __typename: "Typeahead_QuerySuggestionItem",
//           documentId: "tag;11282;g303946;p10023",
//           suggestionType: "query",
//           buCategory: "HOTELS",
//           text: "vung tau quầy bar cạnh bể bơi",
//           parentGeoDetails: {
//             __typename: "LocationSelection_LocationInformationV2",
//             names: {
//               __typename: "LocationSelection_LocationNames",
//               longOnlyHierarchyTypeaheadV2: "Tỉnh Bà Rịa-Vũng Tàu, Việt Nam",
//             },
//           },
//           route: {
//             __typename: "Routing_Route",
//             fragment: null,
//             page: "HotelsFusion",
//             url: "/Hotels-g303946-zft11282-Vung_Tau_Ba_Ria_Vung_Tau_Province-Hotels.html",
//             nonCanonicalUrl:
//               "/Hotels-g303946-zft11282-Vung_Tau_Ba_Ria_Vung_Tau_Province-Hotels.html",
//             typedParams: {
//               __typename: "Routing_HotelsFusionParameters",
//             },
//           },
//           scopeType: "GEO",
//         },
//         {
//           __typename: "Typeahead_QuerySuggestionItem",
//           documentId: "tag;12056;g303946;p10043",
//           suggestionType: "query",
//           buCategory: "ATTRACTIONS",
//           text: "vung tau chuyến tham quan cảng dừng chân",
//           parentGeoDetails: {
//             __typename: "LocationSelection_LocationInformationV2",
//             names: {
//               __typename: "LocationSelection_LocationNames",
//               longOnlyHierarchyTypeaheadV2: "Tỉnh Bà Rịa-Vũng Tàu, Việt Nam",
//             },
//           },
//           route: {
//             __typename: "Routing_Route",
//             fragment: null,
//             page: "AttractionProductsFusion",
//             url: "/Attraction_Products-g303946-t12056-zfg11880-Vung_Tau_Ba_Ria_Vung_Tau_Province.html",
//             nonCanonicalUrl:
//               "/Attraction_Products-g303946-t12056-zfg11880-Vung_Tau_Ba_Ria_Vung_Tau_Province.html",
//             typedParams: {
//               __typename: "Routing_AttractionProductsFusionParameters",
//             },
//           },
//           scopeType: "GEO",
//         },
//         {
//           __typename: "Typeahead_QuerySuggestionItem",
//           documentId: "tag;10675;g303946;p10022",
//           suggestionType: "query",
//           buCategory: "RESTAURANTS",
//           text: "vung tau ẩm thực việt nam",
//           parentGeoDetails: {
//             __typename: "LocationSelection_LocationInformationV2",
//             names: {
//               __typename: "LocationSelection_LocationNames",
//               longOnlyHierarchyTypeaheadV2: "Tỉnh Bà Rịa-Vũng Tàu, Việt Nam",
//             },
//           },
//           route: {
//             __typename: "Routing_Route",
//             fragment: null,
//             page: "Restaurants",
//             url: "/Restaurants-g303946-c41-Vung_Tau_Ba_Ria_Vung_Tau_Province.html",
//             nonCanonicalUrl:
//               "/Restaurants-g303946-c41-Vung_Tau_Ba_Ria_Vung_Tau_Province.html",
//             typedParams: {
//               __typename: "Routing_RestaurantsParameters",
//             },
//           },
//           scopeType: "GEO",
//         },
//         {
//           __typename: "Typeahead_QuerySuggestionItem",
//           documentId: "tag;11076;g303946;p10021",
//           suggestionType: "query",
//           buCategory: "ATTRACTIONS",
//           text: "vung tau bãi biển",
//           parentGeoDetails: {
//             __typename: "LocationSelection_LocationInformationV2",
//             names: {
//               __typename: "LocationSelection_LocationNames",
//               longOnlyHierarchyTypeaheadV2: "Tỉnh Bà Rịa-Vũng Tàu, Việt Nam",
//             },
//           },
//           route: {
//             __typename: "Routing_Route",
//             fragment: null,
//             page: "AttractionsFusion",
//             url: "/Attractions-g303946-Activities-c61-t52-Vung_Tau_Ba_Ria_Vung_Tau_Province.html",
//             nonCanonicalUrl:
//               "/Attractions-g303946-Activities-c61-t52-Vung_Tau_Ba_Ria_Vung_Tau_Province.html",
//             typedParams: {
//               __typename: "Routing_AttractionsFusionParameters",
//             },
//           },
//           scopeType: "GEO",
//         },
//         {
//           __typename: "Typeahead_LocationItem",
//           documentId: "loc;26210187",
//           detailsV2: {
//             __typename: "LocationSelection_LocationInformationV2",
//             locationId: 26210187,
//             isGeo: false,
//             placeType: "ACTIVITY",
//             names: {
//               __typename: "LocationSelection_LocationNames",
//               name: "Vung Tau Essential: Beach, Christ Statue & Colonial Heritage",
//               longOnlyHierarchyTypeaheadV2: "Thành phố Hồ Chí Minh, Việt Nam",
//             },
//             geocode: null,
//             contact: {
//               __typename: "LocationSelection_LocationInformationV2Contact",
//               streetAddress: {
//                 __typename: "LocationSelection_Address",
//                 street1: null,
//               },
//             },
//             route: null,
//           },
//           details: {
//             __typename: "LocationInformation",
//             socialStatistics: {
//               __typename: "SocialStatistics",
//               isSaved: false,
//             },
//           },
//           image: {
//             __typename: "PrimaryMedia_PrimaryMedia",
//             photo: {
//               __typename: "Photo",
//               photoSizeDynamic: {
//                 __typename: "PhotoSizeDynamic",
//                 maxHeight: 480,
//                 maxWidth: 720,
//                 urlTemplate:
//                   "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2f/43/0c/ba/caption.jpg?w={width}&h={height}&s=1",
//               },
//               photoSizes: [
//                 {
//                   __typename: "PhotoSize",
//                   height: 0,
//                   width: 0,
//                   url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2f/43/0c/ba/caption.jpg?w=100&h=100&s=1",
//                 },
//                 {
//                   __typename: "PhotoSize",
//                   height: 50,
//                   width: 50,
//                   url: "https://media-cdn.tripadvisor.com/media/photo-t/2f/43/0c/ba/caption.jpg",
//                 },
//                 {
//                   __typename: "PhotoSize",
//                   height: 150,
//                   width: 150,
//                   url: "https://media-cdn.tripadvisor.com/media/photo-l/2f/43/0c/ba/caption.jpg",
//                 },
//                 {
//                   __typename: "PhotoSize",
//                   height: 200,
//                   width: 180,
//                   url: "https://media-cdn.tripadvisor.com/media/photo-i/2f/43/0c/ba/caption.jpg",
//                 },
//                 {
//                   __typename: "PhotoSize",
//                   height: 167,
//                   width: 250,
//                   url: "https://media-cdn.tripadvisor.com/media/photo-f/2f/43/0c/ba/caption.jpg",
//                 },
//                 {
//                   __typename: "PhotoSize",
//                   height: 367,
//                   width: 550,
//                   url: "https://media-cdn.tripadvisor.com/media/photo-s/2f/43/0c/ba/caption.jpg",
//                 },
//                 {
//                   __typename: "PhotoSize",
//                   height: 480,
//                   width: 720,
//                   url: "https://media-cdn.tripadvisor.com/media/photo-o/2f/43/0c/ba/caption.jpg",
//                 },
//               ],
//             },
//           },
//         },
//         {
//           __typename: "Typeahead_RescueResultItem",
//           documentId: "RESCUE",
//           text: "vung tau",
//         },
//       ],
//     },
//   },
// };
