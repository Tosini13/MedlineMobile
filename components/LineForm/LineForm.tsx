import Input from "@/components/form/Input/Input";
import TextArea from "@/components/form/TextArea/TextArea";
import { LineType } from "@/types";
import { Formik } from "formik";
import { Box } from "native-base";
import { FC } from "react";
import ColorPicker, { HueSlider } from "reanimated-color-picker";
import SubmitButton from "../form/Button/SubmitButton";

export type LineFormType = Omit<LineType, "id" | "ownerId">;

const emptyInitialValues: LineFormType = {
  title: "",
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
              onChangeText={handleChange("title")}
              value={values.title}
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
          <Box>
            <SubmitButton
              isPending={isPending}
              label={initialValues ? "Save line" : "Create line"}
              onPress={() => handleSubmit()}
            />
          </Box>
        </Box>
      )}
    </Formik>
  );
};

export default LineForm;
