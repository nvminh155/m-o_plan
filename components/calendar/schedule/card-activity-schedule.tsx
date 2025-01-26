import { IconAntd, IconEntypo } from "../../icon";
import { Button } from "../../ui/button";
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
        "flex-row relative flex-1 bg-secondary-500 rounded-[20px] p-3 gap-3",
        {
          "flex-col bg-tertiary-500": view === "lg",
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
            "text-white": view === "lg",
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
            className={cn("!text-typography-600", {
              "!text-white/90": view === "lg",
            })}
            size={15}
          />
          <AppText
            className={cn("text-xs !text-typography-600", {
              "!text-white/90": view === "lg",
            })}
          >
            11 Nov {view === "lg" && "- 16 Nov"}
          </AppText>
          <View
            className={cn("w-1 h-1 bg-typography-600", {
              "bg-typography-300": view === "lg",
            })}
          ></View>
          <IconAntd
            name="clockcircleo"
            className={cn("!text-typography-600", {
              "!text-white/90": view === "lg",
            })}
            size={15}
          />
          <AppText
            className={cn("!text-typography-600  text-xs", {
              "!text-white/90": view === "lg",
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
                    "border-tertiary-500": view === "lg",
                  }
                )}
              />
            </View>
          ))}
          <View className="bg justify-center items-center flex-row text-white rounded-full pr-2 ml-2">
            <AppText
              containerClassName="self-center"
              className={cn("font-medium", {
                "!text-tertiary-foreground-500": view === "lg",
              })}
            >
              +2
            </AppText>
          </View>
        </View>
      </View>

      {view === "md" && (
        <Button
          variant="link"
          size="lg"
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
            className="!text-typography-800"
            size={22}
          />
        </Button>
      )}

      {view === "lg" && (
        <Button
          variant="link"
          className={cn("px-2 py-0  rounded-full")}
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
            className="!text-tertiary-foreground-500"
          />
        </Button>
      )}
    </View>
  );
};

export default CardActivityInSchedule;
