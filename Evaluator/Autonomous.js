// CATEGORY CLASSIFICATION
// An entity dynamically categorizes objects by creating contextual groupings
function createCategory(entity, categoryName) {
    let categoryContext = new ContextValue();
    categoryContext.contextname = categoryName;
    categoryContext.tags = new MultiType();
    categoryContext.tags.types = ['category_marker'];
    categoryContext.tags.mode = 'dynamic';
    
    // Entity adds objects to category based on shared characteristics
    categoryContext.embedded_values = []; // Will contain references to similar objects
    return categoryContext;
}

// GROUP CLASSIFICATION BY SHARED VARIABLES
// Entity automatically groups objects with similar variable ranges
function autoGroupByVariable(entity, targetVariable) {
    let groupingContext = new ContextValue();
    groupingContext.contextname = `grouped_by_${targetVariable}`;
    
    // Entity scans environment and finds objects with similar values
    groupingContext.valuesconnected = [targetVariable];
    groupingContext.comparisonType = ['inrange'];
    groupingContext.requirementLevel = ['required'];
    groupingContext.extraConsiderationRange = [0.2]; // 20% tolerance
    
    return groupingContext;
}

// ACTION-VALUE CONTEXT FOR DECISION MAKING
// Entity weighs actions against current values and contexts
function createActionValueContext(entity, action, currentValues) {
    let decisionContext = new ContextValue();
    decisionContext.contextname = 'action_evaluation';
    decisionContext.embedded_values = currentValues;
    decisionContext.embedded_operations = [action];
    
    // Entity predicts outcome based on current state
    let predictedOutcome = new Value();
    predictedOutcome.key = 'predicted_satisfaction';
    predictedOutcome.value = entity.calculateActionSatisfaction(action);
    
    decisionContext.targetValue = [predictedOutcome];
    decisionContext.comparisonType = ['grth'];
    decisionContext.requirementLevel = ['required'];
    
    return decisionContext;
}

// EMOTION IN CONTEXT
// Entity processes emotions as contextual modifiers for decisions
function createEmotionalContext(entity, emotionType, intensity) {
    let emotionalContext = new ContextValue();
    emotionalContext.contextname = `emotion_${emotionType}`;
    
    let emotionValue = new Value();
    emotionValue.key = emotionType;
    emotionValue.value = intensity;
    emotionalContext.embedded_values = [emotionValue];
    
    // Emotions influence other contexts through tags
    emotionalContext.tags = new MultiType();
    emotionalContext.tags.types = [emotionType, 'emotional_state'];
    
    return emotionalContext;
}

// EMOTIONAL DILUTION
// Entity automatically reduces emotional intensity over time
function applyEmotionalDilution(entity, emotionalContext) {
    let dilutionOperation = new Operation();
    dilutionOperation.activator = new Activator();
    dilutionOperation.activator.activation = 'Always';
    dilutionOperation.activator.operation = 'multiply_continuous';
    
    let decayRate = new Value();
    decayRate.key = 'emotional_decay';
    decayRate.value = 0.99; // 1% reduction per cycle
    
    dilutionOperation.valuetarget2 = decayRate;
    emotionalContext.embedded_operations.push(dilutionOperation);
}

// EXPECTED VALUES AND IMPACT SYSTEM
// Entity calculates expected outcomes and their impacts
function createImpactExpectationSystem(entity) {
    entity.expectedOutcomes = [];
    
    function calculateExpectedImpact(targetValue, proposedOperation) {
        let impactContext = new ContextValue();
        impactContext.contextname = 'impact_prediction';
        
        let expectedChange = new Value();
        expectedChange.key = 'predicted_change';
        expectedChange.value = entity.simulateOperation(targetValue, proposedOperation);
        
        impactContext.embedded_values = [expectedChange];
        impactContext.valuesconnected = [targetValue];
        
        return impactContext;
    }
    
    return calculateExpectedImpact;
}

// IMPORTANCE, MORALITY, AND COMFORT SYSTEM
// Entity weighs decisions against personal value systems
function createValueJudgmentSystem(entity) {
    let moralityContext = new ContextValue();
    moralityContext.contextname = 'moral_evaluation';
    
    let importanceWeight = new Value('importance', 0.0);
    let moralityWeight = new Value('morality', 0.0);
    let comfortWeight = new Value('comfort', 0.0);
    
    moralityContext.embedded_values = [importanceWeight, moralityWeight, comfortWeight];
    
    // Entity sets thresholds based on current ideology
    moralityContext.targetValue = [
        entity.ideology.calculateMoralThreshold(),
        entity.calculateImportanceThreshold(),
        entity.calculateComfortThreshold()
    ];
    
    return moralityContext;
}

// SEQUENCE STRUCTURING (NESTED CONTEXTS)
// Entity creates sequences of contexts leading to outcomes
function createContextSequence(entity, goalContext) {
    let sequenceContext = new ContextValue();
    sequenceContext.contextname = 'sequence_to_goal';
    
    // Entity breaks down goal into sequential steps
    let steps = entity.decomposeGoal(goalContext);
    
    steps.forEach((step, index) => {
        let stepContext = new ContextValue();
        stepContext.contextname = `step_${index}`;
        stepContext.embedded_values = step.requiredValues;
        stepContext.embedded_operations = step.requiredOperations;
        
        // Link to next step
        if (index < steps.length - 1) {
            stepContext.convertible = true; // Becomes next step when complete
        }
        
        sequenceContext.embedded_operations.push(stepContext);
    });
    
    return sequenceContext;
}

// HANDLING OPPOSING CONTEXTS
// Entity resolves conflicts between contradictory contexts
function resolveOpposingContexts(entity, context1, context2) {
    let resolutionContext = new ContextValue();
    resolutionContext.contextname = 'conflict_resolution';
    
    // Entity weighs contexts against personal values
    let context1Weight = entity.evaluateContextAgainstValues(context1);
    let context2Weight = entity.evaluateContextAgainstValues(context2);
    
    if (context1Weight > context2Weight) {
        resolutionContext.embedded_operations = context1.embedded_operations;
        resolutionContext.dissipationvalueranges = context2.embedded_values;
    } else {
        resolutionContext.embedded_operations = context2.embedded_operations;
        resolutionContext.dissipationvalueranges = context1.embedded_values;
    }
    
    return resolutionContext;
}

// LIMITING NESTED CONTEXTS
// Entity prevents infinite context nesting through depth tracking
function limitContextNesting(entity, context, maxDepth = 5) {
    let currentDepth = entity.calculateContextDepth(context);
    
    if (currentDepth >= maxDepth) {
        // Entity simplifies by collapsing nested contexts
        let simplifiedContext = new ContextValue();
        simplifiedContext.contextname = 'simplified_' + context.contextname;
        simplifiedContext.embedded_values = entity.flattenContextValues(context);
        return simplifiedContext;
    }
    
    return context;
}

// DYNAMIC CONTEXT CREATION
// Entity generates new contexts based on environmental changes
function createDynamicContext(entity, environmentChange) {
    let dynamicContext = new ContextValue();
    dynamicContext.contextname = `dynamic_${Date.now()}`;
    
    // Entity analyzes change and creates appropriate response
    let relevantMemories = entity.findRelevantMemories(environmentChange);
    dynamicContext.embedded_memories = relevantMemories;
    
    let adaptiveValues = entity.generateAdaptiveValues(environmentChange);
    dynamicContext.embedded_values = adaptiveValues;
    
    return dynamicContext;
}

// PROXIMITY-BASED CONTEXT INFLUENCE
// Entity's contexts are influenced by nearby entities and objects
function applyProximityInfluence(entity, nearbyEntities) {
    nearbyEntities.forEach(otherEntity => {
        let distance = entity.position.distance(otherEntity.position);
        let influenceStrength = Math.max(0, 1 - (distance / entity.socialInfluenceRadius));
        
        otherEntity.activeContexts.forEach(context => {
            if (influenceStrength > 0.3) { // Minimum influence threshold
                let influencedContext = entity.adoptPartialContext(context, influenceStrength);
                entity.temporaryContexts.push(influencedContext);
            }
        });
    });
}

// SOCIAL CONTEXT SHARING
// Entity shares and validates contexts with others
function shareContextSocially(entity, context, targetEntity) {
    let socialValidationContext = new ContextValue();
    socialValidationContext.contextname = 'social_validation';
    
    let sharedContext = entity.createContextCopy(context);
    let validationResponse = targetEntity.evaluateSharedContext(sharedContext);
    
    if (validationResponse.acceptance > 0.5) {
        // Entity gains confidence in context
        context.embedded_values.forEach(value => {
            value.value *= (1 + validationResponse.acceptance * 0.1);
        });
    } else {
        // Entity questions context validity
        entity.addDoubtToContext(context, validationResponse.rejection);
    }
    
    return socialValidationContext;
}

// FUTURE EXPECTATION INFLUENCE
// Entity's current decisions are influenced by predicted future contexts
function incorporateFutureExpectations(entity, currentDecision) {
    let futureContext = new ContextValue();
    futureContext.contextname = 'future_prediction';
    
    let predictedFutureState = entity.predictFutureState(currentDecision);
    let futureRegretPotential = entity.calculateRegretPotential(predictedFutureState);
    
    let futureWeight = new Value();
    futureWeight.key = 'future_impact_weight';
    futureWeight.value = 1 - futureRegretPotential; // Lower regret = higher weight
    
    futureContext.embedded_values = [futureWeight];
    entity.currentDecisionContext.embedded_operations.push(futureContext);
}

// REGRET AND SATISFACTION SYSTEM
// Entity tracks and learns from past decision outcomes
function processDecisionOutcome(entity, pastDecision, actualOutcome) {
    let outcomeEvaluation = new ContextValue();
    outcomeEvaluation.contextname = 'outcome_evaluation';
    
    let expectedOutcome = pastDecision.predictedOutcome;
    let satisfactionLevel = entity.calculateSatisfaction(expectedOutcome, actualOutcome);
    let regretLevel = entity.calculateRegret(pastDecision.alternativeOptions, actualOutcome);
    
    // Create learning memory
    let outcomeMemory = new Memory();
    outcomeMemory.tags.types = ['decision_outcome', pastDecision.contextType];
    outcomeMemory.impact_memorability.value = Math.abs(satisfactionLevel - 0.5) * 2;
    
    outcomeMemory.variables_affected = [
        {name: 'satisfaction', value: satisfactionLevel},
        {name: 'regret', value: regretLevel}
    ];
    
    entity.long_term_memory.addMemory(outcomeMemory);
    
    // Adjust future similar decisions
    entity.adjustDecisionWeights(pastDecision.contextType, satisfactionLevel);
}

// MEMORY MERGING AND STRENGTHENING
// Entity automatically combines related memories for stronger patterns
function processMemoryConsolidation(entity) {
    entity.memories.forEach((memory, index) => {
        let similarMemories = entity.findSimilarMemories(memory);
        
        if (similarMemories.length > 2) {
            // Create consolidated memory
            let consolidatedMemory = new Memory();
            consolidatedMemory.tags = entity.mergeMemoryTags(similarMemories);
            consolidatedMemory.impact_memorability.value = entity.calculateMergedImpact(similarMemories);
            
            // Strengthen consolidated memory
            consolidatedMemory.decay_rate.value *= 0.5; // Slower decay for consolidated memories
            
            // Replace individual memories with consolidated one
            entity.replaceMemoriesWithConsolidated(similarMemories, consolidatedMemory);
        }
    });
}

// IDEOLOGICAL DILEMMA HANDLING
// Entity handles situations where no choice aligns with ideology
function handleIdeologicalDilemma(entity, availableActions) {
    let dilemmaContext = new ContextValue();
    dilemmaContext.contextname = 'ideological_dilemma';
    
    // Entity evaluates each action against ideology
    let actionEvaluations = availableActions.map(action => {
        return {
            action: action,
            ideologyAlignment: entity.ideology.evaluateAction(action),
            necessityScore: entity.calculateActionNecessity(action)
        };
    });
    
    // Find least harmful option
    let leastWorstAction = actionEvaluations.reduce((prev, current) => {
        let prevScore = prev.ideologyAlignment * prev.necessityScore;
        let currentScore = current.ideologyAlignment * current.necessityScore;
        return currentScore > prevScore ? current : prev;
    });
    
    // Create compromise context
    let compromiseContext = new ContextValue();
    compromiseContext.contextname = 'ideological_compromise';
    compromiseContext.embedded_operations = [leastWorstAction.action];
    
    // Record moral weight of compromise
    let moralBurden = new Value();
    moralBurden.key = 'moral_compromise_weight';
    moralBurden.value = 1 - leastWorstAction.ideologyAlignment;
    
    compromiseContext.embedded_values = [moralBurden];
    
    return compromiseContext;
}

// EXAMPLE USAGE: AUTONOMOUS ENTITY BEHAVIOR
class AutonomousEntity extends Entity {
    constructor() {
        super();
        this.activeContexts = [];
        this.temporaryContexts = [];
        this.currentDecisionContext = null;
        this.ideology = new Ideology();
        this.socialInfluenceRadius = 50;
    }
    
    // Entity's main decision-making loop
    makeAutonomousDecision(environment) {
        // 1. Assess current situation
        let situationContext = this.assessSituation(environment);
        
        // 2. Generate possible actions
        let availableActions = this.generatePossibleActions(environment);
        
        // 3. Evaluate each action through multiple contexts
        let bestAction = null;
        let bestScore = -Infinity;
        
        availableActions.forEach(action => {
            let actionScore = 0;
            
            // Emotional influence
            let emotionalWeight = this.getEmotionalWeight(action);
            actionScore += emotionalWeight;
            
            // Moral evaluation
            let moralScore = this.ideology.evaluateAction(action);
            actionScore += moralScore;
            
            // Future expectation
            let futureScore = this.predictFutureOutcome(action);
            actionScore += futureScore;
            
            // Social validation potential
            let socialScore = this.predictSocialValidation(action);
            actionScore += socialScore;
            
            if (actionScore > bestScore) {
                bestScore = actionScore;
                bestAction = action;
            }
        });
        
        // 4. Execute best action and learn from outcome
        this.executeAction(bestAction);
        this.scheduleOutcomeEvaluation(bestAction);
        
        return bestAction;
    }
}