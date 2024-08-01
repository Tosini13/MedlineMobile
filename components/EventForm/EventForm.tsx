import Input from "@/components/form/Input/Input";
import TextArea from "@/components/form/TextArea/TextArea";
import { eventType, eventTypesTranslationKeys } from "@/constants";
import { EventType } from "@/types";
import { FontAwesome6 } from "@expo/vector-icons";
import { DocumentPickerAsset, getDocumentAsync } from "expo-document-picker";
import { Formik } from "formik";
import { Box, Button, Image, Select } from "native-base";
import { FC } from "react";
import { ActivityIndicator, Linking, TouchableOpacity } from "react-native";
import DateTimePicker from "../DateTimePicker/DateTimePicker";
import { Text, View } from "../Themed";

const imageMimeTypes = ["image/jpeg", "image/png", "image/jpg"];

const fileBoxClassName =
  "flex h-20 w-20 flex-col items-center justify-center overflow-hidden rounded-md border border-dashed border-gray-500/20";

export type EventFormType = Omit<EventType, "id" | "lineId" | "date"> & {
  date: Date;
  files?: DocumentPickerAsset[];
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
          <View>
            <Text>
              {`You chose ${Number(values.files?.length ?? 0)} ${values.files?.length === 1 ? "file" : "files"}`}
            </Text>
            <View className="flex flex-row">
              {values.files?.map((file) => (
                <View key={file.uri} className="m-1 w-20">
                  {file.mimeType === "application/pdf" && (
                    <TouchableOpacity
                      onPress={() =>
                        Linking.openURL(file.uri).catch((err) => {
                          console.error(err);
                        })
                      }
                    >
                      <Box className={fileBoxClassName}>
                        <FontAwesome6 name="file-pdf" size={32} color="red" />
                      </Box>
                    </TouchableOpacity>
                  )}
                  {file.mimeType && imageMimeTypes.includes(file.mimeType) && (
                    <Box className={fileBoxClassName}>
                      <Image
                        className="mb-1 h-full w-full object-cover object-left-top"
                        alt={file.name}
                        source={{
                          uri: file.uri,
                        }}
                      />
                    </Box>
                  )}
                  <Text numberOfLines={1} className="text-center">
                    {file.name}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          <Button
            onPress={() =>
              getDocumentAsync({
                multiple: true,
                type: ["application/pdf", "image/*"],
              }).then((res) => {
                setFieldValue("files", res.assets);
              })
            }
          >
            {`${values.files?.length ?? 0 > 0 ? "Change" : "Choose"} files`}
          </Button>
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
