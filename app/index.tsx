import { useAuthContext } from "@/context/auth.context";
import { routes } from "@/utils/utils";
import { Redirect } from "expo-router";
import { FC } from "react";

const Page: FC = () => {
  const { isLoggedIn } = useAuthContext();

  if (isLoggedIn) {
    return <Redirect href={`/${routes.lines}`} />;
  }

  return <Redirect href={`/${routes.login}`} />;
};

export default Page;
