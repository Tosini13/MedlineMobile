import { ITextAreaProps, TextArea as NativeBaseTextArea } from "native-base";
import { FC } from "react";

type InputPropsType = ITextAreaProps;

const TextArea: FC<InputPropsType> = (props) => {
  return (
    <NativeBaseTextArea
      autoCompleteType="off"
      className="w-full bg-[#EFF2F6] py-3"
      size="2xl"
      rounded="lg"
      _focus={{
        borderColor: "#3347FF",
        backgroundColor: "transparent",
      }}
      {...props}
    />
  );
};

export default TextArea;
