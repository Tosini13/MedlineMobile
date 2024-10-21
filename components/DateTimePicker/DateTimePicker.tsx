import DateTimePickerIos from "@react-native-community/datetimepicker";
import { FC } from "react";
import { Platform } from "react-native";
import AndroidDateTimePicker from "./AndroidDateTimePicker/AndroidDateTimePicker";

type DateTimePickerPropsType = {
  value: Date;
  mode: "date" | "time" | "datetime";
  onChange: (value?: Date) => void;
};

const DateTimePicker: FC<DateTimePickerPropsType> = ({
  value,
  mode,
  onChange,
}) => {
  if (Platform.OS === "android") {
    return (
      <AndroidDateTimePicker value={value} mode={mode} onChange={onChange} />
    );
  }
  return (
    <DateTimePickerIos
      value={value}
      mode={mode}
      display="default"
      onChange={(_e, date) => {
        onChange(date);
      }}
    />
  );
};

export default DateTimePicker;
