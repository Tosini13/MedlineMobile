import Input from "@/components/form/Input/Input";
import TextArea from "@/components/form/TextArea/TextArea";
import { eventType, eventTypesTranslationKeys } from "@/constants";
import { EventType } from "@/types";
import { FontAwesome6 } from "@expo/vector-icons";
import { Formik } from "formik";
import { Box, Button, Select } from "native-base";
import { FC } from "react";
import { ActivityIndicator } from "react-native";
import DateTimePicker from "../DateTimePicker/DateTimePicker";

export type EventFormType = Omit<EventType, "id" | "lineId" | "date"> & {
  date: Date;
};

const emptyInitialValues: EventFormType = {
  title: "",
  description: "",
  date: new Date(),
  type: "MA",
};

type EventFormPropsType = {
  initialValues?: EventFormType;
  isPending?: boolean;
  onSubmit: (values: EventFormType) => void;
};

const EventForm: FC<EventFormPropsType> = ({
  initialValues,
  onSubmit,
  isPending,
}) => {
  return (
    <Formik
      data-testid="event_form"
      initialValues={initialValues ?? emptyInitialValues}
      onSubmit={(values) => onSubmit(values)}
    >
      {({ handleChange, handleSubmit, values, setFieldValue }) => (
        <Box className="space-y-3" flex={1}>
          <Box>
            <Select
              selectedValue={values.type}
              accessibilityLabel="Choose event type"
              placeholder="Event type"
              _selectedItem={{
                bg: "teal.600",
                endIcon: <FontAwesome6 name="check" size={16} color="white" />,
              }}
              onValueChange={(itemValue) => setFieldValue("type", itemValue)}
            >
              {Object.values(eventType).map((type) => (
                <Select.Item
                  key={type}
                  label={eventTypesTranslationKeys[type]}
                  value={type}
                />
              ))}
            </Select>
          </Box>
          <Box>
            <DateTimePicker
              value={values.date}
              mode="datetime"
              onChange={(date) => {
                setFieldValue("date", date);
              }}
            />
          </Box>
          <Box>
            <Input
              placeholder="Event title"
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
          <Button
            className="w-full bg-[#3347FF] py-3"
            rounded="full"
            onPress={() => handleSubmit()}
            disabled={isPending}
            leftIcon={
              isPending ? (
                <ActivityIndicator size={16} color="white" />
              ) : (
                <FontAwesome6 name="plus" size={16} color="white" />
              )
            }
          >
            {initialValues ? "Save event" : "Create event"}
          </Button>
        </Box>
      )}
    </Formik>
  );
};

export default EventForm;
