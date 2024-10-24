import Logo from "@/components/Logo/Logo";
import { useThemeColor } from "@/components/Themed";
import { useAuthContext } from "@/context/auth.context";
import { API } from "@/services/api";
import { routes } from "@/utils/utils";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useMutation } from "@tanstack/react-query";
import { Redirect, Stack, useRouter } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { Box } from "native-base";
import { FC } from "react";
import { ActivityIndicator, Pressable } from "react-native";

type LayoutPropsType = {};

const Layout: FC<LayoutPropsType> = ({}) => {
  const bg = useThemeColor({}, "background");
  const text = useThemeColor({}, "text");
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
      <Stack.Screen
        options={{
          title: "",
          headerShown: false,
        }}
      />
      <Stack
        initialRouteName={routes.lines}
        screenOptions={({ navigation }) => ({
          animation: "slide_from_left",
          headerShadowVisible: false,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: bg,
          },
          headerTitle: "",
          headerTintColor: text,
          headerLeft: () => <Logo />,
          headerRight: () => {
            const isMenuOpen = navigation.canGoBack();
            return (
              <Pressable
                onPress={() =>
                  isMenuOpen ? navigation.goBack() : navigation.navigate("menu")
                }
                className="flex h-11 w-11 flex-row items-center justify-end"
              >
                <Feather name={isMenuOpen ? "minus" : "menu"} size={26} />
              </Pressable>
            );
          },
        })}
      />
    </>
  );
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
        screenOptions={({ navigation }) => ({
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: bg,
          },
          headerTintColor: text,
          headerLeft: () => (
            <Box className="ml-3">
              <Logo />
            </Box>
          ),
          headerRight: () => {
            const isOpen = !!navigation
              .getState()
              .history.find(
                (item: { type: string; status: string }) =>
                  item.type === "drawer" && item.status === "open",
              );
            return (
              <Pressable
                onPress={() => navigation.toggleDrawer()}
                className="mr-2 flex h-11 w-11 items-center justify-center"
              >
                <Feather name="menu" size={24} />
              </Pressable>
            );
          },
        })}
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
