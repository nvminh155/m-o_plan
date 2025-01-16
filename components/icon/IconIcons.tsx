import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import WrapperIcon from "./WrapperIcon";

interface IconIconsProps extends React.ComponentProps<typeof Ionicons> {
  containerClassName?: string;
}

const IconIcons = ({
  name,
  size = 24,
  color,
  className,
  containerClassName,
  ...rest
}: IconIconsProps) => {
  return (
    <WrapperIcon className={containerClassName}>
      <Ionicons
        name={name}
        size={size}
        color={color}
        className={`text-center ${className}`}
        {...rest}
      />
    </WrapperIcon>
  );
};

export default IconIcons;
