class MotivationSystem {
    constructor() {
        // Maslow's hierarchy
        this.physiological = 100;
        this.safety = 100;
        this.belongingness = 50;
        this.esteem = 50;
        this.selfActualization = 50;
        
        // Drive states
        this.ambition = 0.5;
        this.curiosity = 0.5;
        this.socialDrive = 0.5;
        this.powerDrive = 0.5;
        this.creationDrive = 0.5;
        
        // Goal management
        this.goals = [];
        this.activeGoals = [];
        this.completedGoals = [];
        this.abandonedGoals = [];
        
        // Motivation factors
        this.hopefulness = 0.5;
        this.persistence = 0.5;
        this.rewardSensitivity = 0.5;
    }

    getCurrentPrimaryNeed() {
        if (this.physiological < 50) return 'physiological';
        if (this.safety < 50) return 'safety';
        if (this.belongingness < 50) return 'belongingness';
        if (this.esteem < 50) return 'esteem';
        return 'selfActualization';
    }

    prioritizeGoals(emotionalState) {
        return this.goals
            .map(goal => ({ goal, score: goal.getScore(emotionalState) }))
            .sort((a, b) => b.score - a.score)
            .map(item => item.goal);
    }

    updateFromEmotions(emotionalState, deltaTime) {
        // Emotions affect motivation levels
        if (emotionalState.hopelessness > 0.7) {
            this.hopefulness = Math.max(0.1, this.hopefulness - (0.01 * deltaTime));
        }
        
        if (emotionalState.pride > 0.5) {
            this.esteem = Math.min(100, this.esteem + (0.5 * deltaTime));
        }
        
        if (emotionalState.loneliness > 0.6) {
            this.belongingness = Math.max(0, this.belongingness - (0.3 * deltaTime));
        }
    }
}