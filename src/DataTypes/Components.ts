import type { IRawChannelProps } from "Interfaces/IRawChannelProps"
import type { ReactNode } from "react"

export interface HelpPopupProps {
  visible: boolean,
  anchorEl?: Element,
  content?: ReactNode,
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>,
  setAnchor: React.Dispatch<React.SetStateAction<Element>>,
  setContent: React.Dispatch<React.SetStateAction<ReactNode>>
}

export interface NCComponent {
  className?: string
}

export interface NCAPIComponent extends NCComponent {
  selectedChannel?: IRawChannelProps,
}

export interface Page {
  HelpPopup?: HelpPopupProps,
  changeTitleCallback?: (title: string) => void
  widthConstrained?: boolean
}

export interface View {
  path?: unknown,
  changeTitleCallback?: (title: string) => void,
  HelpPopup?: HelpPopupProps,
  widthConstrained?: boolean,
  pageSpecificProps?: unknown
}
