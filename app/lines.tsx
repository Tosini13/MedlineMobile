import { FC } from "react";
import {
  ActivityIndicator,
  SectionList,
  TouchableHighlight,
} from "react-native";

import LineTile from "@/components/LineTile/LineTile";
import { Text } from "@/components/Themed";
import { invokeAsyncWithDelay } from "@/helpers/helpers";
import { getLinesMockData } from "@/helpers/mockData/linesMockAPIs";
import { FontAwesome6 } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Box, Fab } from "native-base";

type LinesScreenPropsType = {};

const LinesScreen: FC<LinesScreenPropsType> = ({}) => {
  const router = useRouter();

  const { data, isPending } = useQuery({
    queryKey: ["lines"],
    queryFn: () => invokeAsyncWithDelay(getLinesMockData),
    staleTime: 100000,
  });

  const sections = [
    {
      title: "Upcoming events",
      data: data ? [data[0]] : [],
    },
    {
      title: "Your lines",
      data: data ?? [],
    },
  ];

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
              onPress={() => router.navigate(`/lines/${item.item.id}/events`)}
              className="my-2"
            >
              <LineTile line={item.item} />
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
        onPress={() => router.push("/lines/create")}
        renderInPortal={false}
        shadow={0}
        placement="bottom-right"
        backgroundColor="#3347FF"
        size="lg"
        icon={<FontAwesome6 name="plus" size={16} color="white" />}
        label="Add Line"
      />
    </Box>
  );
};

export default LinesScreen;
