import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import React, { ComponentProps } from "react";
import WrapperIcon from "./WrapperIcon";

interface FontAwesomeProps extends ComponentProps<typeof FontAwesome> {}
interface FontAwesome5Props extends ComponentProps<typeof FontAwesome5> {}

interface IconFontAwesomeProps
  extends Omit<FontAwesome5Props, "name">,
    Omit<FontAwesomeProps, "name"> {
  name: FontAwesome5Props["name"] | FontAwesomeProps["name"];
  version?: 5 | 4;
  containerClassName?: string;
}

const IconFontAwesome = ({
  name,
  size = 24,
  color = "white",
  version = 5,
  className,
  containerClassName,
  ...rest
}: IconFontAwesomeProps) => {
  const MyIcon = version === 5 ? FontAwesome5 : FontAwesome;

  return (
    <WrapperIcon className={containerClassName}>
      <MyIcon
        name={name}
        size={size}
        color={color}
        className={`text-center ${className}`}
        {...rest}
      />
    </WrapperIcon>
  );
};

export default IconFontAwesome;
