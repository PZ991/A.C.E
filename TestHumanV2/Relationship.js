class Relationship {
    constructor(targetName, initialRelation = 0) {
        this.targetName = targetName;
        this.relation = initialRelation; // -1 to 1 (hate to love)
        this.trust = 0; // -1 to 1
        this.respect = 0; // -1 to 1
        this.fear = 0; // 0 to 1
        this.familiarity = 0; // 0 to 1
        this.intimacy = 0; // 0 to 1
        this.attachment = 0; // 0 to 1
        
        this.history = [];
        this.emotionalModifiers = {};
        this.expectations = [];
        this.lastInteraction = 0;
        this.interactionCount = 0;
        
        // Relationship dynamics
        this.powerBalance = 0; // -1 (they have power) to 1 (we have power)
        this.dependency = 0; // How much we depend on them
        this.roleInTheirLife = 'acquaintance';
        this.conflictStyle = 'avoidant'; // avoidant, confrontational, collaborative
    }

    updateFromAction(action, isSubject, emotionalResponse, context) {
        this.interactionCount++;
        this.lastInteraction = Date.now();
        
        // Record the interaction
        this.history.push({
            action: action.actionName,
            isSubject: isSubject,
            emotionalResponse: { ...emotionalResponse },
            context: context,
            time: Date.now()
        });
        
        // Update relationship dimensions based on action and emotional response
        this.updateRelationshipDimensions(action, emotionalResponse, isSubject);
        
        // Familiarity always increases with interaction
        this.familiarity = Math.min(1.0, this.familiarity + 0.01);
        
        // Generate emotional modifiers for future interactions
        this.updateEmotionalModifiers(action, emotionalResponse);
    }

    updateRelationshipDimensions(action, emotionalResponse, isSubject) {
        if (action.socialWeight > 0.5) {
            // Positive actions
            if (action.actionName.includes('help') || action.actionName.includes('support')) {
                this.relation += 0.1;
                this.trust += 0.05;
                if (emotionalResponse.gratitude > 0.5) {
                    this.relation += 0.05;
                }
            }
            
            // Negative actions
            if (action.actionName.includes('betray') || action.actionName.includes('hurt')) {
                this.relation -= 0.2;
                this.trust -= 0.3;
                if (emotionalResponse.anger > 0.7) {
                    this.relation -= 0.1;
                }
            }
            
            // Aggressive actions
            if (action.actionName.includes('punch') || action.actionName.includes('threaten')) {
                if (isSubject) {
                    this.fear += 0.2;
                    this.relation -= 0.15;
                    this.respect -= 0.1;
                } else {
                    this.powerBalance -= 0.1; // They demonstrated power over us
                    if (emotionalResponse.fear > 0.6) {
                        this.fear += 0.3;
                    }
                }
            }
        }
        
        // Clamp all values to their ranges
        this.relation = Math.max(-1, Math.min(1, this.relation));
        this.trust = Math.max(-1, Math.min(1, this.trust));
        this.respect = Math.max(-1, Math.min(1, this.respect));
        this.fear = Math.max(0, Math.min(1, this.fear));
    }

    updateEmotionalModifiers(action, emotionalResponse) {
        // Strong emotional responses create lasting modifiers
        Object.entries(emotionalResponse).forEach(([emotion, intensity]) => {
            if (intensity > 0.6) {
                if (!this.emotionalModifiers[emotion]) {
                    this.emotionalModifiers[emotion] = 1.0;
                }
                
                // Strengthen the association
                this.emotionalModifiers[emotion] += intensity * 0.1;
                this.emotionalModifiers[emotion] = Math.min(2.0, this.emotionalModifiers[emotion]);
            }
        });
    }

    getEmotionalModifier(emotionName) {
        let modifier = this.emotionalModifiers[emotionName] || 1.0;
        
        // Relationship dimensions affect emotional responses
        if (this.fear > 0.5) {
            if (['anxiety', 'stress', 'worry'].includes(emotionName)) {
                modifier *= (1 + this.fear * 0.5);
            }
        }
        
        if (this.relation > 0.7) {
            if (['joy', 'contentment', 'love'].includes(emotionName)) {
                modifier *= (1 + this.relation * 0.3);
            }
        }
        
        if (this.relation < -0.5) {
            if (['anger', 'frustration', 'hatred'].includes(emotionName)) {
                modifier *= (1 + Math.abs(this.relation) * 0.4);
            }
        }
        
        return modifier;
    }

    predictResponse(proposedAction) {
        // Predict how this person might respond to an action
        const prediction = {
            emotionalResponse: {},
            relationshipChange: {},
            likelihood: 0.5
        };
        
        // Base prediction on relationship history and current state
        if (this.relation > 0.5 && proposedAction.benefitsTarget) {
            prediction.emotionalResponse.gratitude = 0.6;
            prediction.emotionalResponse.joy = 0.4;
            prediction.relationshipChange.relation = 0.1;
        }
        
        if (this.fear > 0.5 && proposedAction.isAggressive) {
            prediction.emotionalResponse.fear = 0.8;
            prediction.emotionalResponse.anxiety = 0.6;
            prediction.relationshipChange.fear = 0.2;
        }
        
        return prediction;
    }
}
