import { FontAwesome6 } from "@expo/vector-icons";
import React, { ComponentProps } from "react";
import WrapperIcon from "./WrapperIcon";

interface FontAwesome6Props extends ComponentProps<typeof FontAwesome6> {}

interface IconFontAwesomeProps extends FontAwesome6Props {
  containerClassName?: string;
}

const IconFontAwesome6 = ({
  name,
  size = 24,
  color = "white",
  className,
  containerClassName,
  ...rest
}: IconFontAwesomeProps) => {
  return (
    <WrapperIcon className={containerClassName}>
      <FontAwesome6
        name={name}
        size={size}
        color={color}
        className={`text-center ${className}`}
        {...rest}
      />
    </WrapperIcon>
  );
};

export default IconFontAwesome6;
