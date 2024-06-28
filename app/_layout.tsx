import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Link, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import HeaderTitle from "@/components/Header/HeaderTitle";
import { useColorScheme } from "@/components/useColorScheme";
import { Feather } from "@expo/vector-icons";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NativeBaseProvider } from "native-base";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import HeaderButton, {
  defaultHeaderButtonProps,
} from "@/components/Header/HeaderButton";
import LeftHeaderGoBack from "@/components/Header/LeftHeaderGoBack";
import HeaderContextProvider, {
  useHeaderContext,
} from "@/context/HeaderContext";
import { AuthProvider } from "@/context/auth.context";
import { routes } from "@/utils/utils";
import { MenuProvider } from "react-native-popup-menu";

const queryClient = new QueryClient();

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: routes.lines,
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "seashell" }}>
      <MenuProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <NativeBaseProvider>
              <AuthProvider>
                <HeaderContextProvider>
                  <MainStack />
                </HeaderContextProvider>
              </AuthProvider>
            </NativeBaseProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </MenuProvider>
    </GestureHandlerRootView>
  );
}

const MainStack = () => {
  return (
    <Stack
      initialRouteName={routes.lines}
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#608ae3",
        },
        headerLeft: () => {
          const {
            options: {
              leftHeader: { node },
            },
          } = useHeaderContext();

          if (node !== undefined) {
            return node;
          }
          return <LeftHeaderGoBack />;
        },
        headerRight: () => {
          const {
            options: {
              rightHeader: { node },
            },
          } = useHeaderContext();

          if (node !== undefined) {
            return node;
          }

          return (
            <Link href={routes.menu} asChild>
              <HeaderButton>
                <Feather
                  name="menu"
                  size={defaultHeaderButtonProps.icon.size}
                  color={defaultHeaderButtonProps.icon.color}
                />
              </HeaderButton>
            </Link>
          );
        },
        headerTitle: () => {
          const {
            options: {
              headerTitle: { title, subtitle, isPending },
            },
          } = useHeaderContext();

          return (
            <HeaderTitle
              title={title ?? ""}
              subtitle={subtitle}
              isPending={isPending}
            />
          );
        },
      }}
    >
      <Stack.Screen
        name={routes.menu}
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={routes.search}
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      />
    </Stack>
  );
};
