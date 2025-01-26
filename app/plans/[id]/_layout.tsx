import { IconAntd } from "@/components/icon";
import { Button } from "@/components/ui/button";
import Wrapper from "@/components/ui/Wrapper";
import { cn } from "../../../lib/cn";
import { TabRouter } from "@react-navigation/native";
import {
  Href,
  Navigator,
  router,
  Slot,
  useLocalSearchParams,
  usePathname,
} from "expo-router";
import React from "react";
import { View } from "react-native";

const PlansTabsLayout = () => {
  return (
    <Navigator router={TabRouter} initialRouteName="index" routerOptions={{}}>
      <Wrapper className="flex-1 bg-white pb-8">
        <Slot />

        <TabsNavigation />
      </Wrapper>
    </Navigator>
  );
};

const TabsNavigation = () => {
  const { id: idPlan } = useLocalSearchParams();
  const pathname = usePathname();

  const itemsTab = ((): {
    key: string;
    href: Href;
    icon: string;
    url: string;
  }[] => {
    const id = idPlan as string;
    const baseHref: Href = {
      pathname: "/plans/[id]",
      params: { id },
    };

    return [
      {
        key: "index",
        href: baseHref,
        icon: "home",
        url: `/plans/${id}`,
      },
      {
        key: "schedule",
        href: { ...baseHref, pathname: "/plans/[id]/schedule" },
        icon: "calendar",
        url: `/plans/${id}/schedule`,
      },
      {
        key: "message",
        href: { ...baseHref, pathname: "/plans/[id]" },
        icon: "message1",
        url: `/plans/${id}1`,
      },
      {
        key: "setting",
        href: { ...baseHref, pathname: "/plans/[id]/setting" },
        icon: "setting",
        url: `/plans/${id}/setting`,
      },
    ];
  })();

  return (
    <View
      className="bg-white flex-row px-4 py-4 gap-8 rounded-full justify-between items-center self-center mt-auto"
      style={{ elevation: 5 }}
    >
      {itemsTab.map((tab) => (
        <Button
          key={tab.key}
          action={pathname === tab.url ? "primary" : "secondary"}
          size="lg"
          className={cn("!px-0 !py-0 h-20 w-20 rounded-full", {})}
          onPress={() => {
            router.replace(tab.href);
          }}
        >
          <IconAntd
            size={22}
            name={tab.icon as any}
            className={cn({
              "!text-typography-800": pathname !== tab.url,
            })}
          />
        </Button>
      ))}

      <Button
        variant="link"
        className="bg-transparent !px-0 !py-0"
        onPress={() => router.back()}
      >
        <IconAntd name="back" className="!text-typography-800" />
      </Button>
    </View>
  );
};
export default PlansTabsLayout;
