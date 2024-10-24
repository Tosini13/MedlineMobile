import { Text, useThemeColor } from "@/components/Themed";
import { API } from "@/services/api";
import { routes } from "@/utils/utils";
import { MaterialIcons } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Box } from "native-base";
import { FC } from "react";
import { ActivityIndicator, Pressable } from "react-native";

type MenuPropsType = {};

const Menu: FC<MenuPropsType> = ({}) => {
  const color = useThemeColor({}, "secondary-accent");
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationKey: ["logout"],
    mutationFn: async () =>
      API.auth.signOut().then(() => {
        router.replace(routes.login);
      }),
  });
  return (
    <Box className="flex-1 bg-primary pt-8">
      <Pressable onPress={() => mutate()}>
        <Box className="flex flex-row items-center justify-start space-x-4 px-4">
          {isPending ? (
            <ActivityIndicator color={color} size={20} />
          ) : (
            <MaterialIcons name="logout" color={color} size={24} />
          )}
          <Text className="text-lg font-medium text-secondary-accent">
            Log out
          </Text>
        </Box>
      </Pressable>
    </Box>
  );
};

export default Menu;
