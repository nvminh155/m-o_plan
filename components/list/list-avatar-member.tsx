import React from "react";
import { View } from "react-native";
import AppImage from "../image/AppImage";
import AppText from "../ui/AppText";
import { cn } from "../../lib/cn";

interface ListAvatarMemberProps {
  size?: "md" | "lg";
}
const ListAvatarMember = ({ size = "md" }: ListAvatarMemberProps) => {
  return (
    <View
      className="members flex-row items-center rounded-[23px] p-0.5 mt-auto"
      style={{
        alignSelf: "flex-start",
      }}
    >
      {Array.from({ length: 3 }).map((_, index) => (
        <View key={index + 1} style={{ alignSelf: "flex-start" }}>
          <AppImage
            source={"https://picsum.photos/seed/696/3000/2000"}
            className={cn("h-8 w-8 rounded-full border-[1.5px] border-white", {
              "-ml-3": index !== 0,
              "border-tertiary-500": size === "lg",
            })}
          />
        </View>
      ))}
      <View className="bg justify-center items-center flex-row text-white rounded-full pr-2 ml-2">
        <AppText
          containerClassName="self-center"
          className={cn("font-medium", {
            "!text-tertiary-500-foreground": size === "lg",
          })}
        >
          +2
        </AppText>
      </View>
    </View>
  );
};

export default ListAvatarMember;
