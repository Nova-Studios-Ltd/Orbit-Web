import { NetAPI } from "@nova-studios-ltd/typescript-netapi";
import { Flags, HasUrlFlag } from "Lib/Debug/Flags";
import manifest from "../package.json";

export const APP_VERSION = manifest.version;
export const DEBUG = true;

export const IsDevelopment = (window.location.host.includes("localhost") || window.location.host.includes("live")) && !HasUrlFlag(Flags.ForceMainAPI);

// Control values for API
export const API_DOMAIN = (IsDevelopment)? "https://live.api.novastudios.uk" : "https://api.novastudios.uk"; /* http://, https:// */
export const WEBSOCKET_DOMAIN = (IsDevelopment)? "wss://live.api.novastudios.uk" : "wss://api.novastudios.uk"; /* ws:// wss:// */

NetAPI.Init(API_DOMAIN);
