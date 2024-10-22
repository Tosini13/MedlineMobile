import { GetLinesType } from "@/types";
import { Box } from "native-base";
import { FC } from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../Themed";

type ColorDotPropsType = {
  color: string;
};

const ColorDot: FC<ColorDotPropsType> = ({ color }) => {
  const styles = StyleSheet.create({
    tileOuterDot: {
      backgroundColor: color,
      opacity: 0.3,
    },
    tileInnerDot: {
      backgroundColor: color,
    },
  });
  return (
    <View className="relative h-4 w-4">
      <Box className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
        <Box
          className="h-full w-full rounded-full"
          style={styles.tileOuterDot}
        />
      </Box>
      <Box className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
        <Box className="h-2/3 w-2/3 rounded-full" style={styles.tileInnerDot} />
      </Box>
    </View>
  );
};

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
