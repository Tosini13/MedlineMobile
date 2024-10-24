import { FC } from "react";
import {
  ActivityIndicator,
  SectionList,
  TouchableHighlight,
} from "react-native";

import EventTile from "@/components/EventTile/EventTile";
import { Text } from "@/components/Themed";
import { DefaultError, useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Box } from "native-base";

import React from "react";

import EventsHeaderSettingsButton from "@/components/Header/EventsHeaderSettingsButton";
import EventsHeaderTitle from "@/components/Header/EventsHeaderTitle";
import PlusIcon from "@/components/icons/PlusIcon";
import ScreenButton from "@/components/ScreenButton/ScreenButton";
import { API } from "@/services/api";
import { LineQueryKey } from "@/services/types";
import { EventType, GetLinesByIdType } from "@/types";
import { envs } from "@/utils/utils";

const byDate = (eventA: EventType, eventB: EventType) =>
  new Date(eventB.date).getTime() - new Date(eventA.date).getTime();

type LineEventsScreenPropsType = {};

const LineEventsScreen: FC<LineEventsScreenPropsType> = ({}) => {
  const { lineId } = useLocalSearchParams<{ lineId: string }>();

  const { data: lineData, status } = useQuery<
    GetLinesByIdType | null,
    DefaultError,
    GetLinesByIdType,
    LineQueryKey
  >({
    queryKey: ["line", lineId],
    queryFn: () => (lineId ? API.lines.getById(lineId) : null),
    staleTime: envs.defaultStaleTime,
  });

  const { data: eventData, isPending } = useQuery({
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
          headerTitle: () => "",
          headerRight: lineId
            ? () => <EventsHeaderSettingsButton lineId={lineId} />
            : undefined,
          headerShadowVisible: false,
        }}
      />
      <Box
        data-testid="line_events_page"
        className="bg-primary px-4 pb-5 pt-2"
        flex={1}
      >
        {status !== "error" && (
          <Box className="border-primary-accent-2 -mx-4 mb-4 border-b bg-primary px-7 pb-4">
            {status === "pending" && (
              <Box className="ml-0 mr-auto">
                <ActivityIndicator />
              </Box>
            )}
            {lineData && (
              <EventsHeaderTitle
                title={lineData?.title}
                color={lineData.color}
              />
            )}
          </Box>
        )}
        <Box>
          <ScreenButton
            onPress={() => router.navigate(`/lines/${lineId}/events/create`)}
          >
            <PlusIcon className="h-4 w-4 text-secondary-accent" />
            <Text className="text-xl text-secondary-accent">
              Add new record
            </Text>
          </ScreenButton>
        </Box>
        {sections.length === 0 ? (
          <Text className="mt-5 text-center text-gray-500">No events yet</Text>
        ) : (
          <SectionList
            sections={sections}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableHighlight
                key={item.id}
                className="my-1"
                underlayColor="transparent"
                onPress={() =>
                  router.navigate(`lines/${lineId}/events/${item.id}`)
                }
              >
                <EventTile event={item} />
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
