import EventForm, { EventFormType } from "@/components/EventForm/EventForm";
import { setEventFormTitleData } from "@/helpers/headerHelpers";
import { invokeAsyncWithDelay } from "@/helpers/helpers";
import {
  createEventMockData,
  getLinesMockData,
} from "@/helpers/mockData/linesMockAPIs";
import { EventType } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { Box } from "native-base";
import { FC, useEffect } from "react";

const byDate = (a: EventType, b: EventType) =>
  new Date(b.date).valueOf() - new Date(a.date).valueOf();

type CreateEventPropsType = {};

const CreateEvent: FC<CreateEventPropsType> = ({}) => {
  const router = useRouter();
  const navigation = useNavigation();
  const { lineId } = useLocalSearchParams<{ lineId: string }>();

  const { data: lineData } = useQuery({
    queryKey: ["line", lineId],
    queryFn: () =>
      lineId ? invokeAsyncWithDelay(() => getLinesMockData(lineId)) : [],
    staleTime: Infinity,
  });

  useEffect(() => {
    const lineName = lineData?.[0].name ?? "";

    navigation.setOptions({
      title: setEventFormTitleData({
        lineName,
      }),
    });
  }, [navigation, lineData]);

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (values: EventFormType) =>
      invokeAsyncWithDelay(
        () =>
          lineId &&
          createEventMockData({
            ...values,
            lineId,
            date: values.date.toString(),
          }),
      ),
    onSuccess: (event) => {
      if (event) {
        queryClient.setQueryData(["lineEvents", lineId], (old: EventType[]) =>
          [...(old ?? []), event].sort(byDate),
        );
        router.push(`/lines/${lineId}/events/`);
      }
    },
  });

  return (
    <Box className="bg-white p-5" flex={1}>
      <EventForm isPending={isPending} onSubmit={(values) => mutate(values)} />
    </Box>
  );
};

export default CreateEvent;
