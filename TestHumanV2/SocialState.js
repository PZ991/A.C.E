class SocialState {
    constructor() {
        // Social needs and status
        this.socialNeed = 50;
        this.loneliness = 0;
        this.socialAnxiety = 0;
        this.socialEnergy = 100;
        
        // Social skills
        this.charisma = 50;
        this.empathy = 50;
        this.assertiveness = 50;
        this.leadership = 50;
        this.manipulation = 50;
        
        // Social status
        this.reputation = {};
        this.socialStatus = 50;
        this.influence = 10;
        
        // Group dynamics
        this.groups = [];
        this.roles = [];
        this.socialIdentity = [];
        
        // Emotional integration
        this.emotionalContagion = 0.5; // How much others' emotions affect them
        this.expressiveness = 0.5; // How much they show emotions
    }

    getDecisionModifier(option, context) {
        let modifier = 0;
        
        // Social considerations in decision making
        if (option.affectsReputation) {
            modifier += this.reputation[context.group] || 0;
        }
        
        if (option.requiresLeadership && this.leadership > 70) {
            modifier += 0.3;
        }
        
        if (option.isSociallyRisky && this.socialAnxiety > 50) {
            modifier -= 0.4;
        }
        
        return modifier;
    }

    processEmotionalContagion(otherPersonEmotions) {
        // People "catch" emotions from others
        const contagiousEmotions = {};
        
        Object.entries(otherPersonEmotions).forEach(([emotion, intensity]) => {
            if (intensity > 0.5) { // Only strong emotions are contagious
                contagiousEmotions[emotion] = intensity * this.emotionalContagion * 0.3;
            }
        });
        
        return contagiousEmotions;
    }
}