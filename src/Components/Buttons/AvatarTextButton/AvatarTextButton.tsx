import { Avatar, ButtonBase, IconButton, Typography, useTheme } from "@mui/material";
import { MoreHoriz as EllipsisIcon } from "@mui/icons-material";
import React, { useState, ReactNode, useRef } from "react";

import GenericButton from "Components/Buttons/GenericButton/GenericButton";

import { useSelector } from "Redux/Hooks";

import type { NCComponent } from "Types/UI/Components";
import useClassNames from "Hooks/useClassNames";
import { SelectionType } from "Types/Enums";

export interface AvatarTextButtonProps extends NCComponent {
  children?: ReactNode,
  childrenAfter?: ReactNode,
  draggable?: boolean,
  iconSrc?: string,
  iconObj?: ReactNode,
  selected?: boolean,
  selectionType?: SelectionType,
  showEllipsis?: boolean,
  showEllipsisConditional?: boolean,
  fullWidth?: boolean,
  onDrag?: (event: React.DragEvent<HTMLDivElement>) => void,
  onDrop?: (event: React.DragEvent<HTMLSpanElement>) => void,
  onLeftClick?: (event: React.MouseEvent<HTMLButtonElement>) => void,
  onRightClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

function AvatarTextButton(props: AvatarTextButtonProps) {
  const theme = useTheme();
  const classNames = useClassNames(useClassNames("AvatarTextButtonContainer", props.className), props.fullWidth ? "FullWidth" : "");

  const isTouchCapable = useSelector(state => state.app.isTouchCapable);

  const [isHovering, setHoveringState] = useState(false);

  const AvatarTextButtonVeryRightRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  const backgroundColor = (() => {
    if (props.selected) {
      switch (props.selectionType) {
        case SelectionType.MultiSelect:
          return theme.palette.primary.main;
        case SelectionType.Single:
        default:
          return theme.customPalette.customActions.active;
      }
    }
    else if (isHovering) {
      return theme.customPalette.customActions.active;
    }

    return theme.palette.background.paper;
  })();

  const onMouseHover = (isHovering: boolean) => {
    setHoveringState(isHovering);
  }

  const onEllipsisClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (props.onRightClick) props.onRightClick(event);
  };

  return (
    <div className={classNames} style={{ background: backgroundColor, boxShadow: props.selected ? `4px 4px ${theme.palette.background.default}` : "none" }}>
      <GenericButton onLeftClick={props.onLeftClick} draggable={props.draggable} fullWidth defaultHoverAction={false} onRightClick={props.onRightClick} onMouseEnter={() => setHoveringState(true)} onMouseLeave={() => setHoveringState(false)} onDrag={props.onDrag} onDrop={props.onDrop}>
        <div className="AvatarTextButtonLeft">
          <Avatar className="AvatarTextButtonIcon" src={!props.iconObj ? props.iconSrc : ""}>{props.iconObj}</Avatar>
        </div>
        <div className="AvatarTextButtonRight" style={{ marginRight: AvatarTextButtonVeryRightRef.current !== undefined ? AvatarTextButtonVeryRightRef.current.offsetWidth : 0 }}>
          <Typography variant="h6" noWrap textOverflow="ellipsis">{props.children}</Typography>
        </div>
      </GenericButton>
      <div className="AvatarTextButtonVeryRight" ref={AvatarTextButtonVeryRightRef}>
        {props.childrenAfter}
        {props.showEllipsis || (isTouchCapable && props.showEllipsisConditional) ? (
          <IconButton className="AvatarTextButtonEllipsis" onClick={onEllipsisClick} onMouseEnter={() => onMouseHover(true)} onMouseLeave={() => onMouseHover(false)}>
            <EllipsisIcon />
          </IconButton>
        ) : null}
      </div>
    </div>
  );
}

export default AvatarTextButton;
