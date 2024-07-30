import { Text, View } from "@/components/Themed";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import { Button } from "native-base";
import { FC } from "react";

type AndroidDateTimePickerPropsType = {
  value: Date;
  mode: "date" | "time" | "datetime";
  onChange: (value?: Date) => void;
};

const AndroidDateTimePicker: FC<AndroidDateTimePickerPropsType> = ({
  mode,
  value,
  onChange,
}) => {
  const showDatePicker = () => {
    DateTimePickerAndroid.open({
      value,
      mode: "date",
      display: "default",
      onChange: (_e, date) => onChange(date),
    });

    DateTimePickerAndroid.dismiss("date");
  };

  const showTimePicker = () => {
    DateTimePickerAndroid.open({
      value,
      mode: "time",
      is24Hour: true,
      display: "default",
      onChange: (_e, date) => onChange(date),
    });

    DateTimePickerAndroid.dismiss("time");
  };

  return (
    <View
      data-testid="android_date_time_picker"
      className="flex flex-row items-center justify-end gap-1 bg-transparent"
    >
      {(mode === "date" || mode === "datetime") && (
        <Button
          onPress={showDatePicker}
          className="rounded-lg bg-gray-200 text-black"
        >
          <Text className="text-black">{format(value, "dd MMM yyyy")}</Text>
        </Button>
      )}
      {(mode === "time" || mode === "datetime") && (
        <Button
          onPress={showTimePicker}
          className="rounded-lg bg-gray-200 text-black"
        >
          <Text className="text-black">{format(value, "HH:mm")}</Text>
        </Button>
      )}
    </View>
  );
};

export default AndroidDateTimePicker;
