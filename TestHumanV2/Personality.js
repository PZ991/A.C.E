class Personality {
    constructor() {
        // Big Five personality traits (0-1)
        this.openness = 0.5;
        this.conscientiousness = 0.5;
        this.extraversion = 0.5;
        this.agreeableness = 0.5;
        this.neuroticism = 0.5;
        
        // Additional personality factors
        this.empathy = 0.5;
        this.impulsiveness = 0.5;
        this.curiosity = 0.5;
        this.confidence = 0.5;
        this.stubbornness = 0.5;
        this.optimism = 0.5;
        this.patience = 0.5;
        this.competitiveness = 0.5;
        
        this.stabilityAge = 25;
        this.changeRate = 0.001;
    }

    getEmotionalModifier(emotionName) {
        const modifiers = {
            'anger': 1 + (this.neuroticism * 0.5) - (this.agreeableness * 0.3),
            'joy': 1 + ((1 - this.neuroticism) * 0.3) + (this.extraversion * 0.2),
            'fear': 1 + (this.neuroticism * 0.4) - (this.confidence * 0.3),
            'sadness': 1 + (this.neuroticism * 0.4) - (this.optimism * 0.3),
            'excitement': 1 + (this.extraversion * 0.4) + (this.openness * 0.2),
            'guilt': 1 + (this.conscientiousness * 0.3) + (this.neuroticism * 0.2),
            'pride': 1 + (this.confidence * 0.4) - (this.neuroticism * 0.2)
        };
        return modifiers[emotionName] || 1.0;
    }

    getDecisionModifier(option) {
        let modifier = 0;
        
        if (option.requiresRisk && this.openness > 0.7) modifier += 0.2;
        if (option.helpsOthers && this.agreeableness > 0.7) modifier += 0.3;
        if (option.requiresPlanning && this.conscientiousness > 0.7) modifier += 0.2;
        if (option.isSocial && this.extraversion > 0.7) modifier += 0.1;
        if (option.isStressful && this.neuroticism > 0.7) modifier -= 0.3;
        
        return modifier;
    }
}