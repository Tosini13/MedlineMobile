import { Box } from "native-base";
import { FC } from "react";
import { StyleSheet } from "react-native";
import { View } from "../Themed";

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

export default ColorDot;
