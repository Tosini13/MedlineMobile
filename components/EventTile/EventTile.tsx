import { eventTypesTranslationKeys } from "@/constants";
import { EventType } from "@/types";
import { FontAwesome5 } from "@expo/vector-icons";
import { format } from "date-fns";
import { Box } from "native-base";
import { FC } from "react";
import { Text, useThemeColor } from "../Themed";

type EventTilePropsType = {
  event: EventType;
};

const EventTile: FC<EventTilePropsType> = ({ event }) => {
  const color = useThemeColor({}, "secondary-accent");
  return (
    <Box className="space-y-2 rounded-lg border border-primary-accent bg-primary p-4">
      <Box className="flex flex-row items-center justify-between">
        <Box className="flex flex-row items-center space-x-2">
          <Box className="flex flex-row items-center">
            <FontAwesome5 name="calendar-alt" size={16} color={color} />
            <Text className="ml-1.5 text-base text-secondary-accent">
              {format(event.date, "dd.MM.yyyy")}
            </Text>
          </Box>
          <Box className="flex flex-row items-center">
            <FontAwesome5 name="clock" size={16} color={color} />
            <Text className="ml-1.5 text-base text-secondary-accent">
              {format(event.date, "HH:mm")}
            </Text>
          </Box>
        </Box>
        <Text className="text-base text-secondary-accent">
          {eventTypesTranslationKeys[event.type]}
        </Text>
      </Box>
      <Box className="flex flex-row items-end justify-between space-x-2">
        <Text
          numberOfLines={2}
          className="flex-1 text-2xl font-medium text-secondary"
        >
          {event.title}
        </Text>
        <Text className="text-md ml-auto shrink-0 text-base text-secondary-accent">
          {event.documents && event.documents.length > 0
            ? `${event.documents.length} ${event.documents.length === 1 ? "document" : "documents"}`
            : "no documents"}
        </Text>
      </Box>
    </Box>
  );
};

export default EventTile;
