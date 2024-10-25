import React, { FC } from "react";

import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

import { ActivityIndicator, Pressable } from "react-native";

import { Box, Popover } from "native-base";
import { defaultHeaderButtonProps } from "./HeaderButton";

import { Text, useThemeColor } from "@/components/Themed";

export type HeaderSettingsItem = {
  label: string;
  icon: "trash-can-outline" | "pencil-outline";
  isPending?: boolean;
  onPress: () => void;
};

type HeaderSettingsButtonPropsType = {
  isOpen: boolean;
  items: HeaderSettingsItem[];
  onToggle: () => void;
  onClose: () => void;
};

const HeaderSettingsButton: FC<HeaderSettingsButtonPropsType> = ({
  isOpen,
  items,
  onToggle,
  onClose,
}) => {
  const color = useThemeColor({}, "secondary");
  const borderColor = useThemeColor({}, "primary-accent-2");

  return (
    <Popover
      trigger={(triggerProps) => (
        <Pressable
          {...triggerProps}
          style={defaultHeaderButtonProps.style}
          onPress={onToggle}
        >
          <Feather name="settings" size={24} color={color} />
        </Pressable>
      )}
      isOpen={isOpen}
      onClose={onClose}
    >
      <Popover.Content
        w="40"
        className="bg-primary"
        right="8"
        top="-20"
        borderColor={borderColor}
      >
        <Popover.Body className="m-0 flex flex-col items-stretch border-primary-accent bg-primary p-0">
          {items.map(({ label, icon, isPending, onPress }, index) => (
            <React.Fragment key={label}>
              <Pressable
                accessibilityLabel="Edit line"
                disabled={isPending}
                className="flex w-full flex-row items-center gap-x-3 border-primary-accent px-4 py-3"
                onPress={onPress}
              >
                {isPending ? (
                  <ActivityIndicator color={color} />
                ) : (
                  <MaterialCommunityIcons name={icon} size={24} color={color} />
                )}
                <Text className="text-xl">{label}</Text>
              </Pressable>
              {items.length - 1 > index && (
                <Box className="bg-primary-accent-2 h-[1px]" />
              )}
            </React.Fragment>
          ))}
        </Popover.Body>
      </Popover.Content>
    </Popover>
  );
};

export default HeaderSettingsButton;
