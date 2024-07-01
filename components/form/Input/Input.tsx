import { AntDesign } from "@expo/vector-icons";
import {
  Box,
  IInputProps,
  Input as NativeBaseInput,
  Pressable,
} from "native-base";
import { FC, useState } from "react";

type InputPropsType = IInputProps;

const Input: FC<InputPropsType> = (props) => {
  const [visible, setVisible] = useState(false);

  return (
    <Box className="rounded-lg bg-[#EFF2F6]">
      <NativeBaseInput
        className="w-full py-3"
        size="2xl"
        _focus={{
          borderColor: "#3347FF",
          backgroundColor: "transparent",
        }}
        rightElement={
          props.type === "password" ? (
            <Pressable
              onPress={() => setVisible((prev) => !prev)}
              className="px-2"
            >
              <AntDesign name={visible ? "eye" : "eyeo"} size={20} />
            </Pressable>
          ) : undefined
        }
        {...props}
        type={visible ? "text" : props.type}
      />
    </Box>
  );
};

export default Input;
