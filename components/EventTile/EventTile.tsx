import { EventType } from "@/types";
import { format } from "date-fns";
import { FC } from "react";
import { Text, View } from "../Themed";
import EventTileIcon from "./EventTileIcon";

type EventTilePropsType = {
  event: EventType;
};

const EventTile: FC<EventTilePropsType> = ({ event }) => {
  return (
    <View className="flex flex-row rounded-lg bg-gray-100 px-3 py-3">
      <View className="my-auto h-fit bg-transparent">
        <EventTileIcon type={event.type} />
      </View>
      <Text
        numberOfLines={2}
        className="mx-3 my-auto flex-1 text-2xl font-medium text-[#061C49]"
      >
        {event.title}
      </Text>
      <Text className="text-md my-auto ml-auto font-medium text-[#7c7e83]">
        {format(event.date, "HH:mm")}
      </Text>
    </View>
  );
};

export default EventTile;
