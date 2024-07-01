import { Text, View } from "@/components/Themed";
import { useHeaderContext } from "@/context/HeaderContext";
import { FC, useEffect } from "react";

type SignupPropsType = {};

const Signup: FC<SignupPropsType> = ({}) => {
  const { resetHeaders, setHeaderTitle, setLeftHeader } = useHeaderContext();

  useEffect(() => {
    setHeaderTitle({
      title: "Signup",
      subtitle: "",
    });
    setLeftHeader({
      node: null,
    });
    return () => resetHeaders();
  }, [resetHeaders, setHeaderTitle, setLeftHeader]);

  return (
    <View
      data-testid="Signup"
      className="flex h-full flex-col items-center justify-between p-4 pb-8"
    >
      <Text>To be implemented</Text>
    </View>
  );
};

export default Signup;
