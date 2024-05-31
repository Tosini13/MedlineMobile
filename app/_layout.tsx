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
import {
  getEventFormTitleData,
  getLineFormTitleData,
} from "@/helpers/headerHelpers";
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
import { MenuProvider } from "react-native-popup-menu";

const queryClient = new QueryClient();

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "lines",
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
              <HeaderContextProvider>
                <RootLayoutNav />
              </HeaderContextProvider>
            </NativeBaseProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </MenuProvider>
    </GestureHandlerRootView>
  );
}

function RootLayoutNav() {
  return (
    <Stack
      initialRouteName="lines"
      screenOptions={{
        title: "Lines",
        headerStyle: {
          backgroundColor: "#608ae3",
        },
        headerLeft: () => <LeftHeaderGoBack />,
        headerRight: () => {
          const {
            options: {
              rightHeader: { node },
            },
          } = useHeaderContext();

          if (node) {
            return node;
          }

          return (
            <Link href="/menu" asChild>
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
              title={title ?? "Welcome back!"}
              subtitle={subtitle ?? "How are you feeling today?"}
              isPending={isPending}
            />
          );
        },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="menu"
        options={{ presentation: "modal", headerShown: false }}
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
        name="lines"
        options={{
          title: "Lines",
          headerLeft: () => (
            <Link href="/(modal)/search" asChild>
              <HeaderButton>
                <Feather
                  name="search"
                  size={defaultHeaderButtonProps.icon.size}
                  color={defaultHeaderButtonProps.icon.color}
                />
              </HeaderButton>
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name="lines/create"
        options={{
          title: "Lines",
          headerTitle: () => <HeaderTitle title="Create line" />,
        }}
      />
      <Stack.Screen name="lines/[lineId]/events" />
      <Stack.Screen
        name="lines/[lineId]/events/create"
        options={{
          title: "",
          headerTitle: (props) => {
            const data =
              props.children && getEventFormTitleData(props.children);

            return (
              <HeaderTitle
                title={data && data.lineName ? data.lineName : "Events"}
                subtitle="Create Event"
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="lines/[lineId]/events/[eventId]/edit"
        options={{
          title: "",
          headerTitle: (props) => {
            const data =
              props.children && getEventFormTitleData(props.children);

            return (
              <HeaderTitle
                title={data && data.lineName ? data.lineName : "Events"}
                subtitle="Edit Event"
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="lines/[lineId]/edit"
        options={{
          title: "",
          headerTitle: (props) => {
            const data = props.children && getLineFormTitleData(props.children);

            return (
              <HeaderTitle
                title={data && data.lineName ? data.lineName : ""}
                subtitle="Edit Line"
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="lines/[lineId]/events/[eventId]"
        options={{ presentation: "modal", title: "", headerShown: false }}
      />
    </Stack>
  );
}
