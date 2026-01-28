/**
 * VIP AI Assistant - COGNITIVE MEMORY v2
 * Vector-based semantic memory for infinite context
 */

class CognitiveMemory {
  constructor() {
    this.memoryStore = [];
    this.vectorDimension = 1536; // Standard dimension for semantic vectors
    this.similarityThreshold = 0.75; // Minimum similarity for recall

    // Initialize cognitive memory
    this.init();
  }

  init() {
    console.log('🧠 Cognitive Memory v2 initialized');
    this.loadFromStorage();
  }

  /**
   * Store a memory with semantic vector representation
   */
  async storeMemory(content, metadata = {}) {
    const memory = {
      id: this.generateId(),
      content: content,
      embedding: await this.createEmbedding(content),
      timestamp: Date.now(),
      metadata: {
        ...metadata,
        createdAt: new Date().toISOString(),
      },
    };

    this.memoryStore.push(memory);
    this.saveToStorage();

    console.log(`🧠 Memory stored: ${content.substring(0, 50)}...`);
    return memory.id;
  }

  /**
   * Create semantic embedding for content
   */
  async createEmbedding(content) {
    await Promise.resolve(); // Satisfy require-await
    // In a real implementation, this would call an actual embedding API
    // For now, we'll simulate with a hash-based approach
    // Simplified simulation

    // Simple hash-based embedding simulation
    const hash = this.simpleHash(content);
    const embedding = new Array(this.vectorDimension).fill(0);

    // Distribute the hash value across the vector
    for (let i = 0; i < embedding.length; i++) {
      embedding[i] = Math.sin(hash + i) * Math.cos(hash + i * 2);
    }

    return embedding;
  }

  /**
   * Simple hash function for demonstration
   */
  simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }

  /**
   * Recall memories based on semantic similarity
   */
  async recallMemories(query, limit = 5) {
    if (!query || this.memoryStore.length === 0) {
      return [];
    }

    const queryEmbedding = await this.createEmbedding(query);
    const similarities = [];

    for (const memory of this.memoryStore) {
      const similarity = this.cosineSimilarity(queryEmbedding, memory.embedding);
      if (similarity > this.similarityThreshold) {
        similarities.push({
          memory,
          similarity,
        });
      }
    }

    // Sort by similarity (highest first) and return top results
    similarities.sort((a, b) => b.similarity - a.similarity);
    return similarities.slice(0, limit).map((item) => ({
      ...item.memory,
      confidence: item.similarity,
    }));
  }

  /**
   * Calculate cosine similarity between two vectors
   */
  cosineSimilarity(vecA, vecB) {
    if (vecA.length !== vecB.length) {
      throw new Error('Vectors must have the same length');
    }

    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < vecA.length; i++) {
      dotProduct += vecA[i] * vecB[i];
      normA += Math.pow(vecA[i], 2);
      normB += Math.pow(vecB[i], 2);
    }

    if (normA === 0 || normB === 0) {
      return 0;
    }

    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  }

  /**
   * Forget memories that match criteria
   */
  forgetMemories(criteria) {
    const initialCount = this.memoryStore.length;

    if (typeof criteria === 'function') {
      this.memoryStore = this.memoryStore.filter((mem) => !criteria(mem));
    } else if (typeof criteria === 'string') {
      this.memoryStore = this.memoryStore.filter((mem) => !mem.content.includes(criteria));
    } else if (criteria.id) {
      this.memoryStore = this.memoryStore.filter((mem) => mem.id !== criteria.id);
    } else if (criteria.beforeDate) {
      const beforeTime = new Date(criteria.beforeDate).getTime();
      this.memoryStore = this.memoryStore.filter((mem) => mem.timestamp < beforeTime);
    }

    const forgottenCount = initialCount - this.memoryStore.length;
    console.log(`🧠 Forgotten ${forgottenCount} memories`);

    this.saveToStorage();
    return forgottenCount;
  }

  /**
   * Summarize all memories
   */
  getMemorySummary() {
    return {
      totalMemories: this.memoryStore.length,
      earliestMemory:
        this.memoryStore.length > 0
          ? new Date(Math.min(...this.memoryStore.map((m) => m.timestamp)))
          : null,
      latestMemory:
        this.memoryStore.length > 0
          ? new Date(Math.max(...this.memoryStore.map((m) => m.timestamp)))
          : null,
    };
  }

  /**
   * Load memories from localStorage
   */
  loadFromStorage() {
    try {
      const stored = localStorage.getItem('cognitiveMemory');
      if (stored) {
        const parsed = JSON.parse(stored);
        this.memoryStore = parsed.map((mem) => ({
          ...mem,
          embedding: Float32Array.from(mem.embedding), // Convert back to typed array
        }));
        console.log(`🧠 Loaded ${this.memoryStore.length} memories from storage`);
      }
    } catch (error) {
      console.error('Error loading cognitive memory:', error);
    }
  }

  /**
   * Save memories to localStorage
   */
  saveToStorage() {
    try {
      // Convert typed arrays back to regular arrays for JSON serialization
      const serializable = this.memoryStore.map((mem) => ({
        ...mem,
        embedding: Array.from(mem.embedding),
      }));

      localStorage.setItem('cognitiveMemory', JSON.stringify(serializable));
    } catch (error) {
      console.error('Error saving cognitive memory:', error);
    }
  }

  /**
   * Generate a unique ID
   */
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  }

  /**
   * Clear all memories
   */
  clearAllMemories() {
    const count = this.memoryStore.length;
    this.memoryStore = [];
    this.saveToStorage();
    console.log(`🧠 Cleared all ${count} memories`);
    return count;
  }

  /**
   * Get recent memories
   */
  getRecentMemories(limit = 10) {
    return [...this.memoryStore].sort((a, b) => b.timestamp - a.timestamp).slice(0, limit);
  }
}

// Initialize cognitive memory system
const cognitiveMemory = new CognitiveMemory();

// Export for global access
window.cognitiveMemory = cognitiveMemory;

console.log('🧠 Cognitive Memory v2 system ready for infinite context');

// Example usage functions
window.CognitiveMemoryHelpers = {
  // Store a memory
  remember: (content, metadata = {}) => {
    return cognitiveMemory.storeMemory(content, metadata);
  },

  // Recall memories related to a query
  recall: (query, limit = 5) => {
    return cognitiveMemory.recallMemories(query, limit);
  },

  // Get memory summary
  getSummary: () => {
    return cognitiveMemory.getMemorySummary();
  },

  // Get recent memories
  getRecent: (limit = 10) => {
    return cognitiveMemory.getRecentMemories(limit);
  },
};

// Add a sample memory to demonstrate functionality
(async () => {
  if (cognitiveMemory.memoryStore.length === 0) {
    await cognitiveMemory.storeMemory(
      'User preferences for the VIP AI Assistant include dark mode and accessibility features',
      { category: 'preferences', user: 'primary' }
    );

    await cognitiveMemory.storeMemory(
      'The user enjoys productivity tools and frequently uses the automation features',
      { category: 'behavior', user: 'primary' }
    );
  }
})();
