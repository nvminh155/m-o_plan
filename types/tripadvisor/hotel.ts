import { LocalizedString, TCardPhoto, TListSingleCardContentBase } from "./type-local";

export type TrackingKey = {
  ik: string;
  ctt: string;
  pt: string;
  lid: number;
  hlk: string;
  mid: number;
  haik: string;
  login: boolean;
  hbfk: string;
  br: number;
  rc: number;
  pir: number;
  sn: string;
};

type Route = {
  __typename: string;
  fragment?: string | null;
  page: string;
  url: string;
  nonCanonicalUrl: string;
  typedParams: {
    __typename: string;
    contentId: string;
    contentType: string;
    spAttributionToken?: string | null;
    wasPlusShown?: string | null;
  };
};

type CardLink = {
  __typename: string;
  route: Route;
  webviewRoute?: string | null;
  text?: string | null;
  accessibilityString?: string | null;
  trackingContext: string;
};

type CommerceInfo = {
  __typename: string;
  commerceType: string;
  priceForDisplay: LocalizedString;
  strikethroughPrice?: string | null;
  provider: string;
  details: {
    __typename: string;
    text: string;
  };
  cta: {
    __typename: string;
    externalUrl: string;
    text: LocalizedString;
    accessibilityString?: string | null;
    trackingContext: string;
  };
  loadingMessage?: string | null;
  commerceSummary: LocalizedString;
  pricingPeriod?: string | null;
};

export type THotelListSingleCardContent = TListSingleCardContentBase & {
  commerceButtons?: string | null;
  cardLink: CardLink;
  descriptiveText?: string | null;
  distance?: string | null;
  commerceInfo: CommerceInfo;
  labels: string[];
  secondaryInfo?: string | null;
  closureInfo?: string | null;
  cardPhotos: TCardPhoto[];
};

export type HotelListCard = {
  __typename: "AppPresentation_SingleCard";
  trackingTitle: string;
  trackingKey: string;
  stableDiffingType: string;
  listSingleCardContent: THotelListSingleCardContent;
  clusterId: string;
};
