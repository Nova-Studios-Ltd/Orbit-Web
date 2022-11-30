import { GETKey } from "NSLib/APIEvents";
import { Dictionary, KeyValuePair } from "NSLib/Dictionary";
import { IndexedDB } from "StorageLib/IndexedDB";
import { IndexedDBStore } from "StorageLib/IndexedDBStore";

export default class KeyStore {

  private static KeyStore() : Promise<IndexedDBStore | undefined> {
    return new Promise((resolve) => {
      new IndexedDB("Keystore", (database: IndexedDB) => {
        resolve(database.GetStore("Keystore"));
    })});
  }

  static async GetKey(user_uuid: string) : Promise<string | undefined> {
    if (!await this.ContainsKey(user_uuid)) {
      console.log(`Keystore did not contain key for user ${user_uuid}. Attempting fetch from server...`);
      const key = await GETKey(user_uuid);
      if (key === undefined) return undefined;
      await this.SetKey(user_uuid, key);
      return key;
    }
    return (await this.KeyStore())?.Get<string>(user_uuid);
  }

  static async SetKey(user_uuid: string, key: string) {
    await (await this.KeyStore())?.Add(user_uuid, key);
  }

  static async ClearKey(user_uuid: string) : Promise<boolean | undefined> {
    return await (await this.KeyStore())?.Remove(user_uuid);
  }

  static async ClearKeys() {
    await (await this.KeyStore())?.Clear();
  }

  static async LoadKeys(keys: Dictionary<string>) {
    keys.forEach((pair: KeyValuePair<string>) => {
      this.SetKey(pair.Key, pair.Value);
    });
  }

  static async ContainsKey(user_uuid: string) : Promise<boolean> {
    return (await this.KeyStore())?.Get<string>(user_uuid) === undefined? false : true;
  }
}
