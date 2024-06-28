import { useAuthContext } from "@/context/auth.context";
import { Redirect } from "expo-router";
import { FC } from "react";

const Page: FC = () => {
  const { isLoggedIn } = useAuthContext();

  if (isLoggedIn) {
    return <Redirect href="/(authorized)/lines/" />;
  }

  return <Redirect href="/(non-authorized)/login/" />;
};

export default Page;
