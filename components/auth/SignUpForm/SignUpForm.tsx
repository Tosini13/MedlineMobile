import Input from "@/components/form/Input/Input";
import { FontAwesome } from "@expo/vector-icons";
import { Formik } from "formik";
import { Box, Button } from "native-base";
import { FC } from "react";
import { ActivityIndicator } from "react-native";

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
  return (
    <Formik
      data-testid="sign_up_form"
      initialValues={emptyInitialValues}
      onSubmit={(values) => onSubmit(values)}
    >
      {({ handleChange, handleSubmit, values }) => (
        <Box className="w-full space-y-3" flex={1}>
          <Box>
            <Input
              autoComplete="email"
              placeholder="identifier"
              onChangeText={handleChange("identifier")}
              value={values.identifier}
            />
          </Box>
          <Box>
            <Input
              placeholder="password"
              type="password"
              onChangeText={handleChange("password")}
              value={values.password}
            />
          </Box>
          <Button
            className="w-full bg-[#3347FF] py-3"
            rounded="full"
            onPress={() => handleSubmit()}
            leftIcon={
              isPending ? (
                <ActivityIndicator size={16} color="white" />
              ) : (
                <FontAwesome name="sign-in" size={16} color="white" />
              )
            }
          >
            Sign up
          </Button>
        </Box>
      )}
    </Formik>
  );
};

export default SignUpForm;
