/**
 * Represents the UserInfoResponse as a JSON Object.
 */
export interface UserInfoResponseJson {
    sub: string;
}
/**
 * Represents the possible error codes from the user info endpoint.
 * For more information look at:
 * http://openid.net/specs/openid-connect-core-1_0.html#UserInfo
 */
export declare type UserInfoErrorType = 'invalid_token';
/**
 * Represents the UserInfoError as a JSON Object.
 */
export interface UserInfoErrorJson {
    error: UserInfoErrorType;
    error_description?: string;
    error_uri?: string;
}
/**
 * Represents the UserInfo Error type.
 * For more information look at:
 * http://openid.net/specs/openid-connect-core-1_0.html#UserInfo
 */
export declare class UserInfoError {
    readonly error: UserInfoErrorType;
    readonly errorDescription: string | undefined;
    readonly errorUri: string | undefined;
    constructor(error: UserInfoErrorType, errorDescription?: string | undefined, errorUri?: string | undefined);
    toJson(): UserInfoErrorJson;
    static fromJson(input: UserInfoErrorJson): UserInfoError;
}
