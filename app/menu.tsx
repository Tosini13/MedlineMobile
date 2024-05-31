import { Text, View } from "@/components/Themed";
import { FC } from "react";

type MenuPropsType = {};

const Menu: FC<MenuPropsType> = ({}) => {
  return (
    <View className="flex h-full flex-col items-center justify-between p-4 pb-8">
      <Text>You're still not a logged user!</Text>
      <Text>So you can't change any settings</Text>
      <Text>You can't log out either</Text>
    </View>
  );
};

export default Menu;
