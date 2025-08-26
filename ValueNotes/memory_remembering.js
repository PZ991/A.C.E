// social_memory_formation.js - Remembering interactions with specific entities

let firstMeetingMemory = new Memory();
firstMeetingMemory.key = 'first_encounter';
firstMeetingMemory.names = ['John_Smith'];
firstMeetingMemory.tags.types = ['first_meeting', 'social'];
firstMeetingMemory.variables_affected = [
    new Value('familiarity_John', 20),
    new Value('first_impression', 60)
];

let conversationMemory = new Memory();
conversationMemory.key = 'deep_conversation';
conversationMemory.names = ['John_Smith'];
conversationMemory.tags.types = ['conversation', 'personal'];
conversationMemory.variables_needed = [
    new Value('familiarity_John', 30)
];
conversationMemory.variables_affected = [
    new Value('emotional_bond_John', 40),
    new Value('trust_John', 50)
];

let conflictMemory = new Memory();
conflictMemory.key = 'disagreement';
conflictMemory.names = ['John_Smith'];
conflictMemory.tags.types = ['conflict', 'tension'];
conflictMemory.variables_affected = [
    new Value('relationship_strain_John', 60),
    new Value('caution_around_John', 40)
];