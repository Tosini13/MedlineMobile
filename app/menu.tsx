import AuthorizedMenu from "@/components/Menu/AuthorizedMenu";
import NonAuthorizedMenu from "@/components/Menu/NonAuthorizedMenu";
import { getAuth } from "firebase/auth";
import { FC } from "react";

type MenuPropsType = {};

const Menu: FC<MenuPropsType> = ({}) => {
  if (getAuth().currentUser) {
    return <AuthorizedMenu />;
  }
  return <NonAuthorizedMenu />;
};

export default Menu;
