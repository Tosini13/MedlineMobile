import { Box } from "native-base";
import { FC } from "react";
import { ActivityIndicator } from "react-native";
import { Text } from "../Themed";
import { defaultHeaderButtonProps } from "./HeaderButton";

type HeaderTitlePropsType = {
  title: string;
  subtitle?: string;
  isPending?: boolean;
};

const HeaderTitle: FC<HeaderTitlePropsType> = ({
  title,
  subtitle,
  isPending,
}) => {
  if (isPending) {
    return (
      <Box data-testid="header_title" className="mx-auto">
        <ActivityIndicator
          color={defaultHeaderButtonProps.icon.color}
          size={defaultHeaderButtonProps.icon.size}
        />
      </Box>
    );
  }
  return (
    <Box
      data-testid="header_title"
      className="flex flex-col items-center justify-center space-y-0.5"
    >
      <Text className="text-center font-semibold text-white">{title}</Text>
      {subtitle && <Text className="text-center text-white">{subtitle}</Text>}
    </Box>
  );
};

export default HeaderTitle;
