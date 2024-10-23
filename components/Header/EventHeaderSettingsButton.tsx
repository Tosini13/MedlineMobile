import React, { FC, useState } from "react";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";

import { API } from "@/services/api";
import { useUpdateCache } from "@/services/useUpdateCache";
import { routes } from "@/utils/utils";
import HeaderSettingsButton, {
  HeaderSettingsItem,
} from "./HeaderSettingsButton";

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

  const { onDeleteEvent } = useUpdateCache();
  const { mutate, isPending } = useMutation({
    mutationFn: () => API.events.delete(lineId, eventId),
    onSuccess: () => {
      onDeleteEvent(lineId, eventId);
      setIsOpen(false);
      lineId &&
        eventId &&
        router.navigate(routes.events.replace("[lineId]", lineId));
    },
  });

  const items: HeaderSettingsItem[] = [
    {
      onPress: () => {
        setIsOpen(false);
        router.navigate(`/(authorized)/lines/${lineId}/events/${eventId}/edit`);
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

export default EventHeaderSettingsButton;
