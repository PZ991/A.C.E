// ========== 1. VARIABLES AFFECTING OTHER VARIABLES TO CHANGE ==========

// Using Operation class to make one variable affect another
let hungerAffectsEnergy = new Operation();
hungerAffectsEnergy.valuetarget = new Value('hunger', 0);        // Source variable
hungerAffectsEnergy.valuetarget2 = new Value('energy', 100);     // Target variable
hungerAffectsEnergy.activator.operation = 'minus';               // Hunger reduces energy
hungerAffectsEnergy.activator.activation = 'Always';             // Continuous effect

// ========== RELATING MEMORIES TO EACH OTHER ==========

// Using Memory tags and names to create relationships between memories
let childhoodTrauma = new Memory();
childhoodTrauma.names = ['betrayal', 'abandonment', 'trust_broken'];
childhoodTrauma.tags.types = ['childhood', 'negative', 'formative'];
childhoodTrauma.variables_affected = [
    new Value('trust_others', 20),      // Low trust
    new Value('attachment_style', 10)   // Avoidant attachment
];

// Related memory that references the first one
let adultRelationship = new Memory();
adultRelationship.names = ['current_relationship', 'romantic_partner'];
adultRelationship.tags.types = ['adult', 'relationship', 'trust_issues'];
adultRelationship.variables_needed = [
    new Value('trust_others', 20),      // Needs the trust value from childhood trauma
    new Value('attachment_style', 10)   // Needs attachment style
];
// This memory is triggered when trust_others is low (from childhood trauma)

// Third memory that builds on both previous memories
let therapyMemory = new Memory();
therapyMemory.names = ['healing', 'therapy_session', 'breakthrough'];
therapyMemory.tags.types = ['healing', 'positive', 'growth'];
therapyMemory.variables_needed = [
    new Value('trust_others', 20),      // References childhood trauma effect
    new Value('relationship_stress', 70) // References adult relationship issues
];
therapyMemory.variables_affected = [
    new Value('trust_others', 45),      // Healing increases trust
    new Value('self_awareness', 80),    // Gains self-awareness
    new Value('emotional_regulation', 60) // Better emotional control
];

// Using Memory's variables_affected for complex relationships
let stressMemory = new Memory();
stressMemory.names = ['work_stress', 'pressure', 'overwhelm'];
stressMemory.variables_affected = [
    new Value('happiness', 50),     // Stress affects happiness
    new Value('health', 80),        // Stress affects health
    new Value('focus', 60)          // Stress affects focus
];

// Using Memory sequence with operations for complex memory processing
let exerciseMemory = new Memory();
exerciseMemory.names = ['exercise_routine', 'workout', 'fitness_journey'];
exerciseMemory.sequence = [
    // Step 1: Initial resistance and motivation check
    {
        operation1: new Operation(), // Check current motivation level
        operation2: new Operation()  // Check physical readiness
    },
    // Step 2: During exercise - multiple simultaneous effects
    {
        operation1: new Operation(), // Stamina decreases
        operation2: new Operation()  // Endorphins increase
    },
    // Step 3: Post-exercise - complex recovery and adaptation
    {
        operation1: new Operation(), // Fitness gradually improves
        operation2: new Operation(), // Mood boost from accomplishment
        operation3: new Operation()  // Habit strength increases
    }
];

// Memory sequence that creates lasting change through variables_affected (output_variables equivalent)
let learningMemory = new Memory();
learningMemory.names = ['learning_experience', 'skill_acquisition', 'knowledge_gain'];
// ========== MEMORY SEQUENCES AND INTERCONNECTIONS ==========

// Memory sequence showing how one memory triggers a cascade of related memories
let traumaSequence = new Memory();
traumaSequence.names = ['trauma_cascade', 'ptsd_development'];
traumaSequence.sequence = [
    new Value('initial_trauma', 100),    // The triggering event
    new Value('shock_response', 95),     // Immediate shock
    new Value('denial_phase', 70),       // Denial and numbness
    new Value('emotional_flooding', 85), // Overwhelming emotions
    new Value('hypervigilance', 90),     // Heightened alertness
    new Value('avoidance_patterns', 75)  // Final avoidance behaviors
];
traumaSequence.variables_affected = [
    new Value('trauma_symptoms', 85),    // Overall trauma impact
    new Value('emotional_regulation', 25), // Reduced emotional control
    new Value('trust_in_safety', 15)     // Lost sense of safety
];

// Memory that gets triggered by the trauma sequence
let healingMemory = new Memory();
healingMemory.names = ['trauma_recovery', 'healing_journey'];
healingMemory.variables_needed = [
    new Value('trauma_symptoms', 85),     // Triggered when trauma is high
    new Value('support_system', 60)       // Needs support to activate
];
healingMemory.sequence = [
    new Value('acknowledgment', 30),      // First step: acknowledge trauma
    new Value('professional_help', 50),   // Seek therapy
    new Value('processing_emotions', 40), // Work through feelings
    new Value('integration', 65),         // Integrate experience
    new Value('post_traumatic_growth', 75) // Growth beyond original state
];
healingMemory.variables_affected = [
    new Value('trauma_symptoms', 35),     // Reduces trauma symptoms
    new Value('emotional_regulation', 70), // Improves regulation
    new Value('resilience', 85),          // Builds resilience
    new Value('wisdom', 80)               // Gains wisdom from experience
];

// Memory referencing system using tags and names for interconnection
let childhoodMemoryCore = new Memory();
childhoodMemoryCore.names = ['childhood_foundation', 'early_experiences'];
childhoodMemoryCore.tags.types = ['childhood', 'formative', 'core_identity'];
childhoodMemoryCore.flexible = true; // Allows connection to related unmentioned tags
childhoodMemoryCore.variables_affected = [
    new Value('core_identity', 70),
    new Value('attachment_patterns', 60),
    new Value('worldview_foundation', 65)
];

// Related memories that reference the core childhood memory
let schoolMemory = new Memory();
schoolMemory.names = ['school_experiences', 'academic_identity'];
schoolMemory.tags.types = ['childhood', 'academic', 'social_development'];
schoolMemory.variables_needed = [
    new Value('core_identity', 70),       // Builds on core identity
    new Value('attachment_patterns', 60)  // Uses attachment patterns
];
schoolMemory.variables_affected = [
    new Value('intellectual_confidence', 75),
    new Value('social_skills', 55),
    new Value('achievement_orientation', 80)
];

let familyMemory = new Memory();
familyMemory.names = ['family_dynamics', 'family_relationships'];
familyMemory.tags.types = ['childhood', 'family', 'relational_patterns'];
familyMemory.variables_needed = [
    new Value('attachment_patterns', 60), // Core dependency
    new Value('worldview_foundation', 65) // Shapes family view
];
familyMemory.variables_affected = [
    new Value('relationship_expectations', 70),
    new Value('conflict_resolution_style', 55),
    new Value('emotional_expression', 65)
];

// Adult memories that reference childhood foundation
let careerMemory = new Memory();
careerMemory.names = ['career_development', 'professional_identity'];
careerMemory.tags.types = ['adult', 'professional', 'achievement'];
careerMemory.variables_needed = [
    new Value('intellectual_confidence', 75), // From school memory
    new Value('achievement_orientation', 80), // From school memory
    new Value('core_identity', 70)           // From childhood core
];
careerMemory.variables_affected = [
    new Value('professional_competence', 85),
    new Value('work_life_balance', 45),
    new Value('leadership_skills', 60)
];

// Memory exclusion system - memories that cancel each other out
let positiveChildhood = new Memory();
positiveChildhood.names = ['happy_childhood', 'secure_upbringing'];
positiveChildhood.tags.types = ['childhood', 'positive', 'secure'];
positiveChildhood.variables_affected = [
    new Value('baseline_happiness', 80),
    new Value('trust_in_others', 85),
    new Value('optimism', 75)
];

let negativeChildhood = new Memory();
negativeChildhood.names = ['difficult_childhood', 'childhood_trauma'];
negativeChildhood.tags.types = ['childhood', 'negative', 'trauma'];
negativeChildhood.exclude_names = ['happy_childhood', 'secure_upbringing']; // Cannot coexist
negativeChildhood.exclude_tags.types = ['positive', 'secure']; // Excludes positive tags
negativeChildhood.variables_affected = [
    new Value('baseline_happiness', 35),  // Opposite effect from positive childhood
    new Value('trust_in_others', 25),
    new Value('hypervigilance', 90)
];

// Memory chain: Each memory builds on the previous one
let memoryChain1 = new Memory();
memoryChain1.names = ['first_heartbreak', 'romantic_loss'];
memoryChain1.tags.types = ['emotional', 'loss', 'formative'];
memoryChain1.variables_affected = [
    new Value('romantic_optimism', 30),  // Reduces optimism about love
    new Value('emotional_walls', 70)     // Builds emotional barriers
];

let memoryChain2 = new Memory();
memoryChain2.names = ['second_relationship', 'cautious_love'];
memoryChain2.tags.types = ['emotional', 'relationship', 'guarded'];
memoryChain2.variables_needed = [
    new Value('romantic_optimism', 30),  // Triggered by low optimism from first memory
    new Value('emotional_walls', 70)     // Affected by barriers from first memory
];
memoryChain2.variables_affected = [
    new Value('trust_slowly', 85),       // Learns to trust gradually
    new Value('communication_skills', 60) // Develops better communication
];

let memoryChain3 = new Memory();
memoryChain3.names = ['healthy_relationship', 'mature_love'];
memoryChain3.tags.types = ['emotional', 'growth', 'healing'];
memoryChain3.variables_needed = [
    new Value('trust_slowly', 85),        // Built from previous relationship
    new Value('communication_skills', 60), // Learned from previous experience
    new Value('emotional_walls', 70)      // Still dealing with barriers
];
memoryChain3.variables_affected = [
    new Value('romantic_optimism', 80),   // Restored optimism
    new Value('emotional_walls', 30),     // Reduced barriers
    new Value('relationship_wisdom', 90)  // Gained wisdom
];

// Parallel memory system: Multiple memories affecting same variables
let academicMemory = new Memory();
academicMemory.names = ['school_success', 'academic_achievement'];
academicMemory.tags.types = ['achievement', 'intellectual', 'positive'];
academicMemory.variables_affected = [
    new Value('self_confidence', 75),
    new Value('intellectual_identity', 80)
];

let socialMemory = new Memory();
socialMemory.names = ['peer_acceptance', 'social_belonging'];
socialMemory.tags.types = ['social', 'belonging', 'positive'];
socialMemory.variables_affected = [
    new Value('self_confidence', 65),     // Same variable as academic memory
    new Value('social_identity', 70)
];

// Conflicting memory system: Memories that compete or contradict
let parentalPraise = new Memory();
parentalPraise.names = ['parental_approval', 'family_pride'];
parentalPraise.tags.types = ['family', 'validation', 'conditional'];
parentalPraise.variables_affected = [
    new Value('self_worth', 80),
    new Value('need_approval', 90)        // Creates dependency on external validation
];

let parentalCriticism = new Memory();
parentalCriticism.names = ['parental_disappointment', 'family_shame'];
parentalCriticism.tags.types = ['family', 'criticism', 'painful'];
parentalCriticism.exclude_names = ['parental_approval']; // Conflicts with praise memory
parentalCriticism.variables_affected = [
    new Value('self_worth', 25),          // Directly conflicts with praise memory
    new Value('perfectionism', 95),       // Creates perfectionist tendencies
    new Value('fear_of_failure', 85)      // Creates fear
];

// Memory network with emotional connections
let firstLove = new Memory();
firstLove.names = ['first_love', 'puppy_love', 'innocent_romance'];
firstLove.emotions_affected = [
    {emotion: new Value('joy', 95), target: new Value('romantic_memories', 0)},
    {emotion: new Value('vulnerability', 80), target: new Value('emotional_openness', 0)}
];
firstLove.variables_affected = [
    new Value('capacity_for_love', 90),
    new Value('romantic_idealism', 95)
];

// Memory that references and modifies other memories
let wisdomMemory = new Memory();
wisdomMemory.names = ['life_reflection', 'gained_wisdom', 'perspective'];
wisdomMemory.tags.types = ['wisdom', 'integration', 'maturity'];
wisdomMemory.variables_needed = [
    new Value('romantic_optimism', 80),    // From healed relationship memory
    new Value('relationship_wisdom', 90),  // From mature relationship
    new Value('self_confidence', 75),      // From academic/social memories
    new Value('capacity_for_love', 90)     // From first love memory
];
wisdomMemory.variables_affected = [
    new Value('life_satisfaction', 85),    // Overall contentment
    new Value('emotional_intelligence', 90), // High EQ from all experiences
    new Value('resilience', 80)            // Strength from overcoming challenges
];

// Cyclical memory system: Memories that reinforce each other
let anxietyMemory = new Memory();
anxietyMemory.names = ['anxiety_attack', 'panic_episode'];
anxietyMemory.tags.types = ['anxiety', 'fear', 'physical'];
anxietyMemory.variables_affected = [
    new Value('anxiety_sensitivity', 85),  // Increases sensitivity to anxiety
    new Value('avoidance_behavior', 70)    // Creates avoidance patterns
];

let avoidanceMemory = new Memory();
avoidanceMemory.names = ['avoided_situation', 'missed_opportunity'];
avoidanceMemory.tags.types = ['avoidance', 'safety', 'limitation'];
avoidanceMemory.variables_needed = [
    new Value('avoidance_behavior', 70)    // Triggered by avoidance from anxiety memory
];
avoidanceMemory.variables_affected = [
    new Value('anxiety_sensitivity', 90),  // Reinforces anxiety (cyclical)
    new Value('self_efficacy', 40),        // Reduces sense of capability
    new Value('regret', 60)                // Creates regret
];

// Breaking the cycle memory
let exposureMemory = new Memory();
exposureMemory.names = ['faced_fear', 'courage_moment', 'breakthrough'];
exposureMemory.tags.types = ['courage', 'growth', 'healing'];
exposureMemory.variables_needed = [
    new Value('anxiety_sensitivity', 90),  // High anxiety makes this meaningful
    new Value('regret', 60)                // Regret motivates facing fear
];
exposureMemory.variables_affected = [
    new Value('anxiety_sensitivity', 60),  // Reduces anxiety sensitivity
    new Value('self_efficacy', 75),        // Increases capability belief
    new Value('courage', 80),              // Builds courage for future
    new Value('avoidance_behavior', 30)    // Reduces avoidance patterns
];

// ========== 2. SEQUENCE INTERCONNECTION ==========

// Memory sequences that build up over time with operations
let learningSequence = new Memory();
learningSequence.sequence = [
    new Value('attention', 70),     // First: pay attention
    new Value('understanding', 0),  // Then: understand
    new Value('retention', 0),      // Finally: retain
    new Value('skill_level', 30)    // Result: skill increases
];

// Action combo sequences
let combatCombo = new Action();
combatCombo.combo_actions = [
    // Reference to other Action objects that chain together
    // Each action in sequence affects the next
];

// Memory sequence in actions for complex behaviors
let socialInteraction = new Action();
socialInteraction.memory_sequence = [
    // References to Memory objects that must be recalled in order
];

// ========== 3. VARIABLE LIMIT/THRESHOLD ==========

// Using Activator for threshold-based activation
let healthThreshold = new Activator();
healthThreshold.operation = 'less than';          // Activate when health drops
healthThreshold.activation = 'Always';            // Continuous monitoring
healthThreshold.distancevalmin = 0.2;             // 20% threshold
healthThreshold.mindistance = 20;                 // Health value of 20

// Using ContextValue for complex thresholds
let dangerContext = new ContextValue();
dangerContext.valuesconnected = [new Value('health', 25), new Value('enemies_nearby', 3)];
dangerContext.comparisonType = ['lsth', 'grth'];         // Health less than, enemies greater than
dangerContext.targetValue = [30, 1];                    // Thresholds: health < 30, enemies > 1
dangerContext.requirementLevel = ['required', 'required']; // Both must be met

// ========== 4. VARIABLE MULTIPLIER ==========

// Using Activator distance values as multipliers
let proximityMultiplier = new Activator();
proximityMultiplier.distancevalmin = 0.5;        // 50% effect at min distance
proximityMultiplier.distancevalmax = 2.0;        // 200% effect at max distance
proximityMultiplier.operation = 'multiply';       // Multiply the target value

// Using ContextValue extraConsiderationRange for multiplier effects
let emotionalMultiplier = new ContextValue();
emotionalMultiplier.extraConsiderationRange = [1.5, 0.8, 2.0]; // Multipliers for different conditions

// ========== 5. VARIABLE COOLDOWN/COUNTER ==========

// Using Memory decay_rate for cooldowns
let abilityCooldown = new Memory();
abilityCooldown.decay_rate = new Value('cooldown_rate', 0.1);  // Decays 10% per time unit

// Using continuous operations in Activator for counters
let counterOperation = new Activator();
counterOperation.operation = 'add_continuous';     // Continuously add to counter
counterOperation.activation = 'Always';            // Always active

// ========== 6. PREFERENCE ==========

// Using Ideology for value-based preferences
let personalIdeology = new Ideology();
personalIdeology.good_values = [
    new Value('kindness', 80),      // Highly values kindness
    new Value('honesty', 70),       // Values honesty
    new Value('courage', 60)        // Values courage
];
personalIdeology.bad_values = [
    new Value('cruelty', 90),       // Strongly dislikes cruelty
    new Value('dishonesty', 70)     // Dislikes dishonesty
];

// Using ContextValue requirement levels for preferences
let socialPreference = new ContextValue();
socialPreference.requirementLevel = ['required', 'minor', 'not_required'];
// 'required' = must have, 'minor' = nice to have, 'not_required' = don't care

// Using Memory impact_memorability for preference strength
let importantMemory = new Memory();
importantMemory.impact_memorability = new Value('importance', 95); // Very important = strong preference

// ========== 7. CHOICES ==========

// Using Action targetTypes for choice options
let interactionChoice = new Action();
interactionChoice.targetTypes = ['person', 'object', 'self']; // Can choose between these

// Using MultiType for choice combinations
let dialogChoice = new MultiType();
dialogChoice.types = ['friendly', 'neutral', 'hostile'];    // Three dialogue choices
dialogChoice.mode = 'static';                               // Must pick one exactly

// ========== 8. VARIABLE COMPARISON ==========

// Using ContextValue for detailed comparisons
let skillComparison = new ContextValue();
skillComparison.valuesconnected = [new Value('player_skill', 75), new Value('opponent_skill', 60)];
skillComparison.comparisonType = ['grth', 'equal'];         // Greater than, equal to
skillComparison.targetValue = [50, 75];                    // Compare against these values

// Using Activator for simple comparisons
let simpleComparison = new Activator();
simpleComparison.operation = 'greater than';               // Simple comparison operator
simpleComparison.activation = 'Onhit';                     // When to compare

// ========== 9. VARIABLE ACTIVATION ==========

// Using various activation types in Activator
let hitActivation = new Activator();
hitActivation.activation = 'Onhit';                         // Activate when hit

let continuousActivation = new Activator();
continuousActivation.activation = 'Always';                // Always active

let proximityActivation = new Activator();
proximityActivation.activation = 'inradius';               // Activate when in range
proximityActivation.maxdistance = 50;                      // Within 50 units

// Using MultiType activatedby for conditional activation
let conditionalActivation = new Activator();
conditionalActivation.activatedby = new MultiType();
conditionalActivation.activatedby.types = ['enemy', 'friend']; // Activated by these types

// ========== 10. VARIABLE ACTIVATION UPON COMPARISON ==========

// Combining Activator comparison with activation
let comparisonActivation = new Activator();
comparisonActivation.operation = 'less than';              // Compare: less than
comparisonActivation.activation = 'Always';                // Check continuously
comparisonActivation.mindistance = 25;                     // Threshold value
// This activates when target value drops below 25

// Using ContextValue embedded_operations for complex activation
let contextActivation = new ContextValue();
contextActivation.embedded_operations = [
    // Operations that activate when context conditions are met
];
contextActivation.comparisonType = ['grth'];               // Comparison that triggers activation
contextActivation.targetValue = [80];                      // Activation threshold

// ========== 11. MEMORY SEQUENCING/NESTED LEADING TO VARIABLE CHANGE ==========

// Complex memory sequence leading to behavior change
let traumaSequence = new Memory();
traumaSequence.sequence = [
    new Value('witnessed_violence', 1),     // First memory in sequence
    new Value('fear_response', 50),         // Leads to fear
    new Value('avoidance_behavior', 30),    // Then avoidance
    new Value('trust_issues', 70)           // Finally affects trust
];
traumaSequence.variables_affected = [
    new Value('social_confidence', 40),     // End result: reduced confidence
    new Value('paranoia', 20)               // Increased paranoia
];

// Using ContextValue embedded_memories for nested memory effects
let nestedMemoryContext = new ContextValue();
nestedMemoryContext.embedded_memories = [
    // Array of Memory references that work together
];
nestedMemoryContext.embedded_values = [
    new Value('final_personality_trait', 0) // The variable that gets changed
];

// ========== 12. EXPECTATION EFFECTS VARIABLE BY MULTIPLIER ==========

// Using Memory impact_memorability as expectation strength
let expectationMemory = new Memory();
expectationMemory.impact_memorability = new Value('expectation_strength', 85); // Strong expectation
expectationMemory.variables_affected = [
    new Value('performance', 70)            // Expectation affects performance
];

// Using Activator distance values as expectation multipliers
let expectationMultiplier = new Activator();
expectationMultiplier.operation = 'multiply';              // Multiply the effect
expectationMultiplier.distancevalmin = 0.5;                // Low expectation = 50% effect
expectationMultiplier.distancevalmax = 1.8;                // High expectation = 180% effect

// Using ContextValue extraConsiderationRange for expectation effects
let expectationContext = new ContextValue();
expectationContext.extraConsiderationRange = [1.2, 0.9, 1.5]; // Different expectation multipliers

// ========== 13. VARIABLES AFFECTING OTHER VARIABLES (Enhanced) ==========

// Complex multi-variable relationships using ContextValue
let multiVariableEffect = new ContextValue();
multiVariableEffect.embedded_values = [
    new Value('stress', 60),                // Input variable 1
    new Value('fatigue', 40),               // Input variable 2
    new Value('workload', 80)               // Input variable 3
];
multiVariableEffect.embedded_operations = [
    // Operations that use these variables to affect others
];

// Using Action output_variables for multiple simultaneous effects
let complexAction = new Action();
complexAction.output_variables = [
    {name: new Value('health', 100), operation: 'minus', operand: new Value('damage', 15)},
    {name: new Value('experience', 50), operation: 'add', operand: new Value('xp_gain', 10)},
    {name: new Value('stamina', 80), operation: 'multiply', operand: new Value('fatigue_factor', 0.9)}
];

// ========== COMPLETE INTERCONNECTED MEMORY SYSTEM EXAMPLE ==========

// Creating a complex character with interconnected memories
let characterMemorySystem = {
    // Core foundational memories
    coreMemories: [childhoodMemoryCore, familyMemory, schoolMemory],
    
    // Trauma and healing cycle
    traumaCycle: [traumaSequence, healingMemory],
    
    // Relationship progression
    relationshipJourney: [memoryChain1, memoryChain2, memoryChain3],
    
    // Anxiety-avoidance-courage cycle
    anxietyCycle: [anxietyMemory, avoidanceMemory, exposureMemory],
    
    // Current adult functioning
    adultMemories: [careerMemory, wisdomMemory]
};

// How memories reference and affect each other:
// 1. childhoodMemoryCore affects schoolMemory and familyMemory
// 2. schoolMemory affects careerMemory 
// 3. traumaSequence can trigger healingMemory
// 4. memoryChain1 affects memoryChain2 which affects memoryChain3
// 5. anxietyMemory creates avoidanceMemory which can trigger exposureMemory
// 6. All experiences eventually contribute to wisdomMemory

// This shows how your Memory system can create rich, interconnected psychological profiles!

// ========== 14. MULTIPLE VARIABLES MAKE UP CONTEXT AND TURN INTO THAT CONTEXT ==========

// Using ContextValue to combine multiple variables into a new context
let combatReadinessContext = new ContextValue();
combatReadinessContext.contextname = 'combat_ready';

// Multiple variables that make up this context
combatReadinessContext.valuesconnected = [
    new Value('weapon_equipped', 1),        // Has weapon
    new Value('health', 75),                // Good health
    new Value('stamina', 60),               // Enough stamina
    new Value('morale', 50)                 // Decent morale
];

// How to compare each variable
combatReadinessContext.comparisonType = ['equal', 'grth', 'grth', 'grth'];
combatReadinessContext.targetValue = [1, 50, 40, 30];
combatReadinessContext.requirementLevel = ['required', 'required', 'minor', 'minor'];

// The new context value that replaces the individual variables
combatReadinessContext.embedded_values = [
    new Value('combat_readiness', 85)       // The resulting context value
];

// Enable conversion from multiple variables to single context
combatReadinessContext.convertible = true; // When conditions met, becomes combat_readiness value

// Another example: Emotional state context
let emotionalStateContext = new ContextValue();
emotionalStateContext.contextname = 'depressed';
emotionalStateContext.valuesconnected = [
    new Value('happiness', 30),             // Low happiness
    new Value('energy', 25),                // Low energy  
    new Value('social_connection', 20),     // Low social connection
    new Value('hope', 15)                   // Low hope
];
emotionalStateContext.comparisonType = ['lsth', 'lsth', 'lsth', 'lsth']; // All less than
emotionalStateContext.targetValue = [40, 35, 30, 25];
emotionalStateContext.requirementLevel = ['required', 'required', 'minor', 'minor'];
emotionalStateContext.embedded_values = [
    new Value('depression_level', 75)       // Becomes depression context
];
emotionalStateContext.convertible = true;

// ========== PUTTING IT ALL TOGETHER: COMPLETE EXAMPLE ==========

// A character with interconnected systems
let gameCharacter = new Entity();

// 1. Basic stats affect each other
let hungerSystem = new Operation();
hungerSystem.valuetarget = gameCharacter.values[0];  // Hunger value
hungerSystem.valuetarget2 = gameCharacter.values[1]; // Energy value  
hungerSystem.activator.operation = 'minus_continuous';
hungerSystem.activator.activation = 'Always';

// 2. Memory of trauma affects behavior
let traumaMemory = new Memory();
traumaMemory.sequence = [
    new Value('betrayal_witnessed', 1),
    new Value('trust_broken', 80),
    new Value('defensive_behavior', 60)
];
traumaMemory.variables_affected = [
    gameCharacter.values.find(v => v.key === 'trust_others')
];

// 3. Context that emerges from multiple conditions
let leadershipContext = new ContextValue();
leadershipContext.valuesconnected = [
    new Value('charisma', 70),
    new Value('intelligence', 65), 
    new Value('experience', 80),
    new Value('confidence', 75)
];
leadershipContext.convertible = true;
leadershipContext.embedded_values = [
    new Value('leadership_ability', 85)
];

// 4. Actions with complex outcomes
let diplomaticAction = new Action();
diplomaticAction.requirements = [leadershipContext]; // Needs leadership context
diplomaticAction.output_variables = [
    {name: new Value('reputation', 60), operation: 'add', operand: new Value('', 15)},
    {name: new Value('diplomatic_skill', 40), operation: 'add', operand: new Value('', 5)}
];

// This shows how all the systems work together using only the existing classes!