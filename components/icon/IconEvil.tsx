import EvilIcons from "@expo/vector-icons/EvilIcons";

import React from "react";
import WrapperIcon from "./WrapperIcon";

interface IconEvilProps extends React.ComponentProps<typeof EvilIcons> {
  containerClassName?: string;
}

const IconEvil = ({
  name,
  size = 24,
  color = "white",
  className,
  containerClassName,
  ...rest
}: IconEvilProps) => {
  return (
    <WrapperIcon className={containerClassName}>
      <EvilIcons
        name={name}
        size={size}
        color={color}
        className={`text-center ${className}`}
        {...rest}
      />
    </WrapperIcon>
  );
};

export default IconEvil;
