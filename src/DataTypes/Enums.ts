export enum ChannelType {
    User = 0,
    Group = 1,
    Default = 0
}

export enum LoginStatus {
  InvalidCredentials = 0,
  ServerError = 1,
  Success = 2,
  PendingStatus = 3,
  UnknownUser = 4
}

export enum RegisterStatus {
  RSAFailed = 0,
  ServerError = 1,
  Success = 2,
  PendingStatus = 3,
  EmailUsed = 4
}
