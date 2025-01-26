import React from "react";
import WrapperIcon from "./WrapperIcon";
import { Entypo } from "@expo/vector-icons";

interface IconEntypoProps extends React.ComponentProps<typeof Entypo> {
  containerClassName?: string;
}

const IconEntypo = ({
  name,
  size = 24,
  color = "white",
  className,
  containerClassName,
  ...rest
}: IconEntypoProps) => {
  return (
    <WrapperIcon className={containerClassName}>
      <Entypo
        name={name}
        size={size}
        color={color}
        className={`text-center ${className}`}
        {...rest}
      />
    </WrapperIcon>
  );
};

export default IconEntypo;
