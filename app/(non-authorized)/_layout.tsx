import { useThemeColor } from "@/components/Themed";
import { useAuthContext } from "@/context/auth.context";
import { routes } from "@/utils/utils";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Redirect } from "expo-router";
import { Drawer } from "expo-router/drawer";
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
    <Drawer
      initialRouteName={isLoggedIn ? routes.lines : routes.login}
      screenOptions={{
        headerTitle: "",
        headerTitleAlign: "center",
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: bg,
        },
        headerTintColor: text,
      }}
      drawerContent={(props) => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
          </DrawerContentScrollView>
        );
      }}
    />
  );
};

export default NonAuthorizedLayout;
