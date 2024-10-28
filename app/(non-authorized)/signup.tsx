import { LoginFormType } from "@/components/auth/LoginForm/LoginForm";
import SignUpForm from "@/components/auth/SignUpForm/SignUpForm";
import Logo from "@/components/Logo/Logo";
import { Text, View } from "@/components/Themed";
import { useHeaderContext } from "@/context/HeaderContext";
import { API } from "@/services/api";
import { routes } from "@/utils/utils";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Box } from "native-base";
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

  const router = useRouter();
  const { mutate, isPending, error, data } = useMutation({
    mutationFn: (values: LoginFormType) =>
      API.auth.signUp(values.identifier, values.password),
    onSuccess: () => {
      router.navigate(routes.lines);
    },
  });

  return (
    <View
      data-testid="Signup"
      className="flex h-full flex-col items-center justify-between p-4 pb-8"
    >
      <Box className="my-8">
        <Logo />
      </Box>
      {error && <Text className="mb-2 text-red-600">{error.message}</Text>}
      <SignUpForm isPending={isPending} onSubmit={(values) => mutate(values)} />
    </View>
  );
};

export default Signup;
