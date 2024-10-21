import HeaderTitle from "@/components/Header/HeaderTitle";
import LineForm from "@/components/LineForm/LineForm";
import { Text } from "@/components/Themed";
import { useHeaderContext } from "@/context/HeaderContext";
import { API } from "@/services/api";
import { LineType } from "@/types";
import { routes } from "@/utils/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Stack, useRouter } from "expo-router";
import { Box } from "native-base";
import { FC, useEffect } from "react";

type CreateLineForm = {
  title: string;
  description?: string;
  color: string;
};

const initialValues: CreateLineForm = {
  title: "",
  description: "",
  color: "red",
};

type CreateLinePropsType = {};

const CreateLine: FC<CreateLinePropsType> = ({}) => {
  const { resetHeaders, setHeaderTitle, setLeftHeader } = useHeaderContext();

  useEffect(() => {
    setHeaderTitle({
      title: "Create line",
      subtitle: "",
    });
    return () => resetHeaders();
  }, [resetHeaders, setHeaderTitle, setLeftHeader]);

  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: (values: CreateLineForm) => API.lines.add(values),
    onSuccess: (line) => {
      queryClient.setQueryData(["lines"], (old?: LineType[]) => [
        ...(old ?? []),
        line,
      ]);
      router.push(routes.lines);
    },
  });

  return (
    <>
      <Stack.Screen
        options={{
          title: "Create line",
          headerTitle: () => <HeaderTitle title="Create line" />,
        }}
      />
      <Box className="bg-white p-5" flex={1}>
        {error && <Text className="mb-2 text-red-600">{error.message}</Text>}
        <LineForm
          initialValues={initialValues}
          isPending={isPending}
          onSubmit={(values) => mutate(values)}
        />
      </Box>
    </>
  );
};

export default CreateLine;
