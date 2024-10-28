import { FC } from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

import { Box } from "native-base";

import React from "react";
import { useThemeColor } from "../Themed";

const ScreenButton: FC<TouchableOpacityProps> = ({ onPress, children }) => {
  const borderColor = useThemeColor({}, "secondary-accent");
  return (
    <TouchableOpacity onPress={onPress}>
      <Box
        className="bg-primary-accent p-4"
        style={{
          borderWidth: 1,
          borderColor: borderColor,
          borderStyle: "dashed",
          borderRadius: 8,
        }}
      >
        <Box className="mx-auto flex w-fit flex-row items-center space-x-2">
          {children}
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

export default ScreenButton;
