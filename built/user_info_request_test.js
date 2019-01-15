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
var user_info_request_1 = require("./user_info_request");
describe('User Info Request tests', function () {
    var tokenType = 'token_type';
    var accessToken = 'access_token';
    var extras = { 'key': 'value' };
    var request = new user_info_request_1.UserInfoRequest({ token_type: tokenType, access_token: accessToken, extras: extras });
    it('Basic Token Request Tests', function () {
        expect(request).not.toBeNull();
        expect(request.tokenType).toBe(tokenType);
        expect(request.accessToken).toBe(accessToken);
        expect(request.extras).toBeTruthy();
        expect(request.extras['key']).toBe('value');
        expect(request.extras).toEqual(extras);
    });
    it('To Json() and from Json() should work', function () {
        var json = JSON.parse(JSON.stringify(request.toJson()));
        expect(json).not.toBeNull();
        var newRequest = new user_info_request_1.UserInfoRequest(json);
        expect(newRequest).not.toBeNull();
        expect(newRequest.tokenType).toBe(tokenType);
        expect(newRequest.accessToken).toBe(accessToken);
        expect(newRequest.extras).toBeTruthy();
        expect(newRequest.extras['key']).toBe('value');
        expect(newRequest.extras).toEqual(extras);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcl9pbmZvX3JlcXVlc3RfdGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy91c2VyX2luZm9fcmVxdWVzdF90ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7O0FBR0gseURBQW9EO0FBRXBELFFBQVEsQ0FBQyx5QkFBeUIsRUFBRTtJQUNsQyxJQUFNLFNBQVMsR0FBRyxZQUFZLENBQUM7SUFDL0IsSUFBTSxXQUFXLEdBQUcsY0FBYyxDQUFDO0lBQ25DLElBQU0sTUFBTSxHQUFjLEVBQUMsS0FBSyxFQUFFLE9BQU8sRUFBQyxDQUFDO0lBRTNDLElBQUksT0FBTyxHQUNQLElBQUksbUNBQWUsQ0FBQyxFQUFDLFVBQVUsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQztJQUU1RixFQUFFLENBQUMsMkJBQTJCLEVBQUU7UUFDOUIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUMvQixNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMxQyxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM5QyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3BDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3pDLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLHVDQUF1QyxFQUFFO1FBQzFDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3hELE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDNUIsSUFBSSxVQUFVLEdBQUcsSUFBSSxtQ0FBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDbEMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDN0MsTUFBTSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDakQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN2QyxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNoRCxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM1QyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHRcbiAqIGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGVcbiAqIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyXG4gKiBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB7U3RyaW5nTWFwfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7VXNlckluZm9SZXF1ZXN0fSBmcm9tICcuL3VzZXJfaW5mb19yZXF1ZXN0JztcblxuZGVzY3JpYmUoJ1VzZXIgSW5mbyBSZXF1ZXN0IHRlc3RzJywgKCkgPT4ge1xuICBjb25zdCB0b2tlblR5cGUgPSAndG9rZW5fdHlwZSc7XG4gIGNvbnN0IGFjY2Vzc1Rva2VuID0gJ2FjY2Vzc190b2tlbic7XG4gIGNvbnN0IGV4dHJhczogU3RyaW5nTWFwID0geydrZXknOiAndmFsdWUnfTtcblxuICBsZXQgcmVxdWVzdDogVXNlckluZm9SZXF1ZXN0ID1cbiAgICAgIG5ldyBVc2VySW5mb1JlcXVlc3Qoe3Rva2VuX3R5cGU6IHRva2VuVHlwZSwgYWNjZXNzX3Rva2VuOiBhY2Nlc3NUb2tlbiwgZXh0cmFzOiBleHRyYXN9KTtcblxuICBpdCgnQmFzaWMgVG9rZW4gUmVxdWVzdCBUZXN0cycsICgpID0+IHtcbiAgICBleHBlY3QocmVxdWVzdCkubm90LnRvQmVOdWxsKCk7XG4gICAgZXhwZWN0KHJlcXVlc3QudG9rZW5UeXBlKS50b0JlKHRva2VuVHlwZSk7XG4gICAgZXhwZWN0KHJlcXVlc3QuYWNjZXNzVG9rZW4pLnRvQmUoYWNjZXNzVG9rZW4pO1xuICAgIGV4cGVjdChyZXF1ZXN0LmV4dHJhcykudG9CZVRydXRoeSgpO1xuICAgIGV4cGVjdChyZXF1ZXN0LmV4dHJhcyFbJ2tleSddKS50b0JlKCd2YWx1ZScpO1xuICAgIGV4cGVjdChyZXF1ZXN0LmV4dHJhcykudG9FcXVhbChleHRyYXMpO1xuICB9KTtcblxuICBpdCgnVG8gSnNvbigpIGFuZCBmcm9tIEpzb24oKSBzaG91bGQgd29yaycsICgpID0+IHtcbiAgICBsZXQganNvbiA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkocmVxdWVzdC50b0pzb24oKSkpO1xuICAgIGV4cGVjdChqc29uKS5ub3QudG9CZU51bGwoKTtcbiAgICBsZXQgbmV3UmVxdWVzdCA9IG5ldyBVc2VySW5mb1JlcXVlc3QoanNvbik7XG4gICAgZXhwZWN0KG5ld1JlcXVlc3QpLm5vdC50b0JlTnVsbCgpO1xuICAgIGV4cGVjdChuZXdSZXF1ZXN0LnRva2VuVHlwZSkudG9CZSh0b2tlblR5cGUpO1xuICAgIGV4cGVjdChuZXdSZXF1ZXN0LmFjY2Vzc1Rva2VuKS50b0JlKGFjY2Vzc1Rva2VuKTtcbiAgICBleHBlY3QobmV3UmVxdWVzdC5leHRyYXMpLnRvQmVUcnV0aHkoKTtcbiAgICBleHBlY3QobmV3UmVxdWVzdC5leHRyYXMhWydrZXknXSkudG9CZSgndmFsdWUnKTtcbiAgICBleHBlY3QobmV3UmVxdWVzdC5leHRyYXMpLnRvRXF1YWwoZXh0cmFzKTtcbiAgfSk7XG59KTsiXX0=