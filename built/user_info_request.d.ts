import { StringMap } from './types';
/**
 * Represents the user info Request as JSON.
 */
export interface UserInfoRequestJson {
    token_type: string;
    access_token: string;
    extras?: StringMap;
}
/**
 * Represents a UserInfo request.
 * For more information look at:
 * http://openid.net/specs/openid-connect-core-1_0.html#UserInfo
 */
export declare class UserInfoRequest {
    tokenType: string;
    accessToken: string;
    extras: StringMap | undefined;
    constructor(tokenType: string, accessToken: string, extras?: StringMap | undefined);
    /**
     * Serializes a UserInfo to a JavaScript object.
     */
    toJson(): UserInfoRequestJson;
    toStringMap(): StringMap;
    static fromJson(input: UserInfoRequestJson): UserInfoRequest;
}
