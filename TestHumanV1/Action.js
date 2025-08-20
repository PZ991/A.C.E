class Action {
    constructor(name) {
        this.actionName = name;
        this.actionAnimation = '';
        this.actionDescription = '';
        this.actionIKMask = []; //which IK should be affected
        this.actionMask = []; //which bones should be affected
        this.IKweights[[]]; //array of ik weight throughout the animation
        this.IKWeightTiming[[]]; //array of ik weight timing for the animation
        this.requirements = []; // What's needed to perform this action
        this.targetTypes = ['person', 'object', 'self']; // Valid targets
    }

    canPerform(actor, target = null) {
        // Check requirements, cooldown, etc.
        return this.requirements.every(req => actor.hasRequirement(req));
    }

    execute(actor, target = null) {
        // Create history entry
        const historyEntry = new History({ 
            subject: actor.name,
            action: this.actionName,
            actionTarget: target ? target.name : 'none',
        });
        
        return historyEntry;
    }
}
 



