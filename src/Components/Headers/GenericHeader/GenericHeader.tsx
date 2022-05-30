import { Typography, useTheme } from "@mui/material";
import useClassNames from "Hooks/useClassNames";

import AvatarTextButton from "Components/Buttons/AvatarTextButton/AvatarTextButton";

import type { NCComponent } from "DataTypes/Components";
import type { IRawChannelProps } from "Interfaces/IRawChannelProps";
import type { ReactNode } from "react";

export interface GenericHeaderProps extends NCComponent {
  title?: string,
  childrenLeft?: ReactNode,
  childrenRight?: ReactNode,
}

function GenericHeader(props: GenericHeaderProps) {
  const theme = useTheme();
  const classNames = useClassNames("GenericHeaderContainer", props.className);

  const GenericHeaderLeft = () => {
    if (!props.childrenLeft) return null;

    return (
      <div className="GenericHeaderLeft">
        {props.childrenLeft}
      </div>
    );
  }

  const GenericHeaderRight = () => {
    if (!props.childrenRight) return null;

    return (
      <div className="GenericHeaderRight">
        {props.childrenRight}
      </div>
    );
  }

  return (
    <div className={classNames} style={{ backgroundColor: theme.palette.background.paper }}>
      {GenericHeaderLeft()}
      <Typography variant="h5">{props.title}</Typography>
      {GenericHeaderRight()}
    </div>
  )
}

export default GenericHeader;
