class CompleteHuman {
    constructor(name, age = 25, backgroundData = {}) {
        this.name = name;
        this.age = age;
        
        // Initialize all subsystems
        this.personality = new Personality();
        this.physicalState = new PhysicalState();
        this.cognitiveState = new CognitiveState();
        this.socialState = new SocialState();
        this.motivationSystem = new MotivationSystem();
        this.communication = new Communication();
        this.knowledge = new Knowledge();
        
        // Collections
        this.skills = new Map();
        this.habits = [];
        this.routines = [];
        
        // Life context
        this.culture = backgroundData.culture || '';
        this.education = backgroundData.education || [];
        this.occupation = backgroundData.occupation || '';
        this.socioeconomicStatus = backgroundData.socioeconomicStatus || 50;
        this.livingEnvironment = backgroundData.livingEnvironment || '';
        
        // Development tracking
        this.lifeStage = this.getLifeStage(age);
        this.trauma = backgroundData.trauma || [];
        this.achievements = backgroundData.achievements || [];
        this.lifeEvents = backgroundData.lifeEvents || [];
        
        // Emergent properties
        this.worldview = backgroundData.worldview || {};
        this.mentalModels = new Map();
        this.coreValues = backgroundData.coreValues || [];
        this.identity = backgroundData.identity || [];
        
        // Initialize systems
        this.initializeEmotions();
        this.initializeSkills();
        this.developPersonalityFromBackground(backgroundData);
        this.createInitialGoals();
        this.establishInitialHabits();
    }

    getLifeStage(age) {
        if (age < 13) return 'child';
        if (age < 20) return 'adolescent';
        if (age < 30) return 'young_adult';
        if (age < 50) return 'adult';
        if (age < 65) return 'middle_aged';
        return 'elderly';
    }

    initializeEmotions() {
        const basicEmotions = [
            'joy', 'sadness', 'anger', 'fear', 'surprise', 'disgust',
            'love', 'hate', 'pride', 'shame', 'guilt', 'excitement',
            'anxiety', 'relief', 'contentment', 'frustration', 'curiosity',
            'loneliness', 'satisfaction', 'disappointment', 'gratitude',
            'envy', 'compassion', 'irritability', 'boredom', 'anticipation'
        ];

        basicEmotions.forEach(emotionName => {
            const emotion = new Emotion(emotionName, this.getEmotionalStability(), this.getEmotionalIntensity());
            this.setupEmotionEffects(emotion);
            this.knowledge.emotions.set(emotionName, emotion);
        });
    }

    getEmotionalStability() {
        // Base stability modified by personality
        return 0.5 + (this.personality.conscientiousness * 0.2) - (this.personality.neuroticism * 0.3);
    }

    getEmotionalIntensity() {
        // Base intensity modified by personality
        return 0.5 + (this.personality.neuroticism * 0.3) + (this.personality.extraversion * 0.1);
    }

    setupEmotionEffects(emotion) {
        // Define how each emotion affects other systems
        const effectMappings = {
            'anger': {
                physical: { arousal: 0.3, energy: 0.1 },
                cognitive: { focus: -0.2, reasoning: -0.1 },
                social: { assertiveness: 0.3, empathy: -0.2 }
            },
            'joy': {
                physical: { energy: 0.2, health: 0.05 },
                cognitive: { creativity: 0.2, optimism: 0.3 },
                social: { charisma: 0.2, socialEnergy: 0.1 }
            },
            'fear': {
                physical: { arousal: 0.4, strength: -0.1 },
                cognitive: { focus: -0.3, attention: 0.2 },
                social: { assertiveness: -0.3, socialAnxiety: 0.3 }
            },
            'sadness': {
                physical: { energy: -0.2, fatigue: 0.2 },
                cognitive: { focus: -0.1, rumination: 0.3 },
                social: { socialEnergy: -0.2, empathy: 0.1 }
            }
        };

        const effects = effectMappings[emotion.name];
        if (effects) {
            emotion.physicalEffects = effects.physical || {};
            emotion.cognitiveEffects = effects.cognitive || {};
            emotion.socialEffects = effects.social || {};
        }
    }

    initializeSkills() {
        const basicSkills = [
            'communication', 'basic_math', 'reading', 'social_interaction',
            'problem_solving', 'emotional_regulation', 'physical_coordination',
            'critical_thinking', 'creativity', 'leadership', 'empathy'
        ];
        
        basicSkills.forEach(skillName => {
            const baseLevel = 20 + (Math.random() * 30);
            const skill = new Skill(skillName, baseLevel);
            
            // Set emotional dependencies for skills
            this.setupSkillEmotionalDependencies(skill);
            this.skills.set(skillName, skill);
        });
    }

    setupSkillEmotionalDependencies(skill) {
        const dependencies = {
            'communication': { confidence: 0.3, anxiety: -0.2 },
            'social_interaction': { extraversion: 0.2, social_anxiety: -0.3 },
            'problem_solving': { curiosity: 0.2, frustration: -0.2 },
            'emotional_regulation': { anxiety: -0.1, mindfulness: 0.3 },
            'creativity': { joy: 0.2, boredom: -0.1, curiosity: 0.3 },
            'leadership': { confidence: 0.4, fear: -0.2 }
        };

        skill.emotionalDependency = dependencies[skill.name] || {};
    }

    developPersonalityFromBackground(backgroundData) {
        // Childhood experiences shape personality
        if (backgroundData.childhood === 'harsh') {
            this.personality.neuroticism += 0.2;
            this.personality.agreeableness -= 0.1;
            this.personality.confidence -= 0.15;
        } else if (backgroundData.childhood === 'nurturing') {
            this.personality.agreeableness += 0.15;
            this.personality.confidence += 0.1;
            this.personality.optimism += 0.2;
        }

        // Education affects personality
        if (this.education.length > 2) {
            this.personality.openness += 0.15;
            this.personality.curiosity += 0.1;
        }

        // Trauma creates lasting personality changes
        this.trauma.forEach(traumaEvent => {
            if (traumaEvent.severity > 0.7) {
                this.personality.neuroticism += 0.1;
                this.personality.confidence -= 0.1;
                
                // Create trauma-related emotional modifiers
                const relatedEmotion = this.getTraumaRelatedEmotion(traumaEvent.type);
                if (relatedEmotion) {
                    const emotion = this.knowledge.emotions.get(relatedEmotion);
                    if (emotion) {
                        emotion.thresholdActive -= 0.1; // Easier to trigger
                        emotion.intensity += 0.2; // More intense when triggered
                    }
                }
            }
        });
    }

    getTraumaRelatedEmotion(traumaType) {
        const mapping = {
            'abandonment': 'fear',
            'betrayal': 'distrust',
            'violence': 'fear',
            'loss': 'sadness',
            'humiliation': 'shame'
        };
        return mapping[traumaType];
    }

    createInitialGoals() {
        // Create age-appropriate and personality-driven goals
        const baseGoals = this.getBaseGoalsForLifeStage();
        
        baseGoals.forEach(goalData => {
            const goal = new Goal(goalData.name, goalData.priority, goalData.urgency);
            goal.type = goalData.type;
            goal.difficulty = goalData.difficulty;
            
            // Set emotional triggers based on personality
            this.setGoalEmotionalTriggers(goal);
            this.motivationSystem.goals.push(goal);
        });
    }

    getBaseGoalsForLifeStage() {
        const stageGoals = {
            'young_adult': [
                { name: 'find_career', priority: 0.8, urgency: 0.6, type: 'achievement', difficulty: 0.7 },
                { name: 'build_relationships', priority: 0.7, urgency: 0.4, type: 'social', difficulty: 0.5 },
                { name: 'gain_independence', priority: 0.9, urgency: 0.7, type: 'personal', difficulty: 0.6 }
            ],
            'adult': [
                { name: 'advance_career', priority: 0.7, urgency: 0.5, type: 'achievement', difficulty: 0.6 },
                { name: 'maintain_health', priority: 0.6, urgency: 0.3, type: 'survival', difficulty: 0.4 },
                { name: 'build_family', priority: 0.8, urgency: 0.5, type: 'social', difficulty: 0.7 }
            ],
            'middle_aged': [
                { name: 'secure_future', priority: 0.8, urgency: 0.6, type: 'security', difficulty: 0.5 },
                { name: 'mentor_others', priority: 0.5, urgency: 0.3, type: 'social', difficulty: 0.4 },
                { name: 'find_meaning', priority: 0.7, urgency: 0.4, type: 'self_actualization', difficulty: 0.8 }
            ]
        };
        
        return stageGoals[this.lifeStage] || stageGoals['adult'];
    }

    setGoalEmotionalTriggers(goal) {
        // Different personality types are motivated by different emotions
        if (this.personality.ambition > 0.7) {
            goal.emotionalTriggers.push({ emotion: 'determination', threshold: 0.5, multiplier: 0.3 });
        }
        
        if (this.personality.neuroticism > 0.6) {
            goal.emotionalTriggers.push({ emotion: 'anxiety', threshold: 0.4, multiplier: 0.2 });
        }
        
        if (this.personality.extraversion > 0.7 && goal.type === 'social') {
            goal.emotionalTriggers.push({ emotion: 'loneliness', threshold: 0.3, multiplier: 0.4 });
        }
    }

    establishInitialHabits() {
        // Create personality-driven habits
        const potentialHabits = [
            { name: 'morning_routine', strength: 0.3, frequency: 'daily' },
            { name: 'exercise', strength: 0.2, frequency: 'daily' },
            { name: 'social_media_check', strength: 0.4, frequency: 'hourly' },
            { name: 'evening_reflection', strength: 0.1, frequency: 'daily' },
            { name: 'procrastination', strength: 0.3, frequency: 'daily' }
        ];

        potentialHabits.forEach(habitData => {
            if (Math.random() < this.getHabitProbability(habitData.name)) {
                const habit = new Habit(habitData.name, habitData.strength);
                habit.frequency = habitData.frequency;
                this.setupHabitEmotionalTriggers(habit);
                this.habits.push(habit);
            }
        });
    }

    getHabitProbability(habitName) {
        const probabilities = {
            'morning_routine': this.personality.conscientiousness,
            'exercise': (this.personality.conscientiousness + this.physicalState.health / 100) / 2,
            'social_media_check': this.personality.extraversion * 0.8,
            'evening_reflection': this.personality.openness * 0.6,
            'procrastination': (1 - this.personality.conscientiousness) * 0.8
        };
        
        return probabilities[habitName] || 0.3;
    }

    setupHabitEmotionalTriggers(habit) {
        const triggers = {
            'exercise': [{ emotion: 'guilt', threshold: 0.4 }, { emotion: 'stress', threshold: 0.6 }],
            'social_media_check': [{ emotion: 'boredom', threshold: 0.3 }, { emotion: 'loneliness', threshold: 0.4 }],
            'procrastination': [{ emotion: 'anxiety', threshold: 0.5 }, { emotion: 'overwhelm', threshold: 0.4 }],
            'evening_reflection': [{ emotion: 'contemplation', threshold: 0.3 }]
        };

        habit.emotionalTriggers = triggers[habit.name] || [];
        
        // Set emotional rewards and costs
        if (habit.name === 'exercise') {
            habit.emotionalRewards = { satisfaction: 0.3, energy: 0.2 };
            habit.emotionalCosts = { guilt: 0.4, self_criticism: 0.3 };
        }
    }

    // === MAIN UPDATE LOOP ===
    update(deltaTime) {
        // Update all subsystems
        this.updatePhysicalState(deltaTime);
        this.updateCognitiveState(deltaTime);
        this.updateEmotionalState(deltaTime);
        this.updateSocialState(deltaTime);
        this.updateMotivationAndGoals(deltaTime);
        this.updateSkills(deltaTime);
        this.updateHabits(deltaTime);
        this.updateKnowledge(deltaTime);
        
        // Age-related changes
        this.processAging(deltaTime);
        
        // Generate new thoughts and process memories
        this.processThoughtsAndMemories(deltaTime);
        
        // Handle emotional combinations and cascades
        this.processEmotionalCombinations();
    }

    updatePhysicalState(deltaTime) {
        const emotionalState = this.knowledge.getCurrentEmotionalState();
        this.physicalState.update(deltaTime, emotionalState);
    }

    updateCognitiveState(deltaTime) {
        const emotionalState = this.knowledge.getCurrentEmotionalState();
        
        // Mental fatigue recovery
        this.cognitiveState.mentalFatigue = Math.max(0, 
            this.cognitiveState.mentalFatigue - (deltaTime * 0.01));
        
        // Emotional regulation attempts
        if (Object.values(emotionalState).some(val => val > 0.8)) {
            this.attemptEmotionalRegulation();
        }
    }

    updateEmotionalState(deltaTime) {
        // Update all emotions
        this.knowledge.emotions.forEach(emotion => {
            emotion.update(deltaTime, this);
        });
        
        // Process emotional contagion from social interactions
        this.processEmotionalContagion();
        
        // Apply thought-generated emotions
        this.applyThoughtEmotions();
    }

    updateSocialState(deltaTime) {
        // Social energy recovery/depletion
        if (this.socialState.loneliness > 50) {
            this.socialState.socialNeed = Math.min(100, this.socialState.socialNeed + (deltaTime * 0.1));
        }
        
        // Social anxiety affects social energy
        const socialAnxietyImpact = this.knowledge.emotions.get('anxiety')?.currentValue || 0;
        this.socialState.socialEnergy = Math.max(0, 
            this.socialState.socialEnergy - (socialAnxietyImpact * 0.01 * deltaTime));
    }

    updateMotivationAndGoals(deltaTime) {
        const emotionalState = this.knowledge.getCurrentEmotionalState();
        
        // Update motivation system from emotions
        this.motivationSystem.updateFromEmotions(emotionalState, deltaTime);
        
        // Update all goals
        this.motivationSystem.goals.forEach(goal => {
            goal.update(deltaTime, emotionalState);
            
            // Check for goal completion
            const completionEmotions = goal.checkCompletion();
            if (Object.keys(completionEmotions).length > 0) {
                this.applyEmotionalChanges(completionEmotions);
                this.motivationSystem.completedGoals.push(goal);
                this.motivationSystem.goals = this.motivationSystem.goals.filter(g => g !== goal);
            }
        });
    }

    updateSkills(deltaTime) {
        const emotionalState = this.knowledge.getCurrentEmotionalState();
        
        this.skills.forEach(skill => {
            skill.decay(deltaTime);
            
            // Passive skill improvement through daily use
            if (Math.random() < 0.01) { // 1% chance per update
                const improvement = skill.practice(0.1, 1.0, emotionalState);
                if (improvement > 0) {
                    this.applyEmotionalChanges({ satisfaction: 0.1 });
                }
            }
        });
    }

    updateHabits(deltaTime) {
        const emotionalState = this.knowledge.getCurrentEmotionalState();
        const context = this.getCurrentContext();
        
        this.habits.forEach(habit => {
            if (habit.shouldTrigger(context, emotionalState)) {
                const emotionalResults = habit.perform(emotionalState);
                this.applyEmotionalChanges(emotionalResults);
                
                // Create memory of habit performance
                this.recordHabitPerformance(habit);
            }
        });
    }

    updateKnowledge(deltaTime) {
        const emotionalState = this.knowledge.getCurrentEmotionalState();
        this.knowledge.updateFromEmotionalState(emotionalState, deltaTime);
        
        // Decay old memories and thoughts
        this.knowledge.thoughts.forEach(thought => thought.decay(deltaTime, emotionalState));
        this.knowledge.history.forEach(entry => entry.decay(deltaTime));
    }

    processAging(deltaTime) {
        this.age += deltaTime / (365 * 24 * 3600); // Convert to years
        
        // Physical decline with age
        if (this.age > 30) {
            const agingRate = (this.age - 30) * 0.0001;
            this.physicalState.strength = Math.max(10, this.physicalState.strength - agingRate);
            this.physicalState.agility = Math.max(10, this.physicalState.agility - agingRate);
        }
        
        // Cognitive changes
        if (this.age > 60) {
            const cognitiveDecline = (this.age - 60) * 0.0001;
            this.cognitiveState.memory = Math.max(20, this.cognitiveState.memory - cognitiveDecline);
        }
        
        // Wisdom increases
        const wisdom = Math.min(100, this.age * 0.5 + this.knowledge.lifeExperience);
        this.cognitiveState.reasoning = Math.max(this.cognitiveState.reasoning, wisdom);
    }

    processThoughtsAndMemories(deltaTime) {
        // Generate new thoughts based on current state
        if (Math.random() < 0.05) { // 5% chance per update
            this.generateContextualThought();
        }
        
        // Process active thoughts
        this.knowledge.thoughts.filter(t => t.isActive()).forEach(thought => {
            const triggeredEmotions = thought.access(this.knowledge.getCurrentEmotionalState());
            this.applyEmotionalChanges(triggeredEmotions);
        });
    }

    processEmotionalCombinations() {
        const emotionalState = this.knowledge.getCurrentEmotionalState();
        const combinations = EmotionCombinations.processEmotionalBlending(emotionalState);
        
        combinations.forEach(combination => {
            const combinedEmotion = this.knowledge.emotions.get(combination.emotion);
            if (combinedEmotion) {
                combinedEmotion.addValue(combination.intensity, 'emotional_combination', this);
            }
        });
    }

    // === BEHAVIORAL METHODS ===
    makeDecision(options, context = {}) {
        const emotionalState = this.knowledge.getCurrentEmotionalState();
        const prioritizedGoals = this.motivationSystem.prioritizeGoals(emotionalState);
        
        const scores = options.map(option => {
            let score = 0;
            
            // Personality influence
            score += this.personality.getDecisionModifier(option);
            
            // Emotional state influence
            score += this.getEmotionalDecisionModifier(option, emotionalState);
            
            // Physical capability
            score += this.physicalState.getPerformanceModifier() * (option.physicalDemand || 0);
            
            // Goal alignment
            score += prioritizedGoals.slice(0, 3).reduce((sum, goal) => {
                return sum + (option.supportsGoal?.(goal) ? goal.getScore(emotionalState) : 0);
            }, 0);
            
            // Habit influence
            const relatedHabit = this.habits.find(h => h.name.includes(option.type));
            if (relatedHabit) {
                score += relatedHabit.strength * 0.5;
            }
            
            // Social considerations
            score += this.socialState.getDecisionModifier(option, context);
            
            // Risk assessment based on personality and emotional state
            if (option.risk > 0.5) {
                const riskTolerance = this.personality.openness - this.personality.neuroticism;
                score += riskTolerance * option.risk;
            }
            
            return { option, score };
        });
        
        // Add impulsiveness randomness
        const randomFactor = this.personality.impulsiveness * 0.3;
        scores.forEach(s => s.score += (Math.random() - 0.5) * randomFactor);
        
        // Choose highest scoring option
        const chosen = scores.sort((a, b) => b.score - a.score)[0];
        
        // Record decision for future reference
        this.recordDecision(chosen.option, options, context);
        
        return chosen.option;
    }

    getEmotionalDecisionModifier(option, emotionalState) {
        let modifier = 0;
        
        // Different emotions bias different types of decisions
        if (emotionalState.anger > 0.6 && option.type === 'aggressive') {
            modifier += 0.4;
        }
        
        if (emotionalState.fear > 0.6 && option.type === 'risky') {
            modifier -= 0.5;
        }
        
        if (emotionalState.joy > 0.6 && option.type === 'social') {
            modifier += 0.3;
        }
        
        if (emotionalState.curiosity > 0.5 && option.type === 'exploratory') {
            modifier += 0.3;
        }
        
        return modifier;
    }

    performAction(action, target = null, witnesses = [], context = {}) {
        // Check if action can be performed
        if (!action.canPerform(this, target, context)) {
            return { success: false, reason: 'cannot_perform' };
        }
        
        // Execute the action
        const result = action.execute(this, target, witnesses, context);
        
        // Apply results to self
        this.applyEmotionalChanges(result.emotionalResults.actor);
        this.knowledge.addHistory(result.historyEntry, this.knowledge.getCurrentEmotionalState());
        
        // Apply results to target
        if (target && result.emotionalResults.target) {
            target.receiveActionEffects(action, result.emotionalResults.target, this);
        }
        
        // Apply results to witnesses
        witnesses.forEach((witness, index) => {
            if (result.emotionalResults.witnesses[index]) {
                witness.witnessAction(action, result.emotionalResults.witnesses[index], this, target);
            }
        });
        
        // Update skills based on action performance
        this.updateSkillsFromAction(action, result.success);
        
        return result;
    }

    receiveActionEffects(action, emotionalChanges, performer) {
        // Apply emotional changes
        this.applyEmotionalChanges(emotionalChanges);
        
        // Update relationship with performer
        const relationship = this.knowledge.getRelationship(performer.name);
        relationship.updateFromAction(action, false, emotionalChanges, { performer, recipient: this });
        
        // Create memory of the event
        const historyEntry = new History({
            subject: performer.name,
            action: action.actionName,
            actionTarget: this.name,
            emotionalWeight: action.emotionalWeight,
            socialWeight: action.socialWeight
        });
        
        this.knowledge.addHistory(historyEntry, this.knowledge.getCurrentEmotionalState());
        
        // Generate thoughts about the action
        this.generateThoughtAboutAction(action, performer, emotionalChanges);
    }

    witnessAction(action, emotionalChanges, performer, target) {
        // Witnesses experience emotional contagion and social learning
        this.applyEmotionalChanges(emotionalChanges);
        
        // Learn about the relationship between performer and target
        this.observeRelationshipDynamic(performer, target, action);
        
        // Create witness memory
        const historyEntry = new History({
            subject: performer.name,
            action: action.actionName,
            actionTarget: target ? target.name : 'none',
            witnesses: [this.name],
            emotionalWeight: action.emotionalWeight * 0.5, // Reduced impact for witnesses
            socialWeight: action.socialWeight
        });
        
        this.knowledge.addHistory(historyEntry, this.knowledge.getCurrentEmotionalState());
    }

    // === HELPER METHODS ===
    applyEmotionalChanges(emotionalChanges) {
        Object.entries(emotionalChanges).forEach(([emotionName, change]) => {
            const emotion = this.knowledge.emotions.get(emotionName);
            if (emotion && change !== 0) {
                emotion.addValue(change, 'external_event', this);
            }
        });
    }

    generateContextualThought() {
        const emotionalState = this.knowledge.getCurrentEmotionalState();
        const dominantEmotion = this.knowledge.getDominantEmotions(1)[0];
        
        if (dominantEmotion) {
            const thoughtContent = this.createEmotionalThought(dominantEmotion);
            const thought = new Thought(thoughtContent, 'emotional_state');
            thought.emotionalCharge[dominantEmotion.name] = dominantEmotion.currentValue * 0.5;
            thought.intensity = dominantEmotion.currentValue * 0.3;
            
            this.knowledge.thoughts.push(thought);
        }
    }

    createEmotionalThought(emotion) {
        const thoughtTemplates = {
            'joy': ["I feel really good about things", "Life is going well"],
            'sadness': ["Things feel overwhelming", "I wish things were different"],
            'anger': ["This situation is frustrating", "I don't like how this is going"],
            'fear': ["I'm worried about what might happen", "This feels dangerous"],
            'anxiety': ["I can't stop thinking about...", "What if something goes wrong?"],
            'loneliness': ["I wish I had someone to talk to", "I feel so alone"]
        };
        
        const templates = thoughtTemplates[emotion.name] || ["I'm feeling " + emotion.name];
        return templates[Math.floor(Math.random() * templates.length)];
    }

    generateThoughtAboutAction(action, performer, emotionalChanges) {
        const thoughtContent = `${performer.name} ${action.actionName} ${action.actionTarget || 'something'}`;
        const thought = new Thought(thoughtContent, 'social_observation');
        thought.emotionalCharge = { ...emotionalChanges };
        thought.importance = action.socialWeight;
        
        this.knowledge.thoughts.push(thought);
    }

    observeRelationshipDynamic(performer, target, action) {
        // Learn about how these two people interact
        const performerRel = this.knowledge.getRelationship(performer.name);
        const targetRel = this.knowledge.getRelationship(target.name);
        
        // Infer relationship quality from observed actions
        if (action.socialWeight > 0.5) {
            if (action.actionName.includes('help')) {
                performerRel.respect += 0.05;
            } else if (action.actionName.includes('hurt')) {
                performerRel.respect -= 0.1;
            }
        }
    }

    updateSkillsFromAction(action, success) {
        // Actions provide skill practice opportunities
        Object.entries(action.skillRequirements || {}).forEach(([skillName, requiredLevel]) => {
            const skill = this.skills.get(skillName);
            if (skill) {
                const practiceQuality = success ? 1.0 : 0.5;
                const improvement = skill.practice(0.1, practiceQuality, this.knowledge.getCurrentEmotionalState());
                
                if (improvement > 0.1) {
                    this.applyEmotionalChanges({ satisfaction: 0.2, confidence: 0.1 });
                }
            }
        });
    }

    recordDecision(chosenOption, allOptions, context) {
        // Record decision for learning and pattern recognition
        const decisionRecord = {
            options: allOptions.map(opt => opt.name || opt.type),
            chosen: chosenOption.name || chosenOption.type,
            context: context,
            emotionalState: { ...this.knowledge.getCurrentEmotionalState() },
            timestamp: Date.now()
        };
        
        // This could be used for learning decision patterns
        if (!this.knowledge.decisionHistory) {
            this.knowledge.decisionHistory = [];
        }
        this.knowledge.decisionHistory.push(decisionRecord);
    }

    recordHabitPerformance(habit) {
        const historyEntry = new History({
            subject: this.name,
            action: `performed_habit_${habit.name}`,
            emotionalWeight: 0.1,
            socialWeight: 0.0,
            memorability: 0.2
        });
        
        this.knowledge.addHistory(historyEntry, this.knowledge.getCurrentEmotionalState());
    }

    attemptEmotionalRegulation() {
        const emotionalState = this.knowledge.getCurrentEmotionalState();
        const strongestEmotion = Object.entries(emotionalState)
            .sort((a, b) => b[1] - a[1])[0];
        
        if (strongestEmotion && strongestEmotion[1] > 0.8) {
            const emotion = this.knowledge.emotions.get(strongestEmotion[0]);
            const targetIntensity = 0.6; // Try to reduce to manageable level
            
            this.cognitiveState.regulateEmotion(emotion, targetIntensity);
            
            // Regulation attempt can generate its own emotions
            if (emotion.currentValue < strongestEmotion[1]) {
                this.applyEmotionalChanges({ relief: 0.2, self_efficacy: 0.1 });
            } else {
                this.applyEmotionalChanges({ frustration: 0.1, helplessness: 0.05 });
            }
        }
    }

    processEmotionalContagion() {
        // This would be called when interacting with other people
        // Implementation depends on having access to other characters' emotional states
    }

    applyThoughtEmotions() {
        this.knowledge.thoughts.filter(t => t.isActive()).forEach(thought => {
            Object.entries(thought.emotionalCharge).forEach(([emotionName, charge]) => {
                const emotion = this.knowledge.emotions.get(emotionName);
                if (emotion) {
                    emotion.addValue(charge * 0.1, 'thought_trigger', this);
                }
            });
        });
    }

    getCurrentContext() {
        return {
            location: this.livingEnvironment,
            timeOfDay: this.physicalState.circadianPhase,
            socialSituation: this.socialState.socialEnergy > 50 ? 'social' : 'alone',
            physicalState: this.physicalState.energy > 50 ? 'energetic' : 'tired',
            emotionalState: this.knowledge.getCurrentEmotionalState()
        };
    }

    // === ADVANCED INTERACTION METHODS ===
    calculatePersonalityCompatibility(otherPerson) {
        // Calculate how well personalities mesh
        let compatibility = 0;
        
        // Complementary traits
        const extraversionDiff = Math.abs(this.personality.extraversion - otherPerson.personality.extraversion);
        compatibility += (1 - extraversionDiff) * 0.2; // Similar extraversion levels work well
        
        // Agreeableness compatibility
        const agreeablenessAvg = (this.personality.agreeableness + otherPerson.personality.agreeableness) / 2;
        compatibility += agreeablenessAvg * 0.3; // Higher mutual agreeableness = better compatibility
        
        // Neuroticism can create problems
        const neuroticismSum = this.personality.neuroticism + otherPerson.personality.neuroticism;
        compatibility -= neuroticismSum * 0.2; // High combined neuroticism reduces compatibility
        
        // Openness similarity
        const opennessDiff = Math.abs(this.personality.openness - otherPerson.personality.openness);
        compatibility += (1 - opennessDiff) * 0.1;
        
        // Conscientiousness balance
        const conscientiousnessAvg = (this.personality.conscientiousness + otherPerson.personality.conscientiousness) / 2;
        compatibility += conscientiousnessAvg * 0.2;
        
        return Math.max(0, Math.min(1, compatibility));
    }

    getSharedHistory(otherPerson) {
        // Find shared experiences
        const sharedEvents = this.knowledge.history.filter(event => 
            event.witnesses.includes(otherPerson.name) || 
            event.actionTarget === otherPerson.name ||
            (event.subject === otherPerson.name && event.actionTarget === this.name)
        );
        
        return {
            events: sharedEvents,
            relationshipLength: this.calculateRelationshipLength(otherPerson),
            significantEvents: sharedEvents.filter(e => e.significance > 0.7),
            positiveEvents: sharedEvents.filter(e => e.emotionalWeight > 0.3),
            negativeEvents: sharedEvents.filter(e => e.emotionalWeight < -0.3)
        };
    }

    calculateRelationshipLength(otherPerson) {
        const relationship = this.knowledge.getRelationship(otherPerson.name);
        const firstInteraction = relationship.history[0];
        if (firstInteraction) {
            return (Date.now() - firstInteraction.time) / (24 * 3600 * 1000); // Days
        }
        return 0;
    }

    calculateCurrentDynamic(relationship, compatibility) {
        // Determine current relationship dynamic
        let dynamic = 'neutral';
        
        if (relationship.relation > 0.7 && compatibility > 0.6) {
            dynamic = 'close_bond';
        } else if (relationship.relation < -0.5) {
            dynamic = relationship.fear > 0.5 ? 'fear_based_conflict' : 'antagonistic';
        } else if (relationship.trust > 0.6 && relationship.respect > 0.5) {
            dynamic = 'mutual_respect';
        } else if (relationship.familiarity > 0.8 && Math.abs(relationship.relation) < 0.3) {
            dynamic = 'comfortable_acquaintance';
        } else if (relationship.familiarity < 0.2) {
            dynamic = 'strangers';
        }
        
        return dynamic;
    }

    // === CONVERSATION AND DIALOGUE ===
    generateDialogue(topic, targetPerson, context = {}) {
        const emotionalState = this.knowledge.getCurrentEmotionalState();
        const relationship = this.knowledge.getRelationship(targetPerson.name);
        
        // Base response generation
        let response = {
            content: '',
            tone: 'neutral',
            length: 1.0,
            formality: this.communication.formality,
            directness: this.communication.directness,
            emotiveness: this.communication.emotiveness
        };
        
        // Modify based on current emotional state
        this.communication.modifyResponseForEmotions(response, emotionalState);
        this.communication.modifyResponseForPersonality(response, this.personality);
        
        // Relationship affects communication style
        if (relationship.familiarity > 0.7) {
            response.formality -= 0.2; // More casual with familiar people
        }
        
        if (relationship.fear > 0.5) {
            response.directness -= 0.3; // Less direct when afraid
            response.length *= 0.8; // Shorter responses
        }
        
        if (relationship.relation > 0.7) {
            response.emotiveness += 0.2; // More expressive with loved ones
        }
        
        // Generate actual content based on topic and context
        response.content = this.generateResponseContent(topic, targetPerson, response, context);
        
        return response;
    }

    generateResponseContent(topic, targetPerson, responseStyle, context) {
        // This is where you'd implement your actual dialogue generation
        // For now, a simplified version:
        
        const baseResponses = {
            'greeting': ["Hello", "Hi there", "Hey"],
            'question': ["I'm not sure about that", "Let me think", "That's interesting"],
            'compliment': ["Thank you", "That's kind of you", "I appreciate that"],
            'insult': ["That's not necessary", "I don't appreciate that", "That hurts"],
            'request': ["I'll consider it", "Maybe", "Let me think about it"]
        };
        
        let responses = baseResponses[topic] || ["I'm not sure what to say"];
        
        // Modify based on emotional state
        const emotionalState = this.knowledge.getCurrentEmotionalState();
        if (emotionalState.anger > 0.6) {
            responses = responses.map(r => r + "!");
        }
        if (emotionalState.sadness > 0.6) {
            responses = responses.map(r => r + "...");
        }
        if (emotionalState.joy > 0.6) {
            responses = responses.map(r => r + " :)");
        }
        
        return responses[Math.floor(Math.random() * responses.length)];
    }

    // === LEARNING AND ADAPTATION ===
    learnFromExperience(experience, outcome) {
        // Update mental models based on experience
        const experienceType = this.categorizeExperience(experience);
        
        if (!this.mentalModels.has(experienceType)) {
            this.mentalModels.set(experienceType, {
                successRate: 0.5,
                attempts: 0,
                successes: 0,
                lastUpdated: Date.now()
            });
        }
        
        const model = this.mentalModels.get(experienceType);
        model.attempts++;
        if (outcome.success) {
            model.successes++;
        }
        model.successRate = model.successes / model.attempts;
        model.lastUpdated = Date.now();
        
        // Update confidence in related skills
        if (outcome.skillsUsed) {
            outcome.skillsUsed.forEach(skillName => {
                const skill = this.skills.get(skillName);
                if (skill) {
                    if (outcome.success) {
                        skill.confidenceLevel = Math.min(1.0, skill.confidenceLevel + 0.05);
                    } else {
                        skill.confidenceLevel = Math.max(0.1, skill.confidenceLevel - 0.03);
                    }
                }
            });
        }
        
        // Emotional learning
        this.updateEmotionalAssociations(experience, outcome);
    }

    categorizeExperience(experience) {
        // Categorize experiences for mental model building
        if (experience.type === 'social') {
            return `social_${experience.action}_with_${experience.relationshipType}`;
        }
        if (experience.type === 'skill') {
            return `skill_${experience.skillName}_difficulty_${experience.difficulty}`;
        }
        if (experience.type === 'goal') {
            return `goal_${experience.goalType}_priority_${experience.priority}`;
        }
        
        return 'general_experience';
    }

    updateEmotionalAssociations(experience, outcome) {
        // Learn which emotions are associated with which outcomes
        const emotionalState = experience.emotionalState || {};
        
        Object.entries(emotionalState).forEach(([emotion, intensity]) => {
            if (intensity > 0.5) {
                const association = {
                    emotion: emotion,
                    context: experience.type,
                    outcome: outcome.success ? 'positive' : 'negative',
                    strength: intensity,
                    timestamp: Date.now()
                };
                
                if (!this.knowledge.emotionalAssociations) {
                    this.knowledge.emotionalAssociations = [];
                }
                this.knowledge.emotionalAssociations.push(association);
            }
        });
    }

    // === UTILITY METHODS ===
    hasRequirement(requirement) {
        // Check if person meets a specific requirement
        switch (requirement.type) {
            case 'skill':
                const skill = this.skills.get(requirement.skill);
                return skill && skill.level >= requirement.level;
            
            case 'physical':
                return this.physicalState[requirement.attribute] >= requirement.value;
            
            case 'emotional':
                const emotion = this.knowledge.emotions.get(requirement.emotion);
                return emotion && emotion.currentValue >= requirement.threshold;
            
            case 'social':
                return this.socialState[requirement.attribute] >= requirement.value;
            
            case 'relationship':
                const relationship = this.knowledge.getRelationship(requirement.target);
                return relationship[requirement.dimension] >= requirement.value;
            
            default:
                return true;
        }
    }

    getStatus() {
        // Get comprehensive status report
        const emotionalState = this.knowledge.getCurrentEmotionalState();
        const dominantEmotions = this.knowledge.getDominantEmotions(3);
        const primaryNeed = this.motivationSystem.getCurrentPrimaryNeed();
        const topGoals = this.motivationSystem.prioritizeGoals(emotionalState).slice(0, 3);
        
        return {
            basic: {
                name: this.name,
                age: Math.floor(this.age),
                lifeStage: this.lifeStage,
                health: this.physicalState.health,
                energy: this.physicalState.energy
            },
            emotional: {
                dominantEmotions: dominantEmotions.map(e => ({
                    name: e.name,
                    intensity: Math.round(e.currentValue * 100)
                })),
                stability: Math.round((dominantEmotions[0]?.stability || 0.5) * 100),
                regulation: Math.round(this.cognitiveState.emotionalRegulation)
            },
            social: {
                relationships: Array.from(this.knowledge.relationships.values())
                    .map(r => ({
                        name: r.targetName,
                        relation: Math.round(r.relation * 100),
                        trust: Math.round(r.trust * 100)
                    })),
                socialEnergy: Math.round(this.socialState.socialEnergy),
                charisma: Math.round(this.socialState.charisma)
            },
            motivation: {
                primaryNeed: primaryNeed,
                topGoals: topGoals.map(g => ({
                    name: g.name,
                    progress: Math.round(g.progress * 100),
                    motivation: Math.round(g.motivation * 100)
                }))
            },
            cognitive: {
                focus: Math.round(this.cognitiveState.focus),
                mentalFatigue: Math.round(this.cognitiveState.mentalFatigue),
                intelligence: Math.round(this.cognitiveState.intelligence)
            },
            personality: {
                extraversion: Math.round(this.personality.extraversion * 100),
                neuroticism: Math.round(this.personality.neuroticism * 100),
                openness: Math.round(this.personality.openness * 100),
                agreeableness: Math.round(this.personality.agreeableness * 100),
                conscientiousness: Math.round(this.personality.conscientiousness * 100)
            }
        };
    }

    // === EXAMPLE SCENARIO METHODS ===
    static createExampleScenario() {
        // Create example characters for testing
        const person1 = new CompleteHuman("Alice", 28, {
            culture: "Western",
            childhood: "nurturing",
            education: ["high_school", "college", "graduate"],
            socioeconomicStatus: 70,
            coreValues: ["achievement", "relationships", "creativity"],
            trauma: [],
            personality: {
                extraversion: 0.7,
                agreeableness: 0.8,
                conscientiousness: 0.6,
                neuroticism: 0.3,
                openness: 0.8
            }
        });

        const person2 = new CompleteHuman("Bob", 32, {
            culture: "Western",
            childhood: "harsh",
            education: ["high_school"],
            socioeconomicStatus: 40,
            coreValues: ["security", "control", "respect"],
            trauma: [{ type: "abandonment", severity: 0.8, age: 8 }],
            personality: {
                extraversion: 0.3,
                agreeableness: 0.4,
                conscientiousness: 0.7,
                neuroticism: 0.7,
                openness: 0.3
            }
        });

        const person3 = new CompleteHuman("Carol", 25, {
            culture: "Eastern",
            childhood: "structured",
            education: ["high_school", "college"],
            socioeconomicStatus: 60,
            coreValues: ["harmony", "family", "tradition"],
            trauma: [],
            personality: {
                extraversion: 0.5,
                agreeableness: 0.9,
                conscientiousness: 0.8,
                neuroticism: 0.4,
                openness: 0.6
            }
        });

        return { person1, person2, person3 };
    }

    static runExampleInteraction() {
        const { person1, person2, person3 } = CompleteHuman.createExampleScenario();
        
        // Example: Person1 punches Person2, Person3 witnesses
        const punchAction = new Action("punch");
        punchAction.emotionalWeight = 0.8;
        punchAction.socialWeight = 0.9;
        punchAction.physicalIntensity = 0.7;
        punchAction.targetEmotions = { fear: 0.6, anger: 0.4, surprise: 0.3 };
        punchAction.witnessEmotions = { shock: 0.5, anger: 0.3 };
        punchAction.successEmotions = { satisfaction: 0.3, guilt: 0.2 };
        
        // Set up initial relationship (person1 hates person2)
        const relationship12 = person1.knowledge.getRelationship("Bob");
        relationship12.relation = -0.8;
        relationship12.anger = 0.7;
        
        // Person3 fears person2
        const relationship32 = person3.knowledge.getRelationship("Bob");
        relationship32.fear = 0.6;
        relationship32.relation = -0.3;
        
        // Perform the action
        console.log("=== BEFORE ACTION ===");
        console.log("Person1 emotions:", person1.knowledge.getCurrentEmotionalState());
        console.log("Person2 emotions:", person2.knowledge.getCurrentEmotionalState());
        console.log("Person3 emotions:", person3.knowledge.getCurrentEmotionalState());
        
        const result = person1.performAction(punchAction, person2, [person3]);
        
        console.log("\n=== AFTER ACTION ===");
        console.log("Person1 emotions:", person1.knowledge.getCurrentEmotionalState());
        console.log("Person2 emotions:", person2.knowledge.getCurrentEmotionalState());
        console.log("Person3 emotions:", person3.knowledge.getCurrentEmotionalState());
        
        console.log("\n=== RELATIONSHIP CHANGES ===");
        console.log("Person1->Person2:", person1.knowledge.getRelationship("Bob"));
        console.log("Person2->Person1:", person2.knowledge.getRelationship("Alice"));
        console.log("Person3->Person1:", person3.knowledge.getRelationship("Alice"));
        console.log("Person3->Person2:", person3.knowledge.getRelationship("Bob"));
        
        return { person1, person2, person3, result };
    }
}



// Example usage:
// const human = new CompleteHuman("John", 30);
// human.update(1000); // Update for 1 second
// console.log(human.getStatus());
// 
// const { person1, person2, person3 } = CompleteHuman.createExampleScenario();
// CompleteHuman.runExampleInteraction();
