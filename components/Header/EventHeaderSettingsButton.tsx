import { FC } from "react";
import { ActivityIndicator } from "react-native";

import { Text } from "@/components/Themed";
import { invokeAsyncWithDelay } from "@/helpers/helpers";
import { LineType } from "@/types";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useRouter } from "expo-router";

import React from "react";
import { Pressable } from "react-native";

import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
import { defaultHeaderButtonProps } from "./HeaderButton";

type EventHeaderSettingsButtonPropsType = {
  lineId: string;
};

const EventHeaderSettingsButton: FC<EventHeaderSettingsButtonPropsType> = ({
  lineId,
}) => {
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
      router.navigate("/lines");
    },
  });

  return (
    <Menu>
      <MenuTrigger style={defaultHeaderButtonProps.style}>
        <Feather
          name="settings"
          size={24}
          color={defaultHeaderButtonProps.icon.color}
        />
      </MenuTrigger>
      <MenuOptions>
        <MenuOption>
          <Link href={`/lines/${lineId}/edit`} asChild>
            <Pressable
              accessibilityLabel="Edit line"
              className="flex flex-row items-center gap-x-4"
            >
              <MaterialIcons name="edit" size={26} color="black" />
              <Text className="text-xl">Edit</Text>
            </Pressable>
          </Link>
        </MenuOption>
        <MenuOption>
          <Pressable
            accessibilityLabel="Delete event"
            className="flex flex-row items-center gap-x-4"
            onPress={() => mutate(lineId)}
          >
            {isPending ? (
              <ActivityIndicator color="black" />
            ) : (
              <MaterialIcons name="delete" size={26} color="black" />
            )}
            <Text className="text-xl">Delete</Text>
          </Pressable>
        </MenuOption>
      </MenuOptions>
    </Menu>
  );
};

export default EventHeaderSettingsButton;
