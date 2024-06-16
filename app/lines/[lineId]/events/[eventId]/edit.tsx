import EventForm, { EventFormType } from "@/components/EventForm/EventForm";
import { setEventFormTitleData } from "@/helpers/headerHelpers";
import { API } from "@/services/api";
import { EventType } from "@/types";
import { returnPromiseError } from "@/utils/utils";
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
    queryFn: () => (lineId ? API.lines.getById(lineId) : null),
    staleTime: Infinity,
  });

  const { data: event, isPending } = useQuery({
    queryKey: ["lineEvents", lineId, eventId],
    queryFn: async () =>
      lineId && eventId ? API.events.getById(lineId, eventId) : null,
    staleTime: 100000,
  });

  useEffect(() => {
    navigation.setOptions({
      title: setEventFormTitleData({
        lineName: lineData?.title ?? "",
      }),
    });
  }, [navigation, lineData]);

  const queryClient = useQueryClient();
  const { mutate, isPending: isMutationPending } = useMutation({
    mutationFn: (values: EventFormType) =>
      lineId && eventId
        ? API.events.update(lineId, eventId, {
            ...values,
            date: values.date.toISOString(),
          })
        : returnPromiseError("Line id or event id is missing"),
    onSuccess: (event) => {
      if (event) {
        try {
          queryClient.setQueryData(
            ["lineEvents", lineId],

            (old: EventType[]) =>
              old.map((e) => (e.id === eventId ? event : e)).sort(byDate),
          );
          queryClient.setQueryData(
            ["lineEvents", lineId, eventId],
            () => event,
          );
          router.push(`/lines/${lineId}/events/`);
        } catch (e) {
          console.log("e", e);
        }
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
