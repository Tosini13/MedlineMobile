import { View } from "@/components/Themed";
import { API } from "@/services/api";
import { routes } from "@/utils/utils";
import { MaterialIcons } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import { Link, useRouter } from "expo-router";
import { Button } from "native-base";
import { FC } from "react";
import { ActivityIndicator } from "react-native";

type AuthorizedMenuPropsType = {};

const AuthorizedMenu: FC<AuthorizedMenuPropsType> = ({}) => {
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationKey: ["logout"],
    mutationFn: async () =>
      API.auth.signOut().then(() => {
        router.back();
        router.navigate("/(non-authorized)/login");
      }),
  });

  return (
    <View className="flex h-full flex-col items-center justify-between p-4 pb-8">
      <View>
        <Link href={routes.lines} className="text-blue-500">
          Lines
        </Link>
      </View>
      <View>
        <Button
          onPress={() => mutate()}
          leftIcon={
            isPending ? (
              <ActivityIndicator color="white" size={24} />
            ) : (
              <MaterialIcons name="logout" size={24} color="white" />
            )
          }
        >
          Log out
        </Button>
      </View>
    </View>
  );
};

export default AuthorizedMenu;
