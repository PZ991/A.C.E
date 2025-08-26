// group_consensus.js - Multiple entities reaching agreement using Ideology

let groupIdeology = new Ideology();
groupIdeology.good_values = [
    new Value('cooperation', 80),
    new Value('fairness', 70),
    new Value('group_benefit', 90)
];
groupIdeology.bad_values = [
    new Value('selfishness', -60),
    new Value('deception', -80)
];

let consensusMemory = new Memory();
consensusMemory.key = 'group_agreement';
consensusMemory.tags.types = ['group_decision', 'consensus'];
consensusMemory.variables_needed = [
    new Value('agreement_level', 70)
];
consensusMemory.variables_affected = [
    new Value('group_cohesion', 60),
    new Value('collective_confidence', 50)
];

let dissenterMemory = new Memory();
dissenterMemory.key = 'minority_opinion';
dissenterMemory.tags.types = ['dissent', 'minority'];
dissenterMemory.variables_affected = [
    new Value('group_tension', 30),
    new Value('decision_delay', 40)
];