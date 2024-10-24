import { useThemeColor } from "@/components/Themed";
import { useAuthContext } from "@/context/auth.context";
import { routes } from "@/utils/utils";
import { Redirect, Stack } from "expo-router";
import { FC } from "react";

type NonAuthorizedLayoutPropsType = {};

const NonAuthorizedLayout: FC<NonAuthorizedLayoutPropsType> = ({}) => {
  const { isLoggedIn } = useAuthContext();
  const bg = useThemeColor({}, "background");
  const text = useThemeColor({}, "text");

  if (isLoggedIn) {
    return <Redirect href={`/${routes.lines}`} />;
  }

  return (
    <Stack
      initialRouteName={isLoggedIn ? routes.lines : routes.login}
      screenOptions={{
        headerTitle: "",
        headerTitleAlign: "center",
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: bg,
        },
        headerTintColor: text,
        animation: "none",
      }}
    />
  );
};

export default NonAuthorizedLayout;
