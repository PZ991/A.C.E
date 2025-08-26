// weighted_decision_making.js - Using Ideology good/bad values for choices

let moralIdeology = new Ideology();
moralIdeology.good_values = [
    new Value('honesty', 90),
    new Value('helping_others', 80),
    new Value('justice', 85)
];
moralIdeology.bad_values = [
    new Value('harm', -95),
    new Value('theft', -80),
    new Value('betrayal', -90)
];

let ethicalChoice = new Memory();
ethicalChoice.key = 'moral_dilemma';
ethicalChoice.tags.types = ['decision', 'ethical'];
ethicalChoice.variables_needed = [
    new Value('honesty', 60),
    new Value('helping_others', 50)
];
ethicalChoice.variables_affected = [
    new Value('moral_satisfaction', 70),
    new Value('self_respect', 40)
];

let pragmaticChoice = new Memory();
pragmaticChoice.key = 'practical_decision';
pragmaticChoice.tags.types = ['decision', 'practical'];
pragmaticChoice.variables_affected = [
    new Value('personal_benefit', 60),
    new Value('moral_conflict', 30)
];