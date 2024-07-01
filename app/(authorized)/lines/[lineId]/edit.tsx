import HeaderTitle from "@/components/Header/HeaderTitle";
import LineForm, { LineFormType } from "@/components/LineForm/LineForm";
import { setLineFormTitleData } from "@/helpers/headerHelpers";
import { API } from "@/services/api";
import { LineType } from "@/types";
import { envs, returnPromiseError } from "@/utils/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Stack,
  useLocalSearchParams,
  useNavigation,
  useRouter,
} from "expo-router";
import { Box } from "native-base";
import { FC, useEffect } from "react";
import { ActivityIndicator } from "react-native";

type EditLinePropsType = {};

const EditLine: FC<EditLinePropsType> = ({}) => {
  const router = useRouter();
  const navigation = useNavigation();
  const { lineId } = useLocalSearchParams<{
    lineId: string;
  }>();

  const { data: lineData, isPending } = useQuery({
    queryKey: ["line", lineId],
    queryFn: () => (lineId ? API.lines.getById(lineId) : null),
    staleTime: Infinity,
  });

  useEffect(() => {
    navigation.setOptions({
      title: setLineFormTitleData({
        lineName: lineData?.title ?? "",
      }),
    });
  }, [navigation, lineData]);

  const queryClient = useQueryClient();
  const { mutate, isPending: isMutationPending } = useMutation({
    mutationFn: (values: LineFormType) =>
      lineId
        ? API.lines.update(lineId, {
            ...values,
            ownerId: envs.testOwnerId,
          })
        : returnPromiseError("Line id is missing"),
    onSuccess: (line) => {
      if (line) {
        try {
          queryClient.setQueryData(["line", lineId], () => line);
          queryClient.setQueryData(["lines"], (old: LineType[]) =>
            old.map((e) => (e.id === line.id ? line : e)),
          );
          router.navigate(`/lines/${lineId}/events`);
        } catch (e) {
          console.log("e", e);
        }
      }
    },
  });

  return (
    <>
      <Stack.Screen
        options={{
          title: lineData?.title ?? "Events",
          headerTitle: () => (
            <HeaderTitle
              title="Edit line"
              subtitle={lineData?.title}
              isPending={isPending}
            />
          ),
        }}
      />
      <Box data-testid="edit_line_page" className="bg-white p-5" flex={1}>
        {isPending ? (
          <ActivityIndicator />
        ) : (
          <LineForm
            isPending={isMutationPending}
            onSubmit={(values) => mutate(values)}
            initialValues={lineData ?? undefined}
          />
        )}
      </Box>
    </>
  );
};

export default EditLine;
