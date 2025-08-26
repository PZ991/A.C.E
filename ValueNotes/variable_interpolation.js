// value_interpolation.js - Smoothly transitioning between value states

let gradualChange = new Operation();
gradualChange.activator.activation = 'Always';
gradualChange.activator.operation = 'add_continuous';
gradualChange.valuetarget = new Value('stress_level', 80);
gradualChange.valuetarget2 = new Value('relaxation', -2);

let transitionMemory = new Memory();
transitionMemory.key = 'state_transition';
transitionMemory.tags.types = ['transition', 'gradual'];
transitionMemory.variables_affected = [
    new Value('current_state', 'transitioning'),
    new Value('transition_progress', 25)
];

let smoothOperation = new Operation();
smoothOperation.activator.activation = 'Always';  
smoothOperation.activator.operation = 'multiply_continuous';
smoothOperation.valuetarget = new Value('energy_recovery', 5);
smoothOperation.valuetarget2 = new Value('rest_multiplier', 1.2);

let completionMemory = new Memory();
completionMemory.key = 'transition_complete';
completionMemory.tags.types = ['completion', 'stable'];
completionMemory.variables_needed = [
    new Value('transition_progress', 90)
];
completionMemory.variables_affected = [
    new Value('state_stability', 100),
    new Value('current_state', 'stable')
];