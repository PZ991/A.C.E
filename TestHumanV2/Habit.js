class Habit {
    constructor(name, strength = 0.1) {
        this.name = name;
        this.strength = strength;
        this.trigger = '';
        this.routine = '';
        this.reward = '';
        this.frequency = 'daily';
        this.lastPerformed = 0;
        this.streak = 0;
        this.disrupted = false;
        
        this.formationRate = 0.01;
        this.resistanceToChange = 0.5;
        
        // Emotional integration
        this.emotionalTriggers = []; // Emotions that trigger this habit
        this.emotionalRewards = {}; // Emotions gained from performing habit
        this.emotionalCosts = {}; // Emotions from breaking habit
    }

    shouldTrigger(context, emotionalState) {
        const timeSinceLastPerformed = Date.now() - this.lastPerformed;
        const timeThreshold = this.getTimeThreshold();
        
        const timeCondition = timeSinceLastPerformed > timeThreshold;
        const contextCondition = this.checkTriggerConditions(context);
        
        // Check emotional triggers
        const emotionalCondition = this.emotionalTriggers.some(trigger => 
            emotionalState[trigger.emotion] > trigger.threshold
        );
        
        return timeCondition && (contextCondition || emotionalCondition);
    }

    perform(emotionalState) {
        this.lastPerformed = Date.now();
        this.streak++;
        this.strength = Math.min(1.0, this.strength + this.formationRate);
        
        // Return emotional effects
        return { ...this.emotionalRewards };
    }

    disrupt(emotionalState) {
        this.disrupted = true;
        this.streak = 0;
        this.strength = Math.max(0, this.strength - 0.1);
        
        // Return emotional costs of breaking habit
        return { ...this.emotionalCosts };
    }

    getTimeThreshold() {
        const frequencyMap = {
            'hourly': 3600000,
            'daily': 86400000,
            'weekly': 604800000,
            'monthly': 2629746000
        };
        return frequencyMap[this.frequency] || 86400000;
    }

    checkTriggerConditions(context) {
        // Implementation depends on specific trigger conditions
        return true; // Simplified
    }
}