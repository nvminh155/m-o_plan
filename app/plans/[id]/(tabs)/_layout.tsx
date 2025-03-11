import { Tabs } from "expo-router";
import React from "react";

import {
  HomeIcon,
  Icon,
  MemberFilledIcon,
  SettingsIcon,
} from "@/components/ui/icon";

const PlansTabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          fontWeight: 700,
          fontSize: 11,
        },
        tabBarActiveTintColor: "#F7653D",
      }}
      initialRouteName="index"
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Trang chủ",
          tabBarIcon: ({ color }) => (
            <Icon
              as={HomeIcon}
              style={{
                color: color,
              }}
              className="w-full h-full"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="member"
        options={{
          title: "Thành viên",
          tabBarIcon: ({ color }) => (
            <Icon
              as={MemberFilledIcon}
              style={{
                color: color,
              }}
              className="w-full h-full"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="setting"
        options={{
          title: "Quản lý",
          tabBarIcon: ({ color }) => (
            <Icon
              as={SettingsIcon}
              style={{
                color: color,
              }}
              className="w-full h-full"
            />
          ),
        }}
      />
    </Tabs>
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
