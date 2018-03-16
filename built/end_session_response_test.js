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
var end_session_response_1 = require("./end_session_response");
describe('EndSession Response Tests', function () {
    var state = 'state';
    it('Constructing an EndSession Response should work', function () {
        var response = new end_session_response_1.EndSessionResponse(state);
        expect(response).not.toBeNull();
        expect(response.state).toBe(state);
    });
    it('toJson() and fromJson() should work', function () {
        var response = new end_session_response_1.EndSessionResponse(state);
        var json = response.toJson();
        expect(json).not.toBeNull();
        expect(json.state).toBe(state);
        var newResponse = end_session_response_1.EndSessionResponse.fromJson(json);
        expect(newResponse).not.toBeNull();
        expect(newResponse.state).toBe(state);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5kX3Nlc3Npb25fcmVzcG9uc2VfdGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9lbmRfc2Vzc2lvbl9yZXNwb25zZV90ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7O0FBRUgsK0RBQTBEO0FBRTFELFFBQVEsQ0FBQywyQkFBMkIsRUFBRTtJQUVwQyxJQUFNLEtBQUssR0FBRyxPQUFPLENBQUM7SUFFdEIsRUFBRSxDQUFDLGlEQUFpRCxFQUFFO1FBQ3BELElBQUksUUFBUSxHQUFHLElBQUkseUNBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0MsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNoQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyQyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxxQ0FBcUMsRUFBRTtRQUN4QyxJQUFJLFFBQVEsR0FBRyxJQUFJLHlDQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdDLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzVCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9CLElBQUksV0FBVyxHQUFHLHlDQUFrQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwRCxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ25DLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3hDLENBQUMsQ0FBQyxDQUFDO0FBRUwsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdFxuICogaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZVxuICogTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXJcbiAqIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IHtFbmRTZXNzaW9uUmVzcG9uc2V9IGZyb20gJy4vZW5kX3Nlc3Npb25fcmVzcG9uc2UnO1xuXG5kZXNjcmliZSgnRW5kU2Vzc2lvbiBSZXNwb25zZSBUZXN0cycsICgpID0+IHtcblxuICBjb25zdCBzdGF0ZSA9ICdzdGF0ZSc7XG5cbiAgaXQoJ0NvbnN0cnVjdGluZyBhbiBFbmRTZXNzaW9uIFJlc3BvbnNlIHNob3VsZCB3b3JrJywgKCkgPT4ge1xuICAgIGxldCByZXNwb25zZSA9IG5ldyBFbmRTZXNzaW9uUmVzcG9uc2Uoc3RhdGUpO1xuICAgIGV4cGVjdChyZXNwb25zZSkubm90LnRvQmVOdWxsKCk7XG4gICAgZXhwZWN0KHJlc3BvbnNlLnN0YXRlKS50b0JlKHN0YXRlKTtcbiAgfSk7XG5cbiAgaXQoJ3RvSnNvbigpIGFuZCBmcm9tSnNvbigpIHNob3VsZCB3b3JrJywgKCkgPT4ge1xuICAgIGxldCByZXNwb25zZSA9IG5ldyBFbmRTZXNzaW9uUmVzcG9uc2Uoc3RhdGUpO1xuICAgIGxldCBqc29uID0gcmVzcG9uc2UudG9Kc29uKCk7XG4gICAgZXhwZWN0KGpzb24pLm5vdC50b0JlTnVsbCgpO1xuICAgIGV4cGVjdChqc29uLnN0YXRlKS50b0JlKHN0YXRlKTtcbiAgICBsZXQgbmV3UmVzcG9uc2UgPSBFbmRTZXNzaW9uUmVzcG9uc2UuZnJvbUpzb24oanNvbik7XG4gICAgZXhwZWN0KG5ld1Jlc3BvbnNlKS5ub3QudG9CZU51bGwoKTtcbiAgICBleHBlY3QobmV3UmVzcG9uc2Uuc3RhdGUpLnRvQmUoc3RhdGUpO1xuICB9KTtcblxufSk7XG4iXX0=