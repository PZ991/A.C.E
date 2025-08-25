class Entity extends Object {
    constructor() {
        super();
        
        // Use existing Value system for simple properties
        this.vocal_pitch = new Value('vocal_pitch', 0.0);                               //vocal pitch of the person
        this.vocal_volume = new Value('vocal_volume', 0.0);                             //average volume of the person
        this.voacal_range = [];                                                         //vocal range
        this.mental_learning_rate = new Value('mental_learning_rate', 0.0);             //how much does this entity learns or remembers something
        this.physical_learning_rate = new Value('physical_learning_rate', 0.0);         //how much does this entity learns physically
        
        // Memory systems as specialized collections
        this.long_term_memory = new MemoryBank('unlimited');                            //long term memories that are frequently done
        this.short_term_memory = new MemoryBank(7); // 7±2 capacity                     //unimportant unprocessed memories
        this.memories = [];                                                             //memories of an entity
    }
}

class Memory extends Value {
    constructor() {
        super();
        this.tags = new MultiType();                                                    //tags connected to this
        this.names = [];                                                                //names connected to this
        this.exclude_tags = new MultiType();                                            //excluded tags
        this.exclude_names = [];                                                        //excluded tags
        this.flexible = false;                                                          //whether the tags can also include unmentioned tags for matching
        this.impact_memorability = new Value('impact_memorability', 0);                 //how much memorable is this
        this.decay_rate = new Value('decay_rate', 0);                                   //decay rate of the memory
        
        // Sequences and relationships
        this.sequence = [];                                                             // Array of Value references
        this.variables_affected = [];                                                   // Array of Value references
        this.variables_needed = [];                                                     // Array of Value references
        this.emotions_affected = [];                                                    // Array of {emotion: Value, target: Value}
    }
}


class Action extends Operation {
    constructor() {
        super();
        //for animation purposes
        this.actionIKMask = []; //which IK should be affected
        this.actionMask = []; //which bones should be affected
        this.IKweights[[]]; //array of ik weight throughout the animation
        this.IKWeightTiming[[]]; //array of ik weight timing for the animation
        this.requirements = []; // What's needed to perform this action
        this.targetTypes = ['person', 'object', 'self']; // Valid targets


        this.objective = [];                                                            //array of values to be affected
        this.imprinted_memory = null;                                                   // Reference to Memory object
        this.combo_actions = [];                                                        // Array of Action references
        this.requirement = [];
        
        this.memory_sequence = [];                                                      // Array of Memory references
        this.output_variables = [];                                                     // Array of {name: Value, operation: string, operand: Value}
    }
}
// Ideology as value system, is only used for checking (acts like wights)
//which is bad and good this is how decisions are made
class Ideology {
    constructor() {
        this.good_values = [];                                                          // Array of Value that are weighted as good
        this.bad_values = [];                                                           // Array of Value that are weighted as bad
    }
}




// Using Memory's variables_affected for complex relationships
let stressMemory = new Memory();
stressMemory.variables_affected = [
    new Value('happiness', 50),     // Stress affects happiness
    new Value('health', 80),        // Stress affects health
    new Value('focus', 60)          // Stress affects focus
];

// Using Action's memory sequence for action consequences
let exerciseAction = new Memory();
exerciseAction.sequence = [
    { operation: new Operation(),operation: new Operation() },
    {operation: new Operation(),operation: new Operation() },
    { operation: new Operation(),operation: new Operation(),operation: new Operation() }
];

// Memory sequence outputs
let learningSequence = new Memory();
learningSequence.output_variables = [
    new Value('attention', 'increase'),    
    new Value('understanding', 'decrease'),  
];

