import { AuthorizationServiceConfiguration } from './authorization_service_configuration';
import { QueryStringUtils } from './query_string_utils';
import { UserInfoRequest } from './user_info_request';
import { UserInfoResponseJson } from './user_info_response';
import { Requestor } from './xhr';
/**
 * Represents an interface which can make a user info request.
 */
export interface UserInfoRequestHandler {
    /**
     * Performs the user info request, given the service configuration.
     */
    performUserInfoRequest(configuration: AuthorizationServiceConfiguration, request: UserInfoRequest): Promise<UserInfoResponseJson>;
}
/**
 * The default user info request handler.
 */
export declare class BaseUserInfoRequestHandler implements UserInfoRequestHandler {
    readonly requestor: Requestor;
    readonly utils: QueryStringUtils;
    constructor(requestor?: Requestor, utils?: QueryStringUtils);
    private isUserInfoResponse(response);
    performUserInfoRequest(configuration: AuthorizationServiceConfiguration, request: UserInfoRequest): Promise<UserInfoResponseJson>;
}
