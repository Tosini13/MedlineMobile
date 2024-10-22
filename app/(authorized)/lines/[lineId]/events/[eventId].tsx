import Event from "@/components/Event/Event";
import HeaderTitle from "@/components/Header/HeaderTitle";
import { eventTypesTranslationKeys } from "@/constants";
import { API } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams } from "expo-router";
import { Box } from "native-base";
import { FC } from "react";
import { ActivityIndicator } from "react-native";

const STALE_TIME = 1000 * 60 * 60 * 24; // 24 hours

type EventPagePropsType = {};

const EventPage: FC<EventPagePropsType> = ({}) => {
  const { lineId, eventId } = useLocalSearchParams<{
    lineId: string;
    eventId: string;
  }>();
  const { data, isPending } = useQuery({
    queryKey: ["lineEvents", lineId, eventId],
    queryFn: () =>
      lineId && eventId ? API.events.getById(lineId, eventId) : null,
    staleTime: STALE_TIME,
  });

  if (isPending) {
    return (
      <Box data-testid="event_page" className="bg-primary px-5 py-5" flex={1}>
        <ActivityIndicator />
      </Box>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: "Event",
          headerTitle: () => (
            <HeaderTitle
              title={
                data?.type ? eventTypesTranslationKeys[data.type] : "Event"
              }
              subtitle={data?.title ?? ""}
              isPending={isPending}
            />
          ),
        }}
      />
      <Box data-testid="event_page" className="bg-primary px-5 py-5" flex={1}>
        {isPending ? (
          <ActivityIndicator />
        ) : lineId && data ? (
          <Event event={data} lineId={lineId} />
        ) : null}
      </Box>
    </>
  );
};

export default EventPage;
