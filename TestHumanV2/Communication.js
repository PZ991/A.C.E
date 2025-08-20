class Communication {
    constructor() {
        this.languages = new Map();
        this.vocabulary = 1000;
        this.eloquence = 50;
        this.persuasiveness = 50;
        this.storytelling = 50;
        this.listening = 50;
        this.nonverbalReading = 50;
        
        // Communication style
        this.directness = 0.5;
        this.formality = 0.5;
        this.emotiveness = 0.5;
        this.verbosity = 0.5;
        
        // Current state
        this.topicsOfInterest = [];
        this.conversationEnergy = 100;
        this.lastSpeaker = '';
        this.currentTopic = '';
        
        // Emotional integration
        this.emotionalExpression = 0.7; // How much emotions show in speech
        this.emotionalSensitivity = 0.6; // How well they read others' emotions
    }

    generateResponse(input, context, emotionalState, personality) {
        const baseResponse = this.processInput(input);
        
        // Emotional state affects communication
        this.modifyResponseForEmotions(baseResponse, emotionalState);
        this.modifyResponseForPersonality(baseResponse, personality);
        
        return baseResponse;
    }

    modifyResponseForEmotions(response, emotionalState) {
        // Anger makes responses more aggressive and shorter
        if (emotionalState.anger > 0.7) {
            response.tone = 'aggressive';
            response.length *= 0.7;
            response.directness += 0.3;
        }
        
        // Joy makes responses more enthusiastic and longer
        if (emotionalState.joy > 0.7) {
            response.enthusiasm += 0.3;
            response.positivity += 0.4;
            response.length *= 1.2;
        }
        
        // Fear makes responses more cautious and formal
        if (emotionalState.fear > 0.6) {
            response.formality += 0.2;
            response.assertiveness -= 0.3;
        }
        
        // Sadness makes responses shorter and less expressive
        if (emotionalState.sadness > 0.6) {
            response.length *= 0.8;
            response.emotiveness -= 0.3;
        }
    }
}