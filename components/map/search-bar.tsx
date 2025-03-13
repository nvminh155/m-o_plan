import { useRef, useState } from "react";

import { ScrollView, TouchableOpacity } from "react-native";
import {
  SearchIcon,
  CloseIcon,
  Icon,
} from "@/components/ui/icon";
import { Input, InputField, InputIcon } from "../ui/input";
import { VStack } from "../ui/vstack";
import { Spinner } from "../ui/spinner";
import { geoapifyService, TSearchResponse } from "@/services/geoapifyService";
import { Button, ButtonText } from "../ui/button";
import { HStack } from "../ui/hstack";

interface SearchBarProps {
  onSearch?: (query: string) => void;
  onSelected?: (data: TSearchResponse) => void;
  isLoading?: boolean;
  defaultText?: string;
}

export const SearchBar = ({ onSearch, isLoading = false, onSelected, defaultText="" }: SearchBarProps) => {
  const currentSelected = useRef<TSearchResponse | undefined>(undefined)

  const [query, setQuery] = useState(defaultText);
  const [timeOutRef, setTimeOutRef] = useState<any>(null);
  const [addresses, setAddresses] = useState<TSearchResponse[]>([]);

  const clearSearch = () => {
    setQuery("");
  };

  const fetchAddress = async (text: string) => {
    const data = await geoapifyService.autoComplete(text);
    setAddresses(data);
    console.log("data", data, data.length);
  };

  const handleSearch = (text: string) => {
    clearTimeout(timeOutRef);

    if (!text.trim()) {
      setQuery("");
      return
    }

    setTimeOutRef(
      setTimeout(() => {
        fetchAddress(text);
      }, 1500)
    );

    setQuery(text);
  };

  return (
    <VStack className="relative h-auto">
      <Input size="md" className="bg-white shadow-md">
        <InputIcon as={SearchIcon} />
        <InputField
          placeholder="Tìm kiếm địa điểm..."
          value={query}
          onChangeText={handleSearch}
        />
        {isLoading ? (
          <InputIcon>
            <Spinner size="small" />
          </InputIcon>
        ) : query ? (
          <InputIcon>
            <TouchableOpacity onPress={clearSearch}>
              <Icon as={CloseIcon} />
            </TouchableOpacity>
          </InputIcon>
        ) : null}
      </Input>

      {addresses.length > 0 && (
        <ScrollView
          className="bg-white h-[200px] border"
          style={{
            elevation: 2,
          }}
        >
          {addresses.map((addr, i) => (
            <Button
              key={i + 1}
              action="default"
              variant="default"
              onPress={() => {
                setQuery(addr.formatted);
                currentSelected.current = addr
                if(onSelected) onSelected(addr)
              }}
              className="flex flex-row justify-start h-auto py-2"
            >
              <HStack className="gap-2 flex-wrap">
                <ButtonText>{addr.address_line1}</ButtonText>
                <ButtonText size="sm" className="text-gray-400 font-normal">
                  {addr.address_line2}
                </ButtonText>
              </HStack>
            </Button>
          ))}
        </ScrollView>
      )}
    </VStack>
  );
};
