import React, { FC, useState } from "react";

import { LineType } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";

import { API } from "@/services/api";
import HeaderSettingsButton, {
  HeaderSettingsItem,
} from "./HeaderSettingsButton";

type EventsHeaderSettingsButtonPropsType = {
  lineId: string;
};

const EventsHeaderSettingsButton: FC<EventsHeaderSettingsButtonPropsType> = ({
  lineId,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

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

  const items: HeaderSettingsItem[] = [
    {
      onPress: () => {
        setIsOpen(false);
        router.navigate(`/(authorized)/lines/${lineId}/edit`);
      },
      icon: "pencil-outline",
      label: "Edit",
    },
    {
      onPress: () => mutate(),
      icon: "trash-can-outline",
      label: "Delete",
      isPending,
    },
  ];

  return (
    <HeaderSettingsButton
      isOpen={isOpen}
      items={items}
      onToggle={() => setIsOpen((b) => !b)}
      onClose={() => setIsOpen(false)}
    />
  );
};

export default EventsHeaderSettingsButton;
