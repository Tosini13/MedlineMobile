import { EventType } from "@/types";
import { FC } from "react";
import EventIcon from "../EventIcon/EventIcon";
import { Text, View } from "../Themed";

const getTypeName = (type: EventType["type"]) => {
  switch (type) {
    case "MA":
      return "appointment";
    case "MT":
      return "test";
    case "S":
      return "surgery";
    case "O":
      return "occurrence";
    default:
      return "question";
  }
};

type EventTileIconPropsType = {
  type: EventType["type"];
};

const EventTileIcon: FC<EventTileIconPropsType> = ({ type }) => {
  return (
    <View
      data-testid="event_tile_icon"
      className="flex h-fit w-16 flex-col bg-transparent"
    >
      <View className="mx-auto">
        <EventIcon type={type} />
      </View>
      <Text className="mx-auto mt-0.5 text-center text-xs text-[#061C49]">
        {getTypeName(type)}
      </Text>
    </View>
  );
};

export default EventTileIcon;
