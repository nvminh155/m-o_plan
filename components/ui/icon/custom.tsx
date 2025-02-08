"use client";
import React from "react";

import { Path } from "react-native-svg";
import { createIcon, Svg } from "@gluestack-ui/icon";

const BarOutlineIcon = createIcon({
  Root: Svg,
  viewBox: "0 0 16 16",
  path: (
    <>
      <Path
        fill="currentColor"
        fillRule="evenodd"
        d="M14 5H2V3h12zm0 4H2V7h12zM2 13h12v-2H2z"
        clipRule="evenodd"
      />
    </>
  ),
});

BarOutlineIcon.displayName = "BarOutlineIcon";
export { BarOutlineIcon };
