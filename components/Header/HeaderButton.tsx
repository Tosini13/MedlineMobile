import { forwardRef } from "react";

import React from "react";
import { Pressable, PressableProps, StyleProp, ViewStyle } from "react-native";
import { twMerge } from "tailwind-merge";

const defaultStyle: StyleProp<ViewStyle> = {
  width: 42,
  height: 42,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export const defaultHeaderButtonProps = {
  icon: {
    size: 28,
    color: "white",
  },
  style: defaultStyle,
};

type HeaderButtonPropsType = PressableProps & {
  children: React.ReactNode;
};

const HeaderButton = forwardRef<any, HeaderButtonPropsType>(
  ({ children, className, ...props }, ref) => {
    return (
      <Pressable
        ref={ref}
        className={twMerge(
          "center flex items-center justify-center",
          className,
        )}
        style={defaultHeaderButtonProps.style}
        {...props}
      >
        {children}
      </Pressable>
    );
  },
);

export default HeaderButton;
