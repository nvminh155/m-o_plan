import { Heading } from "@/components/ui/heading";
import { Spinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import React, { useEffect } from "react";

const step: {
  key: string;
  label: string;
  id: number;
}[] = [
  {
    key: "destination",
    label: "Điểm đến",
    id: 1,
  },
  {
    key: "date",
    label: "Ngày đi",
    id: 2,
  },
  {
    key: "budget",
    label: "Ngân sách",
    id: 3,
  },
  {
    key: "kind",
    label: "Loại hình",
    id: 4,
  },
  {
    key: "built",
    label: "Xây dựng",
    id: 5,
  },
];

const TripBuilt = () => {
  const [message, setMessage] = React.useState<string>("");

  useEffect(() => {
    const us = setInterval(() => {
      
    }, 500);

    return () => {
      clearInterval(us);
    };
  }, []);

  return (
    <VStack className="flex-1 justify-center items-center">
      <Heading size="xl">{message}</Heading>
      <Spinner />
    </VStack>
  );
};

export default TripBuilt;
