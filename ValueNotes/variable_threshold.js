//1. Using Activator for threshold-based activation
let healthThreshold = new Activator();
healthThreshold.operation = 'less than';          // Activate when health drops
healthThreshold.activation = 'Always';            // Continuous monitoring
healthThreshold.distancevalmin = 0.2;             // 20% threshold
healthThreshold.mindistance = 20;                 // Health value of 20

//2. Using ContextValue for complex thresholds
let dangerContext = new ContextValue();
dangerContext.valuesconnected = [new Value('health', 25), new Value('enemies_nearby', 3)];
dangerContext.comparisonType = ['lsth', 'grth'];         // Health less than, enemies greater than
dangerContext.targetValue = [30, 1];                    // Thresholds: health < 30, enemies > 1
dangerContext.requirementLevel = ['required', 'required']; // Both must be met