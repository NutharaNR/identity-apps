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

import { Context, createContext } from "react";
import { AuthenticationSequenceInterface } from "../../admin.applications.v1/models/application";
import { ResourceEndpointsInterface }  from "../../admin.core.v1/models/config";
import { BannerState } from "../models/types";

export interface AILoginFlowContextProps{
    // Add required properties here
    /**
     * Banner State of the AI login flow banner component
     */
    bannerState: BannerState;
    /**
     * State to hold the generated login flow.
     */
     aiGeneratedLoginFlow: AuthenticationSequenceInterface;
    /**
     * Callback function to set banner state.
     */
    setBannerState: (state: BannerState) => void;
    /**
     * Application Resource Endpoints.
     */
    resourceEndpoint: ResourceEndpointsInterface;
    /**
     * State to hold if the AI login flow is generating is in progress.
     */
    isGeneratingLoginFlow: boolean;
    /**
     * Callback fucntion to set the login flow generation state.
     */
    setIsGeneratingLoginFlow: (state: boolean) => void;
    /**
     * State to hold the operation id
     */
    operationId: string;
    /**
     * Callback function to set the operation id.
     */
    setOperationId: (id: string) => void;
    /**
     * State to hold the login flow generation complete.
     */
    loginFlowGenerationCompleted: boolean;
    /**
     * Callback function to set the login flow generation complete state.
     */
    setLoginFlowGenerationCompleted: (state: boolean) => void;
}

const AILoginFlowContext: Context<AILoginFlowContextProps> = createContext<AILoginFlowContextProps>({
    aiGeneratedLoginFlow: null,
    bannerState: BannerState.FULL,
    isGeneratingLoginFlow: false,
    loginFlowGenerationCompleted: false,
    operationId: null,
    resourceEndpoint: null,
    setBannerState:null,
    setIsGeneratingLoginFlow: null,
    setLoginFlowGenerationCompleted: null,
    setOperationId: null
});

export default AILoginFlowContext;
