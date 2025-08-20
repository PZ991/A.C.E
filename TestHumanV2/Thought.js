class Thought {
    constructor(content, trigger = '') {
        this.content = content;
        this.trigger = trigger;
        this.intensity = 0.5;
        this.emotionalCharge = {};
        this.creationTime = Date.now();
        this.accessCount = 0;
        this.decayRate = 0.05;
        this.associations = [];
        this.truthValue = 0.5;
        this.importance = 0.5;
        this.recurring = false;
        
        // Thought patterns
        this.thoughtType = 'neutral'; // rumination, worry, fantasy, problem-solving
        this.automaticity = 0.1; // How automatic/intrusive this thought is
        this.coherence = 0.8; // How logical/coherent the thought is
    }

    access(emotionalState) {
        this.accessCount++;
        this.intensity = Math.min(1.0, this.intensity + 0.1);
        
        // Thoughts can trigger emotions
        const triggeredEmotions = {};
        Object.entries(this.emotionalCharge).forEach(([emotion, charge]) => {
            triggeredEmotions[emotion] = charge * this.intensity * 0.1;
        });
        
        return triggeredEmotions;
    }

    decay(deltaTime, emotionalState) {
        // Emotional state affects thought persistence
        const emotionalRelevance = this.calculateEmotionalRelevance(emotionalState);
        const adjustedDecayRate = this.decayRate * (1 - emotionalRelevance);
        
        this.intensity = Math.max(0, this.intensity - (adjustedDecayRate * deltaTime));
        
        // Recurring thoughts can spontaneously return
        if (this.recurring && this.intensity < 0.1 && Math.random() < 0.01) {
            this.intensity = 0.3;
        }
    }

    calculateEmotionalRelevance(emotionalState) {
        let relevance = 0;
        Object.entries(this.emotionalCharge).forEach(([emotion, charge]) => {
            if (emotionalState[emotion]) {
                relevance += Math.abs(charge) * emotionalState[emotion];
            }
        });
        return Math.min(1.0, relevance);
    }

    isActive() {
        return this.intensity > 0.2;
    }
}