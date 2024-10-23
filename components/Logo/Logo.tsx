import { Text } from "@/components/Themed";
import { Box } from "native-base";
import { FC } from "react";
import { Image } from "react-native";

const Logo: FC = () => (
  <Box className="flex flex-row items-center justify-start space-x-2">
    <Image
      alt="MedTracker-io logo"
      source={require("@/assets/images/logomark-dark.png")}
      className="h-5 w-5"
    />
    <Text className="text-2xl font-medium">MedTracker-io</Text>
  </Box>
);

export default Logo;
