import { FC, useEffect } from "react";
import {
  ActivityIndicator,
  SectionList,
  TouchableHighlight,
} from "react-native";

import EventTile from "@/components/EventTile/EventTile";
import { Text } from "@/components/Themed";
import { EVENT_DATE_FORMAT } from "@/constants/date";
import { useHeaderContext } from "@/context/HeaderContext";
import { FontAwesome6 } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { Box, Fab } from "native-base";
import SwipeableItem from "react-native-swipeable-item";

import React from "react";

import EventTileActionButtons from "@/components/EventTile/EventTileActionButtons";
import EventHeaderSettingsButton from "@/components/Header/EventHeaderSettingsButton";
import { API } from "@/services/api";
import { envs } from "@/utils/utils";

type LineEventsScreenPropsType = {};

const LineEventsScreen: FC<LineEventsScreenPropsType> = ({}) => {
  const navigation = useNavigation();
  const { setRightHeader, resetHeaders, setHeaderTitle } = useHeaderContext();

  const { lineId } = useLocalSearchParams<{ lineId: string }>();

  useEffect(() => {
    setHeaderTitle({
      isPending: true,
    });

    if (!lineId) return;
    setRightHeader({
      node: <EventHeaderSettingsButton lineId={lineId} />,
    });
    return () => resetHeaders();
  }, [setRightHeader, resetHeaders, setHeaderTitle, lineId]);

  const { data: lineData } = useQuery({
    queryKey: ["line", lineId],
    queryFn: () => (lineId ? API.lines.getById(lineId) : null),
    staleTime: envs.defaultStaleTime,
  });

  const { data: eventData, isPending } = useQuery({
    queryKey: ["lineEvents", lineId],
    queryFn: () => (lineId ? API.events.get(lineId) : []),
    staleTime: envs.defaultStaleTime,
  });

  useEffect(() => {
    const incomingEvents = eventData?.length ?? 0;

    if (!lineData || !eventData) return;

    setHeaderTitle({
      title: lineData?.title ?? "Events",
      subtitle: incomingEvents
        ? `${incomingEvents ?? 0} incoming events!`
        : "loading",
    });
  }, [navigation, lineData, eventData?.length]);

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
        className="bg-white px-5 py-5"
        flex={1}
      >
        <ActivityIndicator />
      </Box>
    );
  }

  return (
    <Box data-testid="line_events_page" className="bg-white px-5 pb-5" flex={1}>
      <SectionList
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
          <Text className="bg-white py-0.5 text-lg font-semibold text-[#4B608B]">
            {title}
          </Text>
        )}
      />
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
  );
};

export default LineEventsScreen;
