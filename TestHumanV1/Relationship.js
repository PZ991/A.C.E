class Relationship {
    constructor(targetName, initialRelation = 0) {
        this.targetName = targetName;
        this.relation = initialRelation; // -1 to 1 (hate to love)
        this.trust = 0; // -1 to 1
        this.respect = 0; // -1 to 1
        this.fear = 0; // 0 to 1
        this.familiarity = 0; // 0 to 1
        this.history = []; // Shared history
        this.emotionalModifiers = {}; // How this person affects emotions
        this.expectations = []; // What we expect from this person
        this.lastInteraction = 0;
        this.interactionCount = 0;
    }

    updateFromAction(action, isSubject, emotionalResponse) {
        this.interactionCount++;
        this.lastInteraction = Date.now();
        
        // Update relationship values based on action
        if (action.socialWeight > 0.5) {
            if (emotionalResponse.anger > 0.5) {
                this.relation -= 0.1;
                this.respect -= 0.05;
            }
            if (emotionalResponse.joy > 0.5) {
                this.relation += 0.1;
            }
            if (emotionalResponse.fear > 0.5) {
                this.fear += 0.1;
                this.trust -= 0.05;
            }
        }
        
        this.familiarity = Math.min(1.0, this.familiarity + 0.01);
    }

    getEmotionalModifier(emotionName) {
        return this.emotionalModifiers[emotionName] || 1.0;
    }
}