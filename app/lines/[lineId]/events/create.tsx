import Input from "@/components/form/Input/Input";
import TextArea from "@/components/form/TextArea/TextArea";
import { eventType } from "@/constants";
import { setCreateEventTitleData } from "@/helpers/headerHelpers";
import { invokeAsyncWithDelay } from "@/helpers/helpers";
import {
  createEventMockData,
  getLinesMockData,
} from "@/helpers/mockData/linesMockAPIs";
import { EventType } from "@/types";
import { FontAwesome6 } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { Formik } from "formik";
import { Box, Button, Select } from "native-base";
import { FC, useEffect } from "react";
import { ActivityIndicator } from "react-native";

const byDate = (a: EventType, b: EventType) =>
  new Date(b.date).valueOf() - new Date(a.date).valueOf();

type CreateEventForm = Omit<EventType, "id" | "date"> & {
  date: Date;
};

type CreateEventPropsType = {};

const CreateEvent: FC<CreateEventPropsType> = ({}) => {
  const router = useRouter();
  const navigation = useNavigation();
  const { lineId } = useLocalSearchParams<{ lineId: string }>();

  const { data: lineData } = useQuery({
    queryKey: ["line", lineId],
    queryFn: () =>
      lineId ? invokeAsyncWithDelay(() => getLinesMockData(lineId)) : [],
    staleTime: Infinity,
  });

  useEffect(() => {
    const lineName = lineData?.[0].name ?? "";

    navigation.setOptions({
      title: setCreateEventTitleData({
        lineName,
      }),
    });
  }, [navigation, lineData]);

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateEventForm) =>
      invokeAsyncWithDelay(
        () =>
          lineId &&
          createEventMockData({
            ...values,
            lineId,
            date: values.date.toString(),
          }),
      ),
    onSuccess: (event) => {
      if (event) {
        queryClient.setQueryData(["lineEvents", lineId], (old: EventType[]) =>
          [...(old ?? []), event].sort(byDate),
        );
        router.push(`/lines/${lineId}/events/`);
      }
    },
  });

  const initialValues: CreateEventForm = {
    title: "",
    description: "",
    date: new Date(),
    lineId: lineId ?? "",
    type: "appointment",
  };

  return (
    <Box className="bg-white p-5" flex={1}>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => mutate(values)}
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
                  endIcon: (
                    <FontAwesome6 name="check" size={16} color="white" />
                  ),
                }}
                onValueChange={(itemValue) => setFieldValue("type", itemValue)}
              >
                {Object.values(eventType).map((type) => (
                  <Select.Item key={type} label={type} value={type} />
                ))}
              </Select>
            </Box>
            <Box>
              <DateTimePicker
                value={values.date}
                mode="datetime"
                display="default"
                onChange={(_e, date) => {
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
              onPress={handleSubmit}
              disabled={isPending}
              leftIcon={
                isPending ? (
                  <ActivityIndicator size={16} color="white" />
                ) : (
                  <FontAwesome6 name="plus" size={16} color="white" />
                )
              }
            >
              Create event
            </Button>
          </Box>
        )}
      </Formik>
    </Box>
  );
};

export default CreateEvent;
