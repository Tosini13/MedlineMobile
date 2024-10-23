import { FC } from "react";
import { TouchableOpacity } from "react-native";

import { Box } from "native-base";

import React from "react";

type ScreenButtonPropsType = {
  children: React.ReactNode;
  onPress: () => void;
};

const ScreenButton: FC<ScreenButtonPropsType> = ({ onPress, children }) => (
  <TouchableOpacity onPress={onPress}>
    <Box className="rounded-lg border border-dashed border-secondary-accent bg-primary-accent p-4">
      <Box className="mx-auto flex w-fit flex-row items-center space-x-2">
        {children}
      </Box>
    </Box>
  </TouchableOpacity>
);

export default ScreenButton;
