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
var logger_1 = require("./logger");
/**
 * Generates a cryptographically random new state. Useful for CSRF protection.
 */
var SIZE = 10; // 10 bytes
var newState = function (crypto) {
    return crypto.generateRandom(SIZE);
};
/**
 * Represents the AuthorizationRequest.
 * For more information look at
 * https://tools.ietf.org/html/rfc6749#section-4.1.1
 */
var AuthorizationRequest = /** @class */ (function () {
    /**
     * Constructs a new AuthorizationRequest.
     * Use a `undefined` value for the `state` parameter, to generate a random
     * state for CSRF protection.
     */
    function AuthorizationRequest(request, crypto, usePkce) {
        if (crypto === void 0) { crypto = new crypto_utils_1.DefaultCrypto(); }
        if (usePkce === void 0) { usePkce = true; }
        this.crypto = crypto;
        this.usePkce = usePkce;
        this.clientId = request.client_id;
        this.redirectUri = request.redirect_uri;
        this.scope = request.scope;
        this.responseType = request.response_type || AuthorizationRequest.RESPONSE_TYPE_CODE;
        this.state = request.state || newState(crypto);
        this.extras = request.extras;
        // read internal properties if available
        this.internal = request.internal;
    }
    AuthorizationRequest.prototype.setupCodeVerifier = function () {
        var _this = this;
        if (!this.usePkce) {
            return Promise.resolve();
        }
        else {
            var codeVerifier_1 = this.crypto.generateRandom(128);
            var challenge = this.crypto.deriveChallenge(codeVerifier_1).catch(function (error) {
                logger_1.log('Unable to generate PKCE challenge. Not using PKCE', error);
                return undefined;
            });
            return challenge.then(function (result) {
                if (result) {
                    // keep track of the code used.
                    _this.internal = _this.internal || {};
                    _this.internal['code_verifier'] = codeVerifier_1;
                    _this.extras = _this.extras || {};
                    _this.extras['code_challenge'] = result;
                    // We always use S256. Plain is not good enough.
                    _this.extras['code_challenge_method'] = 'S256';
                }
            });
        }
    };
    /**
     * Serializes the AuthorizationRequest to a JavaScript Object.
     */
    AuthorizationRequest.prototype.toJson = function () {
        var _this = this;
        // Always make sure that the code verifier is setup when toJson() is called.
        return this.setupCodeVerifier().then(function () {
            return {
                response_type: _this.responseType,
                client_id: _this.clientId,
                redirect_uri: _this.redirectUri,
                scope: _this.scope,
                state: _this.state,
                extras: _this.extras,
                internal: _this.internal
            };
        });
    };
    AuthorizationRequest.RESPONSE_TYPE_TOKEN = 'token';
    AuthorizationRequest.RESPONSE_TYPE_CODE = 'code';
    return AuthorizationRequest;
}());
exports.AuthorizationRequest = AuthorizationRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aG9yaXphdGlvbl9yZXF1ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2F1dGhvcml6YXRpb25fcmVxdWVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7OztHQVlHOztBQUVILCtDQUFxRDtBQUNyRCxtQ0FBNkI7QUFpQjdCOztHQUVHO0FBQ0gsSUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUUsV0FBVztBQUM3QixJQUFNLFFBQVEsR0FBRyxVQUFTLE1BQWM7SUFDdEMsT0FBTyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3JDLENBQUMsQ0FBQztBQUVGOzs7O0dBSUc7QUFDSDtJQWVFOzs7O09BSUc7SUFDSCw4QkFDSSxPQUFpQyxFQUN6QixNQUFvQyxFQUNwQyxPQUF1QjtRQUR2Qix1QkFBQSxFQUFBLGFBQXFCLDRCQUFhLEVBQUU7UUFDcEMsd0JBQUEsRUFBQSxjQUF1QjtRQUR2QixXQUFNLEdBQU4sTUFBTSxDQUE4QjtRQUNwQyxZQUFPLEdBQVAsT0FBTyxDQUFnQjtRQUNqQyxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUM7UUFDbEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUMzQixJQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQyxhQUFhLElBQUksb0JBQW9CLENBQUMsa0JBQWtCLENBQUM7UUFDckYsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFDN0Isd0NBQXdDO1FBQ3hDLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQztJQUNuQyxDQUFDO0lBRUQsZ0RBQWlCLEdBQWpCO1FBQUEsaUJBc0JDO1FBckJDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2pCLE9BQU8sT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQzFCO2FBQU07WUFDTCxJQUFNLGNBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNyRCxJQUFNLFNBQVMsR0FDWCxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxjQUFZLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQSxLQUFLO2dCQUNuRCxZQUFHLENBQUMsbURBQW1ELEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ2hFLE9BQU8sU0FBUyxDQUFDO1lBQ25CLENBQUMsQ0FBQyxDQUFDO1lBQ1AsT0FBTyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQUEsTUFBTTtnQkFDMUIsSUFBSSxNQUFNLEVBQUU7b0JBQ1YsK0JBQStCO29CQUMvQixLQUFJLENBQUMsUUFBUSxHQUFHLEtBQUksQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDO29CQUNwQyxLQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxHQUFHLGNBQVksQ0FBQztvQkFDOUMsS0FBSSxDQUFDLE1BQU0sR0FBRyxLQUFJLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQztvQkFDaEMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLE1BQU0sQ0FBQztvQkFDdkMsZ0RBQWdEO29CQUNoRCxLQUFJLENBQUMsTUFBTSxDQUFDLHVCQUF1QixDQUFDLEdBQUcsTUFBTSxDQUFDO2lCQUMvQztZQUNILENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxxQ0FBTSxHQUFOO1FBQUEsaUJBYUM7UUFaQyw0RUFBNEU7UUFDNUUsT0FBTyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxJQUFJLENBQUM7WUFDbkMsT0FBTztnQkFDTCxhQUFhLEVBQUUsS0FBSSxDQUFDLFlBQVk7Z0JBQ2hDLFNBQVMsRUFBRSxLQUFJLENBQUMsUUFBUTtnQkFDeEIsWUFBWSxFQUFFLEtBQUksQ0FBQyxXQUFXO2dCQUM5QixLQUFLLEVBQUUsS0FBSSxDQUFDLEtBQUs7Z0JBQ2pCLEtBQUssRUFBRSxLQUFJLENBQUMsS0FBSztnQkFDakIsTUFBTSxFQUFFLEtBQUksQ0FBQyxNQUFNO2dCQUNuQixRQUFRLEVBQUUsS0FBSSxDQUFDLFFBQVE7YUFDeEIsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQXpFTSx3Q0FBbUIsR0FBRyxPQUFPLENBQUM7SUFDOUIsdUNBQWtCLEdBQUcsTUFBTSxDQUFDO0lBeUVyQywyQkFBQztDQUFBLEFBM0VELElBMkVDO0FBM0VZLG9EQUFvQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0XG4gKiBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlXG4gKiBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlclxuICogZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQge0NyeXB0bywgRGVmYXVsdENyeXB0b30gZnJvbSAnLi9jcnlwdG9fdXRpbHMnO1xuaW1wb3J0IHtsb2d9IGZyb20gJy4vbG9nZ2VyJztcbmltcG9ydCB7U3RyaW5nTWFwfSBmcm9tICcuL3R5cGVzJztcblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIEF1dGhvcml6YXRpb25SZXF1ZXN0IGFzIEpTT04uXG4gKi9cblxuZXhwb3J0IGludGVyZmFjZSBBdXRob3JpemF0aW9uUmVxdWVzdEpzb24ge1xuICByZXNwb25zZV90eXBlOiBzdHJpbmc7XG4gIGNsaWVudF9pZDogc3RyaW5nO1xuICByZWRpcmVjdF91cmk6IHN0cmluZztcbiAgc2NvcGU6IHN0cmluZztcbiAgc3RhdGU/OiBzdHJpbmc7XG4gIGV4dHJhcz86IFN0cmluZ01hcDtcbiAgaW50ZXJuYWw/OiBTdHJpbmdNYXA7XG59XG5cbi8qKlxuICogR2VuZXJhdGVzIGEgY3J5cHRvZ3JhcGhpY2FsbHkgcmFuZG9tIG5ldyBzdGF0ZS4gVXNlZnVsIGZvciBDU1JGIHByb3RlY3Rpb24uXG4gKi9cbmNvbnN0IFNJWkUgPSAxMDsgIC8vIDEwIGJ5dGVzXG5jb25zdCBuZXdTdGF0ZSA9IGZ1bmN0aW9uKGNyeXB0bzogQ3J5cHRvKTogc3RyaW5nIHtcbiAgcmV0dXJuIGNyeXB0by5nZW5lcmF0ZVJhbmRvbShTSVpFKTtcbn07XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgQXV0aG9yaXphdGlvblJlcXVlc3QuXG4gKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiBsb29rIGF0XG4gKiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNjc0OSNzZWN0aW9uLTQuMS4xXG4gKi9cbmV4cG9ydCBjbGFzcyBBdXRob3JpemF0aW9uUmVxdWVzdCB7XG4gIHN0YXRpYyBSRVNQT05TRV9UWVBFX1RPS0VOID0gJ3Rva2VuJztcbiAgc3RhdGljIFJFU1BPTlNFX1RZUEVfQ09ERSA9ICdjb2RlJztcblxuICAvLyBOT1RFOlxuICAvLyBCb3RoIHJlZGlyZWN0X3VyaSBhbmQgc3RhdGUgYXJlIGFjdHVhbGx5IG9wdGlvbmFsLlxuICAvLyBIb3dldmVyIEFwcEF1dGggaXMgbW9yZSBvcGlvbmlvbmF0ZWQsIGFuZCByZXF1aXJlcyB5b3UgdG8gdXNlIGJvdGguXG5cbiAgY2xpZW50SWQ6IHN0cmluZztcbiAgcmVkaXJlY3RVcmk6IHN0cmluZztcbiAgc2NvcGU6IHN0cmluZztcbiAgcmVzcG9uc2VUeXBlOiBzdHJpbmc7XG4gIHN0YXRlOiBzdHJpbmc7XG4gIGV4dHJhcz86IFN0cmluZ01hcDtcbiAgaW50ZXJuYWw/OiBTdHJpbmdNYXA7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RzIGEgbmV3IEF1dGhvcml6YXRpb25SZXF1ZXN0LlxuICAgKiBVc2UgYSBgdW5kZWZpbmVkYCB2YWx1ZSBmb3IgdGhlIGBzdGF0ZWAgcGFyYW1ldGVyLCB0byBnZW5lcmF0ZSBhIHJhbmRvbVxuICAgKiBzdGF0ZSBmb3IgQ1NSRiBwcm90ZWN0aW9uLlxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgICByZXF1ZXN0OiBBdXRob3JpemF0aW9uUmVxdWVzdEpzb24sXG4gICAgICBwcml2YXRlIGNyeXB0bzogQ3J5cHRvID0gbmV3IERlZmF1bHRDcnlwdG8oKSxcbiAgICAgIHByaXZhdGUgdXNlUGtjZTogYm9vbGVhbiA9IHRydWUpIHtcbiAgICB0aGlzLmNsaWVudElkID0gcmVxdWVzdC5jbGllbnRfaWQ7XG4gICAgdGhpcy5yZWRpcmVjdFVyaSA9IHJlcXVlc3QucmVkaXJlY3RfdXJpO1xuICAgIHRoaXMuc2NvcGUgPSByZXF1ZXN0LnNjb3BlO1xuICAgIHRoaXMucmVzcG9uc2VUeXBlID0gcmVxdWVzdC5yZXNwb25zZV90eXBlIHx8IEF1dGhvcml6YXRpb25SZXF1ZXN0LlJFU1BPTlNFX1RZUEVfQ09ERTtcbiAgICB0aGlzLnN0YXRlID0gcmVxdWVzdC5zdGF0ZSB8fCBuZXdTdGF0ZShjcnlwdG8pO1xuICAgIHRoaXMuZXh0cmFzID0gcmVxdWVzdC5leHRyYXM7XG4gICAgLy8gcmVhZCBpbnRlcm5hbCBwcm9wZXJ0aWVzIGlmIGF2YWlsYWJsZVxuICAgIHRoaXMuaW50ZXJuYWwgPSByZXF1ZXN0LmludGVybmFsO1xuICB9XG5cbiAgc2V0dXBDb2RlVmVyaWZpZXIoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKCF0aGlzLnVzZVBrY2UpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgY29kZVZlcmlmaWVyID0gdGhpcy5jcnlwdG8uZ2VuZXJhdGVSYW5kb20oMTI4KTtcbiAgICAgIGNvbnN0IGNoYWxsZW5nZTogUHJvbWlzZTxzdHJpbmd8dW5kZWZpbmVkPiA9XG4gICAgICAgICAgdGhpcy5jcnlwdG8uZGVyaXZlQ2hhbGxlbmdlKGNvZGVWZXJpZmllcikuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgbG9nKCdVbmFibGUgdG8gZ2VuZXJhdGUgUEtDRSBjaGFsbGVuZ2UuIE5vdCB1c2luZyBQS0NFJywgZXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICB9KTtcbiAgICAgIHJldHVybiBjaGFsbGVuZ2UudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgLy8ga2VlcCB0cmFjayBvZiB0aGUgY29kZSB1c2VkLlxuICAgICAgICAgIHRoaXMuaW50ZXJuYWwgPSB0aGlzLmludGVybmFsIHx8IHt9O1xuICAgICAgICAgIHRoaXMuaW50ZXJuYWxbJ2NvZGVfdmVyaWZpZXInXSA9IGNvZGVWZXJpZmllcjtcbiAgICAgICAgICB0aGlzLmV4dHJhcyA9IHRoaXMuZXh0cmFzIHx8IHt9O1xuICAgICAgICAgIHRoaXMuZXh0cmFzWydjb2RlX2NoYWxsZW5nZSddID0gcmVzdWx0O1xuICAgICAgICAgIC8vIFdlIGFsd2F5cyB1c2UgUzI1Ni4gUGxhaW4gaXMgbm90IGdvb2QgZW5vdWdoLlxuICAgICAgICAgIHRoaXMuZXh0cmFzWydjb2RlX2NoYWxsZW5nZV9tZXRob2QnXSA9ICdTMjU2JztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNlcmlhbGl6ZXMgdGhlIEF1dGhvcml6YXRpb25SZXF1ZXN0IHRvIGEgSmF2YVNjcmlwdCBPYmplY3QuXG4gICAqL1xuICB0b0pzb24oKTogUHJvbWlzZTxBdXRob3JpemF0aW9uUmVxdWVzdEpzb24+IHtcbiAgICAvLyBBbHdheXMgbWFrZSBzdXJlIHRoYXQgdGhlIGNvZGUgdmVyaWZpZXIgaXMgc2V0dXAgd2hlbiB0b0pzb24oKSBpcyBjYWxsZWQuXG4gICAgcmV0dXJuIHRoaXMuc2V0dXBDb2RlVmVyaWZpZXIoKS50aGVuKCgpID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHJlc3BvbnNlX3R5cGU6IHRoaXMucmVzcG9uc2VUeXBlLFxuICAgICAgICBjbGllbnRfaWQ6IHRoaXMuY2xpZW50SWQsXG4gICAgICAgIHJlZGlyZWN0X3VyaTogdGhpcy5yZWRpcmVjdFVyaSxcbiAgICAgICAgc2NvcGU6IHRoaXMuc2NvcGUsXG4gICAgICAgIHN0YXRlOiB0aGlzLnN0YXRlLFxuICAgICAgICBleHRyYXM6IHRoaXMuZXh0cmFzLFxuICAgICAgICBpbnRlcm5hbDogdGhpcy5pbnRlcm5hbFxuICAgICAgfTtcbiAgICB9KTtcbiAgfVxufVxuIl19