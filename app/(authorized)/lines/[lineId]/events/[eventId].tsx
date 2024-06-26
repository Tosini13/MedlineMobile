import Event from "@/components/Event/Event";
import HeaderTitle from "@/components/Header/HeaderTitle";
import { API } from "@/services/api";
import { envs } from "@/utils/utils";
import { useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams } from "expo-router";
import { Box } from "native-base";
import { FC } from "react";
import { ActivityIndicator } from "react-native";

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
    staleTime: envs.defaultStaleTime,
  });

  if (isPending) {
    return (
      <Box data-testid="event_page" className="bg-white px-5 py-5" flex={1}>
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
              title="Event"
              subtitle={data?.title ?? ""}
              isPending={isPending}
            />
          ),
        }}
      />
      <Box data-testid="event_page" className="bg-white px-5 py-5" flex={1}>
        {isPending ? (
          <ActivityIndicator />
        ) : data ? (
          <Event event={data} />
        ) : null}
      </Box>
    </>
  );
};

export default EventPage;
