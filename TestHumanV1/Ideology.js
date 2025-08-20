class Ideology {
    constructor(name, strength = 0.5) {
        this.name = name;
        this.strength = strength; // How strongly held (0-1)
        this.flexibility = 0.5; // How easily changed (0-1)
        this.core = false; // Is this a core belief?
        this.relatedEmotions = []; // Which emotions this affects
        this.conflictsWith = []; // Other ideologies this conflicts with
        this.supports = []; // Other ideologies this supports
        this.formationTime = Date.now();
        this.reinforcementCount = 0;
        this.challengeCount = 0;
    }

    challenge(amount) {
        this.challengeCount++;
        if (this.flexibility > 0.3) {
            this.strength = Math.max(0.1, this.strength - (amount * this.flexibility));
        }
    }

    reinforce(amount) {
        this.reinforcementCount++;
        this.strength = Math.min(1.0, this.strength + (amount * (1 - this.flexibility)));
    }

    getEmotionalModifier(emotionName) {
        if (this.relatedEmotions.includes(emotionName)) {
            return this.strength;
        }
        return 1.0;
    }
}