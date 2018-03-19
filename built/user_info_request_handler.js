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
            dataType: 'json',
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
                return Promise.reject(new errors_1.AppAuthError(response.error, user_info_response_1.UserInfoError.fromJson(response)));
            }
        });
    };
    return BaseUserInfoRequestHandler;
}());
exports.BaseUserInfoRequestHandler = BaseUserInfoRequestHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcl9pbmZvX3JlcXVlc3RfaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy91c2VyX2luZm9fcmVxdWVzdF9oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7O0FBR0gsbUNBQXNDO0FBRXRDLDJEQUE2RTtBQUc3RSwyREFBNEY7QUFDNUYsNkJBQWlEO0FBZWpEOztHQUVHO0FBQ0g7SUFDRSxvQ0FDb0IsU0FBNEMsRUFDNUMsS0FBcUQ7UUFEckQsMEJBQUEsRUFBQSxnQkFBMkIscUJBQWUsRUFBRTtRQUM1QyxzQkFBQSxFQUFBLFlBQThCLDBDQUFxQixFQUFFO1FBRHJELGNBQVMsR0FBVCxTQUFTLENBQW1DO1FBQzVDLFVBQUssR0FBTCxLQUFLLENBQWdEO0lBQUcsQ0FBQztJQUVyRSx1REFBa0IsR0FBMUIsVUFBMkIsUUFDaUI7UUFDMUMsTUFBTSxDQUFFLFFBQThCLENBQUMsS0FBSyxLQUFLLFNBQVMsQ0FBQztJQUM3RCxDQUFDO0lBRU0sMkRBQXNCLEdBQTdCLFVBQ0ksYUFBZ0QsRUFDaEQsT0FBd0I7UUFGNUIsaUJBc0JDO1FBbkJDLElBQUksZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQXlDO1lBQ2hGLEdBQUcsRUFBRSxhQUFhLENBQUMsZ0JBQWdCO1lBQ25DLE1BQU0sRUFBRSxNQUFNO1lBQ2QsUUFBUSxFQUFFLE1BQU07WUFDaEIsT0FBTyxFQUFFO2dCQUNQLGVBQWUsRUFBSyxPQUFPLENBQUMsU0FBUyxTQUFJLE9BQU8sQ0FBQyxXQUFhO2dCQUM5RCxjQUFjLEVBQUUsbUNBQW1DO2FBQ3BEO1lBQ0QsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNsRCxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFVBQUEsUUFBUTtZQUNuQyxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN0QyxNQUFNLENBQUMsUUFBUSxDQUFDO1lBQ2xCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FDakIsSUFBSSxxQkFBWSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsa0NBQWEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFFLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDSCxpQ0FBQztBQUFELENBQUMsQUFqQ0QsSUFpQ0M7QUFqQ1ksZ0VBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHRcbiAqIGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGVcbiAqIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyXG4gKiBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB7QXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9ufSBmcm9tICcuL2F1dGhvcml6YXRpb25fc2VydmljZV9jb25maWd1cmF0aW9uJztcbmltcG9ydCB7QXBwQXV0aEVycm9yfSBmcm9tICcuL2Vycm9ycyc7XG5pbXBvcnQge2xvZ30gZnJvbSAnLi9sb2dnZXInO1xuaW1wb3J0IHtCYXNpY1F1ZXJ5U3RyaW5nVXRpbHMsIFF1ZXJ5U3RyaW5nVXRpbHN9IGZyb20gJy4vcXVlcnlfc3RyaW5nX3V0aWxzJztcbmltcG9ydCB7U3RyaW5nTWFwfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7VXNlckluZm9SZXF1ZXN0fSBmcm9tICcuL3VzZXJfaW5mb19yZXF1ZXN0JztcbmltcG9ydCB7VXNlckluZm9FcnJvciwgVXNlckluZm9FcnJvckpzb24sIFVzZXJJbmZvUmVzcG9uc2VKc29ufSBmcm9tICcuL3VzZXJfaW5mb19yZXNwb25zZSc7XG5pbXBvcnQge0pRdWVyeVJlcXVlc3RvciwgUmVxdWVzdG9yfSBmcm9tICcuL3hocic7XG5cblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIGludGVyZmFjZSB3aGljaCBjYW4gbWFrZSBhIHVzZXIgaW5mbyByZXF1ZXN0LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFVzZXJJbmZvUmVxdWVzdEhhbmRsZXIge1xuICAvKipcbiAgICogUGVyZm9ybXMgdGhlIHVzZXIgaW5mbyByZXF1ZXN0LCBnaXZlbiB0aGUgc2VydmljZSBjb25maWd1cmF0aW9uLlxuICAgKi9cbiAgcGVyZm9ybVVzZXJJbmZvUmVxdWVzdChcbiAgICAgIGNvbmZpZ3VyYXRpb246IEF1dGhvcml6YXRpb25TZXJ2aWNlQ29uZmlndXJhdGlvbixcbiAgICAgIHJlcXVlc3Q6IFVzZXJJbmZvUmVxdWVzdCk6IFByb21pc2U8VXNlckluZm9SZXNwb25zZUpzb24+O1xufVxuXG4vKipcbiAqIFRoZSBkZWZhdWx0IHVzZXIgaW5mbyByZXF1ZXN0IGhhbmRsZXIuXG4gKi9cbmV4cG9ydCBjbGFzcyBCYXNlVXNlckluZm9SZXF1ZXN0SGFuZGxlciBpbXBsZW1lbnRzIFVzZXJJbmZvUmVxdWVzdEhhbmRsZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyByZWFkb25seSByZXF1ZXN0b3I6IFJlcXVlc3RvciA9IG5ldyBKUXVlcnlSZXF1ZXN0b3IoKSxcbiAgICAgIHB1YmxpYyByZWFkb25seSB1dGlsczogUXVlcnlTdHJpbmdVdGlscyA9IG5ldyBCYXNpY1F1ZXJ5U3RyaW5nVXRpbHMoKSkge31cblxuICBwcml2YXRlIGlzVXNlckluZm9SZXNwb25zZShyZXNwb25zZTogVXNlckluZm9SZXNwb25zZUpzb258XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIFVzZXJJbmZvRXJyb3JKc29uKTogcmVzcG9uc2UgaXMgVXNlckluZm9SZXNwb25zZUpzb24ge1xuICAgIHJldHVybiAocmVzcG9uc2UgYXMgVXNlckluZm9FcnJvckpzb24pLmVycm9yID09PSB1bmRlZmluZWQ7XG4gIH1cblxuICBwdWJsaWMgcGVyZm9ybVVzZXJJbmZvUmVxdWVzdChcbiAgICAgIGNvbmZpZ3VyYXRpb246IEF1dGhvcml6YXRpb25TZXJ2aWNlQ29uZmlndXJhdGlvbixcbiAgICAgIHJlcXVlc3Q6IFVzZXJJbmZvUmVxdWVzdCk6IFByb21pc2U8VXNlckluZm9SZXNwb25zZUpzb24+IHtcbiAgICBsZXQgdXNlckluZm9SZXNwb25zZSA9IHRoaXMucmVxdWVzdG9yLnhocjxVc2VySW5mb1Jlc3BvbnNlSnNvbnxVc2VySW5mb0Vycm9ySnNvbj4oe1xuICAgICAgdXJsOiBjb25maWd1cmF0aW9uLnVzZXJJbmZvRW5kcG9pbnQsXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGRhdGFUeXBlOiAnanNvbicsICAvLyBhZGRpbmcgaW1wbGljaXQgZGF0YVR5cGVcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgJHtyZXF1ZXN0LnRva2VuVHlwZX0gJHtyZXF1ZXN0LmFjY2Vzc1Rva2VufWAsXG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xuICAgICAgfSxcbiAgICAgIGRhdGE6IHRoaXMudXRpbHMuc3RyaW5naWZ5KHJlcXVlc3QudG9TdHJpbmdNYXAoKSlcbiAgICB9KTtcblxuICAgIHJldHVybiB1c2VySW5mb1Jlc3BvbnNlLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgaWYgKHRoaXMuaXNVc2VySW5mb1Jlc3BvbnNlKHJlc3BvbnNlKSkge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3Q8VXNlckluZm9SZXNwb25zZUpzb24+KFxuICAgICAgICAgICAgbmV3IEFwcEF1dGhFcnJvcihyZXNwb25zZS5lcnJvciwgVXNlckluZm9FcnJvci5mcm9tSnNvbihyZXNwb25zZSkpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIl19