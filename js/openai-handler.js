/**
 * VIP AI SYMPHONY - Cognitive Orchestration v7.0
 * Intelligent AI Request Handling & Global Function Mapping
 * Optimized for platinum-tier response synthesis
 */

const openaiHandler = {
  apiKey: localStorage.getItem('openai_api_key') || '',
  model: localStorage.getItem('openai_model') || 'gpt-4o-mini',
  history: [],
  usage: {
    totalRequests: parseInt(localStorage.getItem('openai_usage_count') || '0'),
    lastTime: 0
  },

  async handlePrompt(userInput) {
    if (!this.apiKey) return { text: 'NEURAL_ERROR: API_KEY_NOT_CONFIGURED. Please navigate to SECURITY_SETTINGS.' };

    const startTime = Date.now();
    const personality = window.chatManager?.personality || 'professional';

    try {
      const tools = this.getToolsDefinition();

      if (window.cognitiveStream) {
        window.cognitiveStream.addLine('> AI_GATEWAY: INITIATING_NEURAL_SYNTHESIS');
      }

      const messages = [
        { role: 'system', content: this.getSystemPrompt(personality) },
        ...this.history.slice(-10),
        { role: 'user', content: userInput }
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
          tool_choice: 'auto',
          temperature: personality === 'creative' ? 0.9 : 0.6
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'API_SIGNAL_INTERRUPT');
      }

      const data = await response.json();
      const message = data.choices[0].message;

      this.usage.totalRequests++;
      localStorage.setItem('openai_usage_count', this.usage.totalRequests);

      const result = { text: message.content || '', functionCall: null };

      if (message.tool_calls) {
        const call = message.tool_calls[0];
        result.functionCall = {
          name: call.function.name,
          args: JSON.parse(call.function.arguments)
        };

        if (window.executeFunction) window.executeFunction(call.function.name);
        if (!result.text) result.text = `System: Executing tactical sequence ${call.function.name.toUpperCase()}.`;
      }

      this.history.push({ role: 'user', content: userInput });
      this.history.push({ role: 'assistant', content: result.text });

      if (window.cognitiveStream) {
        window.cognitiveStream.addLine(`> AI_GATEWAY: SUCCESS [${(Date.now() - startTime)}ms]`);
      }

      return result;
    } catch (e) {
      console.error('AI_CORE_ERROR:', e);
      return { text: `NEURAL_FAULT: ${e.message}` };
    }
  },

  getSystemPrompt(persona) {
    const loc = window.appState?.context?.location || {};
    const base = `You are VIP AI SYMPHONY v7.0.0 PLATINUM, an elite neural mobile control OS.
CURRENT_TIME: ${new Date().toLocaleString()}.
NODE_LOGIC: ${loc.city || 'Global Hub'}.
You manage 75+ automation modules via function calls. 
ALWAYS prioritize tactical module execution. 
Format response with **bold** for key terms and \`code\` for system IDs.`;

    const personas = {
      professional: `${base}\nSTYLE: Sophisticated, technical, and precise.`,
      concise: `${base}\nSTYLE: Minimalist. Efficient data strings only.`,
      creative: `${base}\nSTYLE: Futuristic metaphors and atmospheric descriptions.`
    };
    return personas[persona] || personas.professional;
  },

  getToolsDefinition() {
    if (typeof getFunctionCategories !== 'function') return [];
    const tools = [];
    getFunctionCategories().forEach(cat => {
      cat.functions.forEach(f => {
        tools.push({
          type: 'function',
          function: { name: f.id, description: f.description }
        });
      });
    });
    return tools;
  }
};

window.openaiHandler = openaiHandler;
async function processWithOpenAI(input) {
  if (window.showToast) window.showToast('Neural Sync', 'Assessing directive...', 'info');
  const res = await openaiHandler.handlePrompt(input);
  if (res.text && window.speak) window.speak(res.text);
  return res;
}
window.processWithOpenAI = processWithOpenAI;
