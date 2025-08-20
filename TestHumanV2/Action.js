class Action {
    constructor(name) {
        this.actionName = name;
        this.actionAnimation = '';
        this.actionDescription = '';
        this.actionIKMask = [];
        this.actionMask = [];
        this.emotionalWeight = 0.5;
        this.socialWeight = 0.5;
        this.physicalIntensity = 0.5;
        this.duration = 1.0;
        this.cooldown = 0;
        this.requirements = [];
        this.consequences = [];
        this.targetTypes = ['person', 'object', 'self'];
        
        // Enhanced properties
        this.physicalRequirement = 0.3; // Minimum physical capability needed
        this.mentalRequirement = 0.3; // Minimum cognitive capability needed
        this.skillRequirements = {}; // Required skill levels
        this.emotionalTriggers = []; // Emotions that make this action more likely
        this.emotionalInhibitors = []; // Emotions that prevent this action
        this.moralWeight = 0.0; // How morally significant the action is
        
        // Action outcomes
        this.successEmotions = {}; // Emotions on success
        this.failureEmotions = {}; // Emotions on failure
        this.targetEmotions = {}; // Emotions applied to target
        this.witnessEmotions = {}; // Emotions applied to witnesses
    }

    canPerform(actor, target = null, context = {}) {
        // Physical requirements
        if (actor.physicalState.getPerformanceModifier() < this.physicalRequirement) {
            return false;
        }
        
        // Mental requirements
        const cognitiveCapacity = actor.cognitiveState.processInformation(this.mentalRequirement, 
            actor.knowledge.getCurrentEmotionalState());
        if (cognitiveCapacity < this.mentalRequirement * 100) {
            return false;
        }
        
        // Skill requirements
        for (const [skillName, requiredLevel] of Object.entries(this.skillRequirements)) {
            const skill = actor.skills.get(skillName);
            if (!skill || skill.level < requiredLevel) {
                return false;
            }
        }
        
        // Emotional inhibitors
        const emotionalState = actor.knowledge.getCurrentEmotionalState();
        for (const inhibitor of this.emotionalInhibitors) {
            if (emotionalState[inhibitor.emotion] > inhibitor.threshold) {
                return false;
            }
        }
        
        // Check other requirements
        return this.requirements.every(req => actor.hasRequirement(req));
    }

    execute(actor, target = null, witnesses = [], context = {}) {
        // Calculate success probability
        const successChance = this.calculateSuccessChance(actor, target, context);
        const success = Math.random() < successChance;
        
        // Create history entry
        const historyEntry = new History({
            subject: actor.name,
            action: this.actionName,
            actionTarget: target ? target.name : 'none',
            witnesses: witnesses.map(w => w.name),
            emotionalWeight: this.emotionalWeight,
            socialWeight: this.socialWeight,
            success: success,
            context: context
        });
        
        // Apply emotional consequences
        const emotionalResults = {
            actor: success ? { ...this.successEmotions } : { ...this.failureEmotions },
            target: target ? { ...this.targetEmotions } : {},
            witnesses: witnesses.map(w => ({ ...this.witnessEmotions }))
        };
        
        // Modify emotions based on relationships and context
        if (target) {
            const relationship = actor.knowledge.getRelationship(target.name);
            Object.keys(emotionalResults.target).forEach(emotion => {
                emotionalResults.target[emotion] *= relationship.getEmotionalModifier(emotion);
            });
        }
        
        return {
            historyEntry,
            emotionalResults,
            success
        };
    }

    calculateSuccessChance(actor, target, context) {
        let baseChance = 0.7; // Default success rate
        
        // Physical factors
        baseChance *= actor.physicalState.getPerformanceModifier();
        
        // Skill factors
        Object.entries(this.skillRequirements).forEach(([skillName, requiredLevel]) => {
            const skill = actor.skills.get(skillName);
            if (skill) {
                const skillModifier = skill.level / requiredLevel;
                baseChance *= Math.min(1.2, skillModifier);
            }
        });
        
        // Emotional factors
        const emotionalState = actor.knowledge.getCurrentEmotionalState();
        this.emotionalTriggers.forEach(trigger => {
            if (emotionalState[trigger.emotion] > trigger.threshold) {
                baseChance *= trigger.modifier;
            }
        });
        
        // Target resistance (if applicable)
        if (target && this.targetTypes.includes('person')) {
            const targetResistance = target.physicalState.getPerformanceModifier() || 1.0;
            baseChance /= targetResistance;
        }
        
        return Math.max(0.05, Math.min(0.95, baseChance));
    }
}