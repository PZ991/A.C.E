class Memory {
    constructor(historyEntry, emotionalState = {}) {
        this.historyEntry = historyEntry;
        this.emotionalContext = emotionalState;
        this.clarity = 1.0;
        this.distortion = 0.0;
        this.importance = historyEntry.memorability;
        this.accessCount = 0;
        this.lastAccessed = Date.now();
        this.associations = [];
        this.tags = [];
        
        // Emotional coloring of memory
        this.emotionalIntensity = Object.values(emotionalState).reduce((sum, val) => sum + val, 0);
        this.dominantEmotion = this.getDominantEmotion(emotionalState);
    }

    getDominantEmotion(emotionalState) {
        let dominant = 'neutral';
        let maxValue = 0;
        
        Object.entries(emotionalState).forEach(([emotion, value]) => {
            if (value > maxValue) {
                maxValue = value;
                dominant = emotion;
            }
        });
        
        return dominant;
    }

    recall(currentEmotionalState) {
        this.accessCount++;
        this.lastAccessed = Date.now();
        
        // Memories are colored by current emotional state
        const emotionalCongruence = this.calculateEmotionalCongruence(currentEmotionalState);
        
        // Emotionally congruent memories are recalled more easily and vividly
        const recallStrength = this.clarity * (1 + emotionalCongruence * 0.3);
        
        // Age-based decay
        const ageFactor = (Date.now() - this.historyEntry.time) / 86400000;
        this.clarity = Math.max(0.1, this.clarity - (ageFactor * 0.001 * (1 - this.importance)));
        
        return {
            ...this.historyEntry,
            clarity: recallStrength,
            distortion: this.distortion,
            emotionalContext: this.emotionalContext,
            emotionalCongruence: emotionalCongruence
        };
    }

    calculateEmotionalCongruence(currentState) {
        // How well current emotions match memory's emotional context
        let congruence = 0;
        let totalWeight = 0;
        
        Object.entries(this.emotionalContext).forEach(([emotion, pastValue]) => {
            const currentValue = currentState[emotion] || 0;
            const similarity = 1 - Math.abs(pastValue - currentValue);
            congruence += similarity * pastValue; // Weight by intensity
            totalWeight += pastValue;
        });
        
        return totalWeight > 0 ? congruence / totalWeight : 0;
    }
}