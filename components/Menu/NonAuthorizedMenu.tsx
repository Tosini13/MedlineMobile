import { View } from "@/components/Themed";
import { Link } from "expo-router";
import { FC } from "react";

type NonAuthorizedMenuPropsType = {};

const NonAuthorizedMenu: FC<NonAuthorizedMenuPropsType> = ({}) => {
  return (
    <View className="flex h-full flex-col items-center justify-between p-4 pb-8">
      <View>
        <Link href="/(non-authorized)/login" className="text-blue-500">
          Log in
        </Link>
      </View>
    </View>
  );
};

export default NonAuthorizedMenu;
