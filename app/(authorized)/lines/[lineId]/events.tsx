import { FC } from "react";
import {
  ActivityIndicator,
  SectionList,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";

import EventTile from "@/components/EventTile/EventTile";
import { Text } from "@/components/Themed";
import { useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Box } from "native-base";

import React from "react";

import EventsHeaderSettingsButton from "@/components/Header/EventsHeaderSettingsButton";
import HeaderTitle from "@/components/Header/HeaderTitle";
import PlusIcon from "@/components/icons/PlusIcon";
import { API } from "@/services/api";
import { EventType } from "@/types";
import { envs } from "@/utils/utils";

const byDate = (eventA: EventType, eventB: EventType) =>
  new Date(eventB.date).getTime() - new Date(eventA.date).getTime();

type LineEventsScreenPropsType = {};

const LineEventsScreen: FC<LineEventsScreenPropsType> = ({}) => {
  const { lineId } = useLocalSearchParams<{ lineId: string }>();

  const { data: lineData } = useQuery({
    queryKey: ["line", lineId],
    queryFn: () => (lineId ? API.lines.getById(lineId) : null),
    staleTime: envs.defaultStaleTime,
  });

  const {
    data: eventData,
    isPending,
    status,
  } = useQuery({
    queryKey: ["lineEvents", lineId],
    queryFn: () =>
      lineId ? API.events.get(lineId).then((data) => data.sort(byDate)) : [],
    staleTime: envs.defaultStaleTime,
  });

  const router = useRouter();

  const sections = [
    {
      title: "Upcoming",
      data:
        eventData?.filter((event) => new Date(event.date) > new Date()) ?? [],
    },
    {
      title: "Past",
      data:
        eventData?.filter((event) => new Date(event.date) <= new Date()) ?? [],
    },
  ];

  if (isPending) {
    return (
      <Box
        data-testid="line_events_page_loading"
        className="bg-primary px-5 py-5"
        flex={1}
      >
        <ActivityIndicator />
      </Box>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: "Events",
          headerTitle: () => (
            <HeaderTitle
              title={lineData?.title ?? "Events"}
              subtitle={
                {
                  error: "Error loading events",
                  success: `${eventData?.length ?? 0} incoming events!`,
                  loading: "Loading events",
                }[status]
              }
              isPending={isPending}
            />
          ),
          headerRight: lineId
            ? () => <EventsHeaderSettingsButton lineId={lineId} />
            : undefined,
        }}
      />
      <Box
        data-testid="line_events_page"
        className="bg-primary px-4 pb-5"
        flex={1}
      >
        <TouchableOpacity
          onPress={() => router.navigate(`/lines/${lineId}/events/create`)}
        >
          <Box className="mt-5 rounded-lg border border-dashed border-secondary-accent bg-primary-accent p-5">
            <Box className="mx-auto flex w-fit flex-row items-center space-x-2">
              <PlusIcon className="h-4 w-4 text-secondary-accent" />
              <Text className="text-xl text-secondary-accent">
                Add new record
              </Text>
            </Box>
          </Box>
        </TouchableOpacity>
        {sections.length === 0 ? (
          <Text className="mt-5 text-center text-gray-500">No events yet</Text>
        ) : (
          <SectionList
            sections={sections}
            keyExtractor={(item) => item.id}
            renderItem={(item) => (
              <TouchableHighlight
                className="my-1"
                underlayColor="transparent"
                onPress={() =>
                  router.navigate(`lines/${lineId}/events/${item.item.id}`)
                }
              >
                <EventTile event={item.item} />
              </TouchableHighlight>
            )}
            renderSectionHeader={({ section: { title, data } }) =>
              data.length > 0 ? (
                <Text className="bg-primary py-1 text-lg font-normal text-secondary-accent">
                  {title}
                </Text>
              ) : null
            }
          />
        )}
      </Box>
    </>
  );
};

export default LineEventsScreen;
