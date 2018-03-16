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
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_utils_1 = require("./crypto_utils");
/**
 * Generates a cryptographically random new state. Useful for CSRF protection.
 */
var BYTES_LENGTH = 10; // 10 bytes
var newState = function (generateRandom) {
    return generateRandom(BYTES_LENGTH);
};
/**
 * Represents the EndSessionRequest.
 * For more information look at
 * http://openid.net/specs/openid-connect-session-1_0.html
 */
var EndSessionRequest = /** @class */ (function () {
    /**
     * Constructs a new EndSessionRequest.
     * Use a `undefined` value for the `state` parameter, to generate a random
     * state for CSRF protection.
     */
    function EndSessionRequest(idTokenHint, postLogoutRedirectUri, state, extras, generateRandom) {
        if (generateRandom === void 0) { generateRandom = crypto_utils_1.cryptoGenerateRandom; }
        this.idTokenHint = idTokenHint;
        this.postLogoutRedirectUri = postLogoutRedirectUri;
        this.extras = extras;
        this.state = state || newState(generateRandom);
    }
    /**
     * Serializes the EndSessionRequest to a JavaScript Object.
     */
    EndSessionRequest.prototype.toJson = function () {
        return {
            id_token_hint: this.idTokenHint,
            post_logout_redirect_uri: this.postLogoutRedirectUri,
            state: this.state,
            extras: this.extras
        };
    };
    /**
     * Creates a new instance of EndSessionRequest.
     */
    EndSessionRequest.fromJson = function (input) {
        return new EndSessionRequest(input.id_token_hint, input.post_logout_redirect_uri, input.state, input.extras);
    };
    return EndSessionRequest;
}());
exports.EndSessionRequest = EndSessionRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5kX3Nlc3Npb25fcmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9lbmRfc2Vzc2lvbl9yZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7O0FBRUgsK0NBQXFFO0FBa0JyRTs7R0FFRztBQUNILElBQU0sWUFBWSxHQUFHLEVBQUUsQ0FBQyxDQUFFLFdBQVc7QUFDckMsSUFBTSxRQUFRLEdBQUcsVUFBUyxjQUErQjtJQUN2RCxNQUFNLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3RDLENBQUMsQ0FBQztBQUVGOzs7O0dBSUc7QUFDSDtJQUVFOzs7O09BSUc7SUFDSCwyQkFDVyxXQUFtQixFQUNuQixxQkFBNkIsRUFDcEMsS0FBYyxFQUNQLE1BQWtCLEVBQ3pCLGNBQXFDO1FBQXJDLCtCQUFBLEVBQUEsaUJBQWlCLG1DQUFvQjtRQUo5QixnQkFBVyxHQUFYLFdBQVcsQ0FBUTtRQUNuQiwwQkFBcUIsR0FBckIscUJBQXFCLENBQVE7UUFFN0IsV0FBTSxHQUFOLE1BQU0sQ0FBWTtRQUUzQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssSUFBSSxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVEOztPQUVHO0lBQ0gsa0NBQU0sR0FBTjtRQUNFLE1BQU0sQ0FBQztZQUNMLGFBQWEsRUFBRSxJQUFJLENBQUMsV0FBVztZQUMvQix3QkFBd0IsRUFBRSxJQUFJLENBQUMscUJBQXFCO1lBQ3BELEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07U0FDcEIsQ0FBQztJQUNKLENBQUM7SUFFRDs7T0FFRztJQUNJLDBCQUFRLEdBQWYsVUFBZ0IsS0FBNEI7UUFDMUMsTUFBTSxDQUFDLElBQUksaUJBQWlCLENBQ3hCLEtBQUssQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLHdCQUF3QixFQUFFLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3RGLENBQUM7SUFDSCx3QkFBQztBQUFELENBQUMsQUFuQ0QsSUFtQ0M7QUFuQ1ksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHRcbiAqIGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGVcbiAqIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyXG4gKiBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB7Y3J5cHRvR2VuZXJhdGVSYW5kb20sIFJhbmRvbUdlbmVyYXRvcn0gZnJvbSAnLi9jcnlwdG9fdXRpbHMnO1xuaW1wb3J0IHtTdHJpbmdNYXB9IGZyb20gJy4vdHlwZXMnO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gRW5kU2Vzc2lvblJlcXVlc3QgYXMgSlNPTi5cbiAqL1xuXG4vLyBOT1RFOlxuLy8gQm90aCBwb3N0X2xvZ291dF9yZWRpcmVjdF91cmkgYW5kIHN0YXRlIGFyZSBhY3R1YWxseSBvcHRpb25hbC5cbi8vIEhvd2V2ZXIgQXBwQXV0aCBpcyBtb3JlIG9waW9uaW9uYXRlZCwgYW5kIHJlcXVpcmVzIHlvdSB0byB1c2UgYm90aC5cblxuZXhwb3J0IGludGVyZmFjZSBFbmRTZXNzaW9uUmVxdWVzdEpzb24ge1xuICBpZF90b2tlbl9oaW50OiBzdHJpbmc7XG4gIHBvc3RfbG9nb3V0X3JlZGlyZWN0X3VyaTogc3RyaW5nO1xuICBzdGF0ZTogc3RyaW5nO1xuICBleHRyYXM/OiBTdHJpbmdNYXA7XG59XG5cbi8qKlxuICogR2VuZXJhdGVzIGEgY3J5cHRvZ3JhcGhpY2FsbHkgcmFuZG9tIG5ldyBzdGF0ZS4gVXNlZnVsIGZvciBDU1JGIHByb3RlY3Rpb24uXG4gKi9cbmNvbnN0IEJZVEVTX0xFTkdUSCA9IDEwOyAgLy8gMTAgYnl0ZXNcbmNvbnN0IG5ld1N0YXRlID0gZnVuY3Rpb24oZ2VuZXJhdGVSYW5kb206IFJhbmRvbUdlbmVyYXRvcik6IHN0cmluZyB7XG4gIHJldHVybiBnZW5lcmF0ZVJhbmRvbShCWVRFU19MRU5HVEgpO1xufTtcblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBFbmRTZXNzaW9uUmVxdWVzdC5cbiAqIEZvciBtb3JlIGluZm9ybWF0aW9uIGxvb2sgYXRcbiAqIGh0dHA6Ly9vcGVuaWQubmV0L3NwZWNzL29wZW5pZC1jb25uZWN0LXNlc3Npb24tMV8wLmh0bWxcbiAqL1xuZXhwb3J0IGNsYXNzIEVuZFNlc3Npb25SZXF1ZXN0IHtcbiAgc3RhdGU6IHN0cmluZztcbiAgLyoqXG4gICAqIENvbnN0cnVjdHMgYSBuZXcgRW5kU2Vzc2lvblJlcXVlc3QuXG4gICAqIFVzZSBhIGB1bmRlZmluZWRgIHZhbHVlIGZvciB0aGUgYHN0YXRlYCBwYXJhbWV0ZXIsIHRvIGdlbmVyYXRlIGEgcmFuZG9tXG4gICAqIHN0YXRlIGZvciBDU1JGIHByb3RlY3Rpb24uXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyBpZFRva2VuSGludDogc3RyaW5nLFxuICAgICAgcHVibGljIHBvc3RMb2dvdXRSZWRpcmVjdFVyaTogc3RyaW5nLFxuICAgICAgc3RhdGU/OiBzdHJpbmcsXG4gICAgICBwdWJsaWMgZXh0cmFzPzogU3RyaW5nTWFwLFxuICAgICAgZ2VuZXJhdGVSYW5kb20gPSBjcnlwdG9HZW5lcmF0ZVJhbmRvbSkge1xuICAgIHRoaXMuc3RhdGUgPSBzdGF0ZSB8fCBuZXdTdGF0ZShnZW5lcmF0ZVJhbmRvbSk7XG4gIH1cblxuICAvKipcbiAgICogU2VyaWFsaXplcyB0aGUgRW5kU2Vzc2lvblJlcXVlc3QgdG8gYSBKYXZhU2NyaXB0IE9iamVjdC5cbiAgICovXG4gIHRvSnNvbigpOiBFbmRTZXNzaW9uUmVxdWVzdEpzb24ge1xuICAgIHJldHVybiB7XG4gICAgICBpZF90b2tlbl9oaW50OiB0aGlzLmlkVG9rZW5IaW50LFxuICAgICAgcG9zdF9sb2dvdXRfcmVkaXJlY3RfdXJpOiB0aGlzLnBvc3RMb2dvdXRSZWRpcmVjdFVyaSxcbiAgICAgIHN0YXRlOiB0aGlzLnN0YXRlLFxuICAgICAgZXh0cmFzOiB0aGlzLmV4dHJhc1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiBFbmRTZXNzaW9uUmVxdWVzdC5cbiAgICovXG4gIHN0YXRpYyBmcm9tSnNvbihpbnB1dDogRW5kU2Vzc2lvblJlcXVlc3RKc29uKTogRW5kU2Vzc2lvblJlcXVlc3Qge1xuICAgIHJldHVybiBuZXcgRW5kU2Vzc2lvblJlcXVlc3QoXG4gICAgICAgIGlucHV0LmlkX3Rva2VuX2hpbnQsIGlucHV0LnBvc3RfbG9nb3V0X3JlZGlyZWN0X3VyaSwgaW5wdXQuc3RhdGUsIGlucHV0LmV4dHJhcyk7XG4gIH1cbn1cbiJdfQ==