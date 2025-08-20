class Ideology {
    constructor(name, strength = 0.5) {
        this.name = name;
        this.strength = strength;
        this.flexibility = 0.5;
        this.core = false;
        this.relatedEmotions = [];
        this.conflictsWith = [];
        this.supports = [];
        this.formationTime = Date.now();
        this.reinforcementCount = 0;
        this.challengeCount = 0;
        
        // Emotional integration
        this.emotionalFoundation = {}; // Which emotions formed this belief
        this.defensiveEmotions = []; // Emotions triggered when challenged
        this.validationEmotions = []; // Emotions when belief is confirmed
    }

    challenge(amount, source = '', emotionalState = {}) {
        this.challengeCount++;
        
        // Emotional state affects how challenges are received
        const emotionalReceptivity = this.calculateReceptivity(emotionalState);
        const effectiveAmount = amount * emotionalReceptivity;
        
        if (this.flexibility > 0.3) {
            this.strength = Math.max(0.1, this.strength - (effectiveAmount * this.flexibility));
        }
        
        // Generate defensive emotions
        const defensiveResponse = {};
        this.defensiveEmotions.forEach(emotion => {
            defensiveResponse[emotion] = this.strength * 0.3;
        });
        
        return defensiveResponse;
    }

    reinforce(amount, source = '', emotionalState = {}) {
        this.reinforcementCount++;
        
        // Strong emotional states during reinforcement make beliefs stronger
        const emotionalAmplification = Object.values(emotionalState).reduce((sum, val) => sum + val, 0) * 0.1;
        const effectiveAmount = amount * (1 + emotionalAmplification);
        
        this.strength = Math.min(1.0, this.strength + (effectiveAmount * (1 - this.flexibility)));
        
        // Generate validation emotions
        const validationResponse = {};
        this.validationEmotions.forEach(emotion => {
            validationResponse[emotion] = this.strength * 0.2;
        });
        
        return validationResponse;
    }

    calculateReceptivity(emotionalState) {
        // Certain emotions make people more or less receptive to challenges
        let receptivity = 1.0;
        
        if (emotionalState.anger > 0.6) receptivity *= 0.5; // Anger makes people defensive
        if (emotionalState.fear > 0.6) receptivity *= 0.7; // Fear makes people resistant
        if (emotionalState.curiosity > 0.5) receptivity *= 1.3; // Curiosity increases openness
        if (emotionalState.confusion > 0.5) receptivity *= 1.2; // Confusion creates openness
        
        return Math.max(0.1, Math.min(2.0, receptivity));
    }

    getEmotionalModifier(emotionName) {
        if (this.relatedEmotions.includes(emotionName)) {
            return 1 + (this.strength * 0.3);
        }
        
        // Ideologies can suppress conflicting emotions
        if (this.conflictsWith.some(conflict => conflict.relatedEmotions?.includes(emotionName))) {
            return 1 - (this.strength * 0.2);
        }
        
        return 1.0;
    }
}