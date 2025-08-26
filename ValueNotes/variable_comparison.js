// Using ContextValue for detailed comparisons
let skillComparison = new ContextValue();
skillComparison.valuesconnected = [new Value('player_skill', 75), new Value('opponent_skill', 60)];
skillComparison.comparisonType = ['grth', 'equal'];         // Greater than, equal to
skillComparison.targetValue = [50, 75];                    // Compare against these values

// Using Activator for simple comparisons
let simpleComparison = new Activator();
simpleComparison.operation = 'greater than';               // Simple comparison operator
simpleComparison.activation = 'Onhit';                     // When to compare


