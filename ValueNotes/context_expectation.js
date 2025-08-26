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
