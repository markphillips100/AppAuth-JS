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

/**
 * Represents the UserInfoResponse as a JSON Object.
 */
export interface UserInfoResponseJson { sub: string; }

/**
 * Represents the possible error codes from the user info endpoint.
 * For more information look at:
 * http://openid.net/specs/openid-connect-core-1_0.html#UserInfo
 */
export type UserInfoErrorType = 'invalid_token';

/**
 * Represents the UserInfoError as a JSON Object.
 */
export interface UserInfoErrorJson {
  error: UserInfoErrorType;
  error_description?: string;
  error_uri?: string;
}

/**
 * Represents the UserInfo Error type.
 * For more information look at:
 * http://openid.net/specs/openid-connect-core-1_0.html#UserInfo
 */
export class UserInfoError {
  constructor(
      public readonly error: UserInfoErrorType,
      public readonly errorDescription?: string,
      public readonly errorUri?: string) {}

  toJson(): UserInfoErrorJson {
    return {
      error: this.error, error_description: this.errorDescription, error_uri: this.errorUri
    }
  }

  static fromJson(input: UserInfoErrorJson) {
    return new UserInfoError(input.error, input.error_description, input.error_uri);
  }
}
