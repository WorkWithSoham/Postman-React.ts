export interface RenderBooleans {
    urlBox: boolean;
    paramsBox: boolean;
}

export interface FinalRequest {
    url: string;
    method: string;
    parameters: Parameters[];
    headers: any;
}

export type Parameters = {
    key: string;
    value: any;
}