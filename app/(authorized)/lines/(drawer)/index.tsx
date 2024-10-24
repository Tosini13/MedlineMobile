import { FC, useEffect } from "react";
import { ActivityIndicator } from "react-native";

import HeaderButton, {
  defaultHeaderButtonProps,
} from "@/components/Header/HeaderButton";
import { Text } from "@/components/Themed";
import { useHeaderContext } from "@/context/HeaderContext";
import { API } from "@/services/api";
import { LinesQueryKey } from "@/services/types";
import { GetLinesType } from "@/types";
import { envs, routes } from "@/utils/utils";
import { Feather } from "@expo/vector-icons";
import { DefaultError, useQuery } from "@tanstack/react-query";
import { Link, Stack, useRouter } from "expo-router";
import { Box, Fab } from "native-base";
import { useState } from "react";
import { SectionList, TouchableHighlight } from "react-native";

import PlusIcon from "@/components/icons/PlusIcon";
import LineTile from "@/components/LineTile/LineTile";
import { View } from "@/components/Themed";
import { useUpdateCache } from "@/services/useUpdateCache";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { twMerge } from "tailwind-merge";

const launchedKey = "IS_AFTER_FIRST_LAUNCHED";

const LEFT_HEADER = {
  node: (
    <Link href={routes.search} asChild>
      <HeaderButton>
        <Feather
          name="search"
          size={defaultHeaderButtonProps.icon.size}
          color={defaultHeaderButtonProps.icon.color}
        />
      </HeaderButton>
    </Link>
  ),
};

type LinesScreenPropsType = {};

const LinesScreen: FC<LinesScreenPropsType> = ({}) => {
  const { setRightHeader, resetHeaders, setHeaderTitle, setLeftHeader } =
    useHeaderContext();

  const [showWelcomeText, setShowWelcomeText] = useState(true);
  const { onLaunchedFirstTime } = useUpdateCache();

  const { data: isAfterFirstLaunched } = useQuery({
    queryKey: ["isAfterFirstLaunched"],
    queryFn: async () => await AsyncStorage.getItem(launchedKey),
    staleTime: Infinity,
  });

  useEffect(() => {
    setTimeout(() => {
      setShowWelcomeText(false);
    }, 8000);

    return () => {
      AsyncStorage.setItem(launchedKey, "true");
      onLaunchedFirstTime();
    };
  }, [isAfterFirstLaunched]);

  useEffect(() => {
    setLeftHeader(LEFT_HEADER);
    return () => resetHeaders();
  }, [setRightHeader, resetHeaders, setHeaderTitle, setLeftHeader]);

  const router = useRouter();

  const { data, isPending, status } = useQuery<
    GetLinesType,
    DefaultError,
    GetLinesType,
    LinesQueryKey
  >({
    queryKey: ["lines"],
    queryFn: API.lines.get,
    staleTime: envs.defaultStaleTime,
  });

  const sections = [
    {
      title: "All lines",
      data: data ?? [],
    },
  ];

  return (
    <>
      <Stack.Screen
        options={{
          title: "",
        }}
      />
      {showWelcomeText && (
        <View className="py-4">
          <Text className="text-center text-2xl font-medium">
            Welcome {isAfterFirstLaunched ? "back" : ""},
          </Text>
          <Text className="text-center text-2xl font-medium">
            how do you feel today?
          </Text>
        </View>
      )}
      <Box className="bg-primary" flex={1}>
        {isPending && <ActivityIndicator />}
        {status === "success" && data.length > 0 && (
          <SectionList
            className="px-4"
            sections={sections}
            keyExtractor={(item) => item.id}
            renderItem={(item) => (
              <TouchableHighlight
                key={item.item.id}
                onPress={() => router.push(`/lines/${item.item.id}/events`)}
                className={twMerge(
                  "my-1",
                  item.index === (data?.length ?? 0) - 1 && "mb-10",
                )}
                underlayColor="transparent"
              >
                <LineTile line={item.item} />
              </TouchableHighlight>
            )}
            renderSectionHeader={({ section: { title } }) => (
              <Text className="bg-primary py-0.5 text-lg font-semibold text-[#4B608B]">
                {title}
              </Text>
            )}
          />
        )}
        {status === "success" && !data.length && (
          <Text className="mt-5 text-center text-gray-500">No lines yet</Text>
        )}
        <Fab
          onPress={() => router.push("/(authorized)/lines/create")}
          renderInPortal={false}
          shadow={0}
          placement="bottom-right"
          className="bg-tint"
          size="lg"
          icon={<PlusIcon className="h-7 w-7 text-primary" />}
        />
      </Box>
    </>
  );
};

export default LinesScreen;
