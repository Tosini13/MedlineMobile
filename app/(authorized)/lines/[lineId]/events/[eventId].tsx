import Event from "@/components/Event/Event";
import EventHeaderSettingsButton from "@/components/Header/EventHeaderSettingsButton";
import EventHeaderTitle from "@/components/Header/EventHeaderTitle";
import { API } from "@/services/api";
import { LineQueryKey } from "@/services/types";
import { GetLinesByIdType } from "@/types";
import { DefaultError, useQuery } from "@tanstack/react-query";
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

  const { data: lineData, isPending: isLineDataPending } = useQuery<
    GetLinesByIdType | null,
    DefaultError,
    GetLinesByIdType,
    LineQueryKey
  >({
    queryKey: ["line", lineId],
    queryFn: () => (lineId && eventId ? API.lines.getById(lineId) : null),
    staleTime: STALE_TIME,
  });

  if (isPending || isLineDataPending) {
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
          headerShadowVisible: false,
          headerTitle: () =>
            lineData ? (
              <Box className="flex w-full flex-row items-center justify-start">
                <EventHeaderTitle
                  title={lineData.title}
                  color={lineData.color}
                />
              </Box>
            ) : null,
          headerRight:
            lineId && eventId
              ? () => (
                  <EventHeaderSettingsButton
                    lineId={lineId}
                    eventId={eventId}
                  />
                )
              : undefined,
        }}
      />
      <Box data-testid="event_page" className="bg-primary px-4 py-2" flex={1}>
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
