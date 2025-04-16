import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Progress, ProgressFilledTrack } from "@/components/ui/progress";
import { VStack } from "@/components/ui/vstack";
import { cn } from "@/lib/cn";
import { StackRouter } from "@react-navigation/native";
import { Navigator, Slot, usePathname } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";

type THeaderProps = {
  onPressCB?: () => void;
};
export const CreatePlanHeader = ({ onPressCB }: THeaderProps) => {
  return (
    <HStack className="">
      <Button
        variant="link"
        className="ml-auto"
        onPress={() => {
          if (onPressCB) onPressCB();
        }}
      >
        <ButtonText>Tiếp</ButtonText>
      </Button>
    </HStack>
  );
};

const ProgressStep = () => {
  const pathname = usePathname(); // Get the current route
  const [progress, setProgress] = useState(0); // Track progress

  useEffect(() => {
    if (pathname.includes("date-range")) {
      setProgress(25);
    } else if (pathname.includes("kind-of-trip")) {
      setProgress(50);
    } else if (pathname.includes("budget")) {
      setProgress(75);
    } else if (pathname.includes("status")) {
      setProgress(100);
    } else {
      setProgress(0); // Default case
    }
  }, [pathname]); // Update progress when route changes

  return (
    <Progress
      className={cn("mt-8", {
        hidden: progress == 100,
      })}
      value={progress}
    >
      <ProgressFilledTrack />
    </Progress>
  );
};
export default function CreateLayout() {
  return (
    <Navigator router={StackRouter} routerOptions={{}} screenOptions={{}}>
      <VStack className="flex-1 px-6 gap-4 justify-center">
        <ProgressStep />
        <ScrollView className="flex-1">
          <Slot />
        </ScrollView>
      </VStack>
    </Navigator>
  );
}
