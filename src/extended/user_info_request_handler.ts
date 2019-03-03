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

import {AuthorizationServiceConfiguration} from '../authorization_service_configuration';
import {AppAuthError} from '../errors';
import {log} from '../logger';
import {BasicQueryStringUtils, QueryStringUtils} from '../query_string_utils';
import {StringMap} from '../types';
import {UserInfoRequest} from './user_info_request';
import {UserInfoError, UserInfoErrorJson, UserInfoResponseJson} from './user_info_response';
import {JQueryRequestor, Requestor} from '../xhr';


/**
 * Represents an interface which can make a user info request.
 */
export interface UserInfoRequestHandler {
  /**
   * Performs the user info request, given the service configuration.
   */
  performUserInfoRequest(
      configuration: AuthorizationServiceConfiguration,
      request: UserInfoRequest): Promise<UserInfoResponseJson>;
}

/**
 * The default user info request handler.
 */
export class BaseUserInfoRequestHandler implements UserInfoRequestHandler {
  constructor(
      public readonly requestor: Requestor = new JQueryRequestor(),
      public readonly utils: QueryStringUtils = new BasicQueryStringUtils()) {}

  private isUserInfoResponse(response: UserInfoResponseJson|
                             UserInfoErrorJson): response is UserInfoResponseJson {
    return (response as UserInfoErrorJson).error === undefined;
  }

  public performUserInfoRequest(
      configuration: AuthorizationServiceConfiguration,
      request: UserInfoRequest): Promise<UserInfoResponseJson> {
    let userInfoResponse = this.requestor.xhr<UserInfoResponseJson|UserInfoErrorJson>({
      url: configuration.userInfoEndpoint,
      method: 'POST',
      //      dataType: 'json',  // adding implicit dataType
      headers: {
        'Authorization': `${request.tokenType} ${request.accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: this.utils.stringify(request.toStringMap())
    });

    return userInfoResponse.then(response => {
      if (this.isUserInfoResponse(response)) {
        return response;
      } else {
        return Promise.reject<UserInfoResponseJson>(
            new AppAuthError(response.error, new UserInfoError(response)));
      }
    });
  }
}
