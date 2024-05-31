import { StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { Link } from "expo-router";
import { Button } from "native-base";

export default function TabTwoScreen() {
  return (
    <View style={styles.container} className="px-1">
      <Link href="/lines/" asChild>
        <Button>
          <Text className="text-2xl">Lines</Text>
        </Button>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  link: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
