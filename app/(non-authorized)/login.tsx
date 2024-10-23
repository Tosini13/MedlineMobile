import Logo from "@/components/Logo/Logo";
import { View } from "@/components/Themed";
import LoginForm, {
  LoginFormType,
} from "@/components/auth/LoginForm/LoginForm";
import { useHeaderContext } from "@/context/HeaderContext";
import { API } from "@/services/api";
import { routes } from "@/utils/utils";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Box } from "native-base";
import { FC, useEffect } from "react";

type LoginPropsType = {};

const Login: FC<LoginPropsType> = ({}) => {
  const { resetHeaders, setHeaderTitle, setLeftHeader } = useHeaderContext();

  useEffect(() => {
    setHeaderTitle({
      title: "Login",
      subtitle: "",
    });
    setLeftHeader({
      node: null,
    });
    return () => resetHeaders();
  }, [resetHeaders, setHeaderTitle, setLeftHeader]);

  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: (values: LoginFormType) =>
      API.auth.signIn(values.identifier, values.password),
    onSuccess: () => {
      router.push(routes.lines);
    },
  });

  return (
    <View
      data-testid="login"
      className="flex h-full flex-1 flex-col items-center justify-center p-4 pb-8"
    >
      <Box className="my-8">
        <Logo />
      </Box>
      <LoginForm isPending={isPending} onSubmit={(values) => mutate(values)} />
    </View>
  );
};

export default Login;
