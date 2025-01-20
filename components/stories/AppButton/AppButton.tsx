import { tv, type VariantProps } from "tailwind-variants";

import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import AppText from "@/components/ui/AppText";
import { cn } from "@/lib/cn";
import { cssInterop } from "nativewind";

const className = "h-12 p-3 px-5";

cssInterop(TouchableOpacity, {
  className: {
    target: "style",
  },
});

const button = tv({
  // Common styles
  slots: {
    text: "text-primary-foreground",
    icon: "text-primary-foreground",
    base: "font-medium  rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 justify-center flex bg-primary text-base flex-row block justify-center items-center gap-2",
  },
  variants: {
    variant: {
      primary: {
        text: "text-primary-foreground",
      },
      secondary: {
        base: "bg-secondary text-secondary-foreground focus:ring-purple-400",
        text: "text-secondary-foreground",
      },
      ghost: {
        base: "bg-gray-100",
        text: "text-color/60 font-medium",
      },
      outline: {
        base: "border border-gray-300 text-foreground bg-transparent hover:bg-gray-100 focus:ring-gray-200",
        text: "text-gray-700",
      },
    },
    size: {
      small: "px-3 py-1 text-xs",
      medium: "px-5 py-2 text-sm",
      large: "px-7 py-3 text-base",
      icon: "h-16 w-16 !rounded-full",
    },
    disabled: {
      true: "opacity-50 cursor-not-allowed bg-gray-300 text-gray-600 pointer-events-none",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "medium",
  },
});
type ButtonVariants = VariantProps<typeof button>;

export interface AppButtonProps extends TouchableOpacityProps, ButtonVariants {
  onPress?: () => void;
  text?: string;
  className?: string;
  children?: React.ReactNode;
  prefix?: React.ReactNode | string;
  suffix?: React.ReactNode | string;
}

const AppButton = ({
  className,
  children,
  text,
  prefix,
  suffix,

  variant,
  size,

  onPress,
  ...rest
}: AppButtonProps) => {
  const { base, text: textSlot } = button({ variant, size });

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      {...rest}
      className={cn(base(), className)}
    >
      {prefix}
      {text && <AppText className={textSlot()} text={text} />}
      {children}
      {suffix}
    </TouchableOpacity>
  );
};

export default AppButton;
