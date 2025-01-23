import { IconAntd, IconEntypo } from "../../icon";
import AppButton from "../../ui/AppButton";
import AppText from "../../ui/AppText";
import { cn } from "../../../lib/cn";
import { Image } from "expo-image";
import React, { useState } from "react";
import { View } from "react-native";

const CardActivityInSchedule = () => {
  const [view, setView] = useState<"md" | "lg">("md");

  return (
    <View
      className={cn(
        "flex-row relative flex-1 bg-secondary rounded-[20px] p-3 gap-3",
        {
          "flex-col bg-accent": view === "lg",
        }
      )}
    >
      <Image
        source={require("@/assets/images/3x4anime.jpg")}
        className={cn("rounded-[15px] !w-full", {
          "max-w-[80px] h-full": view === "md",
        })}
        style={{
          aspectRatio: view === "lg" ? 16 / 9 : 1,
          objectFit: "cover",
        }}
      />
      <View className="flex-1">
        <AppText
          className={cn("font-medium text-base line-clamp-1", {
            "text-accent-foreground": view === "lg",
          })}
        >
          Traveling to Swit zerl and
        </AppText>

        <View
          className={cn("subtitle flex-row items-center gap-2 mt-1", {
            "mb-3": view === "lg",
          })}
        >
          <IconAntd
            name="calendar"
            className={cn("!text-color/60", {
              "!text-accent-foreground/80": view === "lg",
            })}
            size={15}
          />
          <AppText
            className={cn("text-xs", {
              "!text-accent-foreground/80": view === "lg",
            })}
          >
            11 Nov {view === "lg" && "- 16 Nov"}
          </AppText>
          <View
            className={cn("w-1 h-1 bg-color/20", {
              "bg-accent-foreground/80": view === "lg",
            })}
          ></View>
          <IconAntd
            name="clockcircleo"
            className={cn("!text-color/60", {
              "!text-accent-foreground/80": view === "lg",
            })}
            size={15}
          />
          <AppText
            className={cn("!text-color/60 font-medium text-xs", {
              "!text-accent-foreground/80": view === "lg",
            })}
          >
            Tomorrow
          </AppText>
        </View>

        <View
          className="members flex-row items-center rounded-[23px] p-0.5 mt-auto"
          style={{
            alignSelf: "flex-start",
          }}
        >
          {Array.from({ length: 3 }).map((_, index) => (
            <View key={index + 1} style={{ alignSelf: "flex-start" }}>
              <Image
                source={"https://picsum.photos/seed/696/3000/2000"}
                className={cn(
                  "h-8 w-8 rounded-full border-[1.5px] border-white",
                  {
                    "-ml-3": index !== 0,
                    "border-accent": view === "lg",
                  }
                )}
              />
            </View>
          ))}
          <View className="bg justify-center items-center flex-row text-white rounded-full pr-2 ml-2">
            <AppText
              containerClassName="self-center"
              className={cn("font-medium", {
                "!text-accent-foreground": view === "lg",
              })}
            >
              +2
            </AppText>
          </View>
        </View>
      </View>

      {view === "md" && (
        <AppButton
          variant="ghost"
          size="icon"
          className={cn("!px-0 !py-0 ")}
          style={{
            position: "absolute",
            bottom: 10,
            right: 10,
            height: 20,
            backgroundColor: "transparent",
          }}
          onPress={() => {
            setView("lg");
          }}
        >
          <IconEntypo
            name="resize-full-screen"
            className="!text-accent "
            size={22}
          />
        </AppButton>
      )}

      {view === "lg" && (
        <AppButton
          className={cn("px-2 py-0 bg-accent/5a rounded-full")}
          style={{
            position: "absolute",
            right: 10,
            bottom: 10,
          }}
          onPress={() => {
            setView("md");
          }}
        >
          <IconAntd
            name="minus"
            size={20}
            className="!text-accent-foreground"
          />
        </AppButton>
      )}
    </View>
  );
};

export default CardActivityInSchedule;
