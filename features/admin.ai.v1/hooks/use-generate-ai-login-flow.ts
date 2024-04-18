/**
 * Copyright (c) 2024, WSO2 LLC. (https://www.wso2.com).
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

import { IdentityAppsApiException } from "@wso2is/core/exceptions";
import { AlertLevels } from "@wso2is/core/models";
import { addAlert } from "@wso2is/core/store";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import useAILoginFlowContext from "./use-ai-login-flow-context";
import useAuthenticationFlow from "../../admin.authentication-flow-builder.v1/hooks/use-authentication-flow";
import { ResourceEndpointsContextInterface } from "../../admin.core.v1/context/resource-endpoints-context";
import useResourceEndpoints  from "../../admin.core.v1/hooks/use-resource-endpoints";
import fetchUserClaims from "../api/fetch-user-claims";
import generateAILoginFlow from "../api/generate-ai-login-flow";
import useGetAvailableAuthenticators from "../api/use-get-available-authenticators";
import AutheticatorsRecord from "../models/authenticators-record";
import { ClaimURIs } from "../models/claim-uris";

export type GenerateAILoginFlowFunc = (userInput: string) => Promise<void>;

const useGenerateAILoginFlow = (): GenerateAILoginFlowFunc => {

    const { t } = useTranslation();
    /**
     * Dispatch to add an alert.
      */
    const dispatch: Dispatch = useDispatch();
    /**
     * State to hold the resource endpoints.
     */
    const resourceEndpoints: ResourceEndpointsContextInterface = useResourceEndpoints();


    /**
    * Hook to fetch the recent application status.
    */
    const { refetchApplication } = useAuthenticationFlow();

    /**
     * Get the context.
     */
    const {
        setOperationId,
        setIsGeneratingLoginFlow
    } = useAILoginFlowContext();

    /**
     * Hook to get the available authenitcators
     */
    const availableAuthenticators: AutheticatorsRecord[] = useGetAvailableAuthenticators();

    /**
     *
     * @param userInput- User input
     * @returns
     */


    const generateLoginFlow = async (userInput: string): Promise<void> => {

        /**
         * Fetch user claims.
         */
        return fetchUserClaims()
            .then ((response: { claimURIs: ClaimURIs[]; error: IdentityAppsApiException; }) => {
                if (response.error){
                    dispatch(addAlert(
                        {
                            description: response.error?.response?.data?.description ||
                        t("console:manage.features.claims.local.notifications.getClaims.genericError.description"),
                            level: AlertLevels.ERROR,
                            message: response.error?.response?.data?.message ||
                        t("console:manage.features.claims.local.notifications.getClaims.genericError.message")
                        }
                    ));

                    // errror handling
                }else{
                    /**
                     * Calling generate endpoint.
                     */
                    setIsGeneratingLoginFlow(true);

                    return generateAILoginFlow(
                        userInput,
                        response.claimURIs,
                        availableAuthenticators,
                        resourceEndpoints.resourceEndpoints);
                }
            })
            .then((response: any) => {
                setOperationId(response.operation_id);
            })
            .catch((error:any) => {
                dispatch(
                    addAlert({
                        description: error?.response?.data?.detail,
                        level: AlertLevels.ERROR,
                        message: "Error"
                    })
                );
                () => refetchApplication();
            });
    };

    return generateLoginFlow;

};

export default useGenerateAILoginFlow;
