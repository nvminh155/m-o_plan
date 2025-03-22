import { useRef, useState } from "react";

import { ScrollView, TouchableOpacity } from "react-native";
import { SearchIcon, CloseIcon, Icon } from "@/components/ui/icon";
import { Input, InputField, InputIcon } from "../ui/input";
import { VStack } from "../ui/vstack";
import { Spinner } from "../ui/spinner";
import { geoapifyService, TSearchResponse } from "@/services/geoapifyService";
import { Button, ButtonText } from "../ui/button";
import { HStack } from "../ui/hstack";
import { tripadvisorService } from "@/services/tripadvisor";
import { TTypeahead_LocationItem } from "@/types/tripadvisor/auto-complete";
import AppImage from "../image/AppImage";
import { Text } from "../ui/text";
import { Heading } from "../ui/heading";
import { Pressable } from "../ui/pressable";

interface SearchBarProps {
  onSearch?: (query: string) => void;
  onSelected?: (data: {
    address: string;
    latitude: number;
    longitude: number;
    geo_id?: string;
    location_id?: string;
  }) => void;
  isLoading?: boolean;
  defaultText?: string;
}

export const SearchBar = ({
  onSearch,
  isLoading = false,
  onSelected,
  defaultText = "",
}: SearchBarProps) => {
  const currentSelected = useRef<TTypeahead_LocationItem | undefined>(
    undefined
  );

  const [query, setQuery] = useState(defaultText);
  const [timeOutRef, setTimeOutRef] = useState<any>(null);
  const [addresses, setAddresses] = useState<TTypeahead_LocationItem[]>([]);

  const clearSearch = () => {
    setQuery("");
  };

  const fetchAddress = async (text: string) => {
    const res = await tripadvisorService.autoComplete({ query: text });
    // setAddresses(data);

    const names = res.data.Typeahead_autocomplete.results.filter(
      (r) => r.__typename === "Typeahead_LocationItem"
    )[0].detailsV2.names;
    const geocode = res.data.Typeahead_autocomplete.results.filter(
      (r) => r.__typename === "Typeahead_LocationItem"
    )[0].detailsV2.geocode;

    setAddresses(
      res.data.Typeahead_autocomplete.results.filter(
        (r) => r.__typename === "Typeahead_LocationItem"
      )
    );
    console.log(
      "data_Typeahead_LocationItem => ",
      res.data.Typeahead_autocomplete.results
        .filter((r) => r.__typename === "Typeahead_LocationItem")
        .map((item) => {
          return {
            names: item.detailsV2.names,
            geocode: item.detailsV2.geocode,
          };
        })
    );
  };

  const handleSearch = (text: string) => {
    clearTimeout(timeOutRef);

    if (!text.trim()) {
      setQuery("");
      return;
    }

    setTimeOutRef(
      setTimeout(() => {
        fetchAddress(text);
      }, 1000)
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
          className="bg-white h-auto max-h-[200px] border"
          style={{
            elevation: 2,
          }}
        >
          {/* {addresses.map((addr, i) => (
            <Button
              key={i + 1}
              action="default"
              variant="default"
              onPress={() => {
                setQuery(addr.formatted);
                currentSelected.current = addr;
                if (onSelected) onSelected(addr);
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
          ))} */}

          {addresses.slice(0,5).map(({ image, detailsV2, documentId }, i) => {
            //w={width}&h={height}&s=1
            const img_w = 100,
              img_h = 100;

            return (
              <Pressable
                key={i + 1}
                className="px-2 py-4 flex flex-row gap-4"
                onPress={() => {
                  const ids = documentId.split(";");

                  if (onSelected)
                    onSelected({
                      address: detailsV2.names.name,
                      latitude: detailsV2.geocode.latitude,
                      longitude: detailsV2.geocode.longitude,
                      geo_id: detailsV2.isGeo ? `${ids[3]}` : "",
                      location_id: ids[1],
                    });
                }}
              >
                <AppImage
                  source={{
                    uri: image.photo.photoSizeDynamic.urlTemplate
                      .replace("{width}", img_w.toString())
                      .replace("{height}", img_h.toString()),
                  }}
                  className={`w-full h-full max-w-[50px] max-h-[50px] rounded-md`}
                />
                <VStack className="flex-1">
                  <Heading size="sm" className="text-wrap flex-1">
                    {detailsV2.names.name}
                  </Heading>
                  <Text className="text-gray-400" size="sm">
                    {detailsV2.names.longOnlyHierarchyTypeaheadV2}
                  </Text>
                </VStack>
              </Pressable>
            );
          })}
        </ScrollView>
      )}
    </VStack>
  );
};
