import { FC } from "react";
import {
  ActivityIndicator,
  SectionList,
  TouchableHighlight,
} from "react-native";

import EventTile from "@/components/EventTile/EventTile";
import { Text } from "@/components/Themed";
import { EVENT_DATE_FORMAT } from "@/constants/date";
import { FontAwesome6 } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Box, Fab } from "native-base";
import SwipeableItem from "react-native-swipeable-item";

import React from "react";

import EventTileActionButtons from "@/components/EventTile/EventTileActionButtons";
import EventHeaderSettingsButton from "@/components/Header/EventHeaderSettingsButton";
import HeaderTitle from "@/components/Header/HeaderTitle";
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

  const sections =
    eventData?.map((event) => ({
      title: format(new Date(event.date), EVENT_DATE_FORMAT),
      data: [event],
    })) ?? [];

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
            ? () => <EventHeaderSettingsButton lineId={lineId} />
            : undefined,
        }}
      />
      <Box data-testid="line_events_page" className="bg-primary pb-5" flex={1}>
        {sections.length === 0 ? (
          <Text className="mt-5 text-center text-gray-500">No events yet</Text>
        ) : (
          <SectionList
            className="px-4"
            sections={sections}
            keyExtractor={(item) => item.id}
            renderItem={(item) => (
              <SwipeableItem
                key={item.item.id}
                item={item}
                renderUnderlayLeft={() => (
                  <EventTileActionButtons
                    lineId={lineId ?? ""}
                    eventId={item.item.id}
                  />
                )}
                snapPointsLeft={[128]}
              >
                <TouchableHighlight
                  underlayColor="transparent"
                  onPress={() =>
                    router.navigate(`lines/${lineId}/events/${item.item.id}`)
                  }
                >
                  <EventTile event={item.item} />
                </TouchableHighlight>
              </SwipeableItem>
            )}
            renderSectionHeader={({ section: { title } }) => (
              <Text className="bg-primary py-0.5 text-lg font-semibold text-[#4B608B]">
                {title}
              </Text>
            )}
          />
        )}
        <Fab
          onPress={() => router.navigate(`/lines/${lineId}/events/create`)}
          renderInPortal={false}
          shadow={0}
          placement="bottom-right"
          backgroundColor="#3347FF"
          size="lg"
          icon={<FontAwesome6 name="plus" size={16} color="white" />}
          label="Add Event"
        />
      </Box>
    </>
  );
};

export default LineEventsScreen;
