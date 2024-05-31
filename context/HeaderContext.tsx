import React, { createContext, useMemo } from "react";

export type OnPressActionType<Payload, Type extends string> = {
  type: Type;
  payload?: Payload;
};

type OnPressType = <Payload, Type extends string>(
  props: OnPressActionType<Payload, Type>,
) => void;

type HeaderContextOptionsType = {
  leftHeader: {
    onPress?: OnPressType;
    node?: React.ReactNode;
  };
  headerTitle: {
    title?: string;
    subtitle?: string;
    isPending?: boolean;
  };
  rightHeader: {
    onPress?: OnPressType;
    node?: React.ReactNode;
  };
};

type HeaderContextReducerActionType =
  | {
      type: "SET_LEFT_HEADER";
      payload: HeaderContextOptionsType["leftHeader"];
    }
  | {
      type: "SET_HEADER_TITLE";
      payload: HeaderContextOptionsType["headerTitle"];
    }
  | {
      type: "SET_RIGHT_HEADER";
      payload: HeaderContextOptionsType["rightHeader"];
    };

const reducer = (
  state: HeaderContextOptionsType,
  action: HeaderContextReducerActionType,
) => {
  switch (action.type) {
    case "SET_LEFT_HEADER":
      return { ...state, leftHeader: action.payload };
    case "SET_HEADER_TITLE":
      return { ...state, headerTitle: action.payload };
    case "SET_RIGHT_HEADER":
      return { ...state, rightHeader: action.payload };
    default:
      return state;
  }
};

const reducerInit = {
  leftHeader: {},
  headerTitle: {},
  rightHeader: {},
};

type HeaderContextType = {
  options: HeaderContextOptionsType;
  setLeftHeader: (options: HeaderContextOptionsType["leftHeader"]) => void;
  setHeaderTitle: (options: HeaderContextOptionsType["headerTitle"]) => void;
  setRightHeader: (options: HeaderContextOptionsType["rightHeader"]) => void;
  resetHeaders: () => void;
};

const HeaderContext = createContext<HeaderContextType | null>(null);

import { FC } from "react";

type HeaderContextProviderPropsType = {
  children: React.ReactNode;
};

const HeaderContextProvider: FC<HeaderContextProviderPropsType> = ({
  children,
}) => {
  const [state, dispatch] = React.useReducer(reducer, reducerInit);

  const handlers = useMemo(
    () => ({
      setLeftHeader: (leftHeader: HeaderContextOptionsType["leftHeader"]) =>
        dispatch({ type: "SET_LEFT_HEADER", payload: leftHeader }),
      setHeaderTitle: (headerTitle: HeaderContextOptionsType["headerTitle"]) =>
        dispatch({ type: "SET_HEADER_TITLE", payload: headerTitle }),
      setRightHeader: (rightHeader: HeaderContextOptionsType["rightHeader"]) =>
        dispatch({ type: "SET_RIGHT_HEADER", payload: rightHeader }),
      resetHeaders: () => {
        dispatch({ type: "SET_RIGHT_HEADER", payload: {} });
        dispatch({ type: "SET_HEADER_TITLE", payload: {} });
        dispatch({ type: "SET_LEFT_HEADER", payload: {} });
      },
    }),
    [dispatch],
  );
  return (
    <HeaderContext.Provider
      value={{
        options: state,
        ...handlers,
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
};

export default HeaderContextProvider;

export const useHeaderContext = () => {
  const context = React.useContext(HeaderContext);

  if (!context) {
    throw new Error("useHeaderContext must be used within a HeaderContext");
  }

  return context;
};
