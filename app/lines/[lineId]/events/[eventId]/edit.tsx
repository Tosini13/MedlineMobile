import EventForm, { EventFormType } from "@/components/EventForm/EventForm";
import { setEventFormTitleData } from "@/helpers/headerHelpers";
import { invokeAsyncWithDelay } from "@/helpers/helpers";
import {
  getLineEventsMockData,
  getLinesMockData,
} from "@/helpers/mockData/linesMockAPIs";
import { EventType } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { Box } from "native-base";
import { FC, useEffect } from "react";
import { ActivityIndicator } from "react-native";

const byDate = (a: EventType, b: EventType) =>
  new Date(b.date).valueOf() - new Date(a.date).valueOf();

type EditEventPropsType = {};

const EditEvent: FC<EditEventPropsType> = ({}) => {
  const router = useRouter();
  const navigation = useNavigation();
  const { lineId, eventId } = useLocalSearchParams<{
    lineId: string;
    eventId: string;
  }>();

  const { data: lineData } = useQuery({
    queryKey: ["line", lineId],
    queryFn: () =>
      lineId ? invokeAsyncWithDelay(() => getLinesMockData(lineId)) : [],
    staleTime: Infinity,
  });

  const { data, isPending } = useQuery({
    queryKey: ["lineEvents", lineId, eventId],
    queryFn: () =>
      lineId
        ? invokeAsyncWithDelay(() => getLineEventsMockData(lineId, eventId))
        : [],
    staleTime: 100000,
  });

  const event = data?.[0];

  useEffect(() => {
    const lineName = lineData?.[0].name ?? "";

    navigation.setOptions({
      title: setEventFormTitleData({
        lineName,
      }),
    });
  }, [navigation, lineData]);

  const queryClient = useQueryClient();
  const { mutate, isPending: isMutationPending } = useMutation({
    mutationFn: (values: EventFormType) =>
      invokeAsyncWithDelay<EventType | undefined>(() =>
        lineId && eventId
          ? {
              ...values,
              lineId,
              id: eventId,
              date: values.date.toString(),
            }
          : undefined,
      ),
    onSuccess: (event) => {
      if (event) {
        const updateLineEvents = (old: EventType[]) =>
          old.map((e) => (e.id === eventId ? event : e)).sort(byDate);

        queryClient.setQueryData(["lineEvents", lineId], updateLineEvents);
        queryClient.setQueryData(
          ["lineEvents", lineId, eventId],
          updateLineEvents,
        );
        router.push(`/lines/${lineId}/events/`);
      }
    },
  });

  if (isPending) {
    return (
      <Box
        data-testid="edit_event_page"
        className="bg-white px-5 py-5"
        flex={1}
      >
        <ActivityIndicator />
      </Box>
    );
  }

  return (
    <Box data-testid="edit_event_page" className="bg-white p-5" flex={1}>
      <EventForm
        isPending={isMutationPending}
        onSubmit={(values) => mutate(values)}
        initialValues={
          event ? { ...event, date: new Date(event.date) } : undefined
        }
      />
    </Box>
  );
};

export default EditEvent;
