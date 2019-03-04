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
 * Represents the UserInfo Error type.
 * For more information look at:
 * http://openid.net/specs/openid-connect-core-1_0.html#UserInfo
 */
var UserInfoError = /** @class */ (function () {
    function UserInfoError(error, errorDescription, errorUri) {
        this.error = error;
        this.errorDescription = errorDescription;
        this.errorUri = errorUri;
    }
    UserInfoError.prototype.toJson = function () {
        return {
            error: this.error, error_description: this.errorDescription, error_uri: this.errorUri
        };
    };
    UserInfoError.fromJson = function (input) {
        return new UserInfoError(input.error, input.error_description, input.error_uri);
    };
    return UserInfoError;
}());
exports.UserInfoError = UserInfoError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcl9pbmZvX3Jlc3BvbnNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3VzZXJfaW5mb19yZXNwb25zZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7OztHQVlHOztBQXVCSDs7OztHQUlHO0FBQ0g7SUFDRSx1QkFDb0IsS0FBd0IsRUFDeEIsZ0JBQXlCLEVBQ3pCLFFBQWlCO1FBRmpCLFVBQUssR0FBTCxLQUFLLENBQW1CO1FBQ3hCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBUztRQUN6QixhQUFRLEdBQVIsUUFBUSxDQUFTO0lBQUcsQ0FBQztJQUV6Qyw4QkFBTSxHQUFOO1FBQ0UsTUFBTSxDQUFDO1lBQ0wsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUTtTQUN0RixDQUFBO0lBQ0gsQ0FBQztJQUVNLHNCQUFRLEdBQWYsVUFBZ0IsS0FBd0I7UUFDdEMsTUFBTSxDQUFDLElBQUksYUFBYSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLGlCQUFpQixFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNsRixDQUFDO0lBQ0gsb0JBQUM7QUFBRCxDQUFDLEFBZkQsSUFlQztBQWZZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHRcbiAqIGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGVcbiAqIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyXG4gKiBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgVXNlckluZm9SZXNwb25zZSBhcyBhIEpTT04gT2JqZWN0LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFVzZXJJbmZvUmVzcG9uc2VKc29uIHsgc3ViOiBzdHJpbmc7IH1cblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBwb3NzaWJsZSBlcnJvciBjb2RlcyBmcm9tIHRoZSB1c2VyIGluZm8gZW5kcG9pbnQuXG4gKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiBsb29rIGF0OlxuICogaHR0cDovL29wZW5pZC5uZXQvc3BlY3Mvb3BlbmlkLWNvbm5lY3QtY29yZS0xXzAuaHRtbCNVc2VySW5mb1xuICovXG5leHBvcnQgdHlwZSBVc2VySW5mb0Vycm9yVHlwZSA9ICdpbnZhbGlkX3Rva2VuJztcblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBVc2VySW5mb0Vycm9yIGFzIGEgSlNPTiBPYmplY3QuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVXNlckluZm9FcnJvckpzb24ge1xuICBlcnJvcjogVXNlckluZm9FcnJvclR5cGU7XG4gIGVycm9yX2Rlc2NyaXB0aW9uPzogc3RyaW5nO1xuICBlcnJvcl91cmk/OiBzdHJpbmc7XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgVXNlckluZm8gRXJyb3IgdHlwZS5cbiAqIEZvciBtb3JlIGluZm9ybWF0aW9uIGxvb2sgYXQ6XG4gKiBodHRwOi8vb3BlbmlkLm5ldC9zcGVjcy9vcGVuaWQtY29ubmVjdC1jb3JlLTFfMC5odG1sI1VzZXJJbmZvXG4gKi9cbmV4cG9ydCBjbGFzcyBVc2VySW5mb0Vycm9yIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgcmVhZG9ubHkgZXJyb3I6IFVzZXJJbmZvRXJyb3JUeXBlLFxuICAgICAgcHVibGljIHJlYWRvbmx5IGVycm9yRGVzY3JpcHRpb24/OiBzdHJpbmcsXG4gICAgICBwdWJsaWMgcmVhZG9ubHkgZXJyb3JVcmk/OiBzdHJpbmcpIHt9XG5cbiAgdG9Kc29uKCk6IFVzZXJJbmZvRXJyb3JKc29uIHtcbiAgICByZXR1cm4ge1xuICAgICAgZXJyb3I6IHRoaXMuZXJyb3IsIGVycm9yX2Rlc2NyaXB0aW9uOiB0aGlzLmVycm9yRGVzY3JpcHRpb24sIGVycm9yX3VyaTogdGhpcy5lcnJvclVyaVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBmcm9tSnNvbihpbnB1dDogVXNlckluZm9FcnJvckpzb24pIHtcbiAgICByZXR1cm4gbmV3IFVzZXJJbmZvRXJyb3IoaW5wdXQuZXJyb3IsIGlucHV0LmVycm9yX2Rlc2NyaXB0aW9uLCBpbnB1dC5lcnJvcl91cmkpO1xuICB9XG59XG4iXX0=