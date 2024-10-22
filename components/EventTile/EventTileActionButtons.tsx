import { FC } from "react";
import { ActivityIndicator, TouchableHighlight } from "react-native";

import { View } from "@/components/Themed";
import { MaterialIcons } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useSwipeableItemParams } from "react-native-swipeable-item";

import { API } from "@/services/api";
import { useUpdateCache } from "@/services/useUpdateCache";
import React from "react";

type EventTileActionButtonsPropsType = {
  lineId: string;
  eventId: string;
};

const EventTileActionButtons: FC<EventTileActionButtonsPropsType> = ({
  lineId,
  eventId,
}) => {
  const router = useRouter();
  const { close } = useSwipeableItemParams();

  const { onDeleteEvent } = useUpdateCache();
  const { mutate, isPending } = useMutation({
    mutationFn: () => API.events.delete(lineId, eventId),
    onSuccess: () => {
      console.log("event deleted !log");
      onDeleteEvent(lineId, eventId);
      close();
    },
  });

  return (
    <View className="flex flex-row-reverse items-stretch bg-transparent">
      <TouchableHighlight
        onPress={() =>
          router.navigate(
            `/(authorized)/lines/${lineId}/events/${eventId}/edit`,
          )
        }
        className="w-16"
      >
        <View className="flex h-full w-full items-center justify-center bg-blue-500">
          <MaterialIcons name="edit" size={25} color="white" />
        </View>
      </TouchableHighlight>
      <TouchableHighlight onPress={() => mutate()} className="w-16">
        <View className="flex h-full w-full items-center justify-center bg-red-500">
          {isPending ? (
            <ActivityIndicator color="white" />
          ) : (
            <MaterialIcons name="delete" size={25} color="white" />
          )}
        </View>
      </TouchableHighlight>
    </View>
  );
};

export default EventTileActionButtons;
