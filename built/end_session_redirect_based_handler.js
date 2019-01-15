"use strict";
/*
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing permissions and
 * limitations under the License.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_utils_1 = require("./crypto_utils");
var end_session_request_1 = require("./end_session_request");
var end_session_request_handler_1 = require("./end_session_request_handler");
var end_session_response_1 = require("./end_session_response");
var logger_1 = require("./logger");
var query_string_utils_1 = require("./query_string_utils");
var storage_1 = require("./storage");
/** key for endsession request. */
var endSessionRequestKey = function (handle) {
    return handle + "_appauth_endsession_request";
};
/** key for authorization service configuration */
var authorizationServiceConfigurationKey = function (handle) {
    return handle + "_appauth_authorization_service_configuration";
};
/** key in local storage which represents the current endsession request. */
var ENDSESSION_REQUEST_HANDLE_KEY = 'appauth_current_endsession_request';
/**
 * Represents an EndSessionRequestHandler which uses a standard
 * redirect based code flow.
 */
var EndSessionRedirectRequestHandler = /** @class */ (function (_super) {
    __extends(EndSessionRedirectRequestHandler, _super);
    function EndSessionRedirectRequestHandler(
    // use the provided storage backend
    // or initialize local storage with the default storage backend which
    // uses window.localStorage
    storageBackend, utils, locationLike, crypto) {
        if (storageBackend === void 0) { storageBackend = new storage_1.LocalStorageBackend(); }
        if (utils === void 0) { utils = new query_string_utils_1.BasicQueryStringUtils(); }
        if (locationLike === void 0) { locationLike = window.location; }
        if (crypto === void 0) { crypto = new crypto_utils_1.DefaultCrypto(); }
        var _this = _super.call(this, utils, crypto) || this;
        _this.storageBackend = storageBackend;
        _this.locationLike = locationLike;
        return _this;
    }
    EndSessionRedirectRequestHandler.prototype.performEndSessionRequest = function (configuration, request) {
        var _this = this;
        var handle = this.crypto.generateRandom(10);
        // before you make request, persist all request related data in local storage.
        var persisted = Promise.all([
            this.storageBackend.setItem(ENDSESSION_REQUEST_HANDLE_KEY, handle),
            this.storageBackend.setItem(endSessionRequestKey(handle), JSON.stringify(request.toJson())),
            this.storageBackend.setItem(authorizationServiceConfigurationKey(handle), JSON.stringify(configuration.toJson())),
        ]);
        persisted.then(function () {
            // make the redirect request
            var url = _this.buildRequestUrl(configuration, request);
            logger_1.log('Making a request to ', request, url);
            _this.locationLike.assign(url);
        });
    };
    /**
     * Attempts to introspect the contents of storage backend and completes the
     * request.
     */
    EndSessionRedirectRequestHandler.prototype.completeEndSessionRequest = function () {
        var _this = this;
        // TODO(rahulrav@): handle endsession errors.
        return this.storageBackend.getItem(ENDSESSION_REQUEST_HANDLE_KEY).then(function (handle) {
            if (handle) {
                // we have a pending request.
                // fetch endsession request, and check state
                return _this.storageBackend
                    .getItem(endSessionRequestKey(handle))
                    // requires a corresponding instance of result
                    // TODO(rahulrav@): check for inconsitent state here
                    .then(function (result) { return JSON.parse(result); })
                    .then(function (json) { return new end_session_request_1.EndSessionRequest(json); })
                    .then(function (request) {
                    // check redirect_uri and state
                    var currentUri = "" + _this.locationLike.origin + _this.locationLike.pathname;
                    var queryParams = _this.utils.parse(_this.locationLike, true /* use hash */);
                    var state = queryParams['state'];
                    var error = queryParams['error'];
                    logger_1.log('Potential endsession request ', currentUri, queryParams, state, error);
                    var shouldNotify = state === request.state;
                    var endSessionResponse = null;
                    var endSessionError = null;
                    if (shouldNotify) {
                        if (error) {
                            // get additional optional info.
                            var errorUri = queryParams['error_uri'];
                            var errorDescription = queryParams['error_description'];
                            endSessionError = new end_session_response_1.EndSessionError({
                                error: error,
                                error_description: errorDescription,
                                error_uri: errorUri,
                                state: state
                            });
                        }
                        else {
                            endSessionResponse = new end_session_response_1.EndSessionResponse({ state: state });
                        }
                        // cleanup state
                        return Promise
                            .all([
                            _this.storageBackend.removeItem(ENDSESSION_REQUEST_HANDLE_KEY),
                            _this.storageBackend.removeItem(endSessionRequestKey(handle)),
                            _this.storageBackend.removeItem(authorizationServiceConfigurationKey(handle))
                        ])
                            .then(function () {
                            logger_1.log('Delivering endsession response');
                            return {
                                request: request,
                                response: endSessionResponse,
                                error: endSessionError
                            };
                        });
                    }
                    else {
                        logger_1.log('Mismatched request (state and request_uri) dont match.');
                        return Promise.resolve(null);
                    }
                });
            }
            else {
                return null;
            }
        });
    };
    return EndSessionRedirectRequestHandler;
}(end_session_request_handler_1.EndSessionRequestHandler));
exports.EndSessionRedirectRequestHandler = EndSessionRedirectRequestHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5kX3Nlc3Npb25fcmVkaXJlY3RfYmFzZWRfaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9lbmRfc2Vzc2lvbl9yZWRpcmVjdF9iYXNlZF9oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7Ozs7Ozs7Ozs7Ozs7OztBQUdILCtDQUFxRDtBQUNyRCw2REFBd0Q7QUFDeEQsNkVBQWtHO0FBQ2xHLCtEQUEwRTtBQUMxRSxtQ0FBNkI7QUFDN0IsMkRBQTJEO0FBQzNELHFDQUE4RDtBQUk5RCxrQ0FBa0M7QUFDbEMsSUFBTSxvQkFBb0IsR0FDdEIsVUFBQyxNQUFjO0lBQ2IsT0FBVSxNQUFNLGdDQUE2QixDQUFDO0FBQ2hELENBQUMsQ0FBQTtBQUVMLGtEQUFrRDtBQUNsRCxJQUFNLG9DQUFvQyxHQUN0QyxVQUFDLE1BQWM7SUFDYixPQUFVLE1BQU0saURBQThDLENBQUM7QUFDakUsQ0FBQyxDQUFBO0FBRUwsNEVBQTRFO0FBQzVFLElBQU0sNkJBQTZCLEdBQUcsb0NBQW9DLENBQUM7QUFFM0U7OztHQUdHO0FBQ0g7SUFBc0Qsb0RBQXdCO0lBQzVFO0lBQ0ksbUNBQW1DO0lBQ25DLHFFQUFxRTtJQUNyRSwyQkFBMkI7SUFDcEIsY0FBMEQsRUFDakUsS0FBbUMsRUFDNUIsWUFBNEMsRUFDbkQsTUFBb0M7UUFIN0IsK0JBQUEsRUFBQSxxQkFBcUMsNkJBQW1CLEVBQUU7UUFDakUsc0JBQUEsRUFBQSxZQUFZLDBDQUFxQixFQUFFO1FBQzVCLDZCQUFBLEVBQUEsZUFBNkIsTUFBTSxDQUFDLFFBQVE7UUFDbkQsdUJBQUEsRUFBQSxhQUFxQiw0QkFBYSxFQUFFO1FBUHhDLFlBUUUsa0JBQU0sS0FBSyxFQUFFLE1BQU0sQ0FBQyxTQUNyQjtRQUxVLG9CQUFjLEdBQWQsY0FBYyxDQUE0QztRQUUxRCxrQkFBWSxHQUFaLFlBQVksQ0FBZ0M7O0lBR3ZELENBQUM7SUFFRCxtRUFBd0IsR0FB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WyIvKlxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdFxuICogaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZVxuICogTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXJcbiAqIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IHtBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb259IGZyb20gJy4vYXV0aG9yaXphdGlvbl9zZXJ2aWNlX2NvbmZpZ3VyYXRpb24nO1xuaW1wb3J0IHtDcnlwdG8sIERlZmF1bHRDcnlwdG99IGZyb20gJy4vY3J5cHRvX3V0aWxzJztcbmltcG9ydCB7RW5kU2Vzc2lvblJlcXVlc3R9IGZyb20gJy4vZW5kX3Nlc3Npb25fcmVxdWVzdCc7XG5pbXBvcnQge0VuZFNlc3Npb25SZXF1ZXN0SGFuZGxlciwgRW5kU2Vzc2lvblJlcXVlc3RSZXNwb25zZX0gZnJvbSAnLi9lbmRfc2Vzc2lvbl9yZXF1ZXN0X2hhbmRsZXInO1xuaW1wb3J0IHtFbmRTZXNzaW9uRXJyb3IsIEVuZFNlc3Npb25SZXNwb25zZX0gZnJvbSAnLi9lbmRfc2Vzc2lvbl9yZXNwb25zZSdcbmltcG9ydCB7bG9nfSBmcm9tICcuL2xvZ2dlcic7XG5pbXBvcnQge0Jhc2ljUXVlcnlTdHJpbmdVdGlsc30gZnJvbSAnLi9xdWVyeV9zdHJpbmdfdXRpbHMnO1xuaW1wb3J0IHtMb2NhbFN0b3JhZ2VCYWNrZW5kLCBTdG9yYWdlQmFja2VuZH0gZnJvbSAnLi9zdG9yYWdlJztcbmltcG9ydCB7TG9jYXRpb25MaWtlfSBmcm9tICcuL3R5cGVzJztcblxuXG4vKioga2V5IGZvciBlbmRzZXNzaW9uIHJlcXVlc3QuICovXG5jb25zdCBlbmRTZXNzaW9uUmVxdWVzdEtleSA9XG4gICAgKGhhbmRsZTogc3RyaW5nKSA9PiB7XG4gICAgICByZXR1cm4gYCR7aGFuZGxlfV9hcHBhdXRoX2VuZHNlc3Npb25fcmVxdWVzdGA7XG4gICAgfVxuXG4vKioga2V5IGZvciBhdXRob3JpemF0aW9uIHNlcnZpY2UgY29uZmlndXJhdGlvbiAqL1xuY29uc3QgYXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uS2V5ID1cbiAgICAoaGFuZGxlOiBzdHJpbmcpID0+IHtcbiAgICAgIHJldHVybiBgJHtoYW5kbGV9X2FwcGF1dGhfYXV0aG9yaXphdGlvbl9zZXJ2aWNlX2NvbmZpZ3VyYXRpb25gO1xuICAgIH1cblxuLyoqIGtleSBpbiBsb2NhbCBzdG9yYWdlIHdoaWNoIHJlcHJlc2VudHMgdGhlIGN1cnJlbnQgZW5kc2Vzc2lvbiByZXF1ZXN0LiAqL1xuY29uc3QgRU5EU0VTU0lPTl9SRVFVRVNUX0hBTkRMRV9LRVkgPSAnYXBwYXV0aF9jdXJyZW50X2VuZHNlc3Npb25fcmVxdWVzdCc7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhbiBFbmRTZXNzaW9uUmVxdWVzdEhhbmRsZXIgd2hpY2ggdXNlcyBhIHN0YW5kYXJkXG4gKiByZWRpcmVjdCBiYXNlZCBjb2RlIGZsb3cuXG4gKi9cbmV4cG9ydCBjbGFzcyBFbmRTZXNzaW9uUmVkaXJlY3RSZXF1ZXN0SGFuZGxlciBleHRlbmRzIEVuZFNlc3Npb25SZXF1ZXN0SGFuZGxlciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgLy8gdXNlIHRoZSBwcm92aWRlZCBzdG9yYWdlIGJhY2tlbmRcbiAgICAgIC8vIG9yIGluaXRpYWxpemUgbG9jYWwgc3RvcmFnZSB3aXRoIHRoZSBkZWZhdWx0IHN0b3JhZ2UgYmFja2VuZCB3aGljaFxuICAgICAgLy8gdXNlcyB3aW5kb3cubG9jYWxTdG9yYWdlXG4gICAgICBwdWJsaWMgc3RvcmFnZUJhY2tlbmQ6IFN0b3JhZ2VCYWNrZW5kID0gbmV3IExvY2FsU3RvcmFnZUJhY2tlbmQoKSxcbiAgICAgIHV0aWxzID0gbmV3IEJhc2ljUXVlcnlTdHJpbmdVdGlscygpLFxuICAgICAgcHVibGljIGxvY2F0aW9uTGlrZTogTG9jYXRpb25MaWtlID0gd2luZG93LmxvY2F0aW9uLFxuICAgICAgY3J5cHRvOiBDcnlwdG8gPSBuZXcgRGVmYXVsdENyeXB0bygpKSB7XG4gICAgc3VwZXIodXRpbHMsIGNyeXB0byk7XG4gIH1cblxuICBwZXJmb3JtRW5kU2Vzc2lvblJlcXVlc3QoXG4gICAgICBjb25maWd1cmF0aW9uOiBBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb24sXG4gICAgICByZXF1ZXN0OiBFbmRTZXNzaW9uUmVxdWVzdCkge1xuICAgIGNvbnN0IGhhbmRsZSA9IHRoaXMuY3J5cHRvLmdlbmVyYXRlUmFuZG9tKDEwKTtcbiAgICAvLyBiZWZvcmUgeW91IG1ha2UgcmVxdWVzdCwgcGVyc2lzdCBhbGwgcmVxdWVzdCByZWxhdGVkIGRhdGEgaW4gbG9jYWwgc3RvcmFnZS5cbiAgICBsZXQgcGVyc2lzdGVkID0gUHJvbWlzZS5hbGwoW1xuICAgICAgdGhpcy5zdG9yYWdlQmFja2VuZC5zZXRJdGVtKEVORFNFU1NJT05fUkVRVUVTVF9IQU5ETEVfS0VZLCBoYW5kbGUpLFxuICAgICAgdGhpcy5zdG9yYWdlQmFja2VuZC5zZXRJdGVtKGVuZFNlc3Npb25SZXF1ZXN0S2V5KGhhbmRsZSksIEpTT04uc3RyaW5naWZ5KHJlcXVlc3QudG9Kc29uKCkpKSxcbiAgICAgIHRoaXMuc3RvcmFnZUJhY2tlbmQuc2V0SXRlbShcbiAgICAgICAgICBhdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb25LZXkoaGFuZGxlKSwgSlNPTi5zdHJpbmdpZnkoY29uZmlndXJhdGlvbi50b0pzb24oKSkpLFxuICAgIF0pO1xuXG4gICAgcGVyc2lzdGVkLnRoZW4oKCkgPT4ge1xuICAgICAgLy8gbWFrZSB0aGUgcmVkaXJlY3QgcmVxdWVzdFxuICAgICAgbGV0IHVybCA9IHRoaXMuYnVpbGRSZXF1ZXN0VXJsKGNvbmZpZ3VyYXRpb24sIHJlcXVlc3QpO1xuICAgICAgbG9nKCdNYWtpbmcgYSByZXF1ZXN0IHRvICcsIHJlcXVlc3QsIHVybCk7XG4gICAgICB0aGlzLmxvY2F0aW9uTGlrZS5hc3NpZ24odXJsKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRlbXB0cyB0byBpbnRyb3NwZWN0IHRoZSBjb250ZW50cyBvZiBzdG9yYWdlIGJhY2tlbmQgYW5kIGNvbXBsZXRlcyB0aGVcbiAgICogcmVxdWVzdC5cbiAgICovXG4gIHByb3RlY3RlZCBjb21wbGV0ZUVuZFNlc3Npb25SZXF1ZXN0KCk6IFByb21pc2U8RW5kU2Vzc2lvblJlcXVlc3RSZXNwb25zZXxudWxsPiB7XG4gICAgLy8gVE9ETyhyYWh1bHJhdkApOiBoYW5kbGUgZW5kc2Vzc2lvbiBlcnJvcnMuXG4gICAgcmV0dXJuIHRoaXMuc3RvcmFnZUJhY2tlbmQuZ2V0SXRlbShFTkRTRVNTSU9OX1JFUVVFU1RfSEFORExFX0tFWSkudGhlbihoYW5kbGUgPT4ge1xuICAgICAgaWYgKGhhbmRsZSkge1xuICAgICAgICAvLyB3ZSBoYXZlIGEgcGVuZGluZyByZXF1ZXN0LlxuICAgICAgICAvLyBmZXRjaCBlbmRzZXNzaW9uIHJlcXVlc3QsIGFuZCBjaGVjayBzdGF0ZVxuICAgICAgICByZXR1cm4gdGhpcy5zdG9yYWdlQmFja2VuZFxuICAgICAgICAgICAgLmdldEl0ZW0oZW5kU2Vzc2lvblJlcXVlc3RLZXkoaGFuZGxlKSlcbiAgICAgICAgICAgIC8vIHJlcXVpcmVzIGEgY29ycmVzcG9uZGluZyBpbnN0YW5jZSBvZiByZXN1bHRcbiAgICAgICAgICAgIC8vIFRPRE8ocmFodWxyYXZAKTogY2hlY2sgZm9yIGluY29uc2l0ZW50IHN0YXRlIGhlcmVcbiAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiBKU09OLnBhcnNlKHJlc3VsdCEpKVxuICAgICAgICAgICAgLnRoZW4oanNvbiA9PiBuZXcgRW5kU2Vzc2lvblJlcXVlc3QoanNvbikpXG4gICAgICAgICAgICAudGhlbihyZXF1ZXN0ID0+IHtcbiAgICAgICAgICAgICAgLy8gY2hlY2sgcmVkaXJlY3RfdXJpIGFuZCBzdGF0ZVxuICAgICAgICAgICAgICBsZXQgY3VycmVudFVyaSA9IGAke3RoaXMubG9jYXRpb25MaWtlLm9yaWdpbn0ke3RoaXMubG9jYXRpb25MaWtlLnBhdGhuYW1lfWA7XG4gICAgICAgICAgICAgIGxldCBxdWVyeVBhcmFtcyA9IHRoaXMudXRpbHMucGFyc2UodGhpcy5sb2NhdGlvbkxpa2UsIHRydWUgLyogdXNlIGhhc2ggKi8pO1xuICAgICAgICAgICAgICBsZXQgc3RhdGU6IHN0cmluZ3x1bmRlZmluZWQgPSBxdWVyeVBhcmFtc1snc3RhdGUnXTtcbiAgICAgICAgICAgICAgbGV0IGVycm9yOiBzdHJpbmd8dW5kZWZpbmVkID0gcXVlcnlQYXJhbXNbJ2Vycm9yJ107XG4gICAgICAgICAgICAgIGxvZygnUG90ZW50aWFsIGVuZHNlc3Npb24gcmVxdWVzdCAnLCBjdXJyZW50VXJpLCBxdWVyeVBhcmFtcywgc3RhdGUsIGVycm9yKTtcbiAgICAgICAgICAgICAgbGV0IHNob3VsZE5vdGlmeSA9IHN0YXRlID09PSByZXF1ZXN0LnN0YXRlO1xuICAgICAgICAgICAgICBsZXQgZW5kU2Vzc2lvblJlc3BvbnNlOiBFbmRTZXNzaW9uUmVzcG9uc2V8bnVsbCA9IG51bGw7XG4gICAgICAgICAgICAgIGxldCBlbmRTZXNzaW9uRXJyb3I6IEVuZFNlc3Npb25FcnJvcnxudWxsID0gbnVsbDtcbiAgICAgICAgICAgICAgaWYgKHNob3VsZE5vdGlmeSkge1xuICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgLy8gZ2V0IGFkZGl0aW9uYWwgb3B0aW9uYWwgaW5mby5cbiAgICAgICAgICAgICAgICAgIGxldCBlcnJvclVyaSA9IHF1ZXJ5UGFyYW1zWydlcnJvcl91cmknXTtcbiAgICAgICAgICAgICAgICAgIGxldCBlcnJvckRlc2NyaXB0aW9uID0gcXVlcnlQYXJhbXNbJ2Vycm9yX2Rlc2NyaXB0aW9uJ107XG4gICAgICAgICAgICAgICAgICBlbmRTZXNzaW9uRXJyb3IgPSBuZXcgRW5kU2Vzc2lvbkVycm9yKHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGVycm9yLFxuICAgICAgICAgICAgICAgICAgICBlcnJvcl9kZXNjcmlwdGlvbjogZXJyb3JEZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JfdXJpOiBlcnJvclVyaSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdGU6IHN0YXRlXG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgZW5kU2Vzc2lvblJlc3BvbnNlID0gbmV3IEVuZFNlc3Npb25SZXNwb25zZSh7c3RhdGU6IHN0YXRlfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGNsZWFudXAgc3RhdGVcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZVxuICAgICAgICAgICAgICAgICAgICAuYWxsKFtcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3JhZ2VCYWNrZW5kLnJlbW92ZUl0ZW0oRU5EU0VTU0lPTl9SRVFVRVNUX0hBTkRMRV9LRVkpLFxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcmFnZUJhY2tlbmQucmVtb3ZlSXRlbShlbmRTZXNzaW9uUmVxdWVzdEtleShoYW5kbGUpKSxcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3JhZ2VCYWNrZW5kLnJlbW92ZUl0ZW0oYXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uS2V5KGhhbmRsZSkpXG4gICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBsb2coJ0RlbGl2ZXJpbmcgZW5kc2Vzc2lvbiByZXNwb25zZScpO1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0OiByZXF1ZXN0LFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2U6IGVuZFNlc3Npb25SZXNwb25zZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBlbmRTZXNzaW9uRXJyb3JcbiAgICAgICAgICAgICAgICAgICAgICB9IGFzIEVuZFNlc3Npb25SZXF1ZXN0UmVzcG9uc2U7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxvZygnTWlzbWF0Y2hlZCByZXF1ZXN0IChzdGF0ZSBhbmQgcmVxdWVzdF91cmkpIGRvbnQgbWF0Y2guJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIl19