// Using Operation class to make one variable affect another
let hungerAffectsEnergy = new Operation();
hungerAffectsEnergy.valuetarget = new Value('hunger', 0);        // Source variable
hungerAffectsEnergy.valuetarget2 = new Value('energy', 100);     // Target variable
hungerAffectsEnergy.activator.operation = 'minus';               // Hunger reduces energy
hungerAffectsEnergy.activator.activation = 'Always';             // Continuous effect







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