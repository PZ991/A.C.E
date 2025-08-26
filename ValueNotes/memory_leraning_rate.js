// learning_rate_adaptation.js - Learning rates changing based on success/failure

let successMemory = new Memory();
successMemory.key = 'task_success';
successMemory.tags.types = ['achievement', 'positive'];
successMemory.variables_affected = [
    new Value('confidence', 30),
    new Value('mental_learning_rate', 0.2),
    new Value('motivation', 40)
];

let failureMemory = new Memory();
failureMemory.key = 'task_failure';
failureMemory.tags.types = ['failure', 'negative'];
failureMemory.variables_affected = [
    new Value('confidence', -20),
    new Value('mental_learning_rate', -0.1),
    new Value('caution', 50)
];

let persistenceMemory = new Memory();
persistenceMemory.key = 'repeated_attempts';
persistenceMemory.tags.types = ['persistence', 'effort'];
persistenceMemory.variables_needed = [
    new Value('attempts', 3)
];
persistenceMemory.variables_affected = [
    new Value('physical_learning_rate', 0.3),
    new Value('determination', 60)
];