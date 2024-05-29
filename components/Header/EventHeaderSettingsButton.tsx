import React, { FC, useState } from "react";

import { invokeAsyncWithDelay } from "@/helpers/helpers";
import { LineType } from "@/types";
import { Feather } from "@expo/vector-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";

import { Pressable } from "react-native";

import { Box, Popover } from "native-base";
import { ActivityIndicator } from "react-native";
import { defaultHeaderButtonProps } from "./HeaderButton";

import { Text } from "@/components/Themed";
import { MaterialIcons } from "@expo/vector-icons";

type EventHeaderSettingsButtonPropsType = {
  lineId: string;
};

const EventHeaderSettingsButton: FC<EventHeaderSettingsButtonPropsType> = ({
  lineId,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (value: string) =>
      invokeAsyncWithDelay(() => {
        return value;
      }),
    onSuccess: (lineId) => {
      const updateLines = (old: LineType[]) =>
        old.filter((e) => e.id !== lineId);

      queryClient.setQueryData(["line", lineId], updateLines);
      queryClient.setQueryData(["lines"], updateLines);
      setIsOpen(false);
      router.navigate("/lines");
    },
  });

  const items = [
    <Pressable
      accessibilityLabel="Edit line"
      className="flex h-full w-full flex-row items-center gap-x-4"
      onPress={() => {
        setIsOpen(false);
        router.navigate(`/lines/${lineId}/edit`);
      }}
    >
      <MaterialIcons name="edit" size={26} color="black" />
      <Text className="text-xl">Edit</Text>
    </Pressable>,
    <Pressable
      accessibilityLabel="Delete event"
      className="flex h-full w-full flex-row  items-center gap-x-4"
      onPress={() => mutate(lineId)}
    >
      {isPending ? (
        <ActivityIndicator color="black" />
      ) : (
        <MaterialIcons name="delete" size={26} color="black" />
      )}
      <Text className="text-xl">Delete</Text>
    </Pressable>,
  ];

  return (
    <Popover
      trigger={(triggerProps) => (
        <Pressable
          {...triggerProps}
          style={defaultHeaderButtonProps.style}
          onPress={() => setIsOpen(true)}
        >
          <Feather
            name="settings"
            size={24}
            color={defaultHeaderButtonProps.icon.color}
          />
        </Pressable>
      )}
      isOpen={isOpen}
      onClose={() => setIsOpen(!isOpen)}
    >
      <Popover.Content w="40" className="bg-white">
        <Popover.Body className="m-0 flex flex-col items-stretch p-0">
          <Pressable
            accessibilityLabel="Edit line"
            className="flex w-full flex-row items-center gap-x-4 px-4 py-3"
            onPress={() => {
              setIsOpen(false);
              router.navigate(`/lines/${lineId}/edit`);
            }}
          >
            <MaterialIcons name="edit" size={26} color="black" />
            <Text className="text-xl">Edit</Text>
          </Pressable>
          <Box className="h-[1px] bg-gray-300" />
          <Pressable
            accessibilityLabel="Delete event"
            className="flex w-full flex-row  items-center gap-x-4 px-4 py-3"
            onPress={() => mutate(lineId)}
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
