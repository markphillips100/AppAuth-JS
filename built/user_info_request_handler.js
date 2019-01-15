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
var errors_1 = require("./errors");
var query_string_utils_1 = require("./query_string_utils");
var user_info_response_1 = require("./user_info_response");
var xhr_1 = require("./xhr");
/**
 * The default user info request handler.
 */
var BaseUserInfoRequestHandler = /** @class */ (function () {
    function BaseUserInfoRequestHandler(requestor, utils) {
        if (requestor === void 0) { requestor = new xhr_1.JQueryRequestor(); }
        if (utils === void 0) { utils = new query_string_utils_1.BasicQueryStringUtils(); }
        this.requestor = requestor;
        this.utils = utils;
    }
    BaseUserInfoRequestHandler.prototype.isUserInfoResponse = function (response) {
        return response.error === undefined;
    };
    BaseUserInfoRequestHandler.prototype.performUserInfoRequest = function (configuration, request) {
        var _this = this;
        var userInfoResponse = this.requestor.xhr({
            url: configuration.userInfoEndpoint,
            method: 'POST',
            //      dataType: 'json',  // adding implicit dataType
            headers: {
                'Authorization': request.tokenType + " " + request.accessToken,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: this.utils.stringify(request.toStringMap())
        });
        return userInfoResponse.then(function (response) {
            if (_this.isUserInfoResponse(response)) {
                return response;
            }
            else {
                return Promise.reject(new errors_1.AppAuthError(response.error, new user_info_response_1.UserInfoError(response)));
            }
        });
    };
    return BaseUserInfoRequestHandler;
}());
exports.BaseUserInfoRequestHandler = BaseUserInfoRequestHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcl9pbmZvX3JlcXVlc3RfaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy91c2VyX2luZm9fcmVxdWVzdF9oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7O0FBR0gsbUNBQXNDO0FBRXRDLDJEQUE2RTtBQUc3RSwyREFBNEY7QUFDNUYsNkJBQWlEO0FBZWpEOztHQUVHO0FBQ0g7SUFDRSxvQ0FDb0IsU0FBNEMsRUFDNUMsS0FBcUQ7UUFEckQsMEJBQUEsRUFBQSxnQkFBMkIscUJBQWUsRUFBRTtRQUM1QyxzQkFBQSxFQUFBLFlBQThCLDBDQUFxQixFQUFFO1FBRHJELGNBQVMsR0FBVCxTQUFTLENBQW1DO1FBQzVDLFVBQUssR0FBTCxLQUFLLENBQWdEO0lBQUcsQ0FBQztJQUVyRSx1REFBa0IsR0FBMUIsVUFBMkIsUUFDaUI7UUFDMUMsT0FBUSxRQUE4QixDQUFDLEtBQUssS0FBSyxTQUFTLENBQUM7SUFDN0QsQ0FBQztJQUVNLDJEQUFzQixHQUE3QixVQUNJLGFBQWdELEVBQ2hELE9BQXdCO1FBRjVCLGlCQXNCQztRQW5CQyxJQUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUF5QztZQUNoRixHQUFHLEVBQUUsYUFBYSxDQUFDLGdCQUFnQjtZQUNuQyxNQUFNLEVBQUUsTUFBTTtZQUNkLHNEQUFzRDtZQUN0RCxPQUFPLEVBQUU7Z0JBQ1AsZUFBZSxFQUFLLE9BQU8sQ0FBQyxTQUFTLFNBQUksT0FBTyxDQUFDLFdBQWE7Z0JBQzlELGNBQWMsRUFBRSxtQ0FBbUM7YUFDcEQ7WUFDRCxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ2xELENBQUMsQ0FBQztRQUVILE9BQU8sZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFVBQUEsUUFBUTtZQUNuQyxJQUFJLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDckMsT0FBTyxRQUFRLENBQUM7YUFDakI7aUJBQU07Z0JBQ0wsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUNqQixJQUFJLHFCQUFZLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxJQUFJLGtDQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3BFO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0gsaUNBQUM7QUFBRCxDQUFDLEFBakNELElBaUNDO0FBakNZLGdFQUEwQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0XG4gKiBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlXG4gKiBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlclxuICogZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQge0F1dGhvcml6YXRpb25TZXJ2aWNlQ29uZmlndXJhdGlvbn0gZnJvbSAnLi9hdXRob3JpemF0aW9uX3NlcnZpY2VfY29uZmlndXJhdGlvbic7XG5pbXBvcnQge0FwcEF1dGhFcnJvcn0gZnJvbSAnLi9lcnJvcnMnO1xuaW1wb3J0IHtsb2d9IGZyb20gJy4vbG9nZ2VyJztcbmltcG9ydCB7QmFzaWNRdWVyeVN0cmluZ1V0aWxzLCBRdWVyeVN0cmluZ1V0aWxzfSBmcm9tICcuL3F1ZXJ5X3N0cmluZ191dGlscyc7XG5pbXBvcnQge1N0cmluZ01hcH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQge1VzZXJJbmZvUmVxdWVzdH0gZnJvbSAnLi91c2VyX2luZm9fcmVxdWVzdCc7XG5pbXBvcnQge1VzZXJJbmZvRXJyb3IsIFVzZXJJbmZvRXJyb3JKc29uLCBVc2VySW5mb1Jlc3BvbnNlSnNvbn0gZnJvbSAnLi91c2VyX2luZm9fcmVzcG9uc2UnO1xuaW1wb3J0IHtKUXVlcnlSZXF1ZXN0b3IsIFJlcXVlc3Rvcn0gZnJvbSAnLi94aHInO1xuXG5cbi8qKlxuICogUmVwcmVzZW50cyBhbiBpbnRlcmZhY2Ugd2hpY2ggY2FuIG1ha2UgYSB1c2VyIGluZm8gcmVxdWVzdC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBVc2VySW5mb1JlcXVlc3RIYW5kbGVyIHtcbiAgLyoqXG4gICAqIFBlcmZvcm1zIHRoZSB1c2VyIGluZm8gcmVxdWVzdCwgZ2l2ZW4gdGhlIHNlcnZpY2UgY29uZmlndXJhdGlvbi5cbiAgICovXG4gIHBlcmZvcm1Vc2VySW5mb1JlcXVlc3QoXG4gICAgICBjb25maWd1cmF0aW9uOiBBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb24sXG4gICAgICByZXF1ZXN0OiBVc2VySW5mb1JlcXVlc3QpOiBQcm9taXNlPFVzZXJJbmZvUmVzcG9uc2VKc29uPjtcbn1cblxuLyoqXG4gKiBUaGUgZGVmYXVsdCB1c2VyIGluZm8gcmVxdWVzdCBoYW5kbGVyLlxuICovXG5leHBvcnQgY2xhc3MgQmFzZVVzZXJJbmZvUmVxdWVzdEhhbmRsZXIgaW1wbGVtZW50cyBVc2VySW5mb1JlcXVlc3RIYW5kbGVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgcmVhZG9ubHkgcmVxdWVzdG9yOiBSZXF1ZXN0b3IgPSBuZXcgSlF1ZXJ5UmVxdWVzdG9yKCksXG4gICAgICBwdWJsaWMgcmVhZG9ubHkgdXRpbHM6IFF1ZXJ5U3RyaW5nVXRpbHMgPSBuZXcgQmFzaWNRdWVyeVN0cmluZ1V0aWxzKCkpIHt9XG5cbiAgcHJpdmF0ZSBpc1VzZXJJbmZvUmVzcG9uc2UocmVzcG9uc2U6IFVzZXJJbmZvUmVzcG9uc2VKc29ufFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBVc2VySW5mb0Vycm9ySnNvbik6IHJlc3BvbnNlIGlzIFVzZXJJbmZvUmVzcG9uc2VKc29uIHtcbiAgICByZXR1cm4gKHJlc3BvbnNlIGFzIFVzZXJJbmZvRXJyb3JKc29uKS5lcnJvciA9PT0gdW5kZWZpbmVkO1xuICB9XG5cbiAgcHVibGljIHBlcmZvcm1Vc2VySW5mb1JlcXVlc3QoXG4gICAgICBjb25maWd1cmF0aW9uOiBBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb24sXG4gICAgICByZXF1ZXN0OiBVc2VySW5mb1JlcXVlc3QpOiBQcm9taXNlPFVzZXJJbmZvUmVzcG9uc2VKc29uPiB7XG4gICAgbGV0IHVzZXJJbmZvUmVzcG9uc2UgPSB0aGlzLnJlcXVlc3Rvci54aHI8VXNlckluZm9SZXNwb25zZUpzb258VXNlckluZm9FcnJvckpzb24+KHtcbiAgICAgIHVybDogY29uZmlndXJhdGlvbi51c2VySW5mb0VuZHBvaW50LFxuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAvLyAgICAgIGRhdGFUeXBlOiAnanNvbicsICAvLyBhZGRpbmcgaW1wbGljaXQgZGF0YVR5cGVcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgJHtyZXF1ZXN0LnRva2VuVHlwZX0gJHtyZXF1ZXN0LmFjY2Vzc1Rva2VufWAsXG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xuICAgICAgfSxcbiAgICAgIGRhdGE6IHRoaXMudXRpbHMuc3RyaW5naWZ5KHJlcXVlc3QudG9TdHJpbmdNYXAoKSlcbiAgICB9KTtcblxuICAgIHJldHVybiB1c2VySW5mb1Jlc3BvbnNlLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgaWYgKHRoaXMuaXNVc2VySW5mb1Jlc3BvbnNlKHJlc3BvbnNlKSkge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3Q8VXNlckluZm9SZXNwb25zZUpzb24+KFxuICAgICAgICAgICAgbmV3IEFwcEF1dGhFcnJvcihyZXNwb25zZS5lcnJvciwgbmV3IFVzZXJJbmZvRXJyb3IocmVzcG9uc2UpKSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==