import { Box, IInputProps, Input as NativeBaseInput } from "native-base";
import { FC } from "react";

type InputPropsType = IInputProps;

const Input: FC<InputPropsType> = (props) => {
  return (
    <Box className="bg-[#EFF2F6]">
      <NativeBaseInput
        className="w-full py-3"
        size="2xl"
        rounded="lg"
        _focus={{
          borderColor: "#3347FF",
          backgroundColor: "transparent",
        }}
        {...props}
      />
    </Box>
  );
};

export default Input;
