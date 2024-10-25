import { eventTypesTranslationKeys } from "@/constants";
import { EventType } from "@/types";
import { Box } from "native-base";
import { FC } from "react";
import EventDateTime from "../EventDateTime/EventDateTime";
import { Text, useThemeColor } from "../Themed";

type EventTilePropsType = {
  event: EventType;
};

const EventTile: FC<EventTilePropsType> = ({ event }) => {
  const color = useThemeColor({}, "secondary-accent");
  return (
    <Box className="space-y-2 rounded-lg border border-primary-accent bg-primary p-4">
      <Box className="flex flex-row items-center justify-between">
        <EventDateTime date={event.date} color={color} />
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
        {event.documents && event.documents.length > 0 && (
          <Text className="ml-auto shrink-0 text-base text-secondary-accent">
            {`${event.documents.length} ${event.documents.length === 1 ? "document" : "documents"}`}
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default EventTile;
