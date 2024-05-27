import Input from "@/components/form/Input/Input";
import TextArea from "@/components/form/TextArea/TextArea";
import { LineType } from "@/types";
import { FontAwesome6 } from "@expo/vector-icons";
import { Formik } from "formik";
import { Box, Button } from "native-base";
import { FC } from "react";
import { ActivityIndicator } from "react-native";
import ColorPicker, { HueSlider } from "reanimated-color-picker";

export type LineFormType = Omit<LineType, "id" | "events">;

const emptyInitialValues: LineFormType = {
  name: "",
  description: "",
  color: "red",
};

type LineFormPropsType = {
  initialValues?: LineFormType;
  isPending?: boolean;
  onSubmit: (values: LineFormType) => void;
};

const LineForm: FC<LineFormPropsType> = ({
  initialValues,
  isPending,
  onSubmit,
}) => {
  return (
    <Formik
      data-testid="line_form"
      initialValues={initialValues ?? emptyInitialValues}
      onSubmit={(values) => onSubmit(values)}
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
              value={initialValues?.color ?? emptyInitialValues.color}
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
            {initialValues ? "Save line" : "Create line"}
          </Button>
        </Box>
      )}
    </Formik>
  );
};

export default LineForm;
