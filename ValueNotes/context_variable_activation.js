// conditional_value_activation.js - Values that only activate under specific contexts

let stealthContext = new ContextValue();
stealthContext.contextname = 'stealth_mode';
stealthContext.tags.types = ['stealth', 'hidden'];
stealthContext.valuesconnected = [new Value('visibility', 20)];
stealthContext.comparisonType = ['lsth'];
stealthContext.requirementLevel = ['required'];
stealthContext.targetValue = [new Value('detection_threshold', 30)];

let stealthMemory = new Memory();
stealthMemory.key = 'stealth_behavior';
stealthMemory.tags.types = ['stealth', 'conditional'];
stealthMemory.variables_needed = [
    new Value('stealth_mode', 'active')
];
stealthMemory.variables_affected = [
    new Value('movement_speed', -50),
    new Value('noise_level', -80),
    new Value('alertness', 90)
];

let combatContext = new ContextValue();
combatContext.contextname = 'combat_mode';
combatContext.tags.types = ['combat', 'aggressive'];
combatContext.valuesconnected = [new Value('threat_level', 70)];
combatContext.comparisonType = ['grth'];
combatContext.requirementLevel = ['required'];
combatContext.targetValue = [new Value('danger_threshold', 60)];

let combatMemory = new Memory();
combatMemory.key = 'combat_behavior';
combatMemory.tags.types = ['combat', 'conditional'];
combatMemory.variables_needed = [
    new Value('combat_mode', 'active')
];
combatMemory.variables_affected = [
    new Value('aggression', 80),
    new Value('defense', 90),
    new Value('caution', -40)
];