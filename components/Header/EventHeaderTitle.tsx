import { Box } from "native-base";
import { FC } from "react";
import { Text } from "../Themed";

type EventHeaderTitlePropsType = {
  title: string;
  color: string;
};

const EventHeaderTitle: FC<EventHeaderTitlePropsType> = ({ title, color }) => (
  <Box className="relative overflow-hidden rounded-full">
    <Box
      className="absolute left-0 top-0 h-full w-full opacity-10"
      style={{
        backgroundColor: color,
      }}
    />
    <Text
      className="mx-2 my-1 text-base font-medium"
      style={{
        color: color,
      }}
    >
      {title}
    </Text>
  </Box>
);

export default EventHeaderTitle;
