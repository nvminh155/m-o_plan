import { TCardPhoto, TListSingleCardContentBase } from "../type-local";

export type TAttractionSection = {
  __typename: "AppPresentation_SingleCard" | string;
  trackingTitle: string;
  trackingKey: string;
  stableDiffingType: string;
  listSingleCardContent: TAttractionListSingleCardContent;
};

export type TAttractionListResponse = {
  AppPresentation_queryAppListV2: {
    __typename: "AppPresentation_QueryAppListResponse";
    barItems: any[]; // Chưa rõ cấu trúc
    container: {
      [key: string]: any; // Có 9 key, cần xác định cụ thể hơn nếu có thông tin chi tiết
    };
    quickLinks: null;
    filters: {
      [key: string]: any; // Có 3 key, cần xác định cụ thể hơn nếu biết chi tiết
    };
    availableSorts: any[]; // Có 2 items
    sections: TAttractionSection[]; // Có 16 items
    skippedSections: any[]; // Có 4 items
    mapSections: any[]; // Có 2 items
    impressions: any[]; // Có 1 item
    statusV2: {
      [key: string]: any; // Có 3 key, cần xác định cụ thể hơn nếu biết chi tiết
    };
    commerce: {
      updatedClusterIds: any[]; // 0 items
      trackingKey: string; // JSON string chứa "cik", "lid", "sn"
    };
  }[];
};

type TAttractionListSingleCardContent = TListSingleCardContentBase & {
  distance: string | null;
  freeCancellationTooltip: {
    __typename: string;
    icon: string;
    labelText: {
      __typename: string;
      string: string;
    };
  } | null;
  cardPhoto: TCardPhoto;
};
// Example usage:
const exampleResponse: TAttractionSection = {
  __typename: "AppPresentation_SingleCard",
  trackingTitle: "ProductListCard_attraction_product_7329P54_PRODUCTS_0",
  trackingKey: "some-tracking-key",
  stableDiffingType: "ProductListCard_attraction_product_7329P54_PRODUCTS_0",
  listSingleCardContent: {
    __typename: "AppPresentation_HorizontalMerchandisingCard",
    badge: null,
    trackingKey: "some-tracking-key",
    trackingTitle: "ProductListCard_attraction_product_7329P54",
    stableDiffingType: "ProductListCard_attraction_product_7329P54",
    isSaved: false,
    saveId: {
      __typename: "Trips_ReferenceV2",
      id: "26210187",
      type: "location",
    },
    cardTitle: {
      __typename: "AppPresentation_LocalizedString",
      string: "Vung Tau Essential",
      debugValueKey: null,
    },
    primaryInfo: {
      __typename: "AppPresentation_JoinedLocalizableObjects",
      text: "Day Trips",
    },
    secondaryInfo: {
      __typename: "AppPresentation_JoinedLocalizableObjects",
      text: "Free cancellation",
    },
    cardPhoto: {
      __typename: "AppPresentation_PhotoItem",
      sizes: {
        __typename: "AppPresentation_PhotoItemSizeDynamic",
        maxHeight: 480,
        maxWidth: 720,
        urlTemplate: "https://example.com/photo.jpg",
      },
    },
    bubbleRating: {
      __typename: "AppPresentation_BubbleRating",
      rating: 4.9,
      numberReviews: {
        __typename: "AppPresentation_LocalizedString",
        string: "222",
        debugValueKey: null,
      },
    },
    distance: null,
    freeCancellationTooltip: {
      __typename: "AppPresentation_Tooltip",
      icon: "info",
      labelText: {
        __typename: "AppPresentation_LocalizedString",
        string: "Free cancellation",
      },
    },
  },
};
