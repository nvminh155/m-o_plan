import { VStack } from "@/components/ui/vstack";
import React, { useState } from "react";
import ButtonNextStep from "./button-next-step";
import { useCreatePlanStore } from "@/stores/create-plans-store";
import { cn } from "@/lib/cn";
import { Input, InputField } from "@/components/ui/input";
import {
  Button,
  ButtonGroup,
  ButtonIcon,
  ButtonText,
} from "@/components/ui/button";
import { CloseIcon, SearchIcon } from "@/components/ui/icon";
import { FlatList, ListRenderItemInfo } from "react-native";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";

interface FormCreateFriendsProps {
  isShow?: boolean;
}

const FormCreateFriends = ({ isShow }: FormCreateFriendsProps) => {
  const updateStep = useCreatePlanStore((state) => state.updateStep);
  
  const [searchBy, setSearchBy] = useState<"phone" | "email">("email");
  const [friends, setFriends] = useState<string[]>([]);
  const [userSearched, setUserSearched] = useState<string | null>(null);

  const renderFriend = ({ item }: ListRenderItemInfo<string>) => {
    return (
      <HStack>
        <Text>{item}</Text>
        <Button>
          <ButtonIcon as={CloseIcon} />
        </Button>
      </HStack>
    );
  };

  const renderUser = ({ item }: ListRenderItemInfo<string>) => {
    return (
      <HStack>
        <Text>{item}</Text>
        <Button>
          <ButtonIcon as={CloseIcon} />
        </Button>
      </HStack>
    );
  };

  const handleSearch = () => {
    console.log("search");
  };

  return (
    <VStack
      className={cn("flex-1", {
        hidden: !isShow,
      })}
    >
      <ButtonGroup>
        <Button
          action={searchBy === "phone" ? "primary" : "secondary"}
          onPress={() => setSearchBy("phone")}
        >
          <ButtonText>Số điện thoại</ButtonText>
        </Button>
        <Button
          action={searchBy === "email" ? "primary" : "secondary"}
          onPress={() => setSearchBy("email")}
        >
          <ButtonText>Email</ButtonText>
        </Button>
      </ButtonGroup>
      <Input size="lg" className="mt-4">
        <InputField
          placeholder={`Nhập ${
            searchBy === "phone" ? "số điện thoại" : "email"
          } cần tìm ...`}
        />
        <Button variant="link" size="xl" onPress={() => handleSearch()}>
          <ButtonIcon as={SearchIcon} className="!text-primary-500" />
        </Button>
      </Input>

      <FlatList data={userSearched} renderItem={renderUser} />

      <FlatList data={friends} renderItem={renderFriend} />

      <ButtonNextStep
        onNext={() => {
          updateStep(1);
        }}
      />
    </VStack>
  );
};

export default FormCreateFriends;
