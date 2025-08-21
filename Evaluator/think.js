




/*

expectation affects the emotion and impact of something as well as memorability
Others:
Human is an object with values but also has:
    long term memory[] //unlicapacty
    short term memory[]//7+-2
    vocal pitch=0.0
    vocal volume=0.0
    vocal freqquencies[]
    mental learning rate=0.0
    physical learning rate=0.0

Memory:
    object tags[]
    object name[]
    object exclude tags[]
    object exclude name[]
    bool flexible tags
    impact_memorability=0

    decay rate
    sequence[]
    variable affected[]
    variable needed[]

    emotion affected[emotion name, target]

Emotion:
    Pleasant/unpleasant
    neurons/variables that connect to each other (memories)
    experience(memories), expectation affects the emotion impact
    time dilution

    final operation+value affected->memory sequence = memory on how to do things


Action:

    

    variable change- plan objective of action
    action can have imprinted memory
    combo
   
    Other variables:
        desire contradictions(laziness, abilities  )

    Memory Sequence
    final output variables[name,operation,value to operate with](int1, add, int2)
    memory[[variable names affected],action name, [operations],[variable]]


Ideology:
    goodvalues=[]
    badvalues=[]
    importance_weights[]

Context:
    memories[]
    context_tags[]
    meaning_strength[]



SITUATION
    user has ownership of money
    user is hungry
    in memory user knows someone to trade
    trade in memory is a sequence of: (change some money ownership change to seller, action=give,target=seller),(seller give some bread ownership to buyer) with memory result = humeger - some value
    user eats, if applicable

    poor = hunger =sad, why sad when hungry? because in the poor's memory all possible actions cannot be done currently
    someone gave food(change ownership from owner to poor) = poor hunger decrease = from sad to happy + greatful
    poor memory add person to memory, happy because person
    add to memory
    action- receiver - effects - time

*/


class Human extends Object {
    constructor() {
        super();
        
        // Use existing Value system for simple properties
        this.vocal_pitch = new Value('vocal_pitch', 0.0);
        this.vocal_volume = new Value('vocal_volume', 0.0);
        this.mental_learning_rate = new Value('mental_learning_rate', 0.0);
        this.physical_learning_rate = new Value('physical_learning_rate', 0.0);
        
        // Memory systems as specialized collections
        this.long_term_memory = new MemoryBank('unlimited');
        this.short_term_memory = new MemoryBank(7); // 7±2 capacity
        
        // Vocal frequencies as value array
        this.vocal_frequencies = []; // Array of Value objects
        
        // Core systems
        this.emotions = new EmotionSystem();
        this.actions = new ActionSystem();

        //humans think of the expectation which will affect impact or other things
        this.expectated_values=[];
        this.expected_operations=[];

        //emotion degradation overtime based on each human
        this.emotional_dilution=0;
    }
}

//emotions are just values but are tagged as emotions,
//similar to morality and comfort, they might have thresholds

class Memory extends Value {
    constructor() {
        super();
        this.object_tags = new MultiType();
        this.object_names = [];
        this.exclude_tags = new MultiType();
        this.exclude_names = [];
        this.flexible_tags = new Value('flexible_tags', false);
        this.impact_memorability = new Value('impact_memorability', 0);
        this.decay_rate = new Value('decay_rate', 0);
        
        // Sequences and relationships
        this.sequence = []; // Array of Value references
        this.variables_affected = []; // Array of Value references
        this.variables_needed = []; // Array of Value references
        this.emotions_affected = []; // Array of {emotion: Value, target: Value}
    }
}

class MemoryBank {
    constructor(capacity = 'unlimited') {
        this.capacity = capacity;
        this.memories = []; // Array of Memory objects
        this.activator = new Activator(); // For memory retrieval conditions
    }
}


class Action extends Operation {
    constructor() {
        super();
        this.objective = []; //array of values to be affected
        this.imprinted_memory = null; // Reference to Memory object
        this.combo_actions = []; // Array of Action references
        this.requirement = [];
        
        
        // Memory sequence for execution
        this.memory_sequence = []; // Array of Memory references
        this.output_variables = []; // Array of {name: Value, operation: string, operand: Value}
    }
}

//laziness is a value, which is just a set of other values(like a context), this is where requirement comes in, requirement needs laziness(context) to be less than requirement


// Ideology as value system, is only used for checking (acts like wights)
//which is bad and good this is how decisions are made
class Ideology {
    constructor() {
        this.good_values = []; // Array of Value objects
        this.bad_values = []; // Array of Value objects
        this.importance_weights = []; // Array of Value objects
    }
}



//CATEGORIZATION and CONTEXT classes might not be needed as they might already be juist values but interconnected
//need standard or buil-in activator so that something can be categorized on its own