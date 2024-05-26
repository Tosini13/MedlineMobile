import { FC, useEffect } from "react";
import {
  ActivityIndicator,
  SectionList,
  TouchableHighlight,
} from "react-native";

import EventTile from "@/components/EventTile/EventTile";
import { Text, View } from "@/components/Themed";
import { EVENT_DATE_FORMAT } from "@/constants/date";
import { setEventsTitleData } from "@/helpers/headerHelpers";
import { invokeAsyncWithDelay } from "@/helpers/helpers";
import {
  getLineEventsMockData,
  getLinesMockData,
} from "@/helpers/mockData/linesMockAPIs";
import { FontAwesome6 } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { Box, Fab } from "native-base";
import SwipeableItem, {
  useSwipeableItemParams,
} from "react-native-swipeable-item";

const UnderlayLeft: FC<{ lineId: string; eventId: string }> = ({
  lineId,
  eventId,
}) => {
  const router = useRouter();
  const { close } = useSwipeableItemParams();
  return (
    <View className="flex flex-row-reverse items-stretch bg-transparent">
      <TouchableHighlight
        onPress={() =>
          router.navigate(`/lines/${lineId}/events/${eventId}/edit`)
        }
        className="w-16"
      >
        <View className="h-full w-full bg-blue-500">
          <Text className="my-auto text-center text-white">EDIT</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight onPress={() => close()} className="w-16">
        <View className="h-full w-full bg-red-500">
          <Text className="my-auto text-center text-white">DELETE</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

type LineEventsScreenPropsType = {};

const LineEventsScreen: FC<LineEventsScreenPropsType> = ({}) => {
  const navigation = useNavigation();

  const { lineId } = useLocalSearchParams<{ lineId: string }>();

  const { data: lineData } = useQuery({
    queryKey: ["line", lineId],
    queryFn: () =>
      lineId ? invokeAsyncWithDelay(() => getLinesMockData(lineId)) : [],
    staleTime: Infinity,
  });

  const { data: eventData, isPending } = useQuery({
    queryKey: ["lineEvents", lineId],
    queryFn: () =>
      lineId ? invokeAsyncWithDelay(() => getLineEventsMockData(lineId)) : [],
    staleTime: 100000,
  });

  useEffect(() => {
    const lineName = lineData?.[0].name ?? "";
    const incomingEvents = eventData?.length ?? 0;

    navigation.setOptions({
      title: setEventsTitleData({
        lineName,
        incomingEvents,
      }),
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
              <UnderlayLeft lineId={lineId ?? ""} eventId={item.item.id} />
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
