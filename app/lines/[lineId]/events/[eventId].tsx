import Event from "@/components/Event/Event";
import { invokeAsyncWithDelay } from "@/helpers/helpers";
import { getLineEventsMockData } from "@/helpers/mockData/linesMockAPIs";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
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
      lineId
        ? invokeAsyncWithDelay(() => getLineEventsMockData(lineId, eventId))
        : [],
    staleTime: 100000,
  });

  const event = data?.[0];

  if (isPending) return <ActivityIndicator />;

  return (
    <Box data-testid="event_page" className="bg-white px-5 py-5" flex={1}>
      {event ? <Event event={event} /> : null}
    </Box>
  );
};

export default EventPage;
