import Input from "@/components/form/Input/Input";
import TextArea from "@/components/form/TextArea/TextArea";
import { invokeAsyncWithDelay } from "@/helpers/helpers";
import { addLineMockData } from "@/helpers/mockData/linesMockAPIs";
import { LineType } from "@/types";
import { FontAwesome6 } from "@expo/vector-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import { Box, Button } from "native-base";
import { FC } from "react";

import { ActivityIndicator } from "react-native";
import ColorPicker, { HueSlider } from "reanimated-color-picker";

type CreateLineForm = {
  name: string;
  description: string;
  color: string;
};

const initialValues: CreateLineForm = {
  name: "",
  description: "",
  color: "red",
};

type CreateLinePropsType = {};

const CreateLine: FC<CreateLinePropsType> = ({}) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateLineForm) =>
      invokeAsyncWithDelay(() => addLineMockData(values)),
    onSuccess: (line) => {
      console.log("line !log", line);
      queryClient.setQueryData(["lines"], (old: LineType[]) => [...old, line]);
      router.push("/lines/");
    },
  });
  return (
    <Box className="bg-white p-5" flex={1}>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => mutate(values)}
      >
        {({ handleChange, handleSubmit, values, setFieldValue }) => (
          <Box className="space-y-3" flex={1}>
            <Box>
              <Input
                placeholder="Line name"
                onChangeText={handleChange("name")}
                value={values.name}
              />
            </Box>
            <Box>
              <TextArea
                placeholder="Description"
                onChangeText={handleChange("description")}
                value={values.description}
              />
            </Box>
            <Box>
              <ColorPicker
                value={initialValues.color}
                onComplete={({ hex }) => setFieldValue("color", hex)}
              >
                <HueSlider />
              </ColorPicker>
            </Box>
            <Button
              className="w-full bg-[#3347FF] py-3"
              rounded="full"
              onPress={handleSubmit}
              leftIcon={
                isPending ? (
                  <ActivityIndicator size={16} color="white" />
                ) : (
                  <FontAwesome6 name="plus" size={16} color="white" />
                )
              }
            >
              Create line
            </Button>
          </Box>
        )}
      </Formik>
    </Box>
  );
};

export default CreateLine;
