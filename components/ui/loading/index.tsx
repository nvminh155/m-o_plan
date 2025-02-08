import React from "react";
import { VStack } from "../vstack";
import { Spinner } from "../spinner";
import { Text } from "../text";

const Loading = () => {
  return (
    <VStack className="gap-4 flex-1 items-center justify-center bg-background-500">
      <Spinner />
      <Text>Đang tải dữ liệu...</Text>
    </VStack>
  );
};

export default Loading;
