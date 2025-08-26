// memory_decay_recovery.js - How memories fade and can be reinforced

let childhoodMemory = new Memory();
childhoodMemory.key = 'childhood_friend';
childhoodMemory.decay_rate = new Value('decay_rate', 0.1);
childhoodMemory.impact_memorability = new Value('impact_memorability', 30);
childhoodMemory.variables_affected = [
    new Value('nostalgia', 25)
];

let reinforcementMemory = new Memory();
reinforcementMemory.key = 'photo_reminder';
reinforcementMemory.tags.types = ['visual', 'trigger'];
reinforcementMemory.variables_affected = [
    new Value('nostalgia', 60),
    new Value('memory_strength', 40)
];

let forgettingMemory = new Memory();
forgettingMemory.key = 'name_forgotten';
forgettingMemory.decay_rate = new Value('decay_rate', 0.8);
forgettingMemory.variables_affected = [
    new Value('frustration', 20),
    new Value('memory_confidence', -30)
];