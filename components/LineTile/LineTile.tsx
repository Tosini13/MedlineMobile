import { GetLinesType } from "@/types";
import { FC } from "react";
import ColorDot from "../ColorDot/ColorDot";
import { Text, View } from "../Themed";

type LineTilePropsType = {
  line: GetLinesType[number];
};

const LineTile: FC<LineTilePropsType> = ({ line }) => {
  return (
    <View className="space-y-2 rounded-lg border border-primary-accent bg-transparent p-4">
      <View className="flex flex-row items-center">
        <ColorDot color={line.color} />
        <Text className="ml-1.5 text-secondary-accent">
          {line.eventsNumber} {line.eventsNumber > 1 ? "records" : "record"}
        </Text>
      </View>
      <Text className="text-2xl font-medium">{line.title}</Text>
    </View>
  );
};

export default LineTile;
