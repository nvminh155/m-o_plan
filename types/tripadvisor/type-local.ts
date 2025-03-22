export type TListSingleCardContentBase = {
  trackingKey: string;
  trackingTitle: string;
  __typename: string;
  badge: string | null;
  secondaryInfo: {
    __typename: string;
    text: string;
  };
  primaryInfo: {
    __typename: string;
    text: string;
  };
  cardTitle: LocalizedString;

  stableDiffingType: string;
  bubbleRating: BubbleRating;
  isSaved: boolean;
  saveId: SaveId;
};
type SaveId = {
  __typename: string;
  id: string;
  type: string;
};

type BubbleRating = {
  __typename: "AppPresentation_BubbleRating";
  rating: number;
  numberReviews: LocalizedString;
};

type PhotoItemSizeDynamic = {
  __typename: string;
  maxHeight: number;
  maxWidth: number;
  urlTemplate: string;
};

export type TCardPhoto = {
  __typename: string;
  sizes: PhotoItemSizeDynamic;
};

export type LocalizedString = {
  __typename: "AppPresentation_LocalizedString";
  string: string;
  debugValueKey?: string | null;
};
