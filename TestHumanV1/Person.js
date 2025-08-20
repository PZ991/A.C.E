class Person {
    constructor(name) {
        this.name = name;
        this.knowledge = new Knowledge();
        this.stability = 0.5; // Overall emotional stability
        this.intensity = 0.5; // Overall emotional intensity
        
        // Initialize basic emotions
        this.initializeEmotions();
    }

    initializeEmotions() {
        const basicEmotions = [
            'joy', 'sadness', 'anger', 'fear', 'surprise', 'disgust',
            'love', 'hate', 'pride', 'shame', 'guilt', 'excitement',
            'anxiety', 'relief', 'contentment', 'frustration'
        ];

        basicEmotions.forEach(emotionName => {
            const emotion = new Emotion(emotionName, this.stability, this.intensity);
            this.knowledge.emotions.set(emotionName, emotion);
        });
    }

    processAction(action, isSubject = true, target = null, witnesses = []) {
        // Create history entry
        const historyEntry = new History({
            subject: isSubject ? this.name : action.subject,
            action: action.actionName,
            actionTarget: target ? target.name : '',
            witnesses: witnesses.map(w => w.name),
            emotionalWeight: action.emotionalWeight,
            socialWeight: action.socialWeight
        });

        this.knowledge.addHistory(historyEntry);

        // Calculate emotional response based on relationship, ideologies, etc.
        const emotionalResponse = this.calculateEmotionalResponse(action, isSubject, target);
        
        // Apply emotional changes
        Object.entries(emotionalResponse).forEach(([emotionName, value]) => {
            const emotion = this.knowledge.emotions.get(emotionName);
            if (emotion && value !== 0) {
                emotion.addValue(value, action.actionName);
            }
        });

        // Update relationships
        if (target) {
            const relationship = this.knowledge.getRelationship(target.name);
            relationship.updateFromAction(action, isSubject, emotionalResponse);
        }

        return emotionalResponse;
    }

    calculateEmotionalResponse(action, isSubject, target) {
        const response = {};
        
        // Base response depends on action type and personal traits
        if (action.actionName === 'punch') {
            if (isSubject) {
                response.anger = 0.3; // Acting on anger
                response.satisfaction = 0.2;
            } else {
                response.fear = 0.6;
                response.anger = 0.4;
                response.surprise = 0.3;
            }
        }

        // Modify based on relationship
        if (target) {
            const relationship = this.knowledge.getRelationship(target.name);
            Object.keys(response).forEach(emotion => {
                response[emotion] *= relationship.getEmotionalModifier(emotion);
            });
        }

        // Modify based on ideologies
        this.knowledge.ideologies.forEach(ideology => {
            Object.keys(response).forEach(emotion => {
                response[emotion] *= ideology.getEmotionalModifier(emotion);
            });
        });

        return response;
    }

    getDominantEmotions(count = 2) {
        const activeEmotions = Array.from(this.knowledge.emotions.values())
            .filter(emotion => emotion.isActive())
            .sort((a, b) => b.currentValue - a.currentValue);
        
        return activeEmotions.slice(0, count);
    }

    getEmotionalMultiplier() {
        const dominantEmotions = this.getDominantEmotions();
        if (dominantEmotions.length === 0) return 1.0;
        
        if (dominantEmotions.length === 1) {
            return dominantEmotions[0].multiplier;
        }
        
        // Blend the top two emotions
        const [first, second] = dominantEmotions;
        return (first.multiplier + second.multiplier) / 2;
    }

    update(deltaTime) {
        // Update all emotions
        this.knowledge.emotions.forEach(emotion => emotion.update(deltaTime));
        
        // Update thoughts
        this.knowledge.thoughts.forEach(thought => thought.decay(deltaTime));
        
        // Update history
        this.knowledge.history.forEach(entry => entry.decay(deltaTime));
        
        // Generate new thoughts based on current state
        this.generateThoughts();
    }

    generateThoughts() {
        const dominantEmotions = this.getDominantEmotions();
        if (dominantEmotions.length > 0 && Math.random() < 0.1) {
            const emotion = dominantEmotions[0];
            const thought = new Thought(
                `I'm feeling very ${emotion.name}`,
                'emotional_state'
            );
            thought.emotionalCharge[emotion.name] = emotion.currentValue;
            this.knowledge.thoughts.push(thought);
        }
    }
}