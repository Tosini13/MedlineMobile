import { useAuthContext } from "@/context/auth.context";
import { Redirect, Slot } from "expo-router";
import { FC } from "react";

type NonAuthorizedLayoutPropsType = {};

const NonAuthorizedLayout: FC<NonAuthorizedLayoutPropsType> = ({}) => {
  const { isLoggedIn } = useAuthContext();

  if (isLoggedIn) {
    return <Redirect href="/(authorized)/lines/" />;
  }

  return <Slot />;
};

export default NonAuthorizedLayout;
