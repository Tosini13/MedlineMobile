import { FC } from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../Themed";
import { LineType } from "./types";

type LineTilePropsType = {
  line: LineType;
};

const LineTile: FC<LineTilePropsType> = ({ line }) => {
  const styles = StyleSheet.create({
    tileBar: {
      backgroundColor: line.color,
    },
  });

  return (
    <View className="flex flex-row rounded-lg bg-gray-100">
      <View className="w-1.5 rounded-md" style={styles.tileBar} />
      <Text className="mx-4 my-6 text-2xl font-medium text-[#061C49]">
        {line.name}
      </Text>
    </View>
  );
};

export default LineTile;
