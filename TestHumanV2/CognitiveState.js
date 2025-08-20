class CognitiveState {
    constructor() {
        // Cognitive abilities
        this.intelligence = 100;
        this.memory = 100;
        this.attention = 100;
        this.reasoning = 100;
        this.creativity = 100;
        this.socialIntelligence = 100;
        
        // Current cognitive state
        this.focus = 50;
        this.mentalFatigue = 0;
        this.confusion = 0;
        this.overwhelm = 0;
        
        // Learning and adaptation
        this.learningRate = 0.1;
        this.forgettingRate = 0.01;
        this.adaptability = 0.5;
        
        // Cognitive biases
        this.confirmationBias = 0.3;
        this.availabilityBias = 0.2;
        this.anchoringBias = 0.25;
        this.overconfidence = 0.2;
        
        // Emotional integration
        this.emotionalIntelligence = 50;
        this.emotionalRegulation = 50;
    }

    getEmotionalModifier(emotionName) {
        let modifier = 1.0;
        
        // Different emotions affect cognitive processes differently
        if (this.mentalFatigue > 70) {
            // Mental fatigue dampens all emotions except frustration
            if (emotionName === 'frustration' || emotionName === 'irritability') {
                modifier *= 1.3;
            } else {
                modifier *= 0.8;
            }
        }
        
        if (this.focus < 30) {
            // Poor focus makes emotional regulation harder
            modifier *= 1.2;
        }
        
        if (this.overwhelm > 50) {
            // Overwhelm amplifies anxiety and stress
            if (emotionName === 'anxiety' || emotionName === 'stress' || emotionName === 'panic') {
                modifier *= 1.5;
            }
        }
        
        return modifier;
    }

    processInformation(complexity, emotionalState) {
        const cognitiveLoad = complexity * (1 + (emotionalState.stress || 0));
        this.mentalFatigue = Math.min(100, this.mentalFatigue + cognitiveLoad);
        
        // Strong emotions can impair or enhance cognitive function
        const emotionalImpairment = Math.max(0, 
            (emotionalState.anger || 0) * 0.3 + 
            (emotionalState.fear || 0) * 0.2 + 
            (emotionalState.sadness || 0) * 0.15);
        
        const emotionalEnhancement = Math.max(0,
            (emotionalState.curiosity || 0) * 0.2 +
            (emotionalState.excitement || 0) * 0.1);
        
        const effectiveIntelligence = this.intelligence * 
            (1 - this.mentalFatigue / 200) * 
            (1 - emotionalImpairment) * 
            (1 + emotionalEnhancement);
        
        return Math.max(10, effectiveIntelligence);
    }

    regulateEmotion(emotion, targetIntensity) {
        const regulationSkill = this.emotionalRegulation / 100;
        const currentIntensity = emotion.currentValue;
        const difference = currentIntensity - targetIntensity;
        
        // Apply regulation based on skill level
        const adjustment = difference * regulationSkill * 0.1;
        emotion.currentValue = Math.max(0, currentIntensity - adjustment);
        
        // Regulation costs mental energy
        this.mentalFatigue += Math.abs(adjustment) * 0.5;
    }
}