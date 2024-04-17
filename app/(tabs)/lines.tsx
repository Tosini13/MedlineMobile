import { FC } from "react";
import { SectionList, TouchableHighlight } from "react-native";

import LineTile from "@/components/LineTile/LineTile";
import { LineType } from "@/components/LineTile/types";
import { Text, View } from "@/components/Themed";
import { useRouter } from "expo-router";

const linesMockData: LineType[] = [
  {
    id: "aa",
    name: "Knee",
    color: "#f00",
  },
  {
    id: "ab",
    name: "Ankle",
    color: "#ff0",
  },
  {
    id: "ac",
    name: "Hip",
    color: "#0f0",
  },
  {
    id: "ad",
    name: "Shoulder",
    color: "#0ff",
  },
  {
    id: "ae",
    name: "Elbow",
    color: "#00f",
  },
  {
    id: "af",
    name: "Wrist",
    color: "#f0f",
  },
  {
    id: "ag",
    name: "Neck",
    color: "#000",
  },
  {
    id: "ah",
    name: "Back",
    color: "#fff",
  },
  {
    id: "ai",
    name: "Chest",
    color: "#ccc",
  },
  {
    id: "aj",
    name: "Abdomen",
    color: "#999",
  },
];

const sections = [
  {
    title: "Last edited",
    data: [linesMockData[0]],
  },
  {
    title: "Your lines",
    data: linesMockData,
  },
];

type TabLinesScreenPropsType = {};

const TabLinesScreen: FC<TabLinesScreenPropsType> = ({}) => {
  const router = useRouter();
  return (
    <View className="px-1">
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={(item) => (
          <TouchableHighlight
            onPress={() => router.push("/modal")}
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
    </View>
  );
};

export default TabLinesScreen;
