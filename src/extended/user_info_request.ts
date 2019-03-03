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

/**
 * Represents the user info Request as JSON.
 */
export interface UserInfoRequestJson {
  token_type: string;
  access_token: string;
  extras?: StringMap;
}


/**
 * Represents a UserInfo request.
 * For more information look at:
 * http://openid.net/specs/openid-connect-core-1_0.html#UserInfo
 */
export class UserInfoRequest {
  tokenType: string;
  accessToken: string;
  extras: StringMap|undefined;

  constructor(request: UserInfoRequestJson) {
    this.tokenType = request.token_type;
    this.accessToken = request.access_token;
    this.extras = request.extras;
  }

  /**
   * Serializes a UserInfo to a JavaScript object.
   */
  toJson(): UserInfoRequestJson {
    return {token_type: this.tokenType, access_token: this.accessToken, extras: this.extras};
  }

  toStringMap(): StringMap {
    let map: StringMap = {token_type: this.tokenType, access_token: this.accessToken};

    // copy over extras
    if (this.extras) {
      for (let extra in this.extras) {
        if (this.extras.hasOwnProperty(extra) && !map.hasOwnProperty(extra)) {
          // check before inserting to requestMap
          map[extra] = this.extras[extra];
        }
      }
    }

    return map;
  }
}
