import Input from "@/components/form/Input/Input";
import { Formik } from "formik";
import { Box, Button } from "native-base";
import { FC } from "react";

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

const LoginForm: FC<LoginFormPropsType> = ({ onSubmit }) => {
  return (
    <Formik
      data-testid="login_form"
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
          >
            {"Log in"}
          </Button>
        </Box>
      )}
    </Formik>
  );
};

export default LoginForm;
