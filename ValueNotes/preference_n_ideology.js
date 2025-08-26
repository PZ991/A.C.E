
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