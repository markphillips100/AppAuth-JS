import { AuthorizationServiceConfiguration } from './authorization_service_configuration';
import { Crypto } from './crypto_utils';
import { EndSessionRequest } from './end_session_request';
import { EndSessionRequestHandler, EndSessionRequestResponse } from './end_session_request_handler';
import { BasicQueryStringUtils } from './query_string_utils';
import { StorageBackend } from './storage';
import { LocationLike } from './types';
/**
 * Represents an EndSessionRequestHandler which uses a standard
 * redirect based code flow.
 */
export declare class EndSessionRedirectRequestHandler extends EndSessionRequestHandler {
    storageBackend: StorageBackend;
    locationLike: LocationLike;
    constructor(storageBackend?: StorageBackend, utils?: BasicQueryStringUtils, locationLike?: LocationLike, crypto?: Crypto);
    performEndSessionRequest(configuration: AuthorizationServiceConfiguration, request: EndSessionRequest): void;
    /**
     * Attempts to introspect the contents of storage backend and completes the
     * request.
     */
    protected completeEndSessionRequest(): Promise<EndSessionRequestResponse | null>;
}
