import { useThemeColor } from "@/components/Themed";
import { useAuthContext } from "@/context/auth.context";
import { routes } from "@/utils/utils";
import { Redirect, Stack } from "expo-router";
import { FC } from "react";
import { ActivityIndicator } from "react-native";

type LayoutPropsType = {};

const Layout: FC<LayoutPropsType> = ({}) => {
  const { isLoggedIn } = useAuthContext();
  const bg = useThemeColor({}, "background");
  const text = useThemeColor({}, "text");

  if (!isLoggedIn) {
    return <Redirect href={`/${routes.login}`} />;
  }
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: bg,
        },
        headerTintColor: text,
      }}
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
