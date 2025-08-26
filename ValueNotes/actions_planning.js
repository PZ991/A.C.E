// action_sequence_planning.js - Chaining Actions based on memory sequences

let planningAction = new Action();
planningAction.memory_sequence = [
    new Memory(), // Assess situation
    new Memory(), // Consider options  
    new Memory()  // Choose course
];
planningAction.output_variables = [
    new Value('plan_ready', 'true'),
    new Value('confidence', 60)
];

let executionAction = new Action();
executionAction.requirements = [new Value('plan_ready', 'true')];
executionAction.memory_sequence = [
    new Memory(), // Start execution
    new Memory(), // Monitor progress
    new Memory()  // Complete task
];
executionAction.output_variables = [
    new Value('task_progress', 100),
    new Value('satisfaction', 70)
];

let reviewAction = new Action();
reviewAction.requirements = [new Value('task_progress', 100)];
reviewAction.memory_sequence = [
    new Memory(), // Evaluate results
    new Memory()  // Learn from experience
];
reviewAction.output_variables = [
    new Value('experience_gained', 20),
    new Value('future_planning_skill', 5)
];