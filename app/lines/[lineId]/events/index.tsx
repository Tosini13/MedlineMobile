import { FC, useEffect } from "react";
import {
  ActivityIndicator,
  SectionList,
  TouchableHighlight,
} from "react-native";

import EventTile from "@/components/EventTile/EventTile";
import { Text } from "@/components/Themed";
import { EVENT_DATE_FORMAT } from "@/constants/date";
import { fetchLineAndEvents, setTitleData } from "@/helpers/helpers";
import { FontAwesome6 } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { Box, Fab } from "native-base";

type LineEventsScreenPropsType = {};

const LineEventsScreen: FC<LineEventsScreenPropsType> = ({}) => {
  const navigation = useNavigation();

  const { lineId } = useLocalSearchParams<{ lineId: string }>();

  const { data, isPending } = useQuery({
    queryKey: ["lineEvents", lineId],
    queryFn: () =>
      lineId
        ? fetchLineAndEvents(lineId)
        : {
            line: [],
            events: [],
          },
    staleTime: 100000,
  });

  useEffect(() => {
    const lineName = data?.line[0].name ?? "";
    const incomingEvents = (data?.events ?? []).length;

    navigation.setOptions({
      title: setTitleData({
        lineName,
        incomingEvents,
      }),
    });
  }, [navigation, data?.line, data?.events]);

  const router = useRouter();

  const sections =
    data?.events?.map((event) => ({
      title: format(new Date(event.date), EVENT_DATE_FORMAT),
      data: [event],
    })) ?? [];

  return (
    <Box className="bg-white px-5 pb-5" flex={1}>
      {isPending ? (
        <ActivityIndicator />
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id}
          renderItem={(item) => (
            <TouchableHighlight
              onPress={() => router.push("/modal")}
              className="my-2"
            >
              <EventTile event={item.item} />
            </TouchableHighlight>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text className="bg-white py-0.5 text-lg font-semibold text-[#4B608B]">
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
  );
};

export default LineEventsScreen;
