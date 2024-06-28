import { FC, useEffect } from "react";
import {
  ActivityIndicator,
  SectionList,
  TouchableHighlight,
} from "react-native";

import HeaderButton, {
  defaultHeaderButtonProps,
} from "@/components/Header/HeaderButton";
import LineTile from "@/components/LineTile/LineTile";
import { Text } from "@/components/Themed";
import { useHeaderContext } from "@/context/HeaderContext";
import { API } from "@/services/api";
import { envs, routes } from "@/utils/utils";
import { Feather, FontAwesome6 } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { Link, useRouter } from "expo-router";
import { Box, Fab } from "native-base";
import { twMerge } from "tailwind-merge";

const HEADER_TITLE = {
  title: "Welcome back",
  subtitle: "How are you feeling today?",
};

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

  useEffect(() => {
    setHeaderTitle(HEADER_TITLE);
    setLeftHeader(LEFT_HEADER);
    return () => resetHeaders();
  }, [setRightHeader, resetHeaders, setHeaderTitle, setLeftHeader]);

  const router = useRouter();

  const { data, isPending } = useQuery({
    queryKey: ["lines"],
    queryFn: API.lines.get,
    staleTime: envs.defaultStaleTime,
  });

  const sections = [
    {
      title: "Upcoming events",
      data: data ? [data[0]] : [],
    },
    {
      title: "Your lines",
      data: data ?? [],
    },
  ];

  return (
    <Box className="bg-white" flex={1}>
      {isPending ? (
        <ActivityIndicator />
      ) : (
        <SectionList
          className="px-4"
          sections={sections}
          keyExtractor={(item) => item.id}
          renderItem={(item) => (
            <TouchableHighlight
              onPress={() => router.push(`/lines/${item.item.id}/events`)}
              className={twMerge(
                "my-2",
                item.index === (data?.length ?? 0) - 1 && "mb-10",
              )}
              underlayColor="transparent"
            >
              <LineTile line={item.item} />
            </TouchableHighlight>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text className="bg-white py-0.5 text-lg font-semibold text-[#4B608B]">
              {title}
            </Text>
          )}
        />
      )}
      <Fab
        onPress={() => router.push("/(authorized)/lines/create")}
        renderInPortal={false}
        shadow={0}
        placement="bottom-right"
        backgroundColor="#3347FF"
        size="lg"
        icon={<FontAwesome6 name="plus" size={16} color="white" />}
        label="Add Line"
      />
    </Box>
  );
};

export default LinesScreen;
