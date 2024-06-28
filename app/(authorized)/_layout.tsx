import { useAuthContext } from "@/context/auth.context";
import { routes } from "@/utils/utils";
import { Redirect, Slot } from "expo-router";
import { FC } from "react";

type AuthorizedLayoutPropsType = {};

const AuthorizedLayout: FC<AuthorizedLayoutPropsType> = ({}) => {
  const { isLoggedIn } = useAuthContext();

  if (!isLoggedIn) {
    return <Redirect href={routes.login} />;
  }
  return <Slot />;
};

export default AuthorizedLayout;
