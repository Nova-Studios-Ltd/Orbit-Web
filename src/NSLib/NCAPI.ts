/**
 * Represents a response from the NovaChat API
 */
export class NCAPIResponse {
  status: number | undefined;
  statusText: string | undefined;
  error: unknown | undefined;
  payload: any | undefined;

  constructor(status?: number | undefined, statusText?: string | undefined, payload?: unknown, error?: unknown | undefined) {
    this.status = status || -1;
    this.statusText = statusText || "";
    this.error = error;
    this.payload = payload;
  }
}

/**
 * Represents common content types
 */
export enum ContentType {
  EMPTY = "",
  JSON = "application/json",
  PNG = "image/png",
  FORMDATA = "multipart/form-data",
  TEXT = "text/plain"
}

/**
 * Use to GET data from the API
 * @param endpoint Url of the endpoint
 * @param token Optional security token
 * @returns A NCAPIResponse with the data from the NovaChat API
 */
export async function GET(endpoint: string, token?: string, json: boolean = true) : Promise<NCAPIResponse> {
  const resp = await fetch(`https://api.novastudios.tk/${endpoint}`, {
    method: "GET",
    headers: {
      "Authorization": token || ""
    }
  });
  if (json)
    return new NCAPIResponse(resp.status, resp.statusText, await resp.json());
  else
    return new NCAPIResponse(resp.status, resp.statusText, await resp.text());
}

/**
 * Use to POST data to the API
 * @param endpoint Url of the endpoint
 * @param content_type Indicates the type of data being sent
 * @param payload The data to be sent with the request
 * @param token Optional security token
 * @returns A NCAPIResponse with the data from the NovaChat API
 */
export async function POST(endpoint: string, content_type: ContentType, payload: string, token?: string) : Promise<NCAPIResponse> {
  const resp = await fetch(`https://api.novastudios.tk/${endpoint}`, {
    method: "POST",
    headers: {
        "Authorization": token || "",
        "Content-Type": content_type
    },
    body: payload
  });
  return new NCAPIResponse(resp.status, resp.statusText, await resp.json());
}

/**
 * Use to PUT data to the API
 * @param endpoint Url of the endpoint
 * @param content_type Indicates the type of data being sent
 * @param payload The data to be sent with the request
 * @param token Optional security token
 * @returns A NCAPIResponse with the data from the NovaChat API
 */
export async function PUT(endpoint: string, content_type: ContentType, payload: string, token?: string) : Promise<NCAPIResponse> {
    const resp = await fetch(`https://api.novastudios.tk/${endpoint}`, {
        method: "PUT",
        headers: {
            "Authorization": token || "",
            "Content-Type": content_type
        },
        body: payload
    });
    return new NCAPIResponse(resp.status, resp.statusText);
}

/**
 * Use to PATCH data to the API
 * @param endpoint Url of the endpoint
 * @param content_type Indicates the type of data being sent
 * @param payload The data to be sent with the request
 * @param token Optional security token
 * @returns A NCAPIResponse with the data from the NovaChat API
 */
export async function PATCH(endpoint: string, content_type: ContentType, payload: string, token?: string) : Promise<NCAPIResponse> {
    const resp = await fetch(`https://api.novastudios.tk/${endpoint}`, {
        method: "PATCH",
        headers: {
            "Authorization": token || "",
            "Content-Type": content_type
        },
        body: payload
    });
    return new NCAPIResponse(resp.status, resp.statusText);
}

/**
 * Use to DELETE data from the API
 * @param endpoint Url of the endpoint
 * @param token Optional security token
 * @returns A NCAPIResponse with the data from the NovaChat API
 */
export async function DELETE(endpoint: string, token?: string) : Promise<NCAPIResponse> {
    const resp = await fetch(`https://api.novastudios.tk/${endpoint}`, {
        method: "DELETE",
        headers: {
            "Authorization": token || ""
        }
    });
    return new NCAPIResponse(resp.status, resp.statusText);
}

/**
 * Use to POST a file to the API
 * @param endpoint Url of the endpoint
 * @param payload Blob containing the file
 * @param token Optional security token
 * @returns A NCAPIResponse with the data from the NovaChat API
 */
export async function POSTFile(endpoint: string, payload: Blob, filename: string, token?: string) : Promise<NCAPIResponse> {
  const formData = new FormData();
  formData.append("file", payload, filename);
  const resp = await fetch(`https://api.novastudios.tk/${endpoint}`, {
    method: "POST",
    body: formData,
    headers: {
      "Authorization": token || ""
    }
  });
  return new NCAPIResponse(resp.status, resp.statusText, await resp.text());
}

/**
 * Use to GET a file from the API
 * @param endpoint Url of the endpoint
 * @param token Optional security token
 * @returns A NCAPIResponse with the data from the NovaChat API
 */
export async function GETFile(endpoint: string, token?: string) : Promise<NCAPIResponse> {
  if (endpoint.includes("https://api.novastudios.tk")) endpoint = endpoint.replace("https://api.novastudios.tk", "");
  const resp = await fetch(`https://api.novastudios.tk/${endpoint}`, {
      method: "GET",
      headers: {
        "Authorization": token || ""
      }
  });
  return new NCAPIResponse(resp.status, resp.statusText, new Uint8Array(await resp.arrayBuffer()))
}
