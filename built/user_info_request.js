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
    function UserInfoRequest(request) {
        this.tokenType = request.token_type;
        this.accessToken = request.access_token;
        this.extras = request.extras;
    }
    /**
     * Serializes a UserInfo to a JavaScript object.
     */
    UserInfoRequest.prototype.toJson = function () {
        return { token_type: this.tokenType, access_token: this.accessToken, extras: this.extras };
    };
    UserInfoRequest.prototype.toStringMap = function () {
        var map = { token_type: this.tokenType, access_token: this.accessToken };
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
    return UserInfoRequest;
}());
exports.UserInfoRequest = UserInfoRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcl9pbmZvX3JlcXVlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXNlcl9pbmZvX3JlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7R0FZRzs7QUFjSDs7OztHQUlHO0FBQ0g7SUFLRSx5QkFBWSxPQUE0QjtRQUN0QyxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7UUFDcEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztJQUMvQixDQUFDO0lBRUQ7O09BRUc7SUFDSCxnQ0FBTSxHQUFOO1FBQ0UsT0FBTyxFQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFDLENBQUM7SUFDM0YsQ0FBQztJQUVELHFDQUFXLEdBQVg7UUFDRSxJQUFJLEdBQUcsR0FBYyxFQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFDLENBQUM7UUFFbEYsbUJBQW1CO1FBQ25CLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLEtBQUssSUFBSSxLQUFLLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDN0IsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQ25FLHVDQUF1QztvQkFDdkMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ2pDO2FBQ0Y7U0FDRjtRQUVELE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUNILHNCQUFDO0FBQUQsQ0FBQyxBQWpDRCxJQWlDQztBQWpDWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0XG4gKiBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlXG4gKiBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlclxuICogZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQge1N0cmluZ01hcH0gZnJvbSAnLi90eXBlcyc7XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgdXNlciBpbmZvIFJlcXVlc3QgYXMgSlNPTi5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBVc2VySW5mb1JlcXVlc3RKc29uIHtcbiAgdG9rZW5fdHlwZTogc3RyaW5nO1xuICBhY2Nlc3NfdG9rZW46IHN0cmluZztcbiAgZXh0cmFzPzogU3RyaW5nTWFwO1xufVxuXG5cbi8qKlxuICogUmVwcmVzZW50cyBhIFVzZXJJbmZvIHJlcXVlc3QuXG4gKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiBsb29rIGF0OlxuICogaHR0cDovL29wZW5pZC5uZXQvc3BlY3Mvb3BlbmlkLWNvbm5lY3QtY29yZS0xXzAuaHRtbCNVc2VySW5mb1xuICovXG5leHBvcnQgY2xhc3MgVXNlckluZm9SZXF1ZXN0IHtcbiAgdG9rZW5UeXBlOiBzdHJpbmc7XG4gIGFjY2Vzc1Rva2VuOiBzdHJpbmc7XG4gIGV4dHJhczogU3RyaW5nTWFwfHVuZGVmaW5lZDtcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBVc2VySW5mb1JlcXVlc3RKc29uKSB7XG4gICAgdGhpcy50b2tlblR5cGUgPSByZXF1ZXN0LnRva2VuX3R5cGU7XG4gICAgdGhpcy5hY2Nlc3NUb2tlbiA9IHJlcXVlc3QuYWNjZXNzX3Rva2VuO1xuICAgIHRoaXMuZXh0cmFzID0gcmVxdWVzdC5leHRyYXM7XG4gIH1cblxuICAvKipcbiAgICogU2VyaWFsaXplcyBhIFVzZXJJbmZvIHRvIGEgSmF2YVNjcmlwdCBvYmplY3QuXG4gICAqL1xuICB0b0pzb24oKTogVXNlckluZm9SZXF1ZXN0SnNvbiB7XG4gICAgcmV0dXJuIHt0b2tlbl90eXBlOiB0aGlzLnRva2VuVHlwZSwgYWNjZXNzX3Rva2VuOiB0aGlzLmFjY2Vzc1Rva2VuLCBleHRyYXM6IHRoaXMuZXh0cmFzfTtcbiAgfVxuXG4gIHRvU3RyaW5nTWFwKCk6IFN0cmluZ01hcCB7XG4gICAgbGV0IG1hcDogU3RyaW5nTWFwID0ge3Rva2VuX3R5cGU6IHRoaXMudG9rZW5UeXBlLCBhY2Nlc3NfdG9rZW46IHRoaXMuYWNjZXNzVG9rZW59O1xuXG4gICAgLy8gY29weSBvdmVyIGV4dHJhc1xuICAgIGlmICh0aGlzLmV4dHJhcykge1xuICAgICAgZm9yIChsZXQgZXh0cmEgaW4gdGhpcy5leHRyYXMpIHtcbiAgICAgICAgaWYgKHRoaXMuZXh0cmFzLmhhc093blByb3BlcnR5KGV4dHJhKSAmJiAhbWFwLmhhc093blByb3BlcnR5KGV4dHJhKSkge1xuICAgICAgICAgIC8vIGNoZWNrIGJlZm9yZSBpbnNlcnRpbmcgdG8gcmVxdWVzdE1hcFxuICAgICAgICAgIG1hcFtleHRyYV0gPSB0aGlzLmV4dHJhc1tleHRyYV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbWFwO1xuICB9XG59XG4iXX0=