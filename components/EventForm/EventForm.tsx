import Input from "@/components/form/Input/Input";
import TextArea from "@/components/form/TextArea/TextArea";
import { eventType, eventTypesTranslationKeys } from "@/constants";
import { DocumentReferenceType } from "@/services/getDocuments";
import { EventType } from "@/types";
import { formatFileName } from "@/utils/utils";
import { FontAwesome6 } from "@expo/vector-icons";
import { randomUUID } from "expo-crypto";
import { DocumentPickerAsset, getDocumentAsync } from "expo-document-picker";
import { Formik } from "formik";
import { Box, Button, Select } from "native-base";
import { FC } from "react";
import { ActivityIndicator } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import DateTimePicker from "../DateTimePicker/DateTimePicker";
import DocumentTile from "../DocumentTile/DocumentTile";
import { Text, View } from "../Themed";

export type EventFormType = Omit<EventType, "id" | "lineId" | "date"> & {
  date: Date;
  files?: {
    new?: DocumentPickerAsset[];
    existing?: DocumentReferenceType[];
  };
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
  uploadProgress?: Record<string, number>;
  onSubmit: (values: EventFormType) => void;
};

const EventForm: FC<EventFormPropsType> = ({
  initialValues,
  onSubmit,
  isPending,
  uploadProgress,
}) => {
  return (
    <Formik
      data-testid="event_form"
      initialValues={initialValues ?? emptyInitialValues}
      enableReinitialize
      onSubmit={(values) => onSubmit(values)}
    >
      {({ handleChange, handleSubmit, values, setFieldValue }) => {
        const filesNumber = values.files
          ? (values.files.new?.length ?? 0) +
            (values.files.existing?.length ?? 0)
          : 0;
        return (
          <Box className="space-y-3" flex={1}>
            <Box>
              <Select
                selectedValue={values.type}
                accessibilityLabel="Choose event type"
                placeholder="Event type"
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: (
                    <FontAwesome6 name="check" size={16} color="white" />
                  ),
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
                {`You chose ${filesNumber} ${filesNumber === 1 ? "file" : "files"}`}
              </Text>
              <ScrollView horizontal className="space-x-1">
                {values.files?.existing?.map((file) => (
                  <View className="flex-1 space-y-0.5" key={file.url}>
                    <DocumentTile
                      name={file.name}
                      url={file.url}
                      mimeType={
                        initialValues?.documents?.find(
                          (doc) => doc.path === file.fullPath,
                        )?.type
                      }
                      uploadingPercentage={
                        uploadProgress &&
                        uploadProgress[formatFileName(file.name)]
                      }
                    />
                    <Button
                      onPress={() =>
                        setFieldValue(
                          "files.existing",
                          values.files?.existing?.filter(
                            (f) => f.url !== file.url,
                          ),
                        )
                      }
                      variant="outline"
                    >
                      <FontAwesome6 name="trash-alt" size={16} color="red" />
                    </Button>
                  </View>
                ))}
                {values.files?.new?.map((file) => (
                  <View className="flex-1 space-y-0.5" key={file.uri}>
                    <DocumentTile
                      name={file.name}
                      url={file.uri}
                      mimeType={file.mimeType}
                      uploadingPercentage={
                        uploadProgress &&
                        uploadProgress[formatFileName(file.name)]
                      }
                    />
                    <Button
                      onPress={() =>
                        setFieldValue(
                          "files.new",
                          values.files?.new?.filter((f) => f.uri !== file.uri),
                        )
                      }
                      variant="outline"
                    >
                      <FontAwesome6 name="trash-alt" size={16} color="red" />
                    </Button>
                  </View>
                ))}
              </ScrollView>
            </View>
            <Button
              onPress={() =>
                getDocumentAsync({
                  multiple: true,
                  type: ["application/pdf", "image/*"],
                }).then((res) => {
                  const newFiles = res.assets?.map((file) => {
                    const sameNameFiles =
                      [
                        ...(values.files?.new ?? []),
                        ...(values.files?.existing ?? []),
                      ]?.some((f) => f.name === file.name) ||
                      res.assets.some((f) => f.name === file.name);
                    if (sameNameFiles) {
                      file.name = `${file.name}_${randomUUID()}`;
                    }
                    return file;
                  });
                  setFieldValue("files.new", [
                    ...(values.files?.new ?? []),
                    ...(newFiles ?? []),
                  ]);
                })
              }
            >
              Add files
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
        );
      }}
    </Formik>
  );
};

export default EventForm;
