import { EventType } from "@/types";
import { format } from "date-fns";
import { FC } from "react";
import { Text, View } from "../Themed";

type EventTilePropsType = {
  event: EventType;
};

const EventTile: FC<EventTilePropsType> = ({ event }) => {
  return (
    <View className="flex flex-row rounded-lg bg-gray-100">
      <Text className="mx-4 my-6 text-2xl font-medium text-[#061C49]">
        {event.title}
      </Text>
      <Text className="text-md mx-4 my-auto ml-auto font-medium text-[#7c7e83]">
        {format(event.date, "HH:mm")}
      </Text>
    </View>
  );
};

export default EventTile;
