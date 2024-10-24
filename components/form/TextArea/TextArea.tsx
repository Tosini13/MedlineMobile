import { useThemeColor } from "@/components/Themed";
import { ITextAreaProps, TextArea as NativeBaseTextArea } from "native-base";
import { FC } from "react";

type InputPropsType = ITextAreaProps;

const TextArea: FC<InputPropsType> = (props) => {
  const tintColor = useThemeColor({}, "tint");
  return (
    <NativeBaseTextArea
      autoCompleteType="off"
      className="w-full bg-primary py-3"
      size="2xl"
      rounded="md"
      _focus={{
        borderColor: tintColor,
        backgroundColor: "transparent",
      }}
      {...props}
    />
  );
};

export default TextArea;
