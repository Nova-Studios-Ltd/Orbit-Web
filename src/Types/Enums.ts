export enum LoginStatus {
  InvalidCredentials = 0,
  ServerError = 1,
  Success = 2,
  PendingStatus = 3,
  UnknownUser = 4,
  UnconfirmedEmail = 5
}

export enum RegisterStatus {
  RSAFailed = 0,
  ServerError = 1,
  Success = 2,
  PendingStatus = 3,
  EmailUsed = 4
}

export enum DebugMessageType {
  Log = "Log",
  Warning = "Wrn",
  Error = "Err",
  Success = "Scs"
}

export enum ChannelTypes {
  DMChannel,
  GroupChannel,
  PrivateChannel
}

export enum SelectionType {
  Single,
  MultiSelect
}

export enum FriendButtonVariant {
  FriendsOnly,
  Blocked,
  DialogSingle,
  DialogGroup,
  All
}

export enum TextComboStates {
  Neutral,
  Error,
  Success
}
