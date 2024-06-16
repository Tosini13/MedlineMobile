import { View } from "@/components/Themed";
import LoginForm, {
  LoginFormType,
} from "@/components/auth/LoginForm/LoginForm";
import { useHeaderContext } from "@/context/HeaderContext";
import { returnPromiseError } from "@/utils/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { FC, useEffect } from "react";

type LoginPropsType = {};

const Login: FC<LoginPropsType> = ({}) => {
  const { setRightHeader, resetHeaders, setHeaderTitle } = useHeaderContext();

  useEffect(() => {
    setHeaderTitle({
      title: "Login",
      subtitle: "",
    });
    return () => resetHeaders();
  }, [setRightHeader, resetHeaders, setHeaderTitle]);

  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (values: LoginFormType) =>
      returnPromiseError("Not implemented"),
    // onSuccess: (line) => {
    //   queryClient.setQueryData(["lines"], (old: LineType[]) => [...old, line]);
    //   router.push("/lines/");
    // },
  });

  return (
    <View
      data-testid="login"
      className="flex h-full flex-col items-center justify-between p-4 pb-8"
    >
      <LoginForm isPending={isPending} onSubmit={(values) => mutate(values)} />
    </View>
  );
};

export default Login;
