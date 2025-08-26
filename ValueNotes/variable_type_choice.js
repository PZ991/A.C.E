// Using Action targetTypes for choice options
let interactionChoice = new Action();
interactionChoice.targetTypes = ['person', 'object', 'self']; // Can choose between these

// Using MultiType for choice combinations
let dialogChoice = new MultiType();
dialogChoice.types = ['friendly', 'neutral', 'hostile'];    // Three dialogue choices
dialogChoice.mode = 'static';                               // Must pick one exactly