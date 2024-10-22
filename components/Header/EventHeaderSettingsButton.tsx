import React, { FC, useState } from "react";

import { Feather } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";

import { Pressable } from "react-native";

import { Box, Popover } from "native-base";
import { ActivityIndicator } from "react-native";
import { defaultHeaderButtonProps } from "./HeaderButton";

import { Text, useThemeColor } from "@/components/Themed";
import { API } from "@/services/api";
import { useUpdateCache } from "@/services/useUpdateCache";
import { routes } from "@/utils/utils";
import { MaterialIcons } from "@expo/vector-icons";

type EventHeaderSettingsButtonPropsType = {
  lineId: string;
  eventId: string;
};

const EventHeaderSettingsButton: FC<EventHeaderSettingsButtonPropsType> = ({
  lineId,
  eventId,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const color = useThemeColor({}, "secondary");

  const { onDeleteEvent } = useUpdateCache();
  const { mutate, isPending } = useMutation({
    mutationFn: () => API.events.delete(lineId, eventId),
    onSuccess: () => {
      onDeleteEvent(lineId, eventId);
      setIsOpen(false);
      lineId &&
        eventId &&
        router.replace(routes.events.replace("[lineId]", lineId));
    },
  });

  return (
    <Popover
      trigger={(triggerProps) => (
        <Pressable
          {...triggerProps}
          style={defaultHeaderButtonProps.style}
          onPress={() => setIsOpen(true)}
        >
          <Feather name="settings" size={24} color={color} />
        </Pressable>
      )}
      isOpen={isOpen}
      onClose={() => setIsOpen(!isOpen)}
    >
      <Popover.Content w="40" className="bg-primary">
        <Popover.Body className="m-0 flex flex-col items-stretch p-0">
          <Pressable
            accessibilityLabel="Edit line"
            className="flex w-full flex-row items-center gap-x-4 px-4 py-3"
            onPress={() => {
              setIsOpen(false);
              router.navigate(
                `/(authorized)/lines/${lineId}/events/${eventId}/edit`,
              );
            }}
          >
            <MaterialIcons name="edit" size={26} color="black" />
            <Text className="text-xl">Edit</Text>
          </Pressable>
          <Box className="h-[1px] bg-gray-300" />
          <Pressable
            accessibilityLabel="Delete line"
            className="flex w-full flex-row items-center gap-x-4 px-4 py-3"
            onPress={() => mutate()}
          >
            {isPending ? (
              <ActivityIndicator color="black" />
            ) : (
              <MaterialIcons name="delete" size={26} color="black" />
            )}
            <Text className="text-xl">Delete</Text>
          </Pressable>
        </Popover.Body>
      </Popover.Content>
    </Popover>
  );
};

export default EventHeaderSettingsButton;
