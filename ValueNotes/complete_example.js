
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