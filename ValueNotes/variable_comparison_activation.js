//Activation on comparison


// Combining Activator comparison with activation
let comparisonActivation = new Activator();
comparisonActivation.operation = 'less than';              // Compare: less than
comparisonActivation.activation = 'Always';                // Check continuously
comparisonActivation.mindistance = 25;                     // Threshold value
// This activates when target value drops below 25

// Using ContextValue embedded_operations for complex activation
let contextActivation = new ContextValue();
contextActivation.embedded_operations = [
    // Operations that activate when context conditions are met
];
contextActivation.comparisonType = ['grth'];               // Comparison that triggers activation
contextActivation.targetValue = [80];                      // Activation threshold