class Knowledge {
    constructor() {
        this.history = [];
        this.memories = [];
        this.thoughts = [];
        this.actions = new Map();
        this.ideologies = [];
        this.emotions = new Map();
        this.relationships = new Map();
        this.personality = {};
        
        // Enhanced knowledge structures
        this.mentalModels = new Map(); // How they think things work
        this.worldview = {}; // Their understanding of reality
        this.socialNorms = []; // What they believe is socially acceptable
        this.personalValues = []; // What they consider important
        this.lifeExperience = 0; // Accumulated wisdom from experiences
    }

    addHistory(historyEntry, emotionalState = {}) {
        this.history.push(historyEntry);
        
        // Update life experience
        this.lifeExperience += historyEntry.significance * 0.1;
        
        // Create memory if significant enough
        if (historyEntry.memorability > 0.3) {
            const memory = new Memory(historyEntry, emotionalState);
            this.memories.push(memory);
        }
        
        // Generate thoughts about significant events
        if (historyEntry.significance > 0.6) {
            this.generateThoughtsFromEvent(historyEntry, emotionalState);
        }
    }

    generateThoughtsFromEvent(historyEntry, emotionalState) {
        // Generate contextually appropriate thoughts
        const thoughtContent = this.createThoughtContent(historyEntry);
        const thought = new Thought(thoughtContent, 'event_reflection');
        
        // Emotional charge based on the event and current state
        thought.emotionalCharge = { ...emotionalState };
        thought.importance = historyEntry.significance;
        
        // Significant negative events can create recurring thoughts
        if (historyEntry.emotionalWeight < -0.5) {
            thought.recurring = true;
            thought.thoughtType = 'rumination';
        }
        
        this.thoughts.push(thought);
    }

    createThoughtContent(historyEntry) {
        // Generate thought content based on event type
        const templates = {
            social_positive: ["That went well with {target}", "I'm glad I {action}"],
            social_negative: ["I shouldn't have {action}", "What will {target} think of me?"],
            achievement: ["I'm proud I {action}", "I've gotten better at {action}"],
            failure: ["I failed at {action}", "Why can't I {action} properly?"],
            conflict: ["I can't believe {target} {action}", "This situation with {target} is complicated"]
        };
        
        const category = this.categorizeEvent(historyEntry);
        const template = templates[category] || ["Something happened with {action}"];
        const chosenTemplate = template[Math.floor(Math.random() * template.length)];
        
        return chosenTemplate
            .replace('{action}', historyEntry.action)
            .replace('{target}', historyEntry.actionTarget);
    }

    categorizeEvent(historyEntry) {
        if (historyEntry.socialWeight > 0.5) {
            return historyEntry.success ? 'social_positive' : 'social_negative';
        }
        if (historyEntry.emotionalWeight > 0.5) {
            return 'achievement';
        }
        if (historyEntry.emotionalWeight < -0.5) {
            return 'failure';
        }
        if (historyEntry.actionTarget && historyEntry.emotionalWeight !== 0) {
            return 'conflict';
        }
        return 'neutral';
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

    getDominantEmotions(count = 2) {
        const activeEmotions = Array.from(this.emotions.values())
            .filter(emotion => emotion.isActive())
            .sort((a, b) => b.currentValue - a.currentValue);
        
        return activeEmotions.slice(0, count);
    }

    findMemories(query, emotionalContext = null) {
        let relevantMemories = this.memories.filter(memory => 
            memory.tags.some(tag => tag.includes(query)) ||
            memory.historyEntry.subject.includes(query) ||
            memory.historyEntry.action.includes(query) ||
            memory.historyEntry.actionTarget.includes(query)
        );
        
        // If emotional context provided, prioritize emotionally congruent memories
        if (emotionalContext) {
            relevantMemories = relevantMemories.map(memory => ({
                memory,
                relevance: memory.calculateEmotionalCongruence(emotionalContext)
            }))
            .sort((a, b) => b.relevance - a.relevance)
            .map(item => item.memory);
        }
        
        return relevantMemories;
    }

    getRelationship(targetName) {
        if (!this.relationships.has(targetName)) {
            this.relationships.set(targetName, new Relationship(targetName));
        }
        return this.relationships.get(targetName);
    }

    updateFromEmotionalState(emotionalState, deltaTime) {
        // Emotional states can influence knowledge structures over time
        
        // Update thought patterns
        this.thoughts.forEach(thought => {
            if (thought.isActive()) {
                const triggeredEmotions = thought.access(emotionalState);
                // These would be applied back to the person's emotional state
            }
        });
        
        // Update ideologies based on emotional reinforcement
        this.ideologies.forEach(ideology => {
            const emotionalAlignment = this.calculateIdeologyAlignment(ideology, emotionalState);
            if (emotionalAlignment > 0.5) {
                ideology.reinforce(0.001 * deltaTime, 'emotional_alignment', emotionalState);
            }
        });
    }

    calculateIdeologyAlignment(ideology, emotionalState) {
        // Calculate how well current emotions align with ideology
        let alignment = 0;
        let totalWeight = 0;
        
        ideology.relatedEmotions.forEach(emotion => {
            if (emotionalState[emotion]) {
                alignment += emotionalState[emotion];
                totalWeight += 1;
            }
        });
        
        return totalWeight > 0 ? alignment / totalWeight : 0;
    }
}