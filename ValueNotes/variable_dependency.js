// value_dependency_chains.js - Values that require other values to function

let skillMemory = new Memory();
skillMemory.key = 'basic_skill';
skillMemory.tags.types = ['foundation', 'prerequisite'];
skillMemory.variables_affected = [
    new Value('basic_competence', 50)
];

let advancedMemory = new Memory();
advancedMemory.key = 'advanced_skill';
advancedMemory.tags.types = ['advanced', 'dependent'];
advancedMemory.variables_needed = [
    new Value('basic_competence', 40)
];
advancedMemory.variables_affected = [
    new Value('expertise_level', 70),
    new Value('advanced_capability', 60)
];

let masteryMemory = new Memory();
masteryMemory.key = 'mastery_level';
masteryMemory.tags.types = ['mastery', 'expert'];
masteryMemory.variables_needed = [
    new Value('expertise_level', 60),
    new Value('experience_years', 5)
];
masteryMemory.variables_affected = [
    new Value('teaching_ability', 80),
    new Value('innovation_capability', 90)
];