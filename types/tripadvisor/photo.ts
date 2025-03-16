export type TPhotoSizeDynamic = {
  __typename: "PhotoSizeDynamic";
  maxHeight: number;
  maxWidth: number;
  urlTemplate: string; //"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/33/fe/96/vung-tau.jpg?w={width}&h={height}&s=1";
};

export type TPhotoSize = {
  __typename: "PhotoSize";
  height: number;
  width: number;
  url: string; //specific width height : "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/33/fe/96/vung-tau.jpg?w=100&h=100&s=1";
};

export type TPhoto = {
  __typename: "Photo";
  photoSizeDynamic: TPhotoSizeDynamic;
  photoSizes: TPhotoSize[];
};

