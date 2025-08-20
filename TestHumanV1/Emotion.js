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
        this.peakValue = 0; // Track highest value reached
        this.triggers = []; // What commonly triggers this emotion
        this.suppressors = []; // What suppresses this emotion
    }

    update(deltaTime) {
        // Decay over time
        this.currentValue = Math.max(0, this.currentValue - (this.decayRate * deltaTime));
        
        // Update uptime if emotion is active
        if (this.isActive()) {
            this.currentUptime += deltaTime;
            // Stability increases with prolonged states
            this.stability = Math.min(1.0, this.stability + (deltaTime * 0.001));
            // Intensity increases with prolonged states
            this.intensity = Math.min(2.0, this.intensity + (deltaTime * 0.0005));
        } else {
            this.currentUptime = 0;
            // Gradually return to base levels when not active
            this.stability = Math.max(0.1, this.stability - (deltaTime * 0.0001));
            this.intensity = Math.max(0.1, this.intensity - (deltaTime * 0.0001));
        }
        
        // Update peak value
        this.peakValue = Math.max(this.peakValue, this.currentValue);
    }

    isActive() {
        return this.currentValue >= this.thresholdActive;
    }

    addValue(amount, source = '') {
        const stabilityModifier = 1 + (this.stability * 0.5);
        const intensityModifier = 1 + (this.intensity * 0.3);
        this.currentValue = Math.min(this.thresholdMax, 
            this.currentValue + (amount * stabilityModifier * intensityModifier));
    }
}