/**
 * Represents the EndSessionResponse as a JSON object.
 */
export interface EndSessionResponseJson {
    state: string;
}
/**
 * Represents the EndSessionError as a JSON object.
 */
export interface EndSessionErrorJson {
    error: string;
    error_description?: string;
    error_uri?: string;
    state?: string;
}
/**
 * Represents the EndSession Response type.
 * For more information look at
 * http://openid.net/specs/openid-connect-session-1_0.html
 */
export declare class EndSessionResponse {
    state: string;
    constructor(response: EndSessionResponseJson);
    toJson(): EndSessionResponseJson;
}
/**
 * Represents the EndSession error response.
 * For more information look at:
 * http://openid.net/specs/openid-connect-session-1_0.html
 */
export declare class EndSessionError {
    error: string;
    errorDescription?: string;
    errorUri?: string;
    state?: string;
    constructor(error: EndSessionErrorJson);
    toJson(): EndSessionErrorJson;
}
