import Input from "@/components/form/Input/Input";
import { Text, useThemeColor } from "@/components/Themed";
import { routes } from "@/utils/utils";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import { Box, Button } from "native-base";
import { FC } from "react";
import { ActivityIndicator, Pressable } from "react-native";

export type LoginFormType = {
  identifier: string;
  password: string;
};

const emptyInitialValues: LoginFormType = {
  identifier: "",
  password: "",
};

type LoginFormPropsType = {
  isPending?: boolean;
  onSubmit: (values: LoginFormType) => void;
};

const LoginForm: FC<LoginFormPropsType> = ({ onSubmit, isPending }) => {
  const color = useThemeColor({}, "tint");
  const router = useRouter();
  return (
    <Formik
      data-testid="login_form"
      initialValues={emptyInitialValues}
      onSubmit={(values) => onSubmit(values)}
    >
      {({ handleChange, handleSubmit, values }) => (
        <Box className="w-full space-y-5" flex={1}>
          <Box>
            <Input
              autoComplete="email"
              placeholder="User identification"
              onChangeText={handleChange("identifier")}
              value={values.identifier}
            />
          </Box>
          <Box>
            <Input
              type="password"
              placeholder="Password"
              onChangeText={handleChange("password")}
              value={values.password}
            />
          </Box>
          {/* <Box>
            <Text className="text-base">
              Forgot your{" "}
              <Link
                className="underline"
                style={{
                  color,
                }}
                href={routes.signup}
              >
                password?
              </Link>
            </Text>
          </Box> */}
          <Button
            className="w-full py-3"
            style={{
              backgroundColor: color,
            }}
            rounded="full"
            onPress={() => handleSubmit()}
            leftIcon={
              isPending ? (
                <ActivityIndicator size={16} color="white" />
              ) : undefined
            }
          >
            <Text className="text-base font-semibold text-primary">Log in</Text>
          </Button>
          <Box className="space-y-1 pt-4">
            <Text className="text-center text-base text-secondary-accent">
              Don't you have account yet?
            </Text>
            <Pressable onPress={() => router.replace(routes.signup)}>
              <Text
                className="text-center text-base font-bold"
                style={{
                  color,
                }}
              >
                Create new account
              </Text>
            </Pressable>
          </Box>
        </Box>
      )}
    </Formik>
  );
};

export default LoginForm;
