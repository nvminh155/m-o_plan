import { IconAntd } from "@/components/icon";
import { Button, ButtonIcon } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { Href, router, Stack, Tabs, useLocalSearchParams, usePathname } from "expo-router";
import React, { useEffect } from "react";
import { View } from "react-native";

import { usePlanContext } from "@/contexts/PlanProvider";
import {
  HomeIcon,
  Icon,
  MemberFilledIcon,
  SettingsIcon,
} from "@/components/ui/icon";
import { useQueryClient } from "@tanstack/react-query";

type TTabsIcon = {
  icon: React.ElementType<any, keyof React.JSX.IntrinsicElements>;
  size: number;
  color: string;
};
const TabsIcon = ({ icon, size, color }: TTabsIcon) => {
  return (
    <Icon
      as={HomeIcon}
      style={{
        color: color,
        fontSize: size,
      }}
      className="w-full h-full"
    />
  );
};
const PlansTabsLayout = () => {
    const {
      id,
    }: {
      id: string;
    } = useLocalSearchParams();

  const queryClient = useQueryClient();


  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["plans", id]
    })
  }, [])


  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="(tabs)"
    ></Stack>
  );
};

// const TabsNavigation = () => {
//   const { data } = usePlanContext();
//   const pathname = usePathname();

//   const itemsTab = ((): {
//     key: string;
//     href: Href;
//     icon: string;
//     url: string;
//   }[] => {
//     const id = data?.id as string;
//     const baseHref: Href = {
//       pathname: "/plans/[id]",
//       params: { id },
//     };

//     return [
//       {
//         key: "index",
//         href: baseHref,
//         icon: "home",
//         url: `/plans/${id}`,
//       },
//       {
//         key: "setting",
//         href: { ...baseHref, pathname: "/plans/[id]/setting" },
//         icon: "setting",
//         url: `/plans/${id}/setting`,
//       },
//     ];
//   })();

//   return (
//     <View
//       className="bg-white flex-row px-4 py-4 gap-8 rounded-full justify-between items-center self-center mt-auto"
//       style={{ elevation: 5 }}
//     >
//       {itemsTab.map((tab) => (
//         <Button
//           key={tab.key}
//           action={pathname === tab.url ? "primary" : "secondary"}
//           size="lg"
//           className={cn("!px-0 !py-0 h-16 w-16 rounded-full", {})}
//           onPress={() => {
//             router.replace(tab.href);
//           }}
//         >
//           <IconAntd
//             size={22}
//             name={tab.icon as any}
//             className={cn({
//               "!text-typography-800": pathname !== tab.url,
//             })}
//           />
//         </Button>
//       ))}
//       <Button
//         action="primary"
//         className={cn("!px-0 !py-0 h-16 w-16 rounded-full", {})}
//         onPress={() => {
//           router.replace({
//             pathname: "/plans/[id]/member",
//             params: { id: data?.id ?? "" },
//           });
//         }}
//       >
//         <ButtonIcon as={MemberFilledIcon} className="!text-black" />
//       </Button>
//     </View>
//   );
// };
export default PlansTabsLayout;
