
// Using various activation types in Activator
let hitActivation = new Activator();
hitActivation.activation = 'Onhit';                         // Activate when hit

let continuousActivation = new Activator();
continuousActivation.activation = 'Always';                // Always active

let proximityActivation = new Activator();
proximityActivation.activation = 'inradius';               // Activate when in range
proximityActivation.maxdistance = 50;                      // Within 50 units

// Using MultiType activatedby for conditional activation
let conditionalActivation = new Activator();
conditionalActivation.activatedby = new MultiType();
conditionalActivation.activatedby.types = ['enemy', 'friend']; // Activated by these types