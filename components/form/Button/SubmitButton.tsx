import { Text, useThemeColor } from "@/components/Themed";
import { Button } from "native-base";
import { FC } from "react";
import { ActivityIndicator } from "react-native";

type SubmitButtonPropsType = {
  onPress: () => void;
  label: string;
  isPending?: boolean;
};

const SubmitButton: FC<SubmitButtonPropsType> = ({
  onPress,
  isPending,
  label,
}) => {
  const color = useThemeColor({}, "tint");
  return (
    <Button
      className="w-full py-3"
      rounded="full"
      style={{
        backgroundColor: color,
      }}
      onPress={onPress}
      leftIcon={
        isPending ? <ActivityIndicator size={16} color="white" /> : undefined
      }
    >
      <Text className="text-base font-semibold text-primary">{label}</Text>
    </Button>
  );
};

export default SubmitButton;
