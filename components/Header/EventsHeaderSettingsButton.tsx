import React, { FC, useState } from "react";

import { LineType } from "@/types";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";

import { Pressable } from "react-native";

import { Box, Popover } from "native-base";
import { ActivityIndicator } from "react-native";
import { defaultHeaderButtonProps } from "./HeaderButton";

import { Text, useThemeColor } from "@/components/Themed";
import { API } from "@/services/api";

type EventsHeaderSettingsButtonPropsType = {
  lineId: string;
};

const EventsHeaderSettingsButton: FC<EventsHeaderSettingsButtonPropsType> = ({
  lineId,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const color = useThemeColor({}, "secondary");
  const borderColor = useThemeColor({}, "primary-accent-2");

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: () => API.lines.delete(lineId),
    onSuccess: (lineId) => {
      try {
        queryClient.setQueryData(["line", lineId], () => undefined);
        queryClient.setQueryData(["lines"], (old: LineType[]) =>
          old.filter((e) => e.id !== lineId),
        );
        setIsOpen(false);
        router.navigate("/(authorized)/lines");
      } catch (e) {
        console.log("e", e);
      }
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
      <Popover.Content
        w="40"
        className="bg-primary"
        right="8"
        top="-20"
        borderColor={borderColor}
      >
        <Popover.Body className="m-0 flex flex-col items-stretch border-primary-accent bg-primary p-0">
          <Pressable
            accessibilityLabel="Edit line"
            className="flex w-full flex-row items-center gap-x-3 border-primary-accent px-4 py-3"
            onPress={() => {
              setIsOpen(false);
              router.navigate(`/(authorized)/lines/${lineId}/edit`);
            }}
          >
            <MaterialCommunityIcons
              name="pencil-outline"
              size={24}
              color={color}
            />
            <Text className="text-xl">Edit</Text>
          </Pressable>
          <Box className="bg-primary-accent-2 h-[1px]" />
          <Pressable
            accessibilityLabel="Delete line"
            className="flex w-full flex-row items-center gap-x-3 px-4 py-3"
            onPress={() => mutate()}
          >
            {isPending ? (
              <ActivityIndicator color={color} />
            ) : (
              <MaterialCommunityIcons
                name="trash-can-outline"
                size={24}
                color={color}
              />
            )}
            <Text className="text-xl">Delete</Text>
          </Pressable>
        </Popover.Body>
      </Popover.Content>
    </Popover>
  );
};

export default EventsHeaderSettingsButton;
