import { EventType, GetLinesType, LineType } from "@/types";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import {
  LineEventQueryKey,
  LineEventsQueryKey,
  LineQueryKey,
  LinesQueryKey,
} from "./types";

const incrementEventsNumber = (queryClient: QueryClient, lineId: string) => {
  queryClient.setQueryData<GetLinesType, LinesQueryKey>(["lines"], (old) =>
    old?.map((e) =>
      e.id === lineId ? { ...e, eventsNumber: e.eventsNumber + 1 } : e,
    ),
  );
};

const decrementEventsNumber = (queryClient: QueryClient, lineId: string) =>
  queryClient.setQueryData<GetLinesType, LinesQueryKey>(["lines"], (old) =>
    old?.map((e) =>
      e.id === lineId ? { ...e, eventsNumber: e.eventsNumber - 1 } : e,
    ),
  );

const byDate = (a: EventType, b: EventType) =>
  new Date(b.date).valueOf() - new Date(a.date).valueOf();

export const useUpdateCache = () => {
  const queryClient = useQueryClient();

  return {
    onLaunchedFirstTime: () => {
      queryClient.setQueryData(["isAfterFirstLaunched"], "true");
    },
    onCreateLine: (line: LineType) => {
      queryClient.setQueryData<GetLinesType, LinesQueryKey>(
        ["lines"],
        (old) => [...(old ?? []), { ...line, eventsNumber: 0 }],
      );
    },
    onEditLine: (lineId: string, line: LineType) => {
      queryClient.setQueryData<LineType, LineQueryKey>(
        ["lines", lineId],
        () => line,
      );
      queryClient.setQueryData<GetLinesType, LinesQueryKey>(["lines"], (old) =>
        old?.map((e) =>
          e.id === line.id ? { ...line, eventsNumber: e.eventsNumber } : e,
        ),
      );
    },
    onCreateEvent: (lineId: string, event: EventType) => {
      queryClient.setQueryData<EventType[], LineEventsQueryKey>(
        ["lineEvents", lineId],
        (old) => [...(old ?? []), event].sort(byDate),
      );
      incrementEventsNumber(queryClient, lineId);
    },
    onDeleteEvent: (lineId: string, eventId: string) => {
      queryClient.setQueryData<EventType[], LineEventsQueryKey>(
        ["lineEvents", lineId],
        (old) => old?.filter((e) => e.id !== eventId),
      );
      queryClient.setQueryData<LineEventQueryKey>(
        ["lineEvents", lineId, eventId],
        () => undefined,
      );
      decrementEventsNumber(queryClient, lineId);
    },
  };
};
