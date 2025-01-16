import AntDesign from "@expo/vector-icons/AntDesign";

import React from "react";
import WrapperIcon from "./WrapperIcon";

interface IconAntDesignProps extends React.ComponentProps<typeof AntDesign> {
  containerClassName?: string;
}

const IconAntd = ({
  name,
  size = 24,
  color,
  className,
  containerClassName,
  ...rest
}: IconAntDesignProps) => {
  return (
    <WrapperIcon className={containerClassName}>
      <AntDesign
        name={name}
        size={size}
        color={color}
        className={`text-center ${className}`}
        {...rest}
      />
    </WrapperIcon>
  );
};

export default IconAntd;
