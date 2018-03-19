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
 * Represents a UserInfo request.
 * For more information look at:
 * http://openid.net/specs/openid-connect-core-1_0.html#UserInfo
 */
var UserInfoRequest = /** @class */ (function () {
    function UserInfoRequest(tokenType, accessToken, extras) {
        this.tokenType = tokenType;
        this.accessToken = accessToken;
        this.extras = extras;
    }
    /**
     * Serializes a UserInfo to a JavaScript object.
     */
    UserInfoRequest.prototype.toJson = function () {
        return { token_type: this.tokenType, access_token: this.accessToken, extras: this.extras };
    };
    UserInfoRequest.prototype.toStringMap = function () {
        var map = {};
        // copy over extras
        if (this.extras) {
            for (var extra in this.extras) {
                if (this.extras.hasOwnProperty(extra) && !map.hasOwnProperty(extra)) {
                    // check before inserting to requestMap
                    map[extra] = this.extras[extra];
                }
            }
        }
        return map;
    };
    UserInfoRequest.fromJson = function (input) {
        return new UserInfoRequest(input.token_type, input.access_token, input.extras);
    };
    return UserInfoRequest;
}());
exports.UserInfoRequest = UserInfoRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcl9pbmZvX3JlcXVlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXNlcl9pbmZvX3JlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7R0FZRzs7QUFjSDs7OztHQUlHO0FBQ0g7SUFDRSx5QkFBbUIsU0FBaUIsRUFBUyxXQUFtQixFQUFTLE1BQWtCO1FBQXhFLGNBQVMsR0FBVCxTQUFTLENBQVE7UUFBUyxnQkFBVyxHQUFYLFdBQVcsQ0FBUTtRQUFTLFdBQU0sR0FBTixNQUFNLENBQVk7SUFBRyxDQUFDO0lBRS9GOztPQUVHO0lBQ0gsZ0NBQU0sR0FBTjtRQUNFLE1BQU0sQ0FBQyxFQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFDLENBQUM7SUFDM0YsQ0FBQztJQUVELHFDQUFXLEdBQVg7UUFDRSxJQUFJLEdBQUcsR0FBYyxFQUFFLENBQUM7UUFFeEIsbUJBQW1CO1FBQ25CLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLEdBQUcsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUM5QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNwRSx1Q0FBdUM7b0JBQ3ZDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNsQyxDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7UUFFRCxNQUFNLENBQUMsR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUVNLHdCQUFRLEdBQWYsVUFBZ0IsS0FBMEI7UUFDeEMsTUFBTSxDQUFDLElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDakYsQ0FBQztJQUNILHNCQUFDO0FBQUQsQ0FBQyxBQTdCRCxJQTZCQztBQTdCWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0XG4gKiBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlXG4gKiBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlclxuICogZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQge1N0cmluZ01hcH0gZnJvbSAnLi90eXBlcyc7XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgdXNlciBpbmZvIFJlcXVlc3QgYXMgSlNPTi5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBVc2VySW5mb1JlcXVlc3RKc29uIHtcbiAgdG9rZW5fdHlwZTogc3RyaW5nO1xuICBhY2Nlc3NfdG9rZW46IHN0cmluZztcbiAgZXh0cmFzPzogU3RyaW5nTWFwO1xufVxuXG5cbi8qKlxuICogUmVwcmVzZW50cyBhIFVzZXJJbmZvIHJlcXVlc3QuXG4gKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiBsb29rIGF0OlxuICogaHR0cDovL29wZW5pZC5uZXQvc3BlY3Mvb3BlbmlkLWNvbm5lY3QtY29yZS0xXzAuaHRtbCNVc2VySW5mb1xuICovXG5leHBvcnQgY2xhc3MgVXNlckluZm9SZXF1ZXN0IHtcbiAgY29uc3RydWN0b3IocHVibGljIHRva2VuVHlwZTogc3RyaW5nLCBwdWJsaWMgYWNjZXNzVG9rZW46IHN0cmluZywgcHVibGljIGV4dHJhcz86IFN0cmluZ01hcCkge31cblxuICAvKipcbiAgICogU2VyaWFsaXplcyBhIFVzZXJJbmZvIHRvIGEgSmF2YVNjcmlwdCBvYmplY3QuXG4gICAqL1xuICB0b0pzb24oKTogVXNlckluZm9SZXF1ZXN0SnNvbiB7XG4gICAgcmV0dXJuIHt0b2tlbl90eXBlOiB0aGlzLnRva2VuVHlwZSwgYWNjZXNzX3Rva2VuOiB0aGlzLmFjY2Vzc1Rva2VuLCBleHRyYXM6IHRoaXMuZXh0cmFzfTtcbiAgfVxuXG4gIHRvU3RyaW5nTWFwKCk6IFN0cmluZ01hcCB7XG4gICAgbGV0IG1hcDogU3RyaW5nTWFwID0ge307XG5cbiAgICAvLyBjb3B5IG92ZXIgZXh0cmFzXG4gICAgaWYgKHRoaXMuZXh0cmFzKSB7XG4gICAgICBmb3IgKGxldCBleHRyYSBpbiB0aGlzLmV4dHJhcykge1xuICAgICAgICBpZiAodGhpcy5leHRyYXMuaGFzT3duUHJvcGVydHkoZXh0cmEpICYmICFtYXAuaGFzT3duUHJvcGVydHkoZXh0cmEpKSB7XG4gICAgICAgICAgLy8gY2hlY2sgYmVmb3JlIGluc2VydGluZyB0byByZXF1ZXN0TWFwXG4gICAgICAgICAgbWFwW2V4dHJhXSA9IHRoaXMuZXh0cmFzW2V4dHJhXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBtYXA7XG4gIH1cblxuICBzdGF0aWMgZnJvbUpzb24oaW5wdXQ6IFVzZXJJbmZvUmVxdWVzdEpzb24pOiBVc2VySW5mb1JlcXVlc3Qge1xuICAgIHJldHVybiBuZXcgVXNlckluZm9SZXF1ZXN0KGlucHV0LnRva2VuX3R5cGUsIGlucHV0LmFjY2Vzc190b2tlbiwgaW5wdXQuZXh0cmFzKTtcbiAgfVxufVxuIl19