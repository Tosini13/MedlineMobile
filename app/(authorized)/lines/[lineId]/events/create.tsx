import EventForm, { EventFormType } from "@/components/EventForm/EventForm";
import HeaderTitle from "@/components/Header/HeaderTitle";
import { setEventFormTitleData } from "@/helpers/headerHelpers";
import { API } from "@/services/api";
import { EventType } from "@/types";
import { returnPromiseError, routes } from "@/utils/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Stack,
  useLocalSearchParams,
  useNavigation,
  useRouter,
} from "expo-router";
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
    queryFn: () => (lineId ? API.lines.getById(lineId) : null),
    staleTime: Infinity,
  });

  useEffect(() => {
    navigation.setOptions({
      title: setEventFormTitleData({
        lineName: lineData?.title ?? "",
      }),
    });
  }, [navigation, lineData]);

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (values: EventFormType) =>
      lineId
        ? API.events.add(lineId, { ...values, date: values.date.toISOString() })
        : returnPromiseError("Line id is missing"),
    onSuccess: (event) => {
      if (event) {
        queryClient.setQueryData(["lineEvents", lineId], (old: EventType[]) =>
          [...(old ?? []), event].sort(byDate),
        );
        lineId && router.push(routes.createEvent.replace("[lineId]", lineId));
      }
    },
  });

  return (
    <>
      <Stack.Screen
        options={{
          title: "Create Event",
          headerTitle: () => (
            <HeaderTitle
              title="Create event"
              subtitle={lineData?.title}
              isPending={isPending}
            />
          ),
        }}
      />
      <Box className="bg-white p-5" flex={1}>
        <EventForm
          isPending={isPending}
          onSubmit={(values) => mutate(values)}
        />
      </Box>
    </>
  );
};

export default CreateEvent;
