import EventForm, { EventFormType } from "@/components/EventForm/EventForm";
import HeaderTitle from "@/components/Header/HeaderTitle";
import { setEventFormTitleData } from "@/helpers/headerHelpers";
import { API } from "@/services/api";
import { LineQueryKey } from "@/services/types";
import { useUpdateCache } from "@/services/useUpdateCache";
import { GetLinesByIdType } from "@/types";
import { returnPromiseError, routes, useUploadFileState } from "@/utils/utils";
import { DefaultError, useMutation, useQuery } from "@tanstack/react-query";
import {
  Stack,
  useLocalSearchParams,
  useNavigation,
  useRouter,
} from "expo-router";
import { Box } from "native-base";
import { FC, useEffect } from "react";

type CreateEventPropsType = {};

const CreateEvent: FC<CreateEventPropsType> = ({}) => {
  const router = useRouter();
  const navigation = useNavigation();
  const { lineId } = useLocalSearchParams<{ lineId: string }>();
  const { uploadProgress, onStateChange } = useUploadFileState();

  const { data: lineData } = useQuery<
    GetLinesByIdType | null,
    DefaultError,
    GetLinesByIdType,
    LineQueryKey
  >({
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

  const { onCreateEvent } = useUpdateCache();
  const { mutate, isPending } = useMutation({
    mutationFn: (values: EventFormType) =>
      lineId
        ? API.events.add(
            lineId,
            { ...values, date: values.date.toISOString() },
            values.files?.new ?? [],
            onStateChange,
          )
        : returnPromiseError("Line id is missing"),
    onSuccess: (event) => {
      if (lineId && event) {
        onCreateEvent(lineId, event);
        lineId && router.navigate(routes.events.replace("[lineId]", lineId));
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
      <Box className="bg-primary p-5" flex={1}>
        <EventForm
          isPending={isPending}
          onSubmit={(values) => mutate(values)}
          uploadProgress={uploadProgress}
        />
      </Box>
    </>
  );
};

export default CreateEvent;
