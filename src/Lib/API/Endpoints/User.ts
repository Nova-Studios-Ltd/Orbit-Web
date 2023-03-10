import IUserData from "Types/API/Interfaces/IUserData";
import UserData from "Lib/Storage/Objects/UserData";
import { SHA256 } from "Lib/Encryption/Util";
import { AESEncrypt } from "Lib/Encryption/AES";
import Base64Uint8Array from "Lib/Objects/Base64Uint8Array";
import { PasswordPayloadKey, UpdatePasswordPayload } from "Types/API/UpdatePasswordPayload";
import { ResetPasswordPayload, ResetPasswordPayloadKey } from "Types/API/ResetPasswordPayload";
import { RSAMemoryKeypair } from "Lib/Encryption/Types/RSAMemoryKeypair";
import { NetAPI, NetHeaders, HTTPStatus, ContentType, BufferPayload } from "@nova-studios-ltd/typescript-netapi";

/**
 * Requests a users information
 * @param user_uuid The uuid of the user to request
 * @returns IUserData if successful otherwise undefined
 */
export async function RequestUser(user_uuid: string) : Promise<IUserData | undefined> {
  const resp = await NetAPI.GET(`User/${user_uuid}`, new NetHeaders().WithAuthorization(UserData.Token));
  if (resp.status === HTTPStatus.OK) return resp.payload as IUserData;
  return undefined;
}

/**
 * Requests a users uuid
 * @param username Username
 * @param discriminator Discriminator
 * @returns A UUID if successful otherwise undefined
 */
export async function RequestUserUUID(username: string, discriminator: string) : Promise<string | undefined> {
  const resp = await NetAPI.GET<string>(`/User/${username}/${discriminator}/UUID`, new NetHeaders().WithAuthorization(UserData.Token));
  if (resp.status === HTTPStatus.OK) return resp.payload;
  return undefined;
}

/**
 * Requests the current users channels
 * @param callback Called on success, contains a array of channel uuid's
 */
export async function RequestUserChannels(callback: (channel: string[]) => void) {
  NetAPI.GET<string[]>("/User/@me/Channels", new NetHeaders().WithAuthorization(UserData.Token)).then((resp) => {
    if (resp.status === HTTPStatus.OK) callback(resp.payload);
  });
}

/**
 * Requests to change the current users username
 * @param newUsername New username
 * @param callback Calls when the request finishes, return status and the new username
 */
export async function RequestChangeUsername(newUsername: string, callback: (status: boolean, newUsername: string) => void) {
  NetAPI.PATCH(`/User/@me/Username`, JSON.stringify(newUsername), new NetHeaders().WithAuthorization(UserData.Token).WithContentType(ContentType.JSON)).then((resp) => {
    if (resp.status === HTTPStatus.OK) callback(true, newUsername);
    else callback(false, "");
  });
}

/**
 * Requests to change the current users password
 * @param newPassword New password
 * @param callback Calls when the request finishes, return status and the new password
 */
export async function RequestChangePassword(newPassword: string, callback: (status: boolean, newPassword: string) => void) {
  const hashedPassword = await SHA256(newPassword);
  const privkey = await AESEncrypt(hashedPassword, new Base64Uint8Array(UserData.KeyPair.PrivateKey));
  const payload = new UpdatePasswordPayload(hashedPassword.Base64, new PasswordPayloadKey(privkey.content.Base64, privkey.iv.Base64));
  NetAPI.PATCH(`/User/@me/Password`, JSON.stringify(payload), new NetHeaders().WithAuthorization(UserData.Token).WithContentType(ContentType.JSON)).then((resp) => {
    if (resp.status === HTTPStatus.OK) callback(true, newPassword);
    else callback(false, "");
  });
}

/**
 * Requests to change the current users email
 * @param newEmail New email
 * @param callback Calls when the request finishes, return status and the new email
 */
export async function RequestChangeEmail(newEmail: string, callback: (status: boolean, newEmail: string) => void) {
  NetAPI.PATCH(`/User/@me/Email`, JSON.stringify(newEmail), new NetHeaders().WithAuthorization(UserData.Token).WithContentType(ContentType.JSON)).then((resp) => {
    if (resp.status === HTTPStatus.OK) callback(true, newEmail);
    else callback(false, "");
  });
}

/**
 * Requests to reset the current users password, replacing it with the information provided
 * @param newPassword New password
 * @param token Reset token
 * @param keypair New RSA keypair
 * @param callback Called when the request finishes, returns status and the new password
 */
export async function RequestResetPassword(newPassword: string, token: string, keypair: RSAMemoryKeypair, callback: (status: boolean, newPassword: string) => void) {
  const hashedPassword = await SHA256(newPassword);
  const privkey = await AESEncrypt(hashedPassword, new Base64Uint8Array(keypair.PrivateKey));
  const payload = new ResetPasswordPayload(hashedPassword.Base64, new ResetPasswordPayloadKey(privkey.content.Base64, privkey.iv.Base64, keypair.PublicKey));
  NetAPI.PUT(`/User/@me/Reset?tokem=${token}`, JSON.stringify(payload), new NetHeaders().WithAuthorization(UserData.Token).WithContentType(ContentType.JSON)).then((resp) => {
    if (resp.status === HTTPStatus.OK) callback(true, newPassword);
    else callback(false, "");
  });
}

/**
 * Request to delete the current users account
 * @param callback Called when the request finishes, returns status
 */
export async function RequestDeleteUser(callback: (status: boolean) => void) {
  NetAPI.DELETE(`/User/@me`, new NetHeaders().WithAuthorization(UserData.Token)).then((resp) => {
    if (resp.status === HTTPStatus.OK) callback(true);
    else callback(false);
  });
}

/**
 * Requests the current users avatar be updated to the provided image
 * @param file Image provided as a blob
 * @param callback Called when the requets finishes
 */
export function RequestSetAvatar(file: Blob, callback: (set: boolean) => void) {
  NetAPI.POSTBuffer(`/User/${UserData.Uuid}/Avatar`, new BufferPayload(file, "Unknown"), new NetHeaders().WithAuthorization(UserData.Token)).then((resp) => {
    if (resp.status === HTTPStatus.OK) callback(true);
    else callback(false);
  });
}

/**
 * Confirms the current users email
 * @param token User token
 * @returns True if succesful, otherwise false
 */
export async function SendConfirmEmail(token: string) : Promise<boolean> {
  const resp = await NetAPI.PUT(`/User/@me/ConfirmEmail?token=${token}`, "", new NetHeaders().WithContentType(ContentType.EMPTY));
  if (resp.status === HTTPStatus.OK) return true;
  return false;
}
