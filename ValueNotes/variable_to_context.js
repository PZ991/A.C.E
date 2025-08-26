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