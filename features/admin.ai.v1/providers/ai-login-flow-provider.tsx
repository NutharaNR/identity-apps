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

import React, { useState } from "react";
import { AuthenticationSequenceInterface } from "../../admin.applications.v1/models";
import { ResourceEndpointsContextInterface } from "../../admin.core.v1/context/resource-endpoints-context";
import useResourceEndpoints from "../../admin.core.v1/hooks/use-resource-endpoints";
import LoginFlowAIBanner from "../components/login-flow-ai-banner";
import LoadingScreen from "../components/login-flow-ai-loading-screen";
import AILoginFlowContext  from "../context/ai-login-flow-feature-context";
import { BannerState } from "../models/types";
import getLoginFlow from "../utils/get-formatted-login-flow";

export type AILoginFlowProviderProps = unknown;

/**
 * Provider for the sign on methods context.
 *
 * @param props - Props for the client.
 * @returns Sign On Mehtods provider.
 */
const AILoginFlowProvider =(props: React.PropsWithChildren<AILoginFlowProviderProps>): React.ReactElement=>{
    const { children } = props;

    /**
     * Get the disbles features for application.
     */
    const disabledFeatures: string[] = window["AppUtils"]?.getConfig()?.ui?.features?.applications?.disabledFeatures;

    /**
     * State to hold the resource endpoints.
     */
    const resourceEndpoints: ResourceEndpointsContextInterface = useResourceEndpoints();

    /**
     * State to hold the login flow banner state.
     */
    const [ bannerState, setBannerState ] = useState<BannerState>(BannerState.FULL);
    /**
     * State to hold the generated login flow.
     */
    const [ aiGeneratedLoginFlow, setAiGeneratedLoginFlow ] = useState<AuthenticationSequenceInterface>(undefined);
    /**
     * State to hold whether the AI login flow generation is requested.
     */
    const [ isGeneratingLoginFlow, setIsGeneratingLoginFlow ] = useState<boolean>(false);
    /**
     * State to hold the operation id.
     */
    const [ operationId, setOperationId ] = useState<string>();
    /**
     * State to hold the login flow generation complete.
     */
    const [ loginFlowGenerationCompleted, setLoginFlowGenerationCompleted ] = useState<boolean>(false);

    /**
     * Hook to get the login flow generation result.
     */
    // fetch the login flow generation result using custom hook
    const response:any = null;

    // set the login flow generation complete state
    setLoginFlowGenerationCompleted(false);
    setIsGeneratingLoginFlow(false);
    // set generated login flow after formatting
    setAiGeneratedLoginFlow(getLoginFlow(response?.data));


    return (
        <AILoginFlowContext.Provider
            value={ {
                aiGeneratedLoginFlow,
                bannerState,
                isGeneratingLoginFlow,
                loginFlowGenerationCompleted,
                operationId,
                resourceEndpoint: resourceEndpoints.resourceEndpoints,
                setBannerState,
                setIsGeneratingLoginFlow,
                setLoginFlowGenerationCompleted,
                setOperationId
            } }>
            { !isGeneratingLoginFlow &&
            (<>
                { !disabledFeatures?.includes("loginFlowAI") &&
                    <LoginFlowAIBanner />
                }
                { children }
            </>)

            }
            { isGeneratingLoginFlow &&
            <LoadingScreen /> }
        </AILoginFlowContext.Provider>
    );
};

export default AILoginFlowProvider;
