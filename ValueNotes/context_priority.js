// context_priority_conflict.js - Multiple contexts competing for activation

let workContext = new ContextValue();
workContext.contextname = 'work_mode';
workContext.tags.types = ['work', 'focus'];
workContext.valuesconnected = [new Value('focus', 70)];
workContext.comparisonType = ['grth'];
workContext.requirementLevel = ['required'];
workContext.targetValue = [new Value('focus_threshold', 60)];

let socialContext = new ContextValue();
socialContext.contextname = 'social_mode';
socialContext.tags.types = ['social', 'interaction'];
socialContext.valuesconnected = [new Value('social_need', 80)];
socialContext.comparisonType = ['grth'];
socialContext.requirementLevel = ['required'];
socialContext.targetValue = [new Value('social_threshold', 70)];

let restContext = new ContextValue();
restContext.contextname = 'rest_mode';
restContext.tags.types = ['tired', 'rest'];
restContext.valuesconnected = [new Value('energy', 30)];
restContext.comparisonType = ['lsth'];
restContext.requirementLevel = ['required'];
restContext.targetValue = [new Value('low_energy_threshold', 40)];