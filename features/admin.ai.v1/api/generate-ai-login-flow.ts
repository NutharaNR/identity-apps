/**
 * Copyright (c) 2023, WSO2 LLC. (https://www.wso2.com).
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import axios from "axios";
import { ResourceEndpointsInterface } from "../../admin.core.v1/models/config";
import AutheticatorsRecord  from "../models/authenticators-record";
import { ClaimURIs } from "../models/claim-uris";
/**
 * Hook to trigger the back end for start generating the AI login flow.
 * @param userQuery - The user's input login scenario.
 * @param userClaims - User claims list.
 * @param availableAuthenticators - Available authenticators list.
 * @param traceId - The trace ID.
 * @returns The response from the back end.
*/



const generateAILoginFlow = async(
    userQuery: string,
    userClaims: ClaimURIs[],
    availableAuthenticators: AutheticatorsRecord[],
    resourceEndpoints: ResourceEndpointsInterface
): Promise<void> => {

    //const url: string = resourceEndpoints.applications + "/" + "ai/loginflow/generate";
    const url: string = "http://localhost:3000/loginflow/generate";

    return new Promise((resolve:any, reject:any) => {
        axios.post(
            url,
            {
                available_authenticators: availableAuthenticators,
                user_claims: userClaims,
                user_query: userQuery
            }
        )
            .then((response: any) => {
                resolve(response.data);
            })
            .catch((error: any) => {
                reject(error);
            });
    });
};

export default generateAILoginFlow;