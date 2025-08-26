

// UNIFIED MEMORY SYSTEM - One memory that handles sequence, relationships, and outputs
let stressfulWorkdayMemory = new Memory();

// 1. SEQUENCE: What happened step by step (the story/events)
stressfulWorkdayMemory.sequence = [
     { operation: new Operation(),operation: new Operation() },
    {operation: new Operation(),operation: new Operation() },
    { operation: new Operation(),operation: new Operation(),operation: new Operation() }
];

// 2. VARIABLES AFFECTED: What this memory impacts (the consequences)
stressfulWorkdayMemory.variables_affected = [
    new Value('happiness', 50),              // Stress memory reduces happiness
    new Value('health', 80),                 // Affects physical health
    new Value('focus', 60),                  // Reduces ability to focus
    new Value('confidence', 45),             // Lowers self-confidence
    new Value('sleep_quality', 30)           // Disrupts sleep
];

// 3. VARIABLES NEEDED: What conditions must exist for this memory to form/activate
stressfulWorkdayMemory.variables_needed = [
    new Value('work_environment', 1),        // Must be at work
    new Value('stress_threshold', 70),       // Stress must exceed threshold
    new Value('mental_energy', 40)           // Must have enough mental energy to process
];