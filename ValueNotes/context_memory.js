
// Using ContextValue embedded_memories for nested memory effects
let nestedMemoryContext = new ContextValue();
nestedMemoryContext.embedded_memories = [
    // Array of Memory references that work together
];
nestedMemoryContext.embedded_values = [
    new Value('final_personality_trait', 0) // The variable that gets changed
];
