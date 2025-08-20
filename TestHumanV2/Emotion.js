class Emotion {
    constructor(name, baseStability = 0.5, baseIntensity = 0.5) {
        this.name = name;
        this.stability = baseStability;
        this.currentValue = 0;
        this.decayRate = 0.1;
        this.multiplier = 1.0;
        this.thresholdMin = 0;
        this.thresholdMax = 100;
        this.thresholdActive = 0;
        this.currentUptime = 0;
        this.intensity = baseIntensity;
        this.peakValue = 0;
        this.triggers = [];
        this.suppressors = [];
        
        // Integration with other systems
        this.physicalEffects = {}; // How this emotion affects physical state
        this.cognitiveEffects = {}; // How this emotion affects thinking
        this.socialEffects = {}; // How this emotion affects social behavior
        this.motivationalEffects = {}; // How this emotion affects goals
    }

    update(deltaTime, person) {
        // Base decay
        this.currentValue = Math.max(0, this.currentValue - (this.decayRate * deltaTime));
        
        // Physical state influences emotion decay/intensity
        const physicalModifier = person.physicalState.getEmotionalModifier(this.name);
        const cognitiveModifier = person.cognitiveState.getEmotionalModifier(this.name);
        const personalityModifier = person.personality.getEmotionalModifier(this.name);
        
        this.currentValue *= (physicalModifier * cognitiveModifier * personalityModifier);
        
        if (this.isActive()) {
            this.currentUptime += deltaTime;
            this.stability = Math.min(1.0, this.stability + (deltaTime * 0.001));
            this.intensity = Math.min(2.0, this.intensity + (deltaTime * 0.0005));
            
            // Apply emotional effects to other systems
            this.applyEffects(person, deltaTime);
        } else {
            this.currentUptime = 0;
            this.stability = Math.max(0.1, this.stability - (deltaTime * 0.0001));
            this.intensity = Math.max(0.1, this.intensity - (deltaTime * 0.0001));
        }
        
        this.peakValue = Math.max(this.peakValue, this.currentValue);
    }

    applyEffects(person, deltaTime) {
        // Physical effects
        if (this.name === 'stress' || this.name === 'anxiety') {
            person.physicalState.energy -= this.currentValue * 0.01 * deltaTime;
            person.physicalState.fatigue += this.currentValue * 0.005 * deltaTime;
        }
        if (this.name === 'joy') {
            person.physicalState.energy += this.currentValue * 0.005 * deltaTime;
        }
        if (this.name === 'anger') {
            person.physicalState.arousal += this.currentValue * 0.01 * deltaTime;
        }
        
        // Cognitive effects
        if (this.name === 'fear' || this.name === 'anxiety') {
            person.cognitiveState.focus = Math.max(0, person.cognitiveState.focus - this.currentValue * 0.1);
        }
        if (this.name === 'excitement') {
            person.cognitiveState.creativity += this.currentValue * 0.05;
        }
        
        // Social effects
        if (this.name === 'anger') {
            person.socialState.socialEnergy -= this.currentValue * 0.02 * deltaTime;
        }
        if (this.name === 'joy') {
            person.socialState.charisma += this.currentValue * 0.01;
        }
    }

    isActive() {
        return this.currentValue >= this.thresholdActive;
    }

    addValue(amount, source = '', person = null) {
        const stabilityModifier = 1 + (this.stability * 0.5);
        const intensityModifier = 1 + (this.intensity * 0.3);
        
        // Additional modifiers from integrated systems
        let totalModifier = stabilityModifier * intensityModifier;
        
        if (person) {
            totalModifier *= person.personality.getEmotionalModifier(this.name);
            totalModifier *= person.physicalState.getEmotionalModifier(this.name);
            totalModifier *= person.cognitiveState.getEmotionalModifier(this.name);
        }
        
        this.currentValue = Math.min(this.thresholdMax, 
            this.currentValue + (amount * totalModifier));
    }
}