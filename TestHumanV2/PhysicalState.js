class PhysicalState {
    constructor() {
        // Basic physical stats
        this.health = 100;
        this.energy = 100;
        this.hunger = 0;
        this.thirst = 0;
        this.fatigue = 0;
        this.pain = 0;
        this.arousal = 50;
        
        // Physical attributes
        this.strength = 50;
        this.agility = 50;
        this.endurance = 50;
        this.appearance = 50;
        
        // Biological rhythms
        this.circadianPhase = 0;
        this.sleepDebt = 0;
        this.lastMeal = 0;
        this.lastSleep = 0;
        
        // Health conditions
        this.conditions = [];
        this.medications = [];
        this.addictions = [];
        
        // Emotional integration
        this.stressLevel = 0; // Accumulated from emotions
        this.emotionalExhaustion = 0;
    }

    update(deltaTime, emotionalState) {
        // Natural degradation
        this.hunger = Math.min(100, this.hunger + (deltaTime * 0.1));
        this.thirst = Math.min(100, this.thirst + (deltaTime * 0.15));
        this.fatigue = Math.min(100, this.fatigue + (deltaTime * 0.05));
        
        // Circadian rhythm
        this.circadianPhase = (this.circadianPhase + (deltaTime / 3600)) % 24;
        
        // Emotional effects on physical state
        this.updateEmotionalEffects(emotionalState, deltaTime);
        this.updateHealthEffects();
    }

    updateEmotionalEffects(emotionalState, deltaTime) {
        // Stress accumulation from negative emotions
        const negativeEmotions = ['anger', 'fear', 'sadness', 'anxiety', 'frustration'];
        this.stressLevel = negativeEmotions.reduce((total, emotion) => {
            return total + (emotionalState[emotion] || 0);
        }, 0) / negativeEmotions.length;
        
        // Chronic stress affects health
        if (this.stressLevel > 0.7) {
            this.health -= 0.001 * deltaTime;
            this.emotionalExhaustion += 0.01 * deltaTime;
        }
        
        // Positive emotions can restore energy
        const positiveEmotions = ['joy', 'contentment', 'love', 'excitement'];
        const positiveLevel = positiveEmotions.reduce((total, emotion) => {
            return total + (emotionalState[emotion] || 0);
        }, 0) / positiveEmotions.length;
        
        if (positiveLevel > 0.5) {
            this.energy = Math.min(100, this.energy + (0.005 * deltaTime));
        }
    }

    updateHealthEffects() {
        // Physical state affects emotional baseline
        this.fatigueEmotionalEffect = this.energy < 30 ? 0.3 : 0;
        this.hungerEmotionalEffect = this.hunger > 70 ? 0.2 : 0;
        this.painEmotionalEffect = this.pain > 50 ? 0.4 : 0;
    }

    getEmotionalModifier(emotionName) {
        let modifier = 1.0;
        
        // Physical state affects emotional intensity
        if (this.energy < 50) {
            // Low energy dampens positive emotions, amplifies negative ones
            const positiveEmotions = ['joy', 'excitement', 'love', 'pride'];
            const negativeEmotions = ['sadness', 'frustration', 'irritability'];
            
            if (positiveEmotions.includes(emotionName)) {
                modifier *= 0.7;
            } else if (negativeEmotions.includes(emotionName)) {
                modifier *= 1.3;
            }
        }
        
        if (this.pain > 30) {
            // Pain amplifies negative emotions
            const painAmplified = ['anger', 'frustration', 'sadness', 'irritability'];
            if (painAmplified.includes(emotionName)) {
                modifier *= 1.4;
            }
        }
        
        if (this.hunger > 60) {
            // Hunger makes people more irritable
            if (emotionName === 'anger' || emotionName === 'frustration') {
                modifier *= 1.2;
            }
        }
        
        return modifier;
    }

    getPerformanceModifier() {
        const healthFactor = this.health / 100;
        const energyFactor = this.energy / 100;
        const painFactor = 1 - (this.pain / 200);
        const stressFactor = 1 - (this.stressLevel / 4); // Stress reduces performance
        
        return healthFactor * energyFactor * painFactor * stressFactor;
    }
}