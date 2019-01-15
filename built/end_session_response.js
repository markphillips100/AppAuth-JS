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
 * Represents the EndSession Response type.
 * For more information look at
 * http://openid.net/specs/openid-connect-session-1_0.html
 */
var EndSessionResponse = /** @class */ (function () {
    function EndSessionResponse(response) {
        this.state = response.state;
    }
    EndSessionResponse.prototype.toJson = function () {
        return { state: this.state };
    };
    return EndSessionResponse;
}());
exports.EndSessionResponse = EndSessionResponse;
/**
 * Represents the EndSession error response.
 * For more information look at:
 * http://openid.net/specs/openid-connect-session-1_0.html
 */
var EndSessionError = /** @class */ (function () {
    function EndSessionError(error) {
        this.error = error.error;
        this.errorDescription = error.error_description;
        this.errorUri = error.error_uri;
        this.state = error.state;
    }
    EndSessionError.prototype.toJson = function () {
        return {
            error: this.error,
            error_description: this.errorDescription,
            error_uri: this.errorUri,
            state: this.state
        };
    };
    return EndSessionError;
}());
exports.EndSessionError = EndSessionError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5kX3Nlc3Npb25fcmVzcG9uc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZW5kX3Nlc3Npb25fcmVzcG9uc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7R0FZRzs7QUFtQkg7Ozs7R0FJRztBQUNIO0lBR0UsNEJBQVksUUFBZ0M7UUFDMUMsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDO0lBQzlCLENBQUM7SUFFRCxtQ0FBTSxHQUFOO1FBQ0UsT0FBTyxFQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFDLENBQUM7SUFDN0IsQ0FBQztJQUNILHlCQUFDO0FBQUQsQ0FBQyxBQVZELElBVUM7QUFWWSxnREFBa0I7QUFZL0I7Ozs7R0FJRztBQUNIO0lBTUUseUJBQVksS0FBMEI7UUFDcEMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUMsaUJBQWlCLENBQUM7UUFDaEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztJQUMzQixDQUFDO0lBRUQsZ0NBQU0sR0FBTjtRQUNFLE9BQU87WUFDTCxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQjtZQUN4QyxTQUFTLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDeEIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1NBQ2xCLENBQUM7SUFDSixDQUFDO0lBQ0gsc0JBQUM7QUFBRCxDQUFDLEFBckJELElBcUJDO0FBckJZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHRcbiAqIGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGVcbiAqIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyXG4gKiBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgRW5kU2Vzc2lvblJlc3BvbnNlIGFzIGEgSlNPTiBvYmplY3QuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRW5kU2Vzc2lvblJlc3BvbnNlSnNvbiB7XG4gIHN0YXRlOiBzdHJpbmc7XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgRW5kU2Vzc2lvbkVycm9yIGFzIGEgSlNPTiBvYmplY3QuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRW5kU2Vzc2lvbkVycm9ySnNvbiB7XG4gIGVycm9yOiBzdHJpbmc7XG4gIGVycm9yX2Rlc2NyaXB0aW9uPzogc3RyaW5nO1xuICBlcnJvcl91cmk/OiBzdHJpbmc7XG4gIHN0YXRlPzogc3RyaW5nO1xufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIEVuZFNlc3Npb24gUmVzcG9uc2UgdHlwZS5cbiAqIEZvciBtb3JlIGluZm9ybWF0aW9uIGxvb2sgYXRcbiAqIGh0dHA6Ly9vcGVuaWQubmV0L3NwZWNzL29wZW5pZC1jb25uZWN0LXNlc3Npb24tMV8wLmh0bWxcbiAqL1xuZXhwb3J0IGNsYXNzIEVuZFNlc3Npb25SZXNwb25zZSB7XG4gIHN0YXRlOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocmVzcG9uc2U6IEVuZFNlc3Npb25SZXNwb25zZUpzb24pIHtcbiAgICB0aGlzLnN0YXRlID0gcmVzcG9uc2Uuc3RhdGU7XG4gIH1cblxuICB0b0pzb24oKTogRW5kU2Vzc2lvblJlc3BvbnNlSnNvbiB7XG4gICAgcmV0dXJuIHtzdGF0ZTogdGhpcy5zdGF0ZX07XG4gIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBFbmRTZXNzaW9uIGVycm9yIHJlc3BvbnNlLlxuICogRm9yIG1vcmUgaW5mb3JtYXRpb24gbG9vayBhdDpcbiAqIGh0dHA6Ly9vcGVuaWQubmV0L3NwZWNzL29wZW5pZC1jb25uZWN0LXNlc3Npb24tMV8wLmh0bWxcbiAqL1xuZXhwb3J0IGNsYXNzIEVuZFNlc3Npb25FcnJvciB7XG4gIGVycm9yOiBzdHJpbmc7XG4gIGVycm9yRGVzY3JpcHRpb24/OiBzdHJpbmc7XG4gIGVycm9yVXJpPzogc3RyaW5nO1xuICBzdGF0ZT86IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihlcnJvcjogRW5kU2Vzc2lvbkVycm9ySnNvbikge1xuICAgIHRoaXMuZXJyb3IgPSBlcnJvci5lcnJvcjtcbiAgICB0aGlzLmVycm9yRGVzY3JpcHRpb24gPSBlcnJvci5lcnJvcl9kZXNjcmlwdGlvbjtcbiAgICB0aGlzLmVycm9yVXJpID0gZXJyb3IuZXJyb3JfdXJpO1xuICAgIHRoaXMuc3RhdGUgPSBlcnJvci5zdGF0ZTtcbiAgfVxuXG4gIHRvSnNvbigpOiBFbmRTZXNzaW9uRXJyb3JKc29uIHtcbiAgICByZXR1cm4ge1xuICAgICAgZXJyb3I6IHRoaXMuZXJyb3IsXG4gICAgICBlcnJvcl9kZXNjcmlwdGlvbjogdGhpcy5lcnJvckRlc2NyaXB0aW9uLFxuICAgICAgZXJyb3JfdXJpOiB0aGlzLmVycm9yVXJpLFxuICAgICAgc3RhdGU6IHRoaXMuc3RhdGVcbiAgICB9O1xuICB9XG59XG4iXX0=