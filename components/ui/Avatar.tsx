import React from "react";
import { TouchableOpacity } from "react-native";
import { Image } from "expo-image";

interface AvatarProps {
  source?: string;
}

const Avatar = ({
  source = "https://picsum.photos/seed/696/3000/2000",
}: AvatarProps) => {
  return (
    <TouchableOpacity className="h-16 w-16 aspect-square rounded-full">
      <Image
        source={source}
        style={{
          flex: 1,
        }}
        className="rounded-full"
      />
    </TouchableOpacity>
  );
};

export default Avatar;
