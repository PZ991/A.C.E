// memory_chain_reaction.js - Memories triggering other memories in sequence

let traumaMemory = new Memory();
traumaMemory.key = 'trauma_event';
traumaMemory.tags.types = ['negative', 'fear'];
traumaMemory.variables_affected = [
    new Value('confidence', -30),
    new Value('trust', -50)
];

let trustMemory = new Memory();
trustMemory.key = 'trust_betrayal';
trustMemory.tags.types = ['trust', 'negative'];
trustMemory.variables_needed = [
    new Value('trust', 20) // Triggers when trust is low
];
trustMemory.variables_affected = [
    new Value('isolation', 40),
    new Value('paranoia', 60)
];

let isolationMemory = new Memory();
isolationMemory.key = 'social_withdrawal';
isolationMemory.tags.types = ['isolation', 'loneliness'];
isolationMemory.variables_needed = [
    new Value('isolation', 30)
];
isolationMemory.variables_affected = [
    new Value('depression', 50),
    new Value('social_skills', -20)
];