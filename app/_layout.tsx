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

import { useColorScheme } from "@/components/useColorScheme";
import { Feather } from "@expo/vector-icons";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Box, NativeBaseProvider, Text } from "native-base";
import React from "react";
import { Pressable } from "react-native";

const queryClient = new QueryClient();

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
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

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <NativeBaseProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="(modal)/menu"
              options={{ presentation: "modal", title: "Menu" }}
            />
            <Stack.Screen
              name="(modal)/search"
              options={{
                presentation: "modal",
                title: "Search",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="modal"
              options={{ presentation: "modal", headerShown: false }}
            />
            <Stack.Screen
              name="lines/index"
              options={{
                title: "Lines",
                headerStyle: {
                  backgroundColor: "#608ae3",
                },
                headerLeft: () => (
                  <Link href="/(modal)/search" asChild>
                    <Pressable className="center mx-1 flex h-9 w-9 items-center justify-center rounded-lg bg-[#4d74c8]">
                      <Feather name="search" size={20} color="white" />
                    </Pressable>
                  </Link>
                ),
                headerRight: () => (
                  <Link href="/(modal)/menu" asChild>
                    <Pressable className="center mx-1 flex h-9 w-9 items-center justify-center rounded-lg bg-[#4d74c8]">
                      <Feather name="menu" size={20} color="white" />
                    </Pressable>
                  </Link>
                ),
                headerTitle: () => (
                  <Box>
                    <Text className="text-center font-semibold text-white">
                      Welcome back!
                    </Text>
                    <Text className="text-center text-white">
                      How are you feeling today?
                    </Text>
                  </Box>
                ),
              }}
            />
          </Stack>
        </NativeBaseProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
