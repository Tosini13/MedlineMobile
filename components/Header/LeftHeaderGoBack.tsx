import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { FC } from "react";
import HeaderButton, { defaultHeaderButtonProps } from "./HeaderButton";

type LeftHeaderGoBackPropsType = {};

const LeftHeaderGoBack: FC<LeftHeaderGoBackPropsType> = ({}) => {
  const router = useRouter();
  return (
    <HeaderButton onPress={() => router.back()}>
      <AntDesign
        name="arrowleft"
        size={defaultHeaderButtonProps.icon.size}
        color={defaultHeaderButtonProps.icon.color}
      />
    </HeaderButton>
  );
};

export default LeftHeaderGoBack;
