import { View } from "@/components/Themed";
import { Link } from "expo-router";
import { FC } from "react";

type MenuPropsType = {};

const Menu: FC<MenuPropsType> = ({}) => {
  return (
    <View className="flex h-full flex-col items-center justify-between p-4 pb-8">
      <Link href="/(auth)/login" className="text-blue-500">
        Log in
      </Link>
    </View>
  );
};

export default Menu;
