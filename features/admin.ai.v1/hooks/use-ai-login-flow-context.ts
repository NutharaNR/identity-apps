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

import { useContext } from "react";
import AILoginFlowContext, { AILoginFlowContextProps } from "../context/ai-login-flow-feature-context";

/**
 * Interface for the return type of the `useAILoginFlowContext` hook
 */
export type UseAILoginFlowContextInterface = AILoginFlowContextProps;

/**
 * Hook to get the AI login flow context.
 * @returns an object of type `UseAILoginFlowContextInterface` containing the AI login flow context.
 */

const useAILoginFlowContext = () : UseAILoginFlowContextInterface => {
    const context : UseAILoginFlowContextInterface = useContext(AILoginFlowContext);

    if (context === undefined){
        throw new Error("UseAILoginFlowContext must be used within a AILoginFlowProvider");
    }

    return context;
};

export default useAILoginFlowContext;
