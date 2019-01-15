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
var SIZE = 10; // 10 bytes
var newState = function (crypto) {
    return crypto.generateRandom(SIZE);
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
    function EndSessionRequest(request, crypto) {
        if (crypto === void 0) { crypto = new crypto_utils_1.DefaultCrypto(); }
        this.crypto = crypto;
        this.idTokenHint = request.id_token_hint;
        this.postLogoutRedirectUri = request.post_logout_redirect_uri;
        this.state = request.state || newState(crypto);
        this.extras = request.extras;
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
    return EndSessionRequest;
}());
exports.EndSessionRequest = EndSessionRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5kX3Nlc3Npb25fcmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9lbmRfc2Vzc2lvbl9yZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7O0FBRUgsK0NBQXFEO0FBY3JEOztHQUVHO0FBQ0gsSUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUUsV0FBVztBQUM3QixJQUFNLFFBQVEsR0FBRyxVQUFTLE1BQWM7SUFDdEMsT0FBTyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3JDLENBQUMsQ0FBQztBQUVGOzs7O0dBSUc7QUFDSDtJQVVFOzs7O09BSUc7SUFDSCwyQkFBWSxPQUE4QixFQUFVLE1BQW9DO1FBQXBDLHVCQUFBLEVBQUEsYUFBcUIsNEJBQWEsRUFBRTtRQUFwQyxXQUFNLEdBQU4sTUFBTSxDQUE4QjtRQUN0RixJQUFJLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUM7UUFDekMsSUFBSSxDQUFDLHFCQUFxQixHQUFHLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQztRQUM5RCxJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztJQUMvQixDQUFDO0lBRUQ7O09BRUc7SUFDSCxrQ0FBTSxHQUFOO1FBQ0UsT0FBTztZQUNMLGFBQWEsRUFBRSxJQUFJLENBQUMsV0FBVztZQUMvQix3QkFBd0IsRUFBRSxJQUFJLENBQUMscUJBQXFCO1lBQ3BELEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07U0FDcEIsQ0FBQztJQUNKLENBQUM7SUFDSCx3QkFBQztBQUFELENBQUMsQUFqQ0QsSUFpQ0M7QUFqQ1ksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHRcbiAqIGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGVcbiAqIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyXG4gKiBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB7Q3J5cHRvLCBEZWZhdWx0Q3J5cHRvfSBmcm9tICcuL2NyeXB0b191dGlscyc7XG5pbXBvcnQge2xvZ30gZnJvbSAnLi9sb2dnZXInO1xuaW1wb3J0IHtTdHJpbmdNYXB9IGZyb20gJy4vdHlwZXMnO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gRW5kU2Vzc2lvblJlcXVlc3QgYXMgSlNPTi5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBFbmRTZXNzaW9uUmVxdWVzdEpzb24ge1xuICBpZF90b2tlbl9oaW50OiBzdHJpbmc7XG4gIHBvc3RfbG9nb3V0X3JlZGlyZWN0X3VyaTogc3RyaW5nO1xuICBzdGF0ZT86IHN0cmluZztcbiAgZXh0cmFzPzogU3RyaW5nTWFwO1xufVxuXG4vKipcbiAqIEdlbmVyYXRlcyBhIGNyeXB0b2dyYXBoaWNhbGx5IHJhbmRvbSBuZXcgc3RhdGUuIFVzZWZ1bCBmb3IgQ1NSRiBwcm90ZWN0aW9uLlxuICovXG5jb25zdCBTSVpFID0gMTA7ICAvLyAxMCBieXRlc1xuY29uc3QgbmV3U3RhdGUgPSBmdW5jdGlvbihjcnlwdG86IENyeXB0byk6IHN0cmluZyB7XG4gIHJldHVybiBjcnlwdG8uZ2VuZXJhdGVSYW5kb20oU0laRSk7XG59O1xuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIEVuZFNlc3Npb25SZXF1ZXN0LlxuICogRm9yIG1vcmUgaW5mb3JtYXRpb24gbG9vayBhdFxuICogaHR0cDovL29wZW5pZC5uZXQvc3BlY3Mvb3BlbmlkLWNvbm5lY3Qtc2Vzc2lvbi0xXzAuaHRtbFxuICovXG5leHBvcnQgY2xhc3MgRW5kU2Vzc2lvblJlcXVlc3Qge1xuICAvLyBOT1RFOlxuICAvLyBCb3RoIHBvc3RfbG9nb3V0X3JlZGlyZWN0X3VyaSBhbmQgc3RhdGUgYXJlIGFjdHVhbGx5IG9wdGlvbmFsLlxuICAvLyBIb3dldmVyIEFwcEF1dGggaXMgbW9yZSBvcGlvbmlvbmF0ZWQsIGFuZCByZXF1aXJlcyB5b3UgdG8gdXNlIGJvdGguXG5cbiAgaWRUb2tlbkhpbnQ6IHN0cmluZztcbiAgcG9zdExvZ291dFJlZGlyZWN0VXJpOiBzdHJpbmc7XG4gIHN0YXRlOiBzdHJpbmc7XG4gIGV4dHJhcz86IFN0cmluZ01hcDtcblxuICAvKipcbiAgICogQ29uc3RydWN0cyBhIG5ldyBFbmRTZXNzaW9uUmVxdWVzdC5cbiAgICogVXNlIGEgYHVuZGVmaW5lZGAgdmFsdWUgZm9yIHRoZSBgc3RhdGVgIHBhcmFtZXRlciwgdG8gZ2VuZXJhdGUgYSByYW5kb21cbiAgICogc3RhdGUgZm9yIENTUkYgcHJvdGVjdGlvbi5cbiAgICovXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IEVuZFNlc3Npb25SZXF1ZXN0SnNvbiwgcHJpdmF0ZSBjcnlwdG86IENyeXB0byA9IG5ldyBEZWZhdWx0Q3J5cHRvKCkpIHtcbiAgICB0aGlzLmlkVG9rZW5IaW50ID0gcmVxdWVzdC5pZF90b2tlbl9oaW50O1xuICAgIHRoaXMucG9zdExvZ291dFJlZGlyZWN0VXJpID0gcmVxdWVzdC5wb3N0X2xvZ291dF9yZWRpcmVjdF91cmk7XG4gICAgdGhpcy5zdGF0ZSA9IHJlcXVlc3Quc3RhdGUgfHwgbmV3U3RhdGUoY3J5cHRvKTtcbiAgICB0aGlzLmV4dHJhcyA9IHJlcXVlc3QuZXh0cmFzO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlcmlhbGl6ZXMgdGhlIEVuZFNlc3Npb25SZXF1ZXN0IHRvIGEgSmF2YVNjcmlwdCBPYmplY3QuXG4gICAqL1xuICB0b0pzb24oKTogRW5kU2Vzc2lvblJlcXVlc3RKc29uIHtcbiAgICByZXR1cm4ge1xuICAgICAgaWRfdG9rZW5faGludDogdGhpcy5pZFRva2VuSGludCxcbiAgICAgIHBvc3RfbG9nb3V0X3JlZGlyZWN0X3VyaTogdGhpcy5wb3N0TG9nb3V0UmVkaXJlY3RVcmksXG4gICAgICBzdGF0ZTogdGhpcy5zdGF0ZSxcbiAgICAgIGV4dHJhczogdGhpcy5leHRyYXNcbiAgICB9O1xuICB9XG59XG4iXX0=