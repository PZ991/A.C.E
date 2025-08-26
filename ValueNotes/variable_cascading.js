// cascading_value_changes.js - One value change triggering multiple others

let injuryMemory = new Memory();
injuryMemory.key = 'physical_injury';
injuryMemory.tags.types = ['injury', 'physical'];
injuryMemory.variables_affected = [
    new Value('mobility', -60),
    new Value('pain_level', 80)
];

let mobilityMemory = new Memory();
mobilityMemory.key = 'reduced_mobility';
mobilityMemory.tags.types = ['limitation', 'physical'];
mobilityMemory.variables_needed = [
    new Value('mobility', 40)
];
mobilityMemory.variables_affected = [
    new Value('independence', -40),
    new Value('frustration', 50)
];

let emotionalMemory = new Memory();
emotionalMemory.key = 'emotional_impact';
emotionalMemory.tags.types = ['emotional', 'secondary'];
emotionalMemory.variables_needed = [
    new Value('frustration', 40)
];
emotionalMemory.variables_affected = [
    new Value('mood', -50),
    new Value('social_withdrawal', 30),
    new Value('motivation', -40)
];