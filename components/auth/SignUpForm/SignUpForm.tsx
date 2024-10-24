import Input from "@/components/form/Input/Input";
import { Text, useThemeColor } from "@/components/Themed";
import { routes } from "@/utils/utils";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import { Box, Button } from "native-base";
import { FC } from "react";
import { ActivityIndicator, Pressable } from "react-native";

type InfoTextPropsType = {
  label: string;
};

const InfoText: FC<InfoTextPropsType> = ({ label }) => {
  const text = useThemeColor({}, "secondary-accent");
  return (
    <Box className="flex flex-row items-center space-x-0.5">
      <MaterialCommunityIcons
        name="information-outline"
        size={16}
        color={text}
      />
      <Text className="text-secondary-accent">{label}</Text>
    </Box>
  );
};

export type SignUpFormType = {
  identifier: string;
  password: string;
};

const emptyInitialValues: SignUpFormType = {
  identifier: "",
  password: "",
};

type SignUpFormPropsType = {
  isPending?: boolean;
  onSubmit: (values: SignUpFormType) => void;
};

const SignUpForm: FC<SignUpFormPropsType> = ({ onSubmit, isPending }) => {
  const color = useThemeColor({}, "tint");
  const router = useRouter();
  return (
    <Formik
      data-testid="sign_up_form"
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
            <Box className="mt-2 flex flex-row">
              <InfoText label="Identifier should be an email" />
            </Box>
          </Box>
          <Box>
            <Input
              type="password"
              placeholder="Password"
              onChangeText={handleChange("password")}
              value={values.password}
            />
            <Box className="mt-2 flex flex-row space-x-2">
              <Box>
                <InfoText label="1 digit, uppercase, special sign" />
              </Box>
              <Box>
                <InfoText label="At least 6 signs" />
              </Box>
            </Box>
          </Box>
          <Button
            className="w-full py-3"
            rounded="full"
            style={{
              backgroundColor: color,
            }}
            onPress={() => handleSubmit()}
            leftIcon={
              isPending ? (
                <ActivityIndicator size={16} color="white" />
              ) : undefined
            }
          >
            <Text className="text-base font-semibold text-primary">
              Sign Up
            </Text>
          </Button>
          <Box className="space-y-1 pt-4">
            <Text className="text-center text-base text-secondary-accent">
              Do you have already account?
            </Text>
            <Pressable onPress={() => router.replace(routes.login)}>
              <Text
                className="text-center text-base font-bold"
                style={{
                  color,
                }}
              >
                Log in
              </Text>
            </Pressable>
          </Box>
        </Box>
      )}
    </Formik>
  );
};

export default SignUpForm;
