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
var token_response_1 = require("./token_response");
describe('Token Response tests', function () {
    var accessToken = 'accessToken';
    var idToken = 'idToken';
    it('Basic Token Response Tests', function () {
        var response = new token_response_1.TokenResponse(accessToken);
        expect(response).not.toBeNull();
        expect(response.accessToken).toBe(accessToken);
        expect(response.idToken).toBeFalsy();
        expect(response.tokenType).toBe('bearer');
        expect(response.issuedAt).toBeTruthy();
        expect(response.isValid()).toBe(true);
        expect(response.refreshToken).toBeFalsy();
        expect(response.scope).toBeFalsy();
    });
    it('Test response token validity', function () {
        var response = new token_response_1.TokenResponse(accessToken, idToken, undefined /* refresh token */, undefined /* scope */, 'bearer', 1 /* issued at */, 1000 /* expires in*/);
        expect(response).not.toBeNull();
        expect(response.accessToken).toBe(accessToken);
        expect(response.idToken).toBe(idToken);
        expect(response.tokenType).toBe('bearer');
        expect(response.issuedAt).toBeTruthy();
        expect(response.isValid()).toBe(false);
        expect(response.refreshToken).toBeFalsy();
        expect(response.scope).toBeFalsy();
    });
    it('To Json() and from Json() should work', function () {
        var response = new token_response_1.TokenResponse(accessToken, idToken);
        var json = JSON.parse(JSON.stringify(response.toJson()));
        var newResponse = token_response_1.TokenResponse.fromJson(json);
        expect(newResponse).not.toBeNull();
        expect(newResponse.accessToken).toBe(accessToken);
        expect(newResponse.idToken).toBe(idToken);
        expect(newResponse.tokenType).toBe('bearer');
        expect(newResponse.issuedAt).toBeTruthy();
        expect(newResponse.isValid()).toBe(true);
        expect(newResponse.refreshToken).toBeFalsy();
        expect(newResponse.scope).toBeFalsy();
    });
    it('Basic Token Error Tests', function () {
        var error = new token_response_1.TokenError('invalid_client');
        expect(error).toBeTruthy();
        expect(error.error).toBe('invalid_client');
        expect(error.errorDescription).toBeFalsy();
        expect(error.errorUri).toBeFalsy();
    });
    it('To Json and from JSON should work for errors', function () {
        var error = new token_response_1.TokenError('invalid_client');
        var json = JSON.parse(JSON.stringify(error.toJson()));
        var newError = token_response_1.TokenError.fromJson(json);
        expect(newError).toBeTruthy();
        expect(newError.error).toBe('invalid_client');
        expect(newError.errorDescription).toBeFalsy();
        expect(newError.errorUri).toBeFalsy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW5fcmVzcG9uc2VfdGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy90b2tlbl9yZXNwb25zZV90ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7O0FBRUgsbURBQTJEO0FBRTNELFFBQVEsQ0FBQyxzQkFBc0IsRUFBRTtJQUMvQixJQUFNLFdBQVcsR0FBRyxhQUFhLENBQUM7SUFDbEMsSUFBTSxPQUFPLEdBQUcsU0FBUyxDQUFDO0lBRTFCLEVBQUUsQ0FBQyw0QkFBNEIsRUFBRTtRQUMvQixJQUFJLFFBQVEsR0FBRyxJQUFJLDhCQUFhLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDOUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNoQyxNQUFNLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMvQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3JDLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDdkMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QyxNQUFNLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDckMsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsOEJBQThCLEVBQUU7UUFDakMsSUFBSSxRQUFRLEdBQUcsSUFBSSw4QkFBYSxDQUM1QixXQUFXLEVBQ1gsT0FBTyxFQUNQLFNBQVMsQ0FBQyxtQkFBbUIsRUFDN0IsU0FBUyxDQUFDLFdBQVcsRUFDckIsUUFBUSxFQUNSLENBQUMsQ0FBQyxlQUFlLEVBQ2pCLElBQUksQ0FBQyxlQUFlLENBQ3ZCLENBQUM7UUFFRixNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hDLE1BQU0sQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQy9DLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZDLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDdkMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2QyxNQUFNLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDckMsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsdUNBQXVDLEVBQUU7UUFDMUMsSUFBSSxRQUFRLEdBQUcsSUFBSSw4QkFBYSxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN2RCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN6RCxJQUFJLFdBQVcsR0FBRyw4QkFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ25DLE1BQU0sQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2xELE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzdDLE1BQU0sQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDMUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QyxNQUFNLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzdDLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDeEMsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMseUJBQXlCLEVBQUU7UUFDNUIsSUFBSSxLQUFLLEdBQUcsSUFBSSwyQkFBVSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDN0MsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQzNCLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDM0MsTUFBTSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzNDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDckMsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsOENBQThDLEVBQUU7UUFDakQsSUFBSSxLQUFLLEdBQUcsSUFBSSwyQkFBVSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDN0MsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdEQsSUFBSSxRQUFRLEdBQUcsMkJBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQzlCLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDOUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzlDLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDeEMsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0XG4gKiBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlXG4gKiBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlclxuICogZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQge1Rva2VuRXJyb3IsIFRva2VuUmVzcG9uc2V9IGZyb20gJy4vdG9rZW5fcmVzcG9uc2UnO1xuXG5kZXNjcmliZSgnVG9rZW4gUmVzcG9uc2UgdGVzdHMnLCAoKSA9PiB7XG4gIGNvbnN0IGFjY2Vzc1Rva2VuID0gJ2FjY2Vzc1Rva2VuJztcbiAgY29uc3QgaWRUb2tlbiA9ICdpZFRva2VuJztcblxuICBpdCgnQmFzaWMgVG9rZW4gUmVzcG9uc2UgVGVzdHMnLCAoKSA9PiB7XG4gICAgbGV0IHJlc3BvbnNlID0gbmV3IFRva2VuUmVzcG9uc2UoYWNjZXNzVG9rZW4pO1xuICAgIGV4cGVjdChyZXNwb25zZSkubm90LnRvQmVOdWxsKCk7XG4gICAgZXhwZWN0KHJlc3BvbnNlLmFjY2Vzc1Rva2VuKS50b0JlKGFjY2Vzc1Rva2VuKTtcbiAgICBleHBlY3QocmVzcG9uc2UuaWRUb2tlbikudG9CZUZhbHN5KCk7XG4gICAgZXhwZWN0KHJlc3BvbnNlLnRva2VuVHlwZSkudG9CZSgnYmVhcmVyJyk7XG4gICAgZXhwZWN0KHJlc3BvbnNlLmlzc3VlZEF0KS50b0JlVHJ1dGh5KCk7XG4gICAgZXhwZWN0KHJlc3BvbnNlLmlzVmFsaWQoKSkudG9CZSh0cnVlKTtcbiAgICBleHBlY3QocmVzcG9uc2UucmVmcmVzaFRva2VuKS50b0JlRmFsc3koKTtcbiAgICBleHBlY3QocmVzcG9uc2Uuc2NvcGUpLnRvQmVGYWxzeSgpO1xuICB9KTtcblxuICBpdCgnVGVzdCByZXNwb25zZSB0b2tlbiB2YWxpZGl0eScsICgpID0+IHtcbiAgICBsZXQgcmVzcG9uc2UgPSBuZXcgVG9rZW5SZXNwb25zZShcbiAgICAgICAgYWNjZXNzVG9rZW4sXG4gICAgICAgIGlkVG9rZW4sXG4gICAgICAgIHVuZGVmaW5lZCAvKiByZWZyZXNoIHRva2VuICovLFxuICAgICAgICB1bmRlZmluZWQgLyogc2NvcGUgKi8sXG4gICAgICAgICdiZWFyZXInLFxuICAgICAgICAxIC8qIGlzc3VlZCBhdCAqLyxcbiAgICAgICAgMTAwMCAvKiBleHBpcmVzIGluKi9cbiAgICApO1xuXG4gICAgZXhwZWN0KHJlc3BvbnNlKS5ub3QudG9CZU51bGwoKTtcbiAgICBleHBlY3QocmVzcG9uc2UuYWNjZXNzVG9rZW4pLnRvQmUoYWNjZXNzVG9rZW4pO1xuICAgIGV4cGVjdChyZXNwb25zZS5pZFRva2VuKS50b0JlKGlkVG9rZW4pO1xuICAgIGV4cGVjdChyZXNwb25zZS50b2tlblR5cGUpLnRvQmUoJ2JlYXJlcicpO1xuICAgIGV4cGVjdChyZXNwb25zZS5pc3N1ZWRBdCkudG9CZVRydXRoeSgpO1xuICAgIGV4cGVjdChyZXNwb25zZS5pc1ZhbGlkKCkpLnRvQmUoZmFsc2UpO1xuICAgIGV4cGVjdChyZXNwb25zZS5yZWZyZXNoVG9rZW4pLnRvQmVGYWxzeSgpO1xuICAgIGV4cGVjdChyZXNwb25zZS5zY29wZSkudG9CZUZhbHN5KCk7XG4gIH0pO1xuXG4gIGl0KCdUbyBKc29uKCkgYW5kIGZyb20gSnNvbigpIHNob3VsZCB3b3JrJywgKCkgPT4ge1xuICAgIGxldCByZXNwb25zZSA9IG5ldyBUb2tlblJlc3BvbnNlKGFjY2Vzc1Rva2VuLCBpZFRva2VuKTtcbiAgICBsZXQganNvbiA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UudG9Kc29uKCkpKTtcbiAgICBsZXQgbmV3UmVzcG9uc2UgPSBUb2tlblJlc3BvbnNlLmZyb21Kc29uKGpzb24pO1xuICAgIGV4cGVjdChuZXdSZXNwb25zZSkubm90LnRvQmVOdWxsKCk7XG4gICAgZXhwZWN0KG5ld1Jlc3BvbnNlLmFjY2Vzc1Rva2VuKS50b0JlKGFjY2Vzc1Rva2VuKTtcbiAgICBleHBlY3QobmV3UmVzcG9uc2UuaWRUb2tlbikudG9CZShpZFRva2VuKTtcbiAgICBleHBlY3QobmV3UmVzcG9uc2UudG9rZW5UeXBlKS50b0JlKCdiZWFyZXInKTtcbiAgICBleHBlY3QobmV3UmVzcG9uc2UuaXNzdWVkQXQpLnRvQmVUcnV0aHkoKTtcbiAgICBleHBlY3QobmV3UmVzcG9uc2UuaXNWYWxpZCgpKS50b0JlKHRydWUpO1xuICAgIGV4cGVjdChuZXdSZXNwb25zZS5yZWZyZXNoVG9rZW4pLnRvQmVGYWxzeSgpO1xuICAgIGV4cGVjdChuZXdSZXNwb25zZS5zY29wZSkudG9CZUZhbHN5KCk7XG4gIH0pO1xuXG4gIGl0KCdCYXNpYyBUb2tlbiBFcnJvciBUZXN0cycsICgpID0+IHtcbiAgICBsZXQgZXJyb3IgPSBuZXcgVG9rZW5FcnJvcignaW52YWxpZF9jbGllbnQnKTtcbiAgICBleHBlY3QoZXJyb3IpLnRvQmVUcnV0aHkoKTtcbiAgICBleHBlY3QoZXJyb3IuZXJyb3IpLnRvQmUoJ2ludmFsaWRfY2xpZW50Jyk7XG4gICAgZXhwZWN0KGVycm9yLmVycm9yRGVzY3JpcHRpb24pLnRvQmVGYWxzeSgpO1xuICAgIGV4cGVjdChlcnJvci5lcnJvclVyaSkudG9CZUZhbHN5KCk7XG4gIH0pO1xuXG4gIGl0KCdUbyBKc29uIGFuZCBmcm9tIEpTT04gc2hvdWxkIHdvcmsgZm9yIGVycm9ycycsICgpID0+IHtcbiAgICBsZXQgZXJyb3IgPSBuZXcgVG9rZW5FcnJvcignaW52YWxpZF9jbGllbnQnKTtcbiAgICBsZXQganNvbiA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZXJyb3IudG9Kc29uKCkpKTtcbiAgICBsZXQgbmV3RXJyb3IgPSBUb2tlbkVycm9yLmZyb21Kc29uKGpzb24pO1xuICAgIGV4cGVjdChuZXdFcnJvcikudG9CZVRydXRoeSgpO1xuICAgIGV4cGVjdChuZXdFcnJvci5lcnJvcikudG9CZSgnaW52YWxpZF9jbGllbnQnKTtcbiAgICBleHBlY3QobmV3RXJyb3IuZXJyb3JEZXNjcmlwdGlvbikudG9CZUZhbHN5KCk7XG4gICAgZXhwZWN0KG5ld0Vycm9yLmVycm9yVXJpKS50b0JlRmFsc3koKTtcbiAgfSk7XG59KTtcbiJdfQ==