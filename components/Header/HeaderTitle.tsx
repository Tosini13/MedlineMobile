import { Box } from "native-base";
import { FC } from "react";
import { Text } from "../Themed";

type HeaderTitlePropsType = {
  title: string;
  subtitle?: string;
};

const HeaderTitle: FC<HeaderTitlePropsType> = ({ title, subtitle }) => {
  return (
    <Box data-testid="header_title">
      <Text className="text-center font-semibold text-white">{title}</Text>
      {subtitle && <Text className="text-center text-white">{subtitle}</Text>}
    </Box>
  );
};

export default HeaderTitle;
