import Logo from "@/components/Logo/Logo";
import { useThemeColor } from "@/components/Themed";
import { useAuthContext } from "@/context/auth.context";
import { routes } from "@/utils/utils";
import { Feather } from "@expo/vector-icons";
import { Redirect, Stack } from "expo-router";
import { FC } from "react";
import { Pressable } from "react-native";

type RouteType = {
  key: string;
  name?: string;
  params: any;
};

const Layout: FC = () => {
  const bg = useThemeColor({}, "background");
  const text = useThemeColor({}, "text");
  const { isLoggedIn } = useAuthContext();

  if (!isLoggedIn) {
    return <Redirect href={`/${routes.login}`} />;
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: "",
          headerShown: false,
        }}
      />
      <Stack
        initialRouteName={routes.lines}
        screenOptions={({ navigation }) => ({
          headerBackVisible: false,
          animation: "ios",
          headerShadowVisible: false,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: bg,
          },
          headerTitle: "",
          headerTintColor: text,
          headerLeft: () => <Logo />,
          headerRight: () => {
            const isMenuOpen = navigation
              .getState()
              .routes.some((route: RouteType) => route.name === "menu");
            return (
              <Pressable
                onPress={() =>
                  isMenuOpen ? navigation.goBack() : navigation.navigate("menu")
                }
                className="flex h-11 w-11 flex-row items-center justify-end"
              >
                <Feather name={isMenuOpen ? "minus" : "menu"} size={26} />
              </Pressable>
            );
          },
        })}
      />
    </>
  );
};

export default Layout;
