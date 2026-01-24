<<<<<<< HEAD
/**
 * OpenAI Integration Handler
 * Processes natural language commands using OpenAI's API
 */

const OPENAI_API_KEY = localStorage.getItem('openai_api_key') || "";

// Process user input using OpenAI
async function processWithOpenAI(userInput) {
    if (!userInput) return;

    showToast('AI Assistant', 'Thinking...', 'info');

    try {
        // Prepare the tools/functions definition for OpenAI
        const tools = getOpenAIToolsDefinition();

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini", // Efficient model for this task
                messages: [
                    {
                        role: "system",
                        content: `You are an intelligent assistant for a mobile control app. 
                        Your job is to understand user commands and either execute the appropriate function or provide a helpful response.
                        If the user wants to perform an action available in your tools, CALL THAT FUNCTION.
                        If the user just wants to chat, reply conversationally.
                        Always be concise and helpful.`
                    },
                    {
                        role: "user",
                        content: userInput
                    }
                ],
                tools: tools,
                tool_choice: "auto"
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || 'API request failed');
        }

        const data = await response.json();
        const message = data.choices[0].message;

        // Handle tool calls
        if (message.tool_calls) {
            for (const toolCall of message.tool_calls) {
                const functionName = toolCall.function.name;
                const args = JSON.parse(toolCall.function.arguments);

                // Execute the function
                // The functionName from OpenAI will match our IDs or be close
                // We map 'function_id' directly

                console.log(`OpenAI requested function: ${functionName}`, args);

                showToast('AI Assistant', `Executing: ${functionName.replace(/_/g, ' ')}`, 'success');

                // Call the existing executeFunction from functions.js
                // We don't really need the arguments for the simulated functions, but we can pass them if we update executeFunction
                executeFunction(functionName);

                // Optional: We could feed the result back to OpenAI, but for now we just execute
                speak(`Executing ${functionName.replace(/_/g, ' ')}`);
            }
        } else {
            // Handle regular response
            const content = message.content;
            if (content) {
                console.log('OpenAI response:', content);
                showToast('AI Assistant', 'Message received', 'info');
                // You might want to show this in a modal or speak it
                speak(content);

                // If there's a modal or UI to show chat, we'd update it here
                // For now, let's just log and toast
            }
        }

    } catch (error) {
        console.error('OpenAI Error:', error);
        showToast('AI Error', 'Failed to process command', 'error');
        speak("I'm sorry, I couldn't process that request.");
    }
}

// Convert our internal function structure to OpenAI tools format
function getOpenAIToolsDefinition() {
    const categories = getFunctionCategories();
    const tools = [];

    // We can't list ALL 65+ functions as individual tools potentially due to token limits or complexity,
    // but GPT-4o-mini should handle it. Let's try to map the most important ones or all.
    // For now, let's map all of them.

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
                            // detailed parameters could be added here if we had them
                            // for now we'll just allow empty args or generic query
                            query: {
                                type: "string",
                                description: "Optional detail or query for the action"
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
=======
/**
 * OpenAI Integration Handler
 * Processes natural language commands using OpenAI's API
 */

const OPENAI_API_KEY = localStorage.getItem('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') || "";

// Process user input using OpenAI
async function processWithOpenAI(userInput) {
    if (!userInput) return;

    showToast('AI Assistant', 'Thinking...', 'info');

    try {
        // Prepare the tools/functions definition for OpenAI
        const tools = getOpenAIToolsDefinition();

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini", // Efficient model for this task
                messages: [
                    {
                        role: "system",
                        content: `You are an intelligent assistant for a mobile control app. 
                        Your job is to understand user commands and either execute the appropriate function or provide a helpful response.
                        If the user wants to perform an action available in your tools, CALL THAT FUNCTION.
                        If the user just wants to chat, reply conversationally.
                        Always be concise and helpful.`
                    },
                    {
                        role: "user",
                        content: userInput
                    }
                ],
                tools: tools,
                tool_choice: "auto"
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || 'API request failed');
        }

        const data = await response.json();
        const message = data.choices[0].message;

        // Handle tool calls
        if (message.tool_calls) {
            for (const toolCall of message.tool_calls) {
                const functionName = toolCall.function.name;
                const args = JSON.parse(toolCall.function.arguments);

                // Execute the function
                // The functionName from OpenAI will match our IDs or be close
                // We map 'function_id' directly

                console.log(`OpenAI requested function: ${functionName}`, args);

                showToast('AI Assistant', `Executing: ${functionName.replace(/_/g, ' ')}`, 'success');

                // Call the existing executeFunction from functions.js
                // We don't really need the arguments for the simulated functions, but we can pass them if we update executeFunction
                executeFunction(functionName);

                // Optional: We could feed the result back to OpenAI, but for now we just execute
                speak(`Executing ${functionName.replace(/_/g, ' ')}`);
            }
        } else {
            // Handle regular response
            const content = message.content;
            if (content) {
                console.log('OpenAI response:', content);
                showToast('AI Assistant', 'Message received', 'info');
                // You might want to show this in a modal or speak it
                speak(content);

                // If there's a modal or UI to show chat, we'd update it here
                // For now, let's just log and toast
            }
        }

    } catch (error) {
        console.error('OpenAI Error:', error);
        showToast('AI Error', 'Failed to process command', 'error');
        speak("I'm sorry, I couldn't process that request.");
    }
}

// Convert our internal function structure to OpenAI tools format
function getOpenAIToolsDefinition() {
    const categories = getFunctionCategories();
    const tools = [];

    // We can't list ALL 65+ functions as individual tools potentially due to token limits or complexity,
    // but GPT-4o-mini should handle it. Let's try to map the most important ones or all.
    // For now, let's map all of them.

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
                            // detailed parameters could be added here if we had them
                            // for now we'll just allow empty args or generic query
                            query: {
                                type: "string",
                                description: "Optional detail or query for the action"
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

>>>>>>> aaf95f08b85548227262ee8797ec4f9d10497be1
