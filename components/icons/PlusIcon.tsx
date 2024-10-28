import { FC } from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const PlusIcon: FC<SvgProps> = (props) => (
  <Svg viewBox="0 0 28 28" {...props}>
    <Path
      d="M12.7271 10.2813L13.9998 12.4688L15.2725 10.2813V0H12.7271V10.2813Z"
      fill="currentColor"
    />
    <Path
      d="M12.7271 17.7188L13.9998 15.5313L15.2725 17.7188V28H12.7271V17.7188Z"
      fill="currentColor"
    />
    <Path
      d="M10.2813 15.2725L12.4688 13.9997L10.2813 12.727L-1.11265e-07 12.727L0 15.2725L10.2813 15.2725Z"
      fill="currentColor"
    />
    <Path
      d="M17.7188 15.2725L15.5313 13.9997L17.7188 12.727L28 12.727L28 15.2725L17.7188 15.2725Z"
      fill="currentColor"
    />
  </Svg>
);

export default PlusIcon;
