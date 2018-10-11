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
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var end_session_request_1 = require("./end_session_request");
var end_session_request_handler_1 = require("./end_session_request_handler");
var end_session_response_1 = require("./end_session_response");
var index_1 = require("./index");
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
    storageBackend, utils, locationLike, generateRandom) {
        if (storageBackend === void 0) { storageBackend = new storage_1.LocalStorageBackend(); }
        if (utils === void 0) { utils = new query_string_utils_1.BasicQueryStringUtils(); }
        if (locationLike === void 0) { locationLike = window.location; }
        if (generateRandom === void 0) { generateRandom = index_1.cryptoGenerateRandom; }
        var _this = _super.call(this, utils, generateRandom) || this;
        _this.storageBackend = storageBackend;
        _this.locationLike = locationLike;
        return _this;
    }
    EndSessionRedirectRequestHandler.prototype.performEndSessionRequest = function (configuration, request) {
        var _this = this;
        var handle = this.generateRandom();
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
                    .then(function (result) { return JSON.parse(result); })
                    .then(function (json) { return end_session_request_1.EndSessionRequest.fromJson(json); })
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
                            endSessionError = new end_session_response_1.EndSessionError(error, errorDescription, errorUri, state);
                        }
                        else {
                            endSessionResponse = new end_session_response_1.EndSessionResponse(state);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5kX3Nlc3Npb25fcmVkaXJlY3RfYmFzZWRfaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9lbmRfc2Vzc2lvbl9yZWRpcmVjdF9iYXNlZF9oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7Ozs7Ozs7Ozs7OztBQUlILDZEQUErRTtBQUMvRSw2RUFBa0k7QUFDbEksK0RBQWtHO0FBQ2xHLGlDQUE2RDtBQUM3RCxtQ0FBNkI7QUFDN0IsMkRBQTZFO0FBQzdFLHFDQUE4QztBQUk5QyxrQ0FBa0M7QUFDbEMsSUFBTSxvQkFBb0IsR0FDdEIsVUFBQyxNQUFjO0lBQ2IsTUFBTSxDQUFJLE1BQU0sZ0NBQTZCLENBQUM7QUFDaEQsQ0FBQyxDQUFBO0FBRUwsa0RBQWtEO0FBQ2xELElBQU0sb0NBQW9DLEdBQ3RDLFVBQUMsTUFBYztJQUNiLE1BQU0sQ0FBSSxNQUFNLGlEQUE4QyxDQUFDO0FBQ2pFLENBQUMsQ0FBQTtBQUVMLDRFQUE0RTtBQUM1RSxJQUFNLDZCQUE2QixHQUFHLG9DQUFvQyxDQUFDO0FBRTNFOzs7R0FHRztBQUNIO0lBQXNELG9EQUF3QjtJQUM1RTtJQUNJLG1DQUFtQztJQUNuQyxxRUFBcUU7SUFDckUsMkJBQTJCO0lBQ3BCLGNBQTBELEVBQ2pFLEtBQW1DLEVBQzVCLFlBQTRDLEVBQ25ELGNBQXFDO1FBSDlCLCtCQUFBLEVBQUEscUJBQXFDLDZCQUFtQixFQUFFO1FBQ2pFLHNCQUFBLEVBQUEsWUFBWSwwQ0FBcUIsRUFBRTtRQUM1Qiw2QkFBQSxFQUFBLGVBQTZCLE1BQU0sQ0FBQyxRQUFRO1FBQ25ELCtCQUFBLEVBQUEsaUJBQWlCLDRCQUFvQjtRQVB6QyxZQVFFLGtCQUFNLEtBQUssRUFBRSxjQUFjLENBQUMsU0FDN0I7UUFMVSxvQkFBYyxHQUFkLGNBQWMsQ0FBNEM7UUFFMUQsa0JBQVksR0FBWixZQUFZLENBQWdDOztJQUd2RCxDQUFDO0lBRUQsbUVBQXdC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LHNEQUF3QixHQTRGN0U7QUE1RlksNEVBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHRcbiAqIGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGVcbiAqIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyXG4gKiBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB7QXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uLCBBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb25Kc29ufSBmcm9tICcuL2F1dGhvcml6YXRpb25fc2VydmljZV9jb25maWd1cmF0aW9uJztcbmltcG9ydCB7UmFuZG9tR2VuZXJhdG9yfSBmcm9tICcuL2NyeXB0b191dGlscyc7XG5pbXBvcnQge0VuZFNlc3Npb25SZXF1ZXN0LCBFbmRTZXNzaW9uUmVxdWVzdEpzb259IGZyb20gJy4vZW5kX3Nlc3Npb25fcmVxdWVzdCc7XG5pbXBvcnQge0VORFNFU1NJT05fQlVJTFRfSU5fUEFSQU1FVEVSUywgRW5kU2Vzc2lvblJlcXVlc3RIYW5kbGVyLCBFbmRTZXNzaW9uUmVxdWVzdFJlc3BvbnNlfSBmcm9tICcuL2VuZF9zZXNzaW9uX3JlcXVlc3RfaGFuZGxlcic7XG5pbXBvcnQge0VuZFNlc3Npb25FcnJvciwgRW5kU2Vzc2lvblJlc3BvbnNlLCBFbmRTZXNzaW9uUmVzcG9uc2VKc29ufSBmcm9tICcuL2VuZF9zZXNzaW9uX3Jlc3BvbnNlJ1xuaW1wb3J0IHtjcnlwdG9HZW5lcmF0ZVJhbmRvbSwgU3RvcmFnZUJhY2tlbmR9IGZyb20gJy4vaW5kZXgnO1xuaW1wb3J0IHtsb2d9IGZyb20gJy4vbG9nZ2VyJztcbmltcG9ydCB7QmFzaWNRdWVyeVN0cmluZ1V0aWxzLCBRdWVyeVN0cmluZ1V0aWxzfSBmcm9tICcuL3F1ZXJ5X3N0cmluZ191dGlscyc7XG5pbXBvcnQge0xvY2FsU3RvcmFnZUJhY2tlbmR9IGZyb20gJy4vc3RvcmFnZSc7XG5pbXBvcnQge0xvY2F0aW9uTGlrZSwgU3RyaW5nTWFwfSBmcm9tICcuL3R5cGVzJztcblxuXG4vKioga2V5IGZvciBlbmRzZXNzaW9uIHJlcXVlc3QuICovXG5jb25zdCBlbmRTZXNzaW9uUmVxdWVzdEtleSA9XG4gICAgKGhhbmRsZTogc3RyaW5nKSA9PiB7XG4gICAgICByZXR1cm4gYCR7aGFuZGxlfV9hcHBhdXRoX2VuZHNlc3Npb25fcmVxdWVzdGA7XG4gICAgfVxuXG4vKioga2V5IGZvciBhdXRob3JpemF0aW9uIHNlcnZpY2UgY29uZmlndXJhdGlvbiAqL1xuY29uc3QgYXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uS2V5ID1cbiAgICAoaGFuZGxlOiBzdHJpbmcpID0+IHtcbiAgICAgIHJldHVybiBgJHtoYW5kbGV9X2FwcGF1dGhfYXV0aG9yaXphdGlvbl9zZXJ2aWNlX2NvbmZpZ3VyYXRpb25gO1xuICAgIH1cblxuLyoqIGtleSBpbiBsb2NhbCBzdG9yYWdlIHdoaWNoIHJlcHJlc2VudHMgdGhlIGN1cnJlbnQgZW5kc2Vzc2lvbiByZXF1ZXN0LiAqL1xuY29uc3QgRU5EU0VTU0lPTl9SRVFVRVNUX0hBTkRMRV9LRVkgPSAnYXBwYXV0aF9jdXJyZW50X2VuZHNlc3Npb25fcmVxdWVzdCc7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhbiBFbmRTZXNzaW9uUmVxdWVzdEhhbmRsZXIgd2hpY2ggdXNlcyBhIHN0YW5kYXJkXG4gKiByZWRpcmVjdCBiYXNlZCBjb2RlIGZsb3cuXG4gKi9cbmV4cG9ydCBjbGFzcyBFbmRTZXNzaW9uUmVkaXJlY3RSZXF1ZXN0SGFuZGxlciBleHRlbmRzIEVuZFNlc3Npb25SZXF1ZXN0SGFuZGxlciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgLy8gdXNlIHRoZSBwcm92aWRlZCBzdG9yYWdlIGJhY2tlbmRcbiAgICAgIC8vIG9yIGluaXRpYWxpemUgbG9jYWwgc3RvcmFnZSB3aXRoIHRoZSBkZWZhdWx0IHN0b3JhZ2UgYmFja2VuZCB3aGljaFxuICAgICAgLy8gdXNlcyB3aW5kb3cubG9jYWxTdG9yYWdlXG4gICAgICBwdWJsaWMgc3RvcmFnZUJhY2tlbmQ6IFN0b3JhZ2VCYWNrZW5kID0gbmV3IExvY2FsU3RvcmFnZUJhY2tlbmQoKSxcbiAgICAgIHV0aWxzID0gbmV3IEJhc2ljUXVlcnlTdHJpbmdVdGlscygpLFxuICAgICAgcHVibGljIGxvY2F0aW9uTGlrZTogTG9jYXRpb25MaWtlID0gd2luZG93LmxvY2F0aW9uLFxuICAgICAgZ2VuZXJhdGVSYW5kb20gPSBjcnlwdG9HZW5lcmF0ZVJhbmRvbSkge1xuICAgIHN1cGVyKHV0aWxzLCBnZW5lcmF0ZVJhbmRvbSk7XG4gIH1cblxuICBwZXJmb3JtRW5kU2Vzc2lvblJlcXVlc3QoXG4gICAgICBjb25maWd1cmF0aW9uOiBBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb24sXG4gICAgICByZXF1ZXN0OiBFbmRTZXNzaW9uUmVxdWVzdCkge1xuICAgIGxldCBoYW5kbGUgPSB0aGlzLmdlbmVyYXRlUmFuZG9tKCk7XG4gICAgLy8gYmVmb3JlIHlvdSBtYWtlIHJlcXVlc3QsIHBlcnNpc3QgYWxsIHJlcXVlc3QgcmVsYXRlZCBkYXRhIGluIGxvY2FsIHN0b3JhZ2UuXG4gICAgbGV0IHBlcnNpc3RlZCA9IFByb21pc2UuYWxsKFtcbiAgICAgIHRoaXMuc3RvcmFnZUJhY2tlbmQuc2V0SXRlbShFTkRTRVNTSU9OX1JFUVVFU1RfSEFORExFX0tFWSwgaGFuZGxlKSxcbiAgICAgIHRoaXMuc3RvcmFnZUJhY2tlbmQuc2V0SXRlbShlbmRTZXNzaW9uUmVxdWVzdEtleShoYW5kbGUpLCBKU09OLnN0cmluZ2lmeShyZXF1ZXN0LnRvSnNvbigpKSksXG4gICAgICB0aGlzLnN0b3JhZ2VCYWNrZW5kLnNldEl0ZW0oXG4gICAgICAgICAgYXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uS2V5KGhhbmRsZSksIEpTT04uc3RyaW5naWZ5KGNvbmZpZ3VyYXRpb24udG9Kc29uKCkpKSxcbiAgICBdKTtcblxuICAgIHBlcnNpc3RlZC50aGVuKCgpID0+IHtcbiAgICAgIC8vIG1ha2UgdGhlIHJlZGlyZWN0IHJlcXVlc3RcbiAgICAgIGxldCB1cmwgPSB0aGlzLmJ1aWxkUmVxdWVzdFVybChjb25maWd1cmF0aW9uLCByZXF1ZXN0KTtcbiAgICAgIGxvZygnTWFraW5nIGEgcmVxdWVzdCB0byAnLCByZXF1ZXN0LCB1cmwpO1xuICAgICAgdGhpcy5sb2NhdGlvbkxpa2UuYXNzaWduKHVybCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQXR0ZW1wdHMgdG8gaW50cm9zcGVjdCB0aGUgY29udGVudHMgb2Ygc3RvcmFnZSBiYWNrZW5kIGFuZCBjb21wbGV0ZXMgdGhlXG4gICAqIHJlcXVlc3QuXG4gICAqL1xuICBwcm90ZWN0ZWQgY29tcGxldGVFbmRTZXNzaW9uUmVxdWVzdCgpOiBQcm9taXNlPEVuZFNlc3Npb25SZXF1ZXN0UmVzcG9uc2V8bnVsbD4ge1xuICAgIC8vIFRPRE8ocmFodWxyYXZAKTogaGFuZGxlIGVuZHNlc3Npb24gZXJyb3JzLlxuICAgIHJldHVybiB0aGlzLnN0b3JhZ2VCYWNrZW5kLmdldEl0ZW0oRU5EU0VTU0lPTl9SRVFVRVNUX0hBTkRMRV9LRVkpLnRoZW4oaGFuZGxlID0+IHtcbiAgICAgIGlmIChoYW5kbGUpIHtcbiAgICAgICAgLy8gd2UgaGF2ZSBhIHBlbmRpbmcgcmVxdWVzdC5cbiAgICAgICAgLy8gZmV0Y2ggZW5kc2Vzc2lvbiByZXF1ZXN0LCBhbmQgY2hlY2sgc3RhdGVcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmFnZUJhY2tlbmRcbiAgICAgICAgICAgIC5nZXRJdGVtKGVuZFNlc3Npb25SZXF1ZXN0S2V5KGhhbmRsZSkpXG4gICAgICAgICAgICAvLyByZXF1aXJlcyBhIGNvcnJlc3BvbmRpbmcgaW5zdGFuY2Ugb2YgcmVzdWx0XG4gICAgICAgICAgICAvLyBUT0RPKHJhaHVscmF2QCk6IGNoZWNrIGZvciBpbmNvbnNpdGVudCBzdGF0ZSBoZXJlXG4gICAgICAgICAgICAudGhlbihyZXN1bHQgPT4gSlNPTi5wYXJzZShyZXN1bHQhKSlcbiAgICAgICAgICAgIC50aGVuKGpzb24gPT4gRW5kU2Vzc2lvblJlcXVlc3QuZnJvbUpzb24oanNvbikpXG4gICAgICAgICAgICAudGhlbihyZXF1ZXN0ID0+IHtcbiAgICAgICAgICAgICAgLy8gY2hlY2sgcmVkaXJlY3RfdXJpIGFuZCBzdGF0ZVxuICAgICAgICAgICAgICBsZXQgY3VycmVudFVyaSA9IGAke3RoaXMubG9jYXRpb25MaWtlLm9yaWdpbn0ke3RoaXMubG9jYXRpb25MaWtlLnBhdGhuYW1lfWA7XG4gICAgICAgICAgICAgIGxldCBxdWVyeVBhcmFtcyA9IHRoaXMudXRpbHMucGFyc2UodGhpcy5sb2NhdGlvbkxpa2UsIHRydWUgLyogdXNlIGhhc2ggKi8pO1xuICAgICAgICAgICAgICBsZXQgc3RhdGU6IHN0cmluZ3x1bmRlZmluZWQgPSBxdWVyeVBhcmFtc1snc3RhdGUnXTtcbiAgICAgICAgICAgICAgbGV0IGVycm9yOiBzdHJpbmd8dW5kZWZpbmVkID0gcXVlcnlQYXJhbXNbJ2Vycm9yJ107XG4gICAgICAgICAgICAgIGxvZygnUG90ZW50aWFsIGVuZHNlc3Npb24gcmVxdWVzdCAnLCBjdXJyZW50VXJpLCBxdWVyeVBhcmFtcywgc3RhdGUsIGVycm9yKTtcbiAgICAgICAgICAgICAgbGV0IHNob3VsZE5vdGlmeSA9IHN0YXRlID09PSByZXF1ZXN0LnN0YXRlO1xuICAgICAgICAgICAgICBsZXQgZW5kU2Vzc2lvblJlc3BvbnNlOiBFbmRTZXNzaW9uUmVzcG9uc2V8bnVsbCA9IG51bGw7XG4gICAgICAgICAgICAgIGxldCBlbmRTZXNzaW9uRXJyb3I6IEVuZFNlc3Npb25FcnJvcnxudWxsID0gbnVsbDtcbiAgICAgICAgICAgICAgaWYgKHNob3VsZE5vdGlmeSkge1xuICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgLy8gZ2V0IGFkZGl0aW9uYWwgb3B0aW9uYWwgaW5mby5cbiAgICAgICAgICAgICAgICAgIGxldCBlcnJvclVyaSA9IHF1ZXJ5UGFyYW1zWydlcnJvcl91cmknXTtcbiAgICAgICAgICAgICAgICAgIGxldCBlcnJvckRlc2NyaXB0aW9uID0gcXVlcnlQYXJhbXNbJ2Vycm9yX2Rlc2NyaXB0aW9uJ107XG4gICAgICAgICAgICAgICAgICBlbmRTZXNzaW9uRXJyb3IgPSBuZXcgRW5kU2Vzc2lvbkVycm9yKGVycm9yLCBlcnJvckRlc2NyaXB0aW9uLCBlcnJvclVyaSwgc3RhdGUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBlbmRTZXNzaW9uUmVzcG9uc2UgPSBuZXcgRW5kU2Vzc2lvblJlc3BvbnNlKHN0YXRlISk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGNsZWFudXAgc3RhdGVcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZVxuICAgICAgICAgICAgICAgICAgICAuYWxsKFtcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3JhZ2VCYWNrZW5kLnJlbW92ZUl0ZW0oRU5EU0VTU0lPTl9SRVFVRVNUX0hBTkRMRV9LRVkpLFxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcmFnZUJhY2tlbmQucmVtb3ZlSXRlbShlbmRTZXNzaW9uUmVxdWVzdEtleShoYW5kbGUpKSxcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3JhZ2VCYWNrZW5kLnJlbW92ZUl0ZW0oYXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uS2V5KGhhbmRsZSkpXG4gICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBsb2coJ0RlbGl2ZXJpbmcgZW5kc2Vzc2lvbiByZXNwb25zZScpO1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0OiByZXF1ZXN0LFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2U6IGVuZFNlc3Npb25SZXNwb25zZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBlbmRTZXNzaW9uRXJyb3JcbiAgICAgICAgICAgICAgICAgICAgICB9IGFzIEVuZFNlc3Npb25SZXF1ZXN0UmVzcG9uc2U7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxvZygnTWlzbWF0Y2hlZCByZXF1ZXN0IChzdGF0ZSBhbmQgcmVxdWVzdF91cmkpIGRvbnQgbWF0Y2guJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIl19