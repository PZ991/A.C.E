class Skill {
    constructor(name, level = 0, category = 'general') {
        this.name = name;
        this.level = level;
        this.experience = 0;
        this.category = category;
        this.learningRate = 1.0;
        this.decay = 0.001;
        this.lastUsed = Date.now();
        this.talent = 0.5;
        this.interest = 0.5;
        this.plateauThreshold = 70;
        
        // Emotional integration
        this.emotionalDependency = {}; // Which emotions help/hurt this skill
        this.confidenceLevel = 0.5; // How confident they feel using this skill
    }

    practice(duration, quality = 1.0, emotionalState = {}) {
        this.lastUsed = Date.now();
        
        // Calculate all modifiers
        const talentModifier = 1 + (this.talent * 0.5);
        const interestModifier = 1 + (this.interest * 0.3);
        const plateauModifier = this.level > this.plateauThreshold ? 0.5 : 1.0;
        
        // Emotional effects on learning
        let emotionalModifier = 1.0;
        Object.entries(this.emotionalDependency).forEach(([emotion, effect]) => {
            if (emotionalState[emotion]) {
                emotionalModifier += (emotionalState[emotion] * effect);
            }
        });
        
        // Confidence affects performance
        const confidenceModifier = 0.5 + (this.confidenceLevel * 0.5);
        
        const experience = duration * quality * talentModifier * interestModifier * 
                          plateauModifier * emotionalModifier * confidenceModifier;
        
        this.experience += experience;
        const oldLevel = this.level;
        this.level = Math.min(100, Math.sqrt(this.experience / 10));
        
        // Successful practice builds confidence
        if (this.level > oldLevel) {
            this.confidenceLevel = Math.min(1.0, this.confidenceLevel + 0.01);
        }
        
        return this.level - oldLevel; // Return improvement for emotional rewards
    }

    use(difficulty, emotionalState = {}) {
        // Using a skill can generate emotions
        const successChance = Math.min(0.95, this.level / difficulty);
        const success = Math.random() < successChance;
        
        const emotionalResults = {};
        
        if (success) {
            emotionalResults.satisfaction = 0.3;
            emotionalResults.confidence = 0.2;
            if (difficulty > this.level * 0.8) {
                emotionalResults.pride = 0.4; // Pride from overcoming challenge
            }
        } else {
            emotionalResults.frustration = 0.4;
            emotionalResults.disappointment = 0.3;
            if (this.confidenceLevel > 0.7) {
                emotionalResults.surprise = 0.2; // Surprise if they expected to succeed
            }
        }
        
        return { success, emotionalResults };
    }
}