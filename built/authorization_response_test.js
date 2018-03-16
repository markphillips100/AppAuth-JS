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
var authorization_response_1 = require("./authorization_response");
describe('Authorization Response Tests', function () {
    var code = 'code';
    var state = 'state';
    it('Constructing an Authorization Response should work', function () {
        var response = new authorization_response_1.AuthorizationResponse(code, state);
        expect(response).not.toBeNull();
        expect(response.code).toBe(code);
        expect(response.state).toBe(state);
    });
    it('toJson() and fromJson() should work', function () {
        var response = new authorization_response_1.AuthorizationResponse(code, state);
        var json = response.toJson();
        expect(json).not.toBeNull();
        expect(json.code).toBe(code);
        expect(json.state).toBe(state);
        var newResponse = authorization_response_1.AuthorizationResponse.fromJson(json);
        expect(newResponse).not.toBeNull();
        expect(newResponse.code).toBe(code);
        expect(newResponse.state).toBe(state);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aG9yaXphdGlvbl9yZXNwb25zZV90ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2F1dGhvcml6YXRpb25fcmVzcG9uc2VfdGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7OztHQVlHOztBQUVILG1FQUErRDtBQUUvRCxRQUFRLENBQUMsOEJBQThCLEVBQUU7SUFFdkMsSUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDO0lBQ3BCLElBQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQztJQUV0QixFQUFFLENBQUMsb0RBQW9ELEVBQUU7UUFDdkQsSUFBSSxRQUFRLEdBQUcsSUFBSSw4Q0FBcUIsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDdEQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNoQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyQyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxxQ0FBcUMsRUFBRTtRQUN4QyxJQUFJLFFBQVEsR0FBRyxJQUFJLDhDQUFxQixDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN0RCxJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDN0IsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUM1QixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvQixJQUFJLFdBQVcsR0FBRyw4Q0FBcUIsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNuQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQyxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN4QyxDQUFDLENBQUMsQ0FBQztBQUVMLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHRcbiAqIGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGVcbiAqIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyXG4gKiBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB7QXV0aG9yaXphdGlvblJlc3BvbnNlfSBmcm9tICcuL2F1dGhvcml6YXRpb25fcmVzcG9uc2UnO1xuXG5kZXNjcmliZSgnQXV0aG9yaXphdGlvbiBSZXNwb25zZSBUZXN0cycsICgpID0+IHtcblxuICBjb25zdCBjb2RlID0gJ2NvZGUnO1xuICBjb25zdCBzdGF0ZSA9ICdzdGF0ZSc7XG5cbiAgaXQoJ0NvbnN0cnVjdGluZyBhbiBBdXRob3JpemF0aW9uIFJlc3BvbnNlIHNob3VsZCB3b3JrJywgKCkgPT4ge1xuICAgIGxldCByZXNwb25zZSA9IG5ldyBBdXRob3JpemF0aW9uUmVzcG9uc2UoY29kZSwgc3RhdGUpO1xuICAgIGV4cGVjdChyZXNwb25zZSkubm90LnRvQmVOdWxsKCk7XG4gICAgZXhwZWN0KHJlc3BvbnNlLmNvZGUpLnRvQmUoY29kZSk7XG4gICAgZXhwZWN0KHJlc3BvbnNlLnN0YXRlKS50b0JlKHN0YXRlKTtcbiAgfSk7XG5cbiAgaXQoJ3RvSnNvbigpIGFuZCBmcm9tSnNvbigpIHNob3VsZCB3b3JrJywgKCkgPT4ge1xuICAgIGxldCByZXNwb25zZSA9IG5ldyBBdXRob3JpemF0aW9uUmVzcG9uc2UoY29kZSwgc3RhdGUpO1xuICAgIGxldCBqc29uID0gcmVzcG9uc2UudG9Kc29uKCk7XG4gICAgZXhwZWN0KGpzb24pLm5vdC50b0JlTnVsbCgpO1xuICAgIGV4cGVjdChqc29uLmNvZGUpLnRvQmUoY29kZSk7XG4gICAgZXhwZWN0KGpzb24uc3RhdGUpLnRvQmUoc3RhdGUpO1xuICAgIGxldCBuZXdSZXNwb25zZSA9IEF1dGhvcml6YXRpb25SZXNwb25zZS5mcm9tSnNvbihqc29uKTtcbiAgICBleHBlY3QobmV3UmVzcG9uc2UpLm5vdC50b0JlTnVsbCgpO1xuICAgIGV4cGVjdChuZXdSZXNwb25zZS5jb2RlKS50b0JlKGNvZGUpO1xuICAgIGV4cGVjdChuZXdSZXNwb25zZS5zdGF0ZSkudG9CZShzdGF0ZSk7XG4gIH0pO1xuXG59KTtcbiJdfQ==