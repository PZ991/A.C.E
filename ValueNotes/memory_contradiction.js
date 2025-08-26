// memory_conflict_resolution.js - When memories contradict each other

let positiveMemory = new Memory();
positiveMemory.key = 'person_helpful';
positiveMemory.tags.types = ['person_A', 'positive'];
positiveMemory.impact_memorability = new Value('impact_memorability', 70);
positiveMemory.variables_affected = [
    new Value('trust_person_A', 60),
    new Value('positive_emotion', 40)
];

let negativeMemory = new Memory();
negativeMemory.key = 'person_betrayal';
negativeMemory.tags.types = ['person_A', 'negative'];
negativeMemory.impact_memorability = new Value('impact_memorability', 90);
negativeMemory.variables_affected = [
    new Value('trust_person_A', -80),
    new Value('confusion', 50)
];

let confusionMemory = new Memory();
confusionMemory.key = 'conflicted_feelings';
confusionMemory.tags.types = ['person_A', 'confusion'];
confusionMemory.variables_needed = [
    new Value('confusion', 40)
];
confusionMemory.variables_affected = [
    new Value('emotional_stability', -30),
    new Value('decision_difficulty', 70)
];