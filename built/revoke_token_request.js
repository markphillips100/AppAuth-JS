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
/**
 * Represents a revoke token request.
 * For more information look at:
 * https://tools.ietf.org/html/rfc7009#section-2.1
 */
var RevokeTokenRequest = /** @class */ (function () {
    function RevokeTokenRequest(request) {
        this.token = request.token;
        this.tokenTypeHint = request.token_type_hint;
        this.clientId = request.client_id;
        this.clientSecret = request.client_secret;
    }
    /**
     * Serializes a TokenRequest to a JavaScript object.
     */
    RevokeTokenRequest.prototype.toJson = function () {
        var json = { token: this.token };
        if (this.tokenTypeHint) {
            json['token_type_hint'] = this.tokenTypeHint;
        }
        if (this.clientId) {
            json['client_id'] = this.clientId;
        }
        if (this.clientSecret) {
            json['client_secret'] = this.clientSecret;
        }
        return json;
    };
    RevokeTokenRequest.prototype.toStringMap = function () {
        var json = this.toJson();
        // :(
        return json;
    };
    return RevokeTokenRequest;
}());
exports.RevokeTokenRequest = RevokeTokenRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmV2b2tlX3Rva2VuX3JlcXVlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcmV2b2tlX3Rva2VuX3JlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7R0FZRzs7QUFtQkg7Ozs7R0FJRztBQUNIO0lBTUUsNEJBQVksT0FBK0I7UUFDekMsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQzNCLElBQUksQ0FBQyxhQUFhLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQztRQUM3QyxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUM7UUFDbEMsSUFBSSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDO0lBQzVDLENBQUM7SUFFRDs7T0FFRztJQUNILG1DQUFNLEdBQU47UUFDRSxJQUFJLElBQUksR0FBMkIsRUFBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBQyxDQUFDO1FBQ3ZELElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUN0QixJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO1NBQzlDO1FBQ0QsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1NBQ25DO1FBQ0QsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1NBQzNDO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsd0NBQVcsR0FBWDtRQUNFLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUN6QixLQUFLO1FBQ0wsT0FBUSxJQUFZLENBQUM7SUFDdkIsQ0FBQztJQUNILHlCQUFDO0FBQUQsQ0FBQyxBQW5DRCxJQW1DQztBQW5DWSxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdFxuICogaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZVxuICogTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXJcbiAqIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IHtTdHJpbmdNYXB9IGZyb20gJy4vdHlwZXMnO1xuXG4vKipcbiAqIFN1cHBvcnRlZCB0b2tlbiB0eXBlc1xuICovXG5leHBvcnQgdHlwZSBUb2tlblR5cGVIaW50ID0gJ3JlZnJlc2hfdG9rZW4nfCdhY2Nlc3NfdG9rZW4nO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIFRva2VuIFJlcXVlc3QgYXMgSlNPTi5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBSZXZva2VUb2tlblJlcXVlc3RKc29uIHtcbiAgdG9rZW46IHN0cmluZztcbiAgdG9rZW5fdHlwZV9oaW50PzogVG9rZW5UeXBlSGludDtcbiAgY2xpZW50X2lkPzogc3RyaW5nO1xuICBjbGllbnRfc2VjcmV0Pzogc3RyaW5nO1xufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSByZXZva2UgdG9rZW4gcmVxdWVzdC5cbiAqIEZvciBtb3JlIGluZm9ybWF0aW9uIGxvb2sgYXQ6XG4gKiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNzAwOSNzZWN0aW9uLTIuMVxuICovXG5leHBvcnQgY2xhc3MgUmV2b2tlVG9rZW5SZXF1ZXN0IHtcbiAgdG9rZW46IHN0cmluZztcbiAgdG9rZW5UeXBlSGludDogVG9rZW5UeXBlSGludHx1bmRlZmluZWQ7XG4gIGNsaWVudElkOiBzdHJpbmd8dW5kZWZpbmVkO1xuICBjbGllbnRTZWNyZXQ6IHN0cmluZ3x1bmRlZmluZWQ7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmV2b2tlVG9rZW5SZXF1ZXN0SnNvbikge1xuICAgIHRoaXMudG9rZW4gPSByZXF1ZXN0LnRva2VuO1xuICAgIHRoaXMudG9rZW5UeXBlSGludCA9IHJlcXVlc3QudG9rZW5fdHlwZV9oaW50O1xuICAgIHRoaXMuY2xpZW50SWQgPSByZXF1ZXN0LmNsaWVudF9pZDtcbiAgICB0aGlzLmNsaWVudFNlY3JldCA9IHJlcXVlc3QuY2xpZW50X3NlY3JldDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXJpYWxpemVzIGEgVG9rZW5SZXF1ZXN0IHRvIGEgSmF2YVNjcmlwdCBvYmplY3QuXG4gICAqL1xuICB0b0pzb24oKTogUmV2b2tlVG9rZW5SZXF1ZXN0SnNvbiB7XG4gICAgbGV0IGpzb246IFJldm9rZVRva2VuUmVxdWVzdEpzb24gPSB7dG9rZW46IHRoaXMudG9rZW59O1xuICAgIGlmICh0aGlzLnRva2VuVHlwZUhpbnQpIHtcbiAgICAgIGpzb25bJ3Rva2VuX3R5cGVfaGludCddID0gdGhpcy50b2tlblR5cGVIaW50O1xuICAgIH1cbiAgICBpZiAodGhpcy5jbGllbnRJZCkge1xuICAgICAganNvblsnY2xpZW50X2lkJ10gPSB0aGlzLmNsaWVudElkO1xuICAgIH1cbiAgICBpZiAodGhpcy5jbGllbnRTZWNyZXQpIHtcbiAgICAgIGpzb25bJ2NsaWVudF9zZWNyZXQnXSA9IHRoaXMuY2xpZW50U2VjcmV0O1xuICAgIH1cbiAgICByZXR1cm4ganNvbjtcbiAgfVxuXG4gIHRvU3RyaW5nTWFwKCk6IFN0cmluZ01hcCB7XG4gICAgbGV0IGpzb24gPSB0aGlzLnRvSnNvbigpO1xuICAgIC8vIDooXG4gICAgcmV0dXJuIChqc29uIGFzIGFueSk7XG4gIH1cbn1cbiJdfQ==