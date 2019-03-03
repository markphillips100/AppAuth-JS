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

import {StringMap} from '../types';
import {UserInfoRequest} from './user_info_request';

describe('User Info Request tests', () => {
  const tokenType = 'token_type';
  const accessToken = 'access_token';
  const extras: StringMap = {'key': 'value'};

  let request: UserInfoRequest =
      new UserInfoRequest({token_type: tokenType, access_token: accessToken, extras: extras});

  it('Basic Token Request Tests', () => {
    expect(request).not.toBeNull();
    expect(request.tokenType).toBe(tokenType);
    expect(request.accessToken).toBe(accessToken);
    expect(request.extras).toBeTruthy();
    expect(request.extras!['key']).toBe('value');
    expect(request.extras).toEqual(extras);
  });

  it('To Json() and from Json() should work', () => {
    let json = JSON.parse(JSON.stringify(request.toJson()));
    expect(json).not.toBeNull();
    let newRequest = new UserInfoRequest(json);
    expect(newRequest).not.toBeNull();
    expect(newRequest.tokenType).toBe(tokenType);
    expect(newRequest.accessToken).toBe(accessToken);
    expect(newRequest.extras).toBeTruthy();
    expect(newRequest.extras!['key']).toBe('value');
    expect(newRequest.extras).toEqual(extras);
  });
});