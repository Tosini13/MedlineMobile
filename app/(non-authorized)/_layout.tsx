import { Slot, useRouter } from "expo-router";
import { getAuth } from "firebase/auth";
import { FC, useEffect } from "react";

type NonAuthorizedLayoutPropsType = {};

const NonAuthorizedLayout: FC<NonAuthorizedLayoutPropsType> = ({}) => {
  const router = useRouter();

  useEffect(() => {
    getAuth().onAuthStateChanged((user) => {
      if (user) {
        router.push("/(authorized)/(authorized)/lines/");
      }
    });
  }, []);

  return <Slot />;
};

export default NonAuthorizedLayout;
