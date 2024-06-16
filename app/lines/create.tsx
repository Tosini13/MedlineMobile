import LineForm from "@/components/LineForm/LineForm";
import { API } from "@/services/api";
import { LineType } from "@/types";
import { envs } from "@/utils/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Box } from "native-base";
import { FC } from "react";

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
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateLineForm) =>
      API.lines.add({ ...values, ownerId: envs.testOwnerId }),
    onSuccess: (line) => {
      queryClient.setQueryData(["lines"], (old: LineType[]) => [...old, line]);
      router.push("/lines/");
    },
  });

  return (
    <Box className="bg-white p-5" flex={1}>
      <LineForm
        initialValues={initialValues}
        isPending={isPending}
        onSubmit={(values) => mutate(values)}
      />
    </Box>
  );
};

export default CreateLine;
