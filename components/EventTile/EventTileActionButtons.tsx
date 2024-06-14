import { FC } from "react";
import { ActivityIndicator, TouchableHighlight } from "react-native";

import { View } from "@/components/Themed";
import { EventType } from "@/types";
import { MaterialIcons } from "@expo/vector-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useSwipeableItemParams } from "react-native-swipeable-item";

import { API } from "@/services/api";
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

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: () => API.events.delete(lineId, eventId),
    onSuccess: () => {
      const updateLineEvents = (old: EventType[]) =>
        old.filter((e) => e.id !== eventId);

      queryClient.setQueryData(["lineEvents", lineId], updateLineEvents);
      queryClient.setQueryData(
        ["lineEvents", lineId, eventId],
        updateLineEvents,
      );
      close();
    },
  });

  return (
    <View className="flex flex-row-reverse items-stretch bg-transparent">
      <TouchableHighlight
        onPress={() =>
          router.navigate(`/lines/${lineId}/events/${eventId}/edit`)
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
