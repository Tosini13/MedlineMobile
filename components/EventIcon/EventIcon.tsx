import { EventType } from "@/types";
import { FontAwesome, FontAwesome5, Fontisto } from "@expo/vector-icons";
import { FC } from "react";

type EventIconPropsType = {
  type: EventType["type"];
  size?: number;
  color?: string;
};

const EventIcon: FC<EventIconPropsType> = ({
  type,
  size = 30,
  color = "black",
}) => {
  switch (type) {
    case "appointment":
      return <FontAwesome name="calendar" size={size} color={color} />;
    case "test":
      return <FontAwesome name="stethoscope" size={size} color={color} />;
    case "surgery":
      return <Fontisto name="injection-syringe" size={size} color={color} />;
    case "occurrence":
      return <FontAwesome5 name="user-injured" size={size} color={color} />;
    case "other":
      return <FontAwesome name="question" size={size} color={color} />;
  }
};

export default EventIcon;
