class Memory {
    constructor(historyEntry, emotionalState = {}) {
        this.historyEntry = historyEntry;
        this.emotionalContext = emotionalState; // Emotions when memory formed
        this.clarity = 1.0; // How clear the memory is
        this.distortion = 0.0; // How distorted from reality
        this.importance = historyEntry.memorability;
        this.accessCount = 0;
        this.lastAccessed = Date.now();
        this.associations = []; // Other memories this connects to
        this.tags = []; // Categories/tags for easy retrieval
    }

    recall() {
        this.accessCount++;
        this.lastAccessed = Date.now();
        
        // Memories become less clear over time but more important ones resist
        const ageFactor = (Date.now() - this.historyEntry.time) / 86400000; // days
        this.clarity = Math.max(0.1, this.clarity - (ageFactor * 0.001 * (1 - this.importance)));
        
        return this.createRecollection();
    }

    createRecollection() {
        // Return potentially distorted version based on current emotional state
        // and memory clarity
        return {
            ...this.historyEntry,
            clarity: this.clarity,
            distortion: this.distortion,
            emotionalContext: this.emotionalContext
        };
    }
}