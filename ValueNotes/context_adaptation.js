// adaptive_behavior.js - Operations that modify themselves based on outcomes

let learningOperation = new Operation();
learningOperation.activator.activation = 'Always';
learningOperation.valuetarget = new Value('success_rate', 0);
learningOperation.valuetarget2 = new Value('approach_confidence', 50);

let adaptiveMemory = new Memory();
adaptiveMemory.key = 'outcome_tracking';
adaptiveMemory.tags.types = ['learning', 'adaptation'];
adaptiveMemory.variables_affected = [
    new Value('success_rate', 10),
    new Value('method_effectiveness', 15)
];

let behaviorAdjustment = new Operation();
behaviorAdjustment.activator.operation = 'less than';
behaviorAdjustment.activator.activation = 'Always';
behaviorAdjustment.valuetarget = new Value('success_rate', 30);
behaviorAdjustment.valuetarget2 = new Value('risk_taking', -20);

let improvementMemory = new Memory();
improvementMemory.key = 'strategy_refinement';
improvementMemory.tags.types = ['improvement', 'learning'];
improvementMemory.variables_needed = [
    new Value('method_effectiveness', 60)
];
improvementMemory.variables_affected = [
    new Value('skill_level', 25),
    new Value('confidence', 30)
];