import { Box } from "native-base";
import { FC } from "react";
import ColorDot from "../ColorDot/ColorDot";
import { Text } from "../Themed";

type EventsHeaderTitlePropsType = {
  title: string;
  color: string;
};

const EventsHeaderTitle: FC<EventsHeaderTitlePropsType> = ({
  title,
  color,
}) => (
  <Box className="flex flex-row items-center">
    <ColorDot color={color} />
    <Text className="mx-2 text-xl font-medium text-secondary">{title}</Text>
  </Box>
);

export default EventsHeaderTitle;
