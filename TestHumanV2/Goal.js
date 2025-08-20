class Goal {
    constructor(name, priority = 0.5, urgency = 0.5) {
        this.name = name;
        this.priority = priority;
        this.urgency = urgency;
        this.progress = 0;
        this.difficulty = 0.5;
        this.type = 'personal';
        this.subgoals = [];
        this.blockers = [];
        this.deadline = null;
        this.motivation = 0.5;
        this.lastProgress = 0;
        this.abandonmentThreshold = 0.1;
        
        // Emotional integration
        this.emotionalRewards = {}; // What emotions completing this gives
        this.emotionalCosts = {}; // What emotions pursuing this costs
        this.emotionalTriggers = []; // Emotions that motivate this goal
    }

    update(deltaTime, emotionalState) {
        // Urgency increases as deadline approaches
        if (this.deadline) {
            const timeLeft = this.deadline - Date.now();
            this.urgency = Math.max(0, 1 - (timeLeft / (24 * 3600 * 1000)));
        }
        
        // Emotional state affects motivation
        this.emotionalTriggers.forEach(trigger => {
            if (emotionalState[trigger.emotion] > trigger.threshold) {
                this.motivation += trigger.boost * deltaTime;
            }
        });
        
        // Motivation decay without progress
        if (Date.now() - this.lastProgress > 86400000) {
            this.motivation = Math.max(0, this.motivation - 0.01);
        }
    }

    getScore(emotionalState) {
        let baseScore = (this.priority * 0.4 + this.urgency * 0.4 + this.motivation * 0.2);
        
        // Emotional amplification
        const emotionalBoost = this.emotionalTriggers.reduce((boost, trigger) => {
            return boost + ((emotionalState[trigger.emotion] || 0) * trigger.multiplier);
        }, 0);
        
        return baseScore * (1 + emotionalBoost);
    }

    checkCompletion() {
        if (this.progress >= 1.0) {
            return this.emotionalRewards; // Return emotions to add
        }
        return {};
    }
}
