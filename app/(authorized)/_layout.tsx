import { useThemeColor } from "@/components/Themed";
import { useAuthContext } from "@/context/auth.context";
import { routes } from "@/utils/utils";
import { Feather } from "@expo/vector-icons";
import { Redirect, Stack } from "expo-router";
import { FC } from "react";
import { ActivityIndicator, Pressable } from "react-native";

const Layout: FC = () => {
  const { isLoggedIn } = useAuthContext();
  const text = useThemeColor({}, "secondary");

  if (!isLoggedIn) {
    return <Redirect href={`/${routes.login}`} />;
  }
  return (
    <Stack
      screenOptions={({ navigation }) => ({
        headerBackVisible: false,
        headerTitleAlign: "center",
        headerLeft: navigation.canGoBack
          ? () => (
              <Pressable
                onPress={() => navigation.goBack()}
                className="flex h-11 w-11 items-center justify-center"
              >
                <Feather name="arrow-left" size={26} color={text} />
              </Pressable>
            )
          : undefined,
      })}
    >
      <Stack.Screen
        name={routes.events}
        options={{
          headerTitle: ({ tintColor }) => (
            <ActivityIndicator color={tintColor} />
          ),
        }}
      />
      <Stack.Screen
        name={routes.event}
        options={{
          headerTitle: ({ tintColor }) => (
            <ActivityIndicator color={tintColor} />
          ),
        }}
      />
    </Stack>
  );
};

export default Layout;
