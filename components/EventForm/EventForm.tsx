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
import { Box, Button, ScrollView, Select } from "native-base";
import { FC } from "react";
import DateTimePicker from "../DateTimePicker/DateTimePicker";
import DocumentTileWide from "../DocumentTile/DocumentTileWide";
import ScreenButton from "../ScreenButton/ScreenButton";
import { Text, useThemeColor, View } from "../Themed";
import SubmitButton from "../form/Button/SubmitButton";
import PlusIcon from "../icons/PlusIcon";

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
  const color = useThemeColor({}, "primary-accent-2");
  const textColor = useThemeColor({}, "secondary");
  const iconColor = useThemeColor({}, "secondary-accent");
  return (
    <Formik
      data-testid="event_form"
      initialValues={initialValues ?? emptyInitialValues}
      enableReinitialize
      onSubmit={(values) => onSubmit(values)}
    >
      {({ handleChange, handleSubmit, values, setFieldValue }) => (
        <Box className="space-y-3" flex={1}>
          <Box>
            <Select
              rounded="md"
              className="w-full bg-primary py-3"
              size="2xl"
              selectedValue={values.type}
              accessibilityLabel="Choose event type"
              placeholder="Event type"
              _selectedItem={{
                bg: color,
                color: textColor,
                endIcon: (
                  <FontAwesome6 name="check" size={20} color={textColor} />
                ),
              }}
              onValueChange={(itemValue) => setFieldValue("type", itemValue)}
              dropdownIcon={
                <Box className="mr-3">
                  <FontAwesome6
                    name="chevron-down"
                    size={20}
                    color={iconColor}
                  />
                </Box>
              }
            >
              {Object.values(eventType).map((type) => (
                <Select.Item
                  key={type}
                  label={eventTypesTranslationKeys[type]}
                  value={type}
                  className="text-secondary-accent"
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
          <View className="flex-1">
            <ScrollView className="-mx-2 space-y-2 px-2">
              {values.files?.existing?.map((file) => (
                <Box className="flex flex-1 flex-row space-x-1" key={file.url}>
                  <Box className="flex-1">
                    <DocumentTileWide
                      name={file.name}
                      mimeType={
                        initialValues?.documents?.find(
                          (doc) => doc.path === file.fullPath,
                        )?.type
                      }
                      uploadingPercentage={
                        uploadProgress?.[formatFileName(file.name)]
                      }
                    />
                  </Box>
                  <Button
                    className="w-11"
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
                </Box>
              ))}
              {values.files?.new?.map((file) => (
                <Box className="flex flex-1 flex-row space-x-1" key={file.uri}>
                  <Box className="flex-1">
                    <DocumentTileWide
                      name={file.name}
                      mimeType={file.mimeType}
                      uploadingPercentage={
                        uploadProgress?.[formatFileName(file.name)]
                      }
                    />
                  </Box>
                  <Button
                    className="w-11"
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
                </Box>
              ))}
            </ScrollView>
          </View>
          <Box>
            <ScreenButton
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
              accessible={true}
              accessibilityRole="button"
              accessibilityHint="Add new document"
            >
              <PlusIcon className="h-4 w-4 text-secondary-accent" />
              <Text className="text-xl text-secondary-accent">
                Add document
              </Text>
            </ScreenButton>
          </Box>
          <Box>
            <SubmitButton
              isPending={isPending}
              label={initialValues ? "Save event" : "Create event"}
              onPress={() => handleSubmit()}
            />
          </Box>
        </Box>
      )}
    </Formik>
  );
};

export default EventForm;
