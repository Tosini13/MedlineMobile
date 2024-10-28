import { FontAwesome5 } from "@expo/vector-icons";
import { format } from "date-fns";
import { Box } from "native-base";
import { FC } from "react";
import { Text } from "../Themed";

type EventDateTimePropsType = {
  date: string;
  color?: string;
};

const EventDateTime: FC<EventDateTimePropsType> = ({ date, color }) => (
  <Box className="flex flex-row items-center space-x-1">
    <Box className="flex flex-row items-center">
      <FontAwesome5 name="calendar-alt" size={16} color={color} />
      <Text className="ml-1 text-base" style={{ color }}>
        {format(date, "dd.MM.yyyy")}
      </Text>
    </Box>
    <Box className="my-1 w-0 self-stretch border-r border-primary-accent" />
    <Box className="flex flex-row items-center">
      <FontAwesome5 name="clock" size={16} color={color} />
      <Text className="ml-1 text-base" style={{ color }}>
        {format(date, "HH:mm")}
      </Text>
    </Box>
  </Box>
);

export default EventDateTime;
