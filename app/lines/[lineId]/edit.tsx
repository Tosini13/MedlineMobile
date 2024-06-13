import LineForm, { LineFormType } from "@/components/LineForm/LineForm";
import { setLineFormTitleData } from "@/helpers/headerHelpers";
import { invokeAsyncWithDelay } from "@/helpers/helpers";
import { API } from "@/services/api";
import { LineType } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
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
      invokeAsyncWithDelay<LineType | undefined>(() =>
        lineId
          ? {
              ...values,
              id: lineId,
              ownerId: "mock",
            }
          : undefined,
      ),
    onSuccess: (line) => {
      if (line) {
        const updateLineEvents = (old: LineType[]) =>
          old.map((e) => (e.id === line.id ? line : e));

        queryClient.setQueryData(["line", lineId], updateLineEvents);
        queryClient.setQueryData(["lines"], updateLineEvents);
        router.navigate(`/lines/${lineId}/events`);
      }
    },
  });

  if (isPending) {
    return (
      <Box data-testid="edit_line_page" className="bg-white px-5 py-5" flex={1}>
        <ActivityIndicator />
      </Box>
    );
  }

  return (
    <Box data-testid="edit_line_page" className="bg-white p-5" flex={1}>
      <LineForm
        isPending={isMutationPending}
        onSubmit={(values) => mutate(values)}
        initialValues={lineData ?? undefined}
      />
    </Box>
  );
};

export default EditLine;
