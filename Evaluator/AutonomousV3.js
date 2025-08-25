// ========== 1. VARIABLES AFFECTING OTHER VARIABLES TO CHANGE ==========

// Using Operation class to make one variable affect another
let hungerAffectsEnergy = new Operation();
hungerAffectsEnergy.valuetarget = new Value('hunger', 0);        // Source variable
hungerAffectsEnergy.valuetarget2 = new Value('energy', 100);     // Target variable
hungerAffectsEnergy.activator.operation = 'minus';               // Hunger reduces energy
hungerAffectsEnergy.activator.activation = 'Always';             // Continuous effect

// UNIFIED MEMORY SYSTEM - One memory that handles sequence, relationships, and outputs
let stressfulWorkdayMemory = new Memory();

// 1. SEQUENCE: What happened step by step (the story/events)
stressfulWorkdayMemory.sequence = [
    new Value('deadline_pressure', 80),      // First: high pressure from deadline
    new Value('interruptions', 60),          // Then: constant interruptions
    new Value('criticism_received', 70),     // Then: received harsh criticism
    new Value('overwhelm_feeling', 90)       // Finally: feeling completely overwhelmed
];

// 2. VARIABLES AFFECTED: What this memory impacts (the consequences)
stressfulWorkdayMemory.variables_affected = [
    new Value('happiness', 50),              // Stress memory reduces happiness
    new Value('health', 80),                 // Affects physical health
    new Value('focus', 60),                  // Reduces ability to focus
    new Value('confidence', 45),             // Lowers self-confidence
    new Value('sleep_quality', 30)           // Disrupts sleep
];

// 3. VARIABLES NEEDED: What conditions must exist for this memory to form/activate
stressfulWorkdayMemory.variables_needed = [
    new Value('work_environment', 1),        // Must be at work
    new Value('stress_threshold', 70),       // Stress must exceed threshold
    new Value('mental_energy', 40)           // Must have enough mental energy to process
];

// This single Memory object now demonstrates:
// - Sequential events that build up (sequence)
// - Multiple variables that get impacted (variables_affected) 
// - Prerequisites for the memory to matter (variables_needed)
// All working together as one coherent system

// ========== 2. SEQUENCE INTERCONNECTION ==========

// Memory sequences that build up over time
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