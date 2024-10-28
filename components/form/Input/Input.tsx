import { useThemeColor } from "@/components/Themed";
import { AntDesign } from "@expo/vector-icons";
import { IInputProps, Input as NativeBaseInput, Pressable } from "native-base";
import { FC, useState } from "react";

type InputPropsType = IInputProps;

const Input: FC<InputPropsType> = (props) => {
  const [visible, setVisible] = useState(false);
  const tintColor = useThemeColor({}, "tint");

  return (
    <NativeBaseInput
      rounded="md"
      className="w-full bg-primary py-3"
      size="2xl"
      _focus={{
        borderColor: tintColor,
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
  );
};

export default Input;
