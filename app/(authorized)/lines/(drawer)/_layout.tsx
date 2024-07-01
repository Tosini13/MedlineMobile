import { useAuthContext } from "@/context/auth.context";
import { API } from "@/services/api";
import { routes } from "@/utils/utils";
import { MaterialIcons } from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useMutation } from "@tanstack/react-query";
import { Redirect, useRouter } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { FC } from "react";
import { ActivityIndicator } from "react-native";

type LayoutPropsType = {};

const Layout: FC<LayoutPropsType> = ({}) => {
  const { isLoggedIn } = useAuthContext();
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationKey: ["logout"],
    mutationFn: async () =>
      API.auth.signOut().then(() => {
        router.back();
        router.navigate(routes.login);
      }),
  });

  if (!isLoggedIn) {
    return <Redirect href={`/${routes.login}`} />;
  }
  return (
    <>
      <Drawer.Screen
        options={{
          title: "Lines",
          headerShown: false,
        }}
      />
      <Drawer
        initialRouteName={routes.lines}
        screenOptions={{
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#608ae3",
          },
          headerTintColor: "#fff",
        }}
        backBehavior="firstRoute"
        drawerContent={(props) => {
          return (
            <DrawerContentScrollView {...props}>
              <DrawerItemList {...props} />
              <DrawerItem
                label="Logout"
                onPress={() => mutate()}
                icon={({ color, size }) =>
                  isPending ? (
                    <ActivityIndicator color={color} size={size} />
                  ) : (
                    <MaterialIcons name="logout" color={color} size={size} />
                  )
                }
              />
            </DrawerContentScrollView>
          );
        }}
      />
    </>
  );
};

export default Layout;
