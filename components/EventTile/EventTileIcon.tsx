import { eventTypesTranslationKeys } from "@/constants";
import { EventType } from "@/types";
import { FC } from "react";
import EventIcon from "../EventIcon/EventIcon";
import { Text, View } from "../Themed";

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
        {eventTypesTranslationKeys[type]}
      </Text>
    </View>
  );
};

export default EventTileIcon;
