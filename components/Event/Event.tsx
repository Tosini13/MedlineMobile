import { EventType } from "@/types";
import { format } from "date-fns";
import { FC } from "react";
import EventIcon from "../EventIcon/EventIcon";
import { Text, View } from "../Themed";

type EventPropsType = { event: EventType };

const Event: FC<EventPropsType> = ({
  event: { title, description, date, type },
}) => {
  return (
    <View data-testid="event" className="flex flex-col items-stretch gap-y-2">
      <View className="flex flex-row items-center justify-between">
        <View className="flex flex-row items-center justify-between">
          <EventIcon type={type} />
          <Text className="ml-2 text-lg font-medium text-[#061C49] first-letter:capitalize">
            {type}
          </Text>
        </View>
        <Text className="text-lg">{format(date, "HH:mm dd MMM yyyy")}</Text>
      </View>
      <Text className="text-2xl font-medium text-[#061C49]">{title}</Text>
      <Text className="text-base font-light text-[#061C49]">{description}</Text>
    </View>
  );
};

export default Event;
