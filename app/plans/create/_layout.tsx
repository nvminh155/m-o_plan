import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { ArrowLeftIcon, Icon } from "@/components/ui/icon";
import Wrapper from "@/components/ui/Wrapper";
import { StackRouter } from "@react-navigation/native";
import { Link, Navigator, router, Slot, Stack } from "expo-router";
import { Text, View } from "react-native";

export default function CreateLayout() {
  return (
    <Navigator router={StackRouter}>
        <Wrapper>
          <Slot />
        </Wrapper>
    </Navigator>
  );
}
