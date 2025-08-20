class Knowledge {
    constructor() {
        this.history = [];
        this.memories = [];
        this.thoughts = [];
        this.actions = new Map(); // actionName -> Action
        this.ideologies = [];
        this.emotions = new Map(); // emotionName -> Emotion
        this.relationships = new Map(); // targetName -> Relationship
        this.personality = {}; // Base personality traits
    }

    addHistory(historyEntry) {
        this.history.push(historyEntry);
        // Automatically create memory if significant enough
        if (historyEntry.memorability > 0.3) {
            const memory = new Memory(historyEntry, this.getCurrentEmotionalState());
            this.memories.push(memory);
        }
    }

    getCurrentEmotionalState() {
        const state = {};
        this.emotions.forEach((emotion, name) => {
            if (emotion.isActive()) {
                state[name] = emotion.currentValue;
            }
        });
        return state;
    }

    findMemories(query) {
        return this.memories.filter(memory => 
            memory.tags.some(tag => tag.includes(query)) ||
            memory.historyEntry.subject.includes(query) ||
            memory.historyEntry.action.includes(query)
        );
    }

    getRelationship(targetName) {
        if (!this.relationships.has(targetName)) {
            this.relationships.set(targetName, new Relationship(targetName));
        }
        return this.relationships.get(targetName);
    }
}