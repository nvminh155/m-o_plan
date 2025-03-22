import { cn } from "../../lib/cn";
import { Image, ImageProps } from "expo-image";
import React from "react";

interface AppImageProps extends ImageProps {}

const AppImage = ({ source, className, ...rest }: AppImageProps) => {
  return <Image source={source} className={cn("object-cover object-center", className)} />;
};

export default AppImage;
