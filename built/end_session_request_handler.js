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
var logger_1 = require("./logger");
/**
 * EndSession Service notifier.
 * This manages the communication of the EndSessionResponse to the 3p client.
 */
var EndSessionNotifier = /** @class */ (function () {
    function EndSessionNotifier() {
        this.listener = null;
    }
    EndSessionNotifier.prototype.setEndSessionListener = function (listener) {
        this.listener = listener;
    };
    /**
     * The endsession complete callback.
     */
    EndSessionNotifier.prototype.onEndSessionComplete = function (request, response, error) {
        if (this.listener) {
            // complete endsession request
            this.listener(request, response, error);
        }
    };
    return EndSessionNotifier;
}());
exports.EndSessionNotifier = EndSessionNotifier;
// TODO(rahulrav@): add more built in parameters.
/* built in parameters. */
exports.ENDSESSION_BUILT_IN_PARAMETERS = ['id_token_hint', 'post_logout_redirect_uri', 'state'];
/**
 * Defines the interface which is capable of handling an endsession request
 * using various methods (iframe / popup / different process etc.).
 */
var EndSessionRequestHandler = /** @class */ (function () {
    function EndSessionRequestHandler(utils, crypto) {
        this.utils = utils;
        this.crypto = crypto;
        // notifier send the response back to the client.
        this.notifier = null;
    }
    /**
     * A utility method to be able to build the endsession request URL.
     */
    EndSessionRequestHandler.prototype.buildRequestUrl = function (configuration, request) {
        // build the query string
        // coerce to any type for convenience
        var requestMap = {
            'id_token_hint': request.idTokenHint,
            'post_logout_redirect_uri': request.postLogoutRedirectUri,
            'state': request.state
        };
        // copy over extras
        if (request.extras) {
            for (var extra in request.extras) {
                if (request.extras.hasOwnProperty(extra)) {
                    // check before inserting to requestMap
                    if (exports.ENDSESSION_BUILT_IN_PARAMETERS.indexOf(extra) < 0) {
                        requestMap[extra] = request.extras[extra];
                    }
                }
            }
        }
        var query = this.utils.stringify(requestMap);
        var baseUrl = configuration.endSessionEndpoint; // TBD - should throw if no url is available at OP
        var url = baseUrl + "?" + query;
        return url;
    };
    /**
     * Completes the endsession request if necessary & when possible.
     */
    EndSessionRequestHandler.prototype.completeEndSessionRequestIfPossible = function () {
        var _this = this;
        // call complete endsession if possible to see there might
        // be a response that needs to be delivered.
        logger_1.log("Checking to see if there is an endsession response to be delivered.");
        if (!this.notifier) {
            logger_1.log("Notifier is not present on EndSessionRequest handler.\n          No delivery of result will be possible");
        }
        return this.completeEndSessionRequest().then(function (result) {
            if (!result) {
                logger_1.log("No result is available yet.");
            }
            if (result && _this.notifier) {
                _this.notifier.onEndSessionComplete(result.request, result.response, result.error);
            }
        });
    };
    /**
     * Sets the default EndSession Service notifier.
     */
    EndSessionRequestHandler.prototype.setEndSessionNotifier = function (notifier) {
        this.notifier = notifier;
        return this;
    };
    ;
    return EndSessionRequestHandler;
}());
exports.EndSessionRequestHandler = EndSessionRequestHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5kX3Nlc3Npb25fcmVxdWVzdF9oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2VuZF9zZXNzaW9uX3JlcXVlc3RfaGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7OztHQVlHOztBQU1ILG1DQUE2QjtBQXFCN0I7OztHQUdHO0FBQ0g7SUFBQTtRQUNVLGFBQVEsR0FBNEIsSUFBSSxDQUFDO0lBa0JuRCxDQUFDO0lBaEJDLGtEQUFxQixHQUFyQixVQUFzQixRQUE0QjtRQUNoRCxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUMzQixDQUFDO0lBRUQ7O09BRUc7SUFDSCxpREFBb0IsR0FBcEIsVUFDSSxPQUEwQixFQUMxQixRQUFpQyxFQUNqQyxLQUEyQjtRQUM3QixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsOEJBQThCO1lBQzlCLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUN6QztJQUNILENBQUM7SUFDSCx5QkFBQztBQUFELENBQUMsQUFuQkQsSUFtQkM7QUFuQlksZ0RBQWtCO0FBcUIvQixpREFBaUQ7QUFDakQsMEJBQTBCO0FBQ2IsUUFBQSw4QkFBOEIsR0FDdkMsQ0FBQyxlQUFlLEVBQUUsMEJBQTBCLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFFM0Q7OztHQUdHO0FBQ0g7SUFDRSxrQ0FBbUIsS0FBdUIsRUFBWSxNQUFjO1FBQWpELFVBQUssR0FBTCxLQUFLLENBQWtCO1FBQVksV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUVwRSxpREFBaUQ7UUFDdkMsYUFBUSxHQUE0QixJQUFJLENBQUM7SUFIb0IsQ0FBQztJQUt4RTs7T0FFRztJQUNPLGtEQUFlLEdBQXpCLFVBQ0ksYUFBZ0QsRUFDaEQsT0FBMEI7UUFDNUIseUJBQXlCO1FBQ3pCLHFDQUFxQztRQUNyQyxJQUFJLFVBQVUsR0FBYztZQUMxQixlQUFlLEVBQUUsT0FBTyxDQUFDLFdBQVc7WUFDcEMsMEJBQTBCLEVBQUUsT0FBTyxDQUFDLHFCQUFxQjtZQUN6RCxPQUFPLEVBQUUsT0FBTyxDQUFDLEtBQUs7U0FDdkIsQ0FBQztRQUVGLG1CQUFtQjtRQUNuQixJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUU7WUFDbEIsS0FBSyxJQUFJLEtBQUssSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFO2dCQUNoQyxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUN4Qyx1Q0FBdUM7b0JBQ3ZDLElBQUksc0NBQThCLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTt3QkFDckQsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7cUJBQzNDO2lCQUNGO2FBQ0Y7U0FDRjtRQUVELElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzdDLElBQUksT0FBTyxHQUNQLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFFLGtEQUFrRDtRQUN6RixJQUFJLEdBQUcsR0FBTSxPQUFPLFNBQUksS0FBTyxDQUFDO1FBQ2hDLE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUVEOztPQUVHO0lBQ0gsc0VBQW1DLEdBQW5DO1FBQUEsaUJBZ0JDO1FBZkMsMERBQTBEO1FBQzFELDRDQUE0QztRQUM1QyxZQUFHLENBQUMscUVBQXFFLENBQUMsQ0FBQztRQUMzRSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNsQixZQUFHLENBQUMseUdBQ3VDLENBQUMsQ0FBQTtTQUM3QztRQUNELE9BQU8sSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUEsTUFBTTtZQUNqRCxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNYLFlBQUcsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO2FBQ3BDO1lBQ0QsSUFBSSxNQUFNLElBQUksS0FBSSxDQUFDLFFBQVEsRUFBRTtnQkFDM0IsS0FBSSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ25GO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSCx3REFBcUIsR0FBckIsVUFBc0IsUUFBNEI7UUFDaEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBQUEsQ0FBQztJQWVKLCtCQUFDO0FBQUQsQ0FBQyxBQWpGRCxJQWlGQztBQWpGcUIsNERBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHRcbiAqIGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGVcbiAqIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyXG4gKiBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB7QXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9ufSBmcm9tICcuL2F1dGhvcml6YXRpb25fc2VydmljZV9jb25maWd1cmF0aW9uJztcbmltcG9ydCB7Q3J5cHRvfSBmcm9tICcuL2NyeXB0b191dGlscyc7XG5pbXBvcnQge0VuZFNlc3Npb25SZXF1ZXN0fSBmcm9tICcuL2VuZF9zZXNzaW9uX3JlcXVlc3QnO1xuaW1wb3J0IHtFbmRTZXNzaW9uRXJyb3IsIEVuZFNlc3Npb25SZXNwb25zZX0gZnJvbSAnLi9lbmRfc2Vzc2lvbl9yZXNwb25zZSc7XG5pbXBvcnQge2xvZ30gZnJvbSAnLi9sb2dnZXInO1xuaW1wb3J0IHtRdWVyeVN0cmluZ1V0aWxzfSBmcm9tICcuL3F1ZXJ5X3N0cmluZ191dGlscyc7XG5pbXBvcnQge1N0cmluZ01hcH0gZnJvbSAnLi90eXBlcyc7XG5cbi8qKlxuICogVGhpcyB0eXBlIHJlcHJlc2VudHMgYSBsYW1iZGEgdGhhdCBjYW4gdGFrZSBhbiBFbmRTZXNzaW9uUmVxdWVzdCxcbiAqIGFuZCBhbiBFbmRTZXNzaW9uUmVzcG9uc2UgYXMgYXJndW1lbnRzLlxuICovXG5leHBvcnQgdHlwZSBFbmRTZXNzaW9uTGlzdGVuZXIgPVxuICAgIChyZXF1ZXN0OiBFbmRTZXNzaW9uUmVxdWVzdCwgcmVzcG9uc2U6IEVuZFNlc3Npb25SZXNwb25zZXxudWxsLCBlcnJvcjogRW5kU2Vzc2lvbkVycm9yfG51bGwpID0+XG4gICAgICAgIHZvaWQ7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHN0cnVjdHVyYWwgdHlwZSBob2xkaW5nIGJvdGggZW5kIHNlc3Npb24gcmVxdWVzdCBhbmQgcmVzcG9uc2UuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRW5kU2Vzc2lvblJlcXVlc3RSZXNwb25zZSB7XG4gIHJlcXVlc3Q6IEVuZFNlc3Npb25SZXF1ZXN0O1xuICByZXNwb25zZTogRW5kU2Vzc2lvblJlc3BvbnNlfG51bGw7XG4gIGVycm9yOiBFbmRTZXNzaW9uRXJyb3J8bnVsbDtcbn1cblxuLyoqXG4gKiBFbmRTZXNzaW9uIFNlcnZpY2Ugbm90aWZpZXIuXG4gKiBUaGlzIG1hbmFnZXMgdGhlIGNvbW11bmljYXRpb24gb2YgdGhlIEVuZFNlc3Npb25SZXNwb25zZSB0byB0aGUgM3AgY2xpZW50LlxuICovXG5leHBvcnQgY2xhc3MgRW5kU2Vzc2lvbk5vdGlmaWVyIHtcbiAgcHJpdmF0ZSBsaXN0ZW5lcjogRW5kU2Vzc2lvbkxpc3RlbmVyfG51bGwgPSBudWxsO1xuXG4gIHNldEVuZFNlc3Npb25MaXN0ZW5lcihsaXN0ZW5lcjogRW5kU2Vzc2lvbkxpc3RlbmVyKSB7XG4gICAgdGhpcy5saXN0ZW5lciA9IGxpc3RlbmVyO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBlbmRzZXNzaW9uIGNvbXBsZXRlIGNhbGxiYWNrLlxuICAgKi9cbiAgb25FbmRTZXNzaW9uQ29tcGxldGUoXG4gICAgICByZXF1ZXN0OiBFbmRTZXNzaW9uUmVxdWVzdCxcbiAgICAgIHJlc3BvbnNlOiBFbmRTZXNzaW9uUmVzcG9uc2V8bnVsbCxcbiAgICAgIGVycm9yOiBFbmRTZXNzaW9uRXJyb3J8bnVsbCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmxpc3RlbmVyKSB7XG4gICAgICAvLyBjb21wbGV0ZSBlbmRzZXNzaW9uIHJlcXVlc3RcbiAgICAgIHRoaXMubGlzdGVuZXIocmVxdWVzdCwgcmVzcG9uc2UsIGVycm9yKTtcbiAgICB9XG4gIH1cbn1cblxuLy8gVE9ETyhyYWh1bHJhdkApOiBhZGQgbW9yZSBidWlsdCBpbiBwYXJhbWV0ZXJzLlxuLyogYnVpbHQgaW4gcGFyYW1ldGVycy4gKi9cbmV4cG9ydCBjb25zdCBFTkRTRVNTSU9OX0JVSUxUX0lOX1BBUkFNRVRFUlMgPVxuICAgIFsnaWRfdG9rZW5faGludCcsICdwb3N0X2xvZ291dF9yZWRpcmVjdF91cmknLCAnc3RhdGUnXTtcblxuLyoqXG4gKiBEZWZpbmVzIHRoZSBpbnRlcmZhY2Ugd2hpY2ggaXMgY2FwYWJsZSBvZiBoYW5kbGluZyBhbiBlbmRzZXNzaW9uIHJlcXVlc3RcbiAqIHVzaW5nIHZhcmlvdXMgbWV0aG9kcyAoaWZyYW1lIC8gcG9wdXAgLyBkaWZmZXJlbnQgcHJvY2VzcyBldGMuKS5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEVuZFNlc3Npb25SZXF1ZXN0SGFuZGxlciB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB1dGlsczogUXVlcnlTdHJpbmdVdGlscywgcHJvdGVjdGVkIGNyeXB0bzogQ3J5cHRvKSB7fVxuXG4gIC8vIG5vdGlmaWVyIHNlbmQgdGhlIHJlc3BvbnNlIGJhY2sgdG8gdGhlIGNsaWVudC5cbiAgcHJvdGVjdGVkIG5vdGlmaWVyOiBFbmRTZXNzaW9uTm90aWZpZXJ8bnVsbCA9IG51bGw7XG5cbiAgLyoqXG4gICAqIEEgdXRpbGl0eSBtZXRob2QgdG8gYmUgYWJsZSB0byBidWlsZCB0aGUgZW5kc2Vzc2lvbiByZXF1ZXN0IFVSTC5cbiAgICovXG4gIHByb3RlY3RlZCBidWlsZFJlcXVlc3RVcmwoXG4gICAgICBjb25maWd1cmF0aW9uOiBBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb24sXG4gICAgICByZXF1ZXN0OiBFbmRTZXNzaW9uUmVxdWVzdCkge1xuICAgIC8vIGJ1aWxkIHRoZSBxdWVyeSBzdHJpbmdcbiAgICAvLyBjb2VyY2UgdG8gYW55IHR5cGUgZm9yIGNvbnZlbmllbmNlXG4gICAgbGV0IHJlcXVlc3RNYXA6IFN0cmluZ01hcCA9IHtcbiAgICAgICdpZF90b2tlbl9oaW50JzogcmVxdWVzdC5pZFRva2VuSGludCxcbiAgICAgICdwb3N0X2xvZ291dF9yZWRpcmVjdF91cmknOiByZXF1ZXN0LnBvc3RMb2dvdXRSZWRpcmVjdFVyaSxcbiAgICAgICdzdGF0ZSc6IHJlcXVlc3Quc3RhdGVcbiAgICB9O1xuXG4gICAgLy8gY29weSBvdmVyIGV4dHJhc1xuICAgIGlmIChyZXF1ZXN0LmV4dHJhcykge1xuICAgICAgZm9yIChsZXQgZXh0cmEgaW4gcmVxdWVzdC5leHRyYXMpIHtcbiAgICAgICAgaWYgKHJlcXVlc3QuZXh0cmFzLmhhc093blByb3BlcnR5KGV4dHJhKSkge1xuICAgICAgICAgIC8vIGNoZWNrIGJlZm9yZSBpbnNlcnRpbmcgdG8gcmVxdWVzdE1hcFxuICAgICAgICAgIGlmIChFTkRTRVNTSU9OX0JVSUxUX0lOX1BBUkFNRVRFUlMuaW5kZXhPZihleHRyYSkgPCAwKSB7XG4gICAgICAgICAgICByZXF1ZXN0TWFwW2V4dHJhXSA9IHJlcXVlc3QuZXh0cmFzW2V4dHJhXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgcXVlcnkgPSB0aGlzLnV0aWxzLnN0cmluZ2lmeShyZXF1ZXN0TWFwKTtcbiAgICBsZXQgYmFzZVVybCA9XG4gICAgICAgIGNvbmZpZ3VyYXRpb24uZW5kU2Vzc2lvbkVuZHBvaW50OyAgLy8gVEJEIC0gc2hvdWxkIHRocm93IGlmIG5vIHVybCBpcyBhdmFpbGFibGUgYXQgT1BcbiAgICBsZXQgdXJsID0gYCR7YmFzZVVybH0/JHtxdWVyeX1gO1xuICAgIHJldHVybiB1cmw7XG4gIH1cblxuICAvKipcbiAgICogQ29tcGxldGVzIHRoZSBlbmRzZXNzaW9uIHJlcXVlc3QgaWYgbmVjZXNzYXJ5ICYgd2hlbiBwb3NzaWJsZS5cbiAgICovXG4gIGNvbXBsZXRlRW5kU2Vzc2lvblJlcXVlc3RJZlBvc3NpYmxlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIC8vIGNhbGwgY29tcGxldGUgZW5kc2Vzc2lvbiBpZiBwb3NzaWJsZSB0byBzZWUgdGhlcmUgbWlnaHRcbiAgICAvLyBiZSBhIHJlc3BvbnNlIHRoYXQgbmVlZHMgdG8gYmUgZGVsaXZlcmVkLlxuICAgIGxvZyhgQ2hlY2tpbmcgdG8gc2VlIGlmIHRoZXJlIGlzIGFuIGVuZHNlc3Npb24gcmVzcG9uc2UgdG8gYmUgZGVsaXZlcmVkLmApO1xuICAgIGlmICghdGhpcy5ub3RpZmllcikge1xuICAgICAgbG9nKGBOb3RpZmllciBpcyBub3QgcHJlc2VudCBvbiBFbmRTZXNzaW9uUmVxdWVzdCBoYW5kbGVyLlxuICAgICAgICAgIE5vIGRlbGl2ZXJ5IG9mIHJlc3VsdCB3aWxsIGJlIHBvc3NpYmxlYClcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuY29tcGxldGVFbmRTZXNzaW9uUmVxdWVzdCgpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgIGlmICghcmVzdWx0KSB7XG4gICAgICAgIGxvZyhgTm8gcmVzdWx0IGlzIGF2YWlsYWJsZSB5ZXQuYCk7XG4gICAgICB9XG4gICAgICBpZiAocmVzdWx0ICYmIHRoaXMubm90aWZpZXIpIHtcbiAgICAgICAgdGhpcy5ub3RpZmllci5vbkVuZFNlc3Npb25Db21wbGV0ZShyZXN1bHQucmVxdWVzdCwgcmVzdWx0LnJlc3BvbnNlLCByZXN1bHQuZXJyb3IpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGRlZmF1bHQgRW5kU2Vzc2lvbiBTZXJ2aWNlIG5vdGlmaWVyLlxuICAgKi9cbiAgc2V0RW5kU2Vzc2lvbk5vdGlmaWVyKG5vdGlmaWVyOiBFbmRTZXNzaW9uTm90aWZpZXIpOiBFbmRTZXNzaW9uUmVxdWVzdEhhbmRsZXIge1xuICAgIHRoaXMubm90aWZpZXIgPSBub3RpZmllcjtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvKipcbiAgICogTWFrZXMgYW4gZW5kc2Vzc2lvbiByZXF1ZXN0LlxuICAgKi9cbiAgYWJzdHJhY3QgcGVyZm9ybUVuZFNlc3Npb25SZXF1ZXN0KFxuICAgICAgY29uZmlndXJhdGlvbjogQXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uLFxuICAgICAgcmVxdWVzdDogRW5kU2Vzc2lvblJlcXVlc3QpOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgYW4gZW5kIHNlc3Npb24gcmVxdWVzdCBjYW4gYmUgY29tcGxldGVkLCBhbmQgY29tcGxldGVzIGl0LlxuICAgKiBUaGUgaGFuZGxlciByZXR1cm5zIGEgYFByb21pc2U8RW5kU2Vzc2lvblJlcXVlc3RSZXNwb25zZT5gIGlmIHJlYWR5LCBvciBhIGBQcm9taXNlPG51bGw+YFxuICAgKiBpZiBub3QgcmVhZHkuXG4gICAqL1xuICBwcm90ZWN0ZWQgYWJzdHJhY3QgY29tcGxldGVFbmRTZXNzaW9uUmVxdWVzdCgpOiBQcm9taXNlPEVuZFNlc3Npb25SZXF1ZXN0UmVzcG9uc2V8bnVsbD47XG59XG4iXX0=