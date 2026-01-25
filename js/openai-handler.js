// OpenAI State Object (v4.0 Cognitive Engine)
const DEFAULT_API_KEY = "sk-svcacct-_Lddj0Wf43yPG_nuuDcIzfuAMVzKv6FCiht-7uNSMOdPEeK-bPHT3BlbkFJJP71jNvXFejZJM8CyVCCHQ3blnoXN5WVt-4uYN1cTfycDOn8QKgA";
const openaiHandler = {
    apiKey: localStorage.getItem('openai_api_key') || DEFAULT_API_KEY,
    model: localStorage.getItem('openai_model') || "gpt-4o-mini",
    history: [], // Persistent context for this session
    usage: {
        totalRequests: parseInt(localStorage.getItem('openai_usage_count') || '0'),
        lastResponseTime: 0
    },

    async handlePrompt(userInput) {
        if (!userInput) return { text: "No input provided." };
        if (!this.apiKey) return { text: "API Key not configured in Settings." };

        const startTime = Date.now();
        const personality = window.chatManager?.personality || 'professional';

        try {
            const tools = getOpenAIToolsDefinition();

            // Build Contextual Messages
            const messages = [
                { role: "system", content: this.getSystemPrompt(personality) },
                ...this.history.slice(-10), // Keep last 10 turns for context
                { role: "user", content: userInput }
            ];

            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    model: this.model,
                    messages: messages,
                    tools: tools,
                    tool_choice: "auto",
                    temperature: personality === 'creative' ? 0.9 : 0.5
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage = errorData.error?.message || 'API request failed';

                // Specific handling for quota errors
                if (errorData.error?.code === 'insufficient_quota') {
                    throw new Error('You exceeded your current quota. Please check your OpenAI plan and billing details, or update the API key in Settings.');
                }

                throw new Error(errorMessage);
            }

            const data = await response.json();
            const message = data.choices[0].message;

            // Track Usage
            this.usage.totalRequests++;
            this.usage.lastResponseTime = Date.now() - startTime;
            localStorage.setItem('openai_usage_count', this.usage.totalRequests);

            let result = {
                text: message.content || "",
                functionCall: null
            };

            // Handle tool calls
            if (message.tool_calls) {
                const toolCall = message.tool_calls[0];
                const functionName = toolCall.function.name;

                result.functionCall = {
                    name: functionName,
                    args: JSON.parse(toolCall.function.arguments)
                };

                // Execute the function
                if (typeof executeFunction === 'function') {
                    executeFunction(functionName);
                }

                if (!result.text) {
                    result.text = `System: Initiating ${functionName.replace(/_/g, ' ')} sequence.`;
                }
            }

            // Update local context history
            this.history.push({ role: "user", content: userInput });
            this.history.push({ role: "assistant", content: result.text });

            return result;

        } catch (error) {
            console.error('OpenAI Error:', error);
            return { text: `AI Error: ${error.message}` };
        }
    },

    getSystemPrompt(persona) {
        const loc = window.appState?.context?.location || {};
        const weather = loc.weather || {};
        const base = `You are VIP AI Assistant v5.1.0 (Contextual Symphony), a premium mobile control companion. 
Current Time: ${new Date().toLocaleString()}.
User Location: ${loc.city || 'Unknown Sector'} (${loc.lat?.toFixed(2) || '--'}, ${loc.lon?.toFixed(2) || '--'}).
Current Weather: ${document.getElementById('wTemp')?.textContent || '--'}, ${document.getElementById('wDesc')?.textContent || 'Checking...'}.
You have access to device hardware, analytics, and 75+ automated functions. Always favor calling functions for user requests when possible. Be autonomous and proactive.`;

        const personas = {
            professional: `${base} Be efficient, helpful, and technically accurate.`,
            concise: `${base} Keep responses extremely brief. Acknowledge commands directly.`,
            creative: `${base} Use an imaginative, futuristic tone. Describe actions with flair.`
        };

        return personas[persona] || personas.professional;
    },

    setModel(modelId) {
        this.model = modelId;
        localStorage.setItem('openai_model', modelId);
        showToast('Model Updated', `Switched to ${modelId}`, 'success');
    },

    clearHistory() {
        this.history = [];
        showToast('Context Cleared', 'Conversation memory reset', 'info');
    }
};

// Legacy support for voice assistant (initially in voice-access.js usage)
async function processWithOpenAI(userInput) {
    showToast('AI Assistant', 'Thinking...', 'info');
    const result = await openaiHandler.handlePrompt(userInput);

    if (result.text) {
        if (typeof speak === 'function') speak(result.text);
        showToast('AI Assistant', result.text, result.functionCall ? 'success' : 'info');
    }
}

// Convert our internal function structure to OpenAI tools format
function getOpenAIToolsDefinition() {
    if (typeof getFunctionCategories !== 'function') return [];

    const categories = getFunctionCategories();
    const tools = [];

    for (const category of categories) {
        for (const func of category.functions) {
            tools.push({
                type: "function",
                function: {
                    name: func.id,
                    description: func.description,
                    parameters: {
                        type: "object",
                        properties: {
                            query: {
                                type: "string",
                                description: "Optional detail for the action"
                            }
                        },
                        required: []
                    }
                }
            });
        }
    }
    return tools;
}

window.openaiHandler = openaiHandler;
