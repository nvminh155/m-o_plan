import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import React from "react";
import WrapperIcon from "./WrapperIcon";

interface IconMaterialCommunityProps
  extends React.ComponentProps<typeof MaterialCommunityIcons> {
  containerClassName?: string;
}

const IconMaterialCommunity = ({
  name,
  size = 24,
  color = "white",
  className,
  containerClassName,
  ...rest
}: IconMaterialCommunityProps) => {
  return (
    <WrapperIcon className={containerClassName}>
      <MaterialCommunityIcons
        name={name}
        size={size}
        color={color}
        className={`text-center ${className}`}
        {...rest}
      />
    </WrapperIcon>
  );
};

export default IconMaterialCommunity;
