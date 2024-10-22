import EventForm, { EventFormType } from "@/components/EventForm/EventForm";
import HeaderTitle from "@/components/Header/HeaderTitle";
import { API } from "@/services/api";
import { EventType } from "@/types";
import { returnPromiseError, routes, useUploadFileState } from "@/utils/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Box } from "native-base";
import { FC } from "react";
import { ActivityIndicator } from "react-native";

const STALE_TIME = 1000 * 60 * 60 * 24; // 24 hours

const byDate = (a: EventType, b: EventType) =>
  new Date(b.date).valueOf() - new Date(a.date).valueOf();

type EditEventPropsType = {};

const EditEvent: FC<EditEventPropsType> = ({}) => {
  const router = useRouter();
  const { lineId, eventId } = useLocalSearchParams<{
    lineId: string;
    eventId: string;
  }>();
  const { uploadProgress, onStateChange } = useUploadFileState();

  const { data: event, isPending } = useQuery({
    queryKey: ["lineEvents", lineId, eventId],
    queryFn: async () =>
      lineId && eventId ? API.events.getById(lineId, eventId) : null,
    staleTime: 100000,
  });

  const documentsPaths = event?.documents?.map((doc) => doc.path) ?? [];
  const { data: documentsPage } = useQuery({
    queryKey: ["documents", lineId, eventId, ...documentsPaths],
    queryFn: () =>
      lineId && eventId ? API.events.getDocuments(lineId, eventId) : null,
    staleTime: STALE_TIME,
  });

  const queryClient = useQueryClient();
  const { mutate, isPending: isMutationPending } = useMutation({
    mutationFn: (values: EventFormType) =>
      lineId && eventId
        ? API.events.update(
            lineId,
            eventId,
            {
              description: values.description,
              title: values.title,
              type: values.type,
              date: values.date.toISOString(),
              documents: event?.documents ?? [],
            },
            values.files?.existing ?? [],
            values.files?.new ?? [],
            onStateChange,
          )
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
          lineId &&
            eventId &&
            router.replace(
              routes.event
                .replace("[lineId]", lineId)
                .replace("[eventId]", eventId),
            );
        } catch (e) {
          console.log("e", e);
        }
      }
    },
  });

  return (
    <>
      <Stack.Screen
        options={{
          title: "Edit Event",
          headerTitle: () => (
            <HeaderTitle
              title="Edit event"
              subtitle={event?.title}
              isPending={isPending}
            />
          ),
        }}
      />
      <Box data-testid="edit_event_page" className="bg-primary p-5" flex={1}>
        {isPending ? (
          <ActivityIndicator />
        ) : (
          <EventForm
            isPending={isMutationPending}
            onSubmit={(values) => mutate(values)}
            uploadProgress={uploadProgress}
            initialValues={
              event
                ? {
                    ...event,
                    date: new Date(event.date),
                    files: {
                      existing: documentsPage?.items ?? [],
                      new: [],
                    },
                  }
                : undefined
            }
          />
        )}
      </Box>
    </>
  );
};

export default EditEvent;
