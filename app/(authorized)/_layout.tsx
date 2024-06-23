import { Slot, useRouter } from "expo-router";
import { getAuth } from "firebase/auth";
import { FC, useEffect } from "react";

type AuthorizedLayoutPropsType = {};

const AuthorizedLayout: FC<AuthorizedLayoutPropsType> = ({}) => {
  const router = useRouter();

  useEffect(() => {
    getAuth().onAuthStateChanged((user) => {
      console.log("AuthorizedLayout user !log", user);
      if (!user) {
        router.push("/(non-authorized)/login");
      }
    });
  }, []);

  return <Slot />;
};

export default AuthorizedLayout;
