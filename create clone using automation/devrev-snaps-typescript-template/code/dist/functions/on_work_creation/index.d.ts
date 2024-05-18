import { publicSDK } from "@devrev/typescript-sdk";
export declare function handleEvent(event: any): Promise<import("axios").AxiosResponse<publicSDK.WorksCreateResponse, any>>;
export declare const run: (events: any[]) => Promise<void>;
export default run;
