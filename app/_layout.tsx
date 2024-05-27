import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Link, Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import HeaderTitle from "@/components/Header/HeaderTitle";
import { Text } from "@/components/Themed";
import { useColorScheme } from "@/components/useColorScheme";
import {
  getEventFormTitleData,
  getEventsTitleData,
  getLineFormTitleData,
} from "@/helpers/headerHelpers";
import { invokeAsyncWithDelay } from "@/helpers/helpers";
import { LineType } from "@/types";
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { NativeBaseProvider } from "native-base";
import React from "react";
import { ActivityIndicator, Pressable } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuProvider,
  MenuTrigger,
} from "react-native-popup-menu";

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
              <RootLayoutNav />
            </NativeBaseProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </MenuProvider>
    </GestureHandlerRootView>
  );
}

function RootLayoutNav() {
  const router = useRouter();

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (value: string) =>
      invokeAsyncWithDelay(() => {
        return value;
      }),
    onSuccess: (lineId) => {
      const updateLines = (old: LineType[]) =>
        old.filter((e) => e.id !== lineId);

      queryClient.setQueryData(["line", lineId], updateLines);
      queryClient.setQueryData(["lines"], updateLines);
      router.navigate("/lines");
    },
  });
  return (
    <Stack
      initialRouteName="lines"
      screenOptions={{
        title: "Lines",
        headerStyle: {
          backgroundColor: "#608ae3",
        },
        headerLeft: () => (
          <Pressable
            className="center mx-1 flex h-11 w-11 items-center justify-center"
            onPress={() => router.back()}
          >
            <AntDesign name="arrowleft" size={30} color="white" />
          </Pressable>
        ),
        headerRight: () => (
          <Link href="/menu" asChild>
            <Pressable className="center mx-1 flex h-11 w-11 items-center justify-center">
              <Feather name="menu" size={30} color="white" />
            </Pressable>
          </Link>
        ),
        headerTitle: () => (
          <HeaderTitle
            title="Welcome back!"
            subtitle="How are you feeling today?"
          />
        ),
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
              <Pressable className="center mx-1 flex h-11 w-11 items-center justify-center">
                <Feather name="search" size={28} color="white" />
              </Pressable>
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
      <Stack.Screen
        name="lines/[lineId]/events"
        options={{
          title: "",
          headerTitle: (props) => {
            const data = props.children && getEventsTitleData(props.children);

            return (
              <Menu>
                <MenuTrigger>
                  <HeaderTitle
                    title={data && data.lineName ? data.lineName : "Events"}
                    subtitle={
                      data && data.incomingEvents
                        ? `${data.incomingEvents} incoming events`
                        : ""
                    }
                  />
                </MenuTrigger>
                <MenuOptions>
                  <MenuOption>
                    <Link
                      href={data ? `/lines/${data.lineId}/edit` : ""}
                      asChild
                    >
                      <Pressable
                        accessibilityLabel="Edit line"
                        className="flex flex-row items-center gap-x-4"
                      >
                        <MaterialIcons name="edit" size={26} color="black" />
                        <Text className="text-xl">Edit</Text>
                      </Pressable>
                    </Link>
                  </MenuOption>
                  <MenuOption>
                    <Pressable
                      accessibilityLabel="Delete event"
                      className="flex flex-row items-center gap-x-4"
                      onPress={() => {
                        data && mutate(data.lineId);
                      }}
                    >
                      {isPending ? (
                        <ActivityIndicator color="black" />
                      ) : (
                        <MaterialIcons name="delete" size={26} color="black" />
                      )}
                      <Text className="text-xl">Delete</Text>
                    </Pressable>
                  </MenuOption>
                </MenuOptions>
              </Menu>
            );
          },
        }}
      />
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
